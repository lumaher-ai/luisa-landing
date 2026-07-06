import type { Metric } from "./metric-card-types";

export interface Role {
  title: string;
  period: string;
  description: string;
}

export interface Company {
  name: string;
  location: string;
  accentColor: string;
  metrics: Metric[];
  roles: Role[];
}

export const COMPANIES: Company[] = [
  {
    name: "Closer",
    location: "Bogotá",
    accentColor: "rgb(130, 230, 170)",
    metrics: [
      { value: "10K+", label: "Daily Conversations" },
      { value: "70%", label: "Handled by Agents" },
      { value: "$25K", label: "MRR from Zero" },
    ],
    roles: [
      {
        title: "Founding AI Engineer",
        period: "Aug 2025 — Present",
        description:
          "Architected an AI-powered WhatsApp platform from concept to production — now handling 10k+ daily conversations and driving the company to $25K MRR. Designed autonomous agents in Python and LangGraph that resolve 60% of customer inquiries with no human in the loop, grounded on production RAG pipelines and vector search to keep outputs hallucination-free. Built the multi-tenant Node.js + AWS backend behind 5X growth with zero-downtime deploys, plus the CI/CD, evaluation, and observability layer that tracks agent cost, latency, and quality. Grew and led the engineering team from 2 to 8.",
      },
    ],
  },
  {
    name: "Globant",
    location: "Bogotá",
    accentColor: "rgb(120, 205, 185)",
    metrics: [
      { value: "20K+", label: "Daily Active Users" },
      { value: "35%", label: "Faster Responses" },
      { value: "80%", label: "Test Coverage" },
    ],
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Jan 2024 — Aug 2025",
        description:
          "Led full-stack development for enterprise products serving 20k+ daily active users. Optimized backend APIs and data-fetching strategies to cut payload sizes and improve system response times by 35%. Architected modular component libraries and shared business logic adopted by 5 engineering teams, cutting their development time by 30%. Drove testing culture from 45% to 80% automated coverage with Jest and Vitest, and mentored 3 junior engineers on system architecture and delivery.",
      },
    ],
  },
  {
    name: "NICE Actimize",
    location: "Bogotá",
    accentColor: "rgb(255, 190, 95)",
    metrics: [
      { value: "1M+", label: "Txns / Day" },
      { value: "40%", label: "Faster Load" },
      { value: "2x", label: "Faster Resolution" },
    ],
    roles: [
      {
        title: "Software Engineer",
        period: "Oct 2022 — Dec 2023",
        description:
          "Built and optimized high-throughput compliance systems processing 1M+ financial transactions daily. Engineered caching layers and profiled data pipelines to cut system load times by 40%. Redesigned complex incident-management workflows and data models, halving issue-resolution time. Migrated legacy codebases to modern frameworks, improving long-term maintainability and deployment speed.",
      },
    ],
  },
  {
    name: "Avianca",
    location: "Bogotá",
    accentColor: "rgb(240, 100, 110)",
    metrics: [
      { value: "400+", label: "Internal Users" },
      { value: "30%", label: "Report Accuracy" },
      { value: "Airline", label: "Wide Deploy" },
    ],
    roles: [
      {
        title: "Software Engineer",
        period: "Jul 2021 — Jul 2022",
        description:
          "Developed data-intensive analytics and operational tools deployed airline-wide. Standardized and refactored core data pipelines, improving critical reporting accuracy by 30%. Built robust internal tooling adopted by 400+ users across operations and logistics, and introduced unit testing and automated QA practices that improved release stability.",
      },
    ],
  },
];
