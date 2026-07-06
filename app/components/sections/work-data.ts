import type { Metric } from "./metric-card-types";
import type { SignalType } from "./signal-generators";

export interface Project {
  name: string;
  tag: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  accentColor: string;
  signalType: SignalType;
  metrics: Metric[];
  link?: string;
  linkLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Closer — AI Agent Platform",
    tag: "AGT-001",
    year: "2025",
    tagline: "Autonomous WhatsApp agents that close conversations while you sleep",
    description:
      "Architected an AI-powered WhatsApp platform from concept to production. Autonomous agents built in Python and LangGraph reason through customer inquiries and resolve 60% of them with no human in the loop — sustaining 10k+ conversations a day and driving the company to $25K MRR. Behind it sits a multi-tenant Node.js and AWS backend that absorbed 5X growth with zero-downtime deploys.",
    stack: ["Python", "LangGraph", "Node.js", "AWS"],
    accentColor: "rgb(130, 230, 170)",
    signalType: "complex",
    metrics: [
      { value: "10K+", label: "Daily Convos" },
      { value: "70%", label: "Autonomous" },
      { value: "$25K", label: "MRR" },
    ],
  },
  {
    name: "Grounded RAG & Eval Layer",
    tag: "AIF-001",
    year: "2025",
    tagline: "Hallucination-free LLM output, measured in production",
    description:
      "Built the retrieval and evaluation layer that keeps Closer's agents grounded. Production RAG pipelines over vector databases and advanced prompt engineering anchor every answer to real context, while an evaluation harness and full observability track agent cost, latency, and quality on live traffic. The result: LLM output you can trust in front of paying customers, not just in a demo.",
    stack: ["RAG", "Vector DBs", "Prompt Engineering", "Observability"],
    accentColor: "rgb(120, 210, 160)",
    signalType: "sine",
    metrics: [
      { value: "Grounded", label: "By Design" },
      { value: "Live", label: "Eval Harness" },
      { value: "Cost·Latency", label: "Tracked" },
    ],
  },
  {
    name: "Globant — Shared Platform Libraries",
    tag: "PLT-001",
    year: "2024",
    tagline: "One component library, five teams, 30% less build time",
    description:
      "Architected modular component libraries and shared business logic adopted across 5 distinct engineering teams, cutting their development time by 30%. Optimized backend APIs and data-fetching to improve response times by 35% on enterprise products serving 20k+ daily active users, and drove automated test coverage from 45% to 80% with Jest and Vitest.",
    stack: ["TypeScript", "React", "Node.js", "Vitest"],
    accentColor: "rgb(120, 205, 185)",
    signalType: "square",
    metrics: [
      { value: "5", label: "Teams" },
      { value: "30%", label: "Faster Dev" },
      { value: "80%", label: "Coverage" },
    ],
  },
  {
    name: "NICE Actimize — Compliance Engine",
    tag: "SYS-001",
    year: "2023",
    tagline: "1M+ financial transactions a day, 40% faster",
    description:
      "Built and optimized high-throughput compliance systems processing 1M+ financial transactions daily. Engineered caching layers and profiled data pipelines to cut system load times by 40%, then redesigned complex incident-management workflows and data models to halve issue-resolution time. Migrated legacy codebases to modern frameworks for long-term maintainability.",
    stack: ["Backend", "Caching", "Data Pipelines", "SQL"],
    accentColor: "rgb(255, 190, 95)",
    signalType: "harmonic",
    metrics: [
      { value: "1M+", label: "Txns / Day" },
      { value: "40%", label: "Faster Load" },
      { value: "2x", label: "Resolution" },
    ],
  },
  {
    name: "Avianca — Airline Analytics Tooling",
    tag: "DAT-001",
    year: "2022",
    tagline: "Operational tooling deployed across an entire airline",
    description:
      "Developed data-intensive analytics and operational tools deployed airline-wide. Standardized and refactored core data pipelines to improve critical reporting accuracy by 30%, and built internal tooling adopted by 400+ users across operations and logistics. Introduced unit testing and automated QA practices that raised release stability.",
    stack: ["Python", "Data Pipelines", "Analytics", "QA"],
    accentColor: "rgb(240, 100, 110)",
    signalType: "sawtooth",
    metrics: [
      { value: "400+", label: "Users" },
      { value: "30%", label: "Accuracy" },
      { value: "Airline", label: "Wide" },
    ],
  },
];
