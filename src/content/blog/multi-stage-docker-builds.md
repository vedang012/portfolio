---
title: Multi-stage Docker builds that actually shrink your image
description: How I cut a Spring Boot image from ~900MB down to under 200MB without breaking anything.
date: 2026-09-14
tags: [Docker, Java, DevOps]
---

The first Docker image I shipped for a Spring Boot service was close to a gigabyte.
It worked, it deployed, and every single push to EC2 felt like watching paint dry.

## The naive Dockerfile

```dockerfile
FROM maven:3.9-eclipse-temurin-21
WORKDIR /app
COPY . .
RUN mvn package -DskipTests
CMD ["java", "-jar", "target/app.jar"]
```

The problem is not the JAR — it is everything around it. Maven, the full JDK, the
`.m2` cache and the entire source tree all ride along into production.

## The multi-stage version

```dockerfile
# build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B package -DskipTests

# runtime stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

Two things do the heavy lifting here:

1. **Only the JAR crosses the stage boundary.** The build tooling never reaches the
   final layer.
2. **`pom.xml` is copied before `src`.** Dependencies get their own cache layer, so a
   code-only change no longer re-downloads the internet.

| Image | Size | Cold deploy |
| --- | --- | --- |
| Single stage | ~900 MB | slow |
| Multi stage | ~180 MB | noticeably faster |

> Smaller images are not a vanity metric. They are shorter pulls, faster rollbacks,
> and cheaper registry storage.

## What I would add next

- A non-root user in the runtime stage.
- A `HEALTHCHECK` so the orchestrator knows when the app is genuinely ready.
- Layered JARs (`spring-boot:build-image`) once the build gets more complex.
