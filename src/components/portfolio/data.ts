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
    id: "iot-monitoring-backend",
    number: "001",
    title: "IoT Monitoring Backend",
    description:
      "Built and deployed a backend service for IoT device monitoring using FastAPI and PostgreSQL. Containerized with Docker and deployed on AWS, complete with CI/CD via GitHub Actions, HTTPS, API authentication, CloudWatch monitoring, and a custom subdomain.",
    tags: ["FastAPI", "PostgreSQL", "Docker", "AWS", "GitHub Actions"],
    demoUrl: "https://github.com/vedang012/iot-monitoring-backend",
    repoUrl: "https://github.com/vedang012/iot-monitoring-backend",
  },
  {
    id: "pharmaguard",
    number: "002",
    title: "PharmaGuard",
    description:
      "Built the Spring Boot backend for an AI-driven pharmacogenomics platform that predicts drug-gene interactions from VCF files with confidence-scored risk assessments and explainable clinical guidance. Containerized with Docker and deployed on Render.",
    tags: ["Java", "Spring Boot", "Docker", "Render"],
    demoUrl: "https://github.com/vedang012/pharmaguard",
    repoUrl: "https://github.com/vedang012/pharmaguard",
  },
  {
    id: "movie-streaming-deployment",
    number: "003",
    title: "Movie Streaming Deployment",
    description:
      "Deployed a Java web application on AWS EC2 using Apache Tomcat, configured server and network settings, and automated the build-and-deploy workflow with Jenkins and Maven.",
    tags: ["Java", "AWS EC2", "Apache Tomcat", "Jenkins", "Maven"],
    demoUrl: "https://github.com/vedang012/movie-streaming-deployment",
    repoUrl: "https://github.com/vedang012/movie-streaming-deployment",
  },
  {
    id: "food-delivery-deployment",
    number: "004",
    title: "Food Delivery Deployment",
    description:
      "Containerized a Node.js food delivery application using Docker and deployed the containerized app on AWS EC2, configuring the instance environment for the runtime.",
    tags: ["Node.js", "Docker", "AWS EC2"],
    demoUrl: "https://github.com/vedang012/food-delivery-deployment",
    repoUrl: "https://github.com/vedang012/food-delivery-deployment",
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
