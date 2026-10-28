import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export const personal = {
  name: "Vedang Solaskar",
  firstName: "Vedang",
  tagline: "Building things that probably shouldn't work, until they do.",
  philosophy:
    "The entire point of life is to be so wildly passionate that people can't decide if you are crazy or a genius.",
  email: "vedangsolaskar24@gmail.com",
  phone: "+91 8308721387",
  github: "https://github.com/vedang012",
  githubUsername: "vedang012",
  linkedin: "https://linkedin.com/in/vedangsolaskar",
  location: "Pune, India",
  bio: "Final-year Computer Engineering student with hands-on experience deploying applications on AWS, Render, and EC2 using Docker, Jenkins, GitHub Actions, and Apache Tomcat. Comfortable across the deployment lifecycle — from containerizing applications to configuring cloud infrastructure, CI/CD pipelines, and monitoring. Backend development background in Java, Spring Boot, and Python/FastAPI. Seeking a DevOps/Cloud/AWS internship to apply and grow infrastructure automation and deployment skills.",
};

export const skills = [
  "Java",
  "Spring Boot",
  "Python",
  "FastAPI",
  "AWS",
  "EC2",
  "S3",
  "IAM",
  "VPC",
  "RDS",
  "CloudWatch",
  "Render",
  "Docker",
  "Jenkins",
  "GitHub Actions",
  "Maven",
  "PostgreSQL",
  "Vector Databases",
  "RAG",
  "Generative AI",
  "Agentic AI",
  "Apache Tomcat",
  "Git",
  "GitHub",
];

export const projects = [
  {
    id: "course-platform-api",
    number: "001",
    title: "Course Platform API",
    description:
      "Spring Boot REST API for structured courses, topics and subtopics on PostgreSQL with JPA/Hibernate. JWT registration and login, course enrollment, subtopic completion tracking, course search, Swagger/OpenAPI docs, and automatic first-startup seeding from JSON.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "JPA/Hibernate", "JWT", "Swagger"],
    demoUrl: "https://github.com/vedang012/course-platform-api",
    repoUrl: "https://github.com/vedang012/course-platform-api",
  },
  {
    id: "geospatial-environmental-analytics",
    number: "002",
    title: "Geospatial Environmental Analytics",
    description:
      "Full-stack geospatial app with JWT-secured project and site management, GeoJSON polygons and interactive Mapbox maps. Imported 105,600 emissions-grid records into PostGIS with indexed spatial queries for site-level CO₂ aggregation. Dockerized on AWS EC2 with RDS and GitHub Actions CI/CD.",
    tags: ["Python", "FastAPI", "React", "Mapbox GL JS", "PostGIS", "AWS"],
    demoUrl: "https://github.com/vedang012/geospatial-environmental-analytics",
    repoUrl: "https://github.com/vedang012/geospatial-environmental-analytics",
  },
  {
    id: "querydesk",
    number: "003",
    title: "QueryDesk — AI-Powered Natural Language SQL Engine",
    description:
      "Natural language SQL assistant to query PostgreSQL and MySQL conversationally. Schema retrieval with FastEmbed and Qdrant vector search, SQLGlot validation, read-only transactions, timeouts and automatic SQL repair, plus JWT cookie auth, encrypted credentials and multi-turn clarification.",
    tags: ["React", "FastAPI", "Groq", "Qdrant", "SQLGlot", "RAG"],
    demoUrl: "https://github.com/vedang012/querydesk",
    repoUrl: "https://github.com/vedang012/querydesk",
  },
  {
    id: "leetcode-stats-api",
    number: "004",
    title: "LeetCode Statistics API",
    description:
      "Unofficial Spring Boot REST API that retrieves LeetCode user statistics via its GraphQL endpoint. Nine endpoints for profiles, submission calendars, recent submissions, topic tags and contest performance, built with controller, service and client layers.",
    tags: ["Java", "Spring Boot", "GraphQL", "REST APIs"],
    demoUrl: "https://github.com/vedang012/leetcode-stats-api",
    repoUrl: "https://github.com/vedang012/leetcode-stats-api",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "GitHub", href: personal.github, icon: Github },
  { label: "LinkedIn", href: personal.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${personal.email}`, icon: Mail },
];

export const linkIcons = {
  external: ExternalLink,
  github: Github,
};
