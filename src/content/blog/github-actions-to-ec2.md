---
title: Shipping to EC2 from GitHub Actions without SSH keys everywhere
description: A small, boring CI/CD pipeline that builds, pushes, and rolls out a container on a single EC2 box.
date: 2026-09-02
tags: [GitHub Actions, AWS, CI/CD]
---

Most side projects do not need Kubernetes. One EC2 instance, one container, and a
pipeline that never asks me to log in is usually enough.

## The shape of the pipeline

```yaml
name: deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE }}
          aws-region: ap-south-1

      - uses: aws-actions/amazon-ecr-login@v2
        id: ecr

      - name: Build and push
        run: |
          IMAGE=${{ steps.ecr.outputs.registry }}/api:${{ github.sha }}
          docker build -t "$IMAGE" .
          docker push "$IMAGE"

      - name: Roll out
        run: |
          aws ssm send-command \
            --document-name AWS-RunShellScript \
            --targets Key=tag:App,Values=api \
            --parameters commands="/opt/deploy.sh ${{ github.sha }}"
```

## Why this holds up

- **OIDC instead of long-lived keys.** GitHub assumes an IAM role for the duration of
  the job, so there is no access key sitting in repository secrets.
- **SSM instead of SSH.** The instance needs no inbound port 22 and no key material in
  CI. The agent already trusts AWS.
- **The commit SHA is the tag.** Rolling back is `deploy.sh <old-sha>`; no guessing what
  `latest` meant last Tuesday.

The deploy script on the box stays deliberately dumb:

```bash
#!/usr/bin/env bash
set -euo pipefail
docker pull "$REGISTRY/api:$1"
docker stop api || true
docker rm api || true
docker run -d --name api --restart unless-stopped -p 8080:8080 "$REGISTRY/api:$1"
```

There is a second of downtime during the swap. For a personal project that is a fine
trade; the day it stops being fine, the answer is a load balancer and two containers,
not a more clever script.
