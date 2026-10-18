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
    id: "pharmaguard",
    number: "001",
    title: "PharmaGuard — Pharmacogenomic Analysis Platform",
    description:
      "Built a full-stack system that processes VCF files to detect genetic variants, assess drug-gene interaction risk, and provide confidence-scored AI-assisted explanations for clinical decision support.",
    tags: ["Java 21", "Spring Boot", "React", "Gemini API", "Docker"],
    demoUrl: "https://github.com/vedang012/pharmaguard",
    repoUrl: "https://github.com/vedang012/pharmaguard",
  },
  {
    id: "geospatial-environmental-analytics",
    number: "002",
    title: "Geospatial Environmental Analytics",
    description:
      "Developed a geospatial platform with JWT-protected project/site management, interactive map-based site selection, and indexed PostGIS aggregation of large-scale emissions data deployed on AWS EC2.",
    tags: ["Python", "FastAPI", "React", "Mapbox GL JS", "PostGIS", "AWS"],
    demoUrl: "https://github.com/vedang012/geospatial-environmental-analytics",
    repoUrl: "https://github.com/vedang012/geospatial-environmental-analytics",
  },
  {
    id: "querydesk",
    number: "003",
    title: "QueryDesk — AI-Powered Natural Language SQL Engine",
    description:
      "Built a conversational SQL assistant that translates natural language to validated read-only SQL with vector-aware schema retrieval, guarded execution constraints, and automatic repair for failed queries.",
    tags: ["React", "FastAPI", "Groq", "Qdrant", "SQLGlot"],
    demoUrl: "https://github.com/vedang012/querydesk",
    repoUrl: "https://github.com/vedang012/querydesk",
  },
  {
    id: "enterprise-knowledge-assistant",
    number: "004",
    title: "Enterprise Knowledge Assistant — RAG Employee Query System",
    description:
      "Implemented a RAG assistant that chunks internal documents, indexes embeddings in Qdrant, and uses cross-modal retrieval plus Groq LLM generation to answer employee queries with grounded responses.",
    tags: ["Python", "Qdrant", "Groq API", "LangChain"],
    demoUrl: "https://github.com/vedang012/enterprise-knowledge-assistant",
    repoUrl: "https://github.com/vedang012/enterprise-knowledge-assistant",
  },
  {
    id: "leetcode-statistics-api",
    number: "005",
    title: "LeetCode Statistics API — REST & GraphQL Integration",
    description:
      "Built an unofficial Spring Boot API exposing LeetCode user stats through REST and GraphQL, including profile data, submission calendars, problem metadata, and contest performance.",
    tags: ["Java", "Spring Boot", "GraphQL", "REST APIs"],
    demoUrl: "https://github.com/vedang012/leetcode-statistics-api",
    repoUrl: "https://github.com/vedang012/leetcode-statistics-api",
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
