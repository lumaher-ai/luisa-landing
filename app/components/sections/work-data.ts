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
    name: "Closer AI",
    tag: "AGT-001",
    year: "2025",
    tagline: "The AI sales agent that closes while you sleep",
    description:
      "Built the core intelligence layer of an AI sales agent that handles full conversations autonomously \u2014 reasoning through objections, remembering context across sessions, and routing to the best AI model in real time. Cut AI infrastructure costs by 12x without sacrificing response speed.",
    stack: ["TypeScript", "Node.js", "LLM Routing", "Semantic Search"],
    accentColor: "rgb(130, 230, 170)",
    signalType: "complex",
    metrics: [
      { value: "12x", label: "Cost Cut" },
      { value: "20+", label: "AI Models" },
      { value: "<1s", label: "Response" },
    ],
    link: "https://usecloser.ai",
    linkLabel: "usecloser.ai",
  },
  {
    name: "LLM Rate Limiter",
    tag: "LIB-001",
    year: "2025",
    tagline: "Stop paying for AI overages \u2014 automatically",
    description:
      "Built a TypeScript library that enforces hard spending and usage limits across multiple AI providers \u2014 no extra servers, no infrastructure changes, just drop it in. Supports automatic failover to backup models when limits are hit, and gives back unused capacity in real time so budgets stretch further.",
    stack: ["TypeScript", "Node.js", "Redis", "LLM APIs"],
    accentColor: "rgb(100, 180, 255)",
    signalType: "sawtooth",
    metrics: [
      { value: "0", label: "Extra Servers" },
      { value: "100%", label: "Drop-in" },
      { value: "Multi", label: "Provider" },
    ],
    link: "https://github.com/daviddominguezh/llm-rate-limiter",
    linkLabel: "github.com/daviddominguezh/llm-rate-limiter",
  },
  {
    name: "LLM Markdown WhatsApp",
    tag: "LIB-002",
    year: "2025",
    tagline: "Send AI responses to WhatsApp without breaking them",
    description:
      "Built a zero-configuration TypeScript library that takes raw AI output and formats it perfectly for WhatsApp \u2014 preserving lists, product cards, links, and Spanish punctuation automatically. One function call replaces hours of custom formatting work.",
    stack: ["TypeScript", "Node.js", "NLP", "WhatsApp"],
    accentColor: "rgb(232, 168, 94)",
    signalType: "harmonic",
    metrics: [
      { value: "17", label: "GitHub Stars" },
      { value: "0", label: "Setup" },
      { value: "1", label: "Function" },
    ],
    link: "https://github.com/daviddominguezh/llm-markdown-whatsapp",
    linkLabel: "github.com/daviddominguezh/llm-markdown-whatsapp",
  },
  {
    name: "LLM Graph Builder",
    tag: "LIB-003",
    year: "2025",
    tagline: "Give your AI agent a memory that reasons",
    description:
      "Built a TypeScript library that lets AI agents build and navigate knowledge graphs \u2014 understanding how entities relate to each other, not just storing isolated facts. Designed as the memory foundation for long-running agents that need to make decisions based on connected context.",
    stack: ["TypeScript", "Node.js", "Graph DB", "Agents"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "sine",
    metrics: [
      { value: "Typed", label: "Schema" },
      { value: "0", label: "Setup" },
      { value: "Graph", label: "Memory" },
    ],
    link: "https://github.com/daviddominguezh/llm-graph-builder",
    linkLabel: "github.com/daviddominguezh/llm-graph-builder",
  },
  {
    name: "Agua",
    tag: "PLT-001",
    year: "2023",
    tagline: "A low-code IDE that reached 1M+ users for nearly nothing",
    description:
      "Architected and built the client-side IDE for a low-code platform, including the graphics engine and compiler that translated user actions into real code. The architecture was so efficient that the product scaled to over 1 million users with near-zero infrastructure spend.",
    stack: ["React", "TypeScript", "Graphics Engine", "Compiler"],
    accentColor: "rgb(200, 200, 220)",
    signalType: "square",
    metrics: [
      { value: "1M+", label: "Users" },
      { value: "~$0", label: "Infra" },
      { value: "0", label: "Servers" },
    ],
  },
  {
    name: "MercadoLibre",
    tag: "SCL-001",
    year: "2024",
    tagline: "From zero to 800,000 users without breaking anything",
    description:
      "Led a 10-person engineering team through the most critical growth phase of a product \u2014 from its first user to 800,000. Set up full observability across all systems and navigated every architectural decision required to keep availability and performance solid throughout.",
    stack: ["Java", "React", "TypeScript", "Docker"],
    accentColor: "rgb(255, 210, 80)",
    signalType: "complex",
    metrics: [
      { value: "800K", label: "Users" },
      { value: "10", label: "Engineers" },
      { value: "0", label: "Outages" },
    ],
    link: "https://www.mercadolibre.com.mx/l/afiliados",
    linkLabel: "mercadolibre.com.mx/l/afiliados",
  },
  {
    name: "Credibanco POS",
    tag: "SYS-001",
    year: "2021",
    tagline: "Unlocked a closed platform for hundreds of developers",
    description:
      "Designed and led the build of a Python-to-C interpreter that opened POS terminal development from 10 specialists to hundreds of contributors overnight. Deployed across thousands of payment terminals nationwide, dramatically accelerating the company\u2019s hardware roadmap.",
    stack: ["Python", "C", "Embedded", "Jenkins"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "harmonic",
    metrics: [
      { value: "10x", label: "More Devs" },
      { value: "1000s", label: "Terminals" },
      { value: "Nationwide", label: "Deploy" },
    ],
  },
  {
    name: "K8s Scaffolding Platform",
    tag: "DEV-001",
    year: "2021",
    tagline: "Cut project startup time in half across the entire team",
    description:
      "Identified that engineers were rebuilding the same scaffolding from scratch on every client project. Designed and built an automated Kubernetes-based platform that eliminated that work entirely \u2014 halving setup time and standardizing delivery quality across the engineering team.",
    stack: ["Kubernetes", "Docker", "Node.js", "CI/CD"],
    accentColor: "rgb(130, 210, 180)",
    signalType: "sawtooth",
    metrics: [
      { value: "2x", label: "Faster Setup" },
      { value: "0", label: "Manual Steps" },
      { value: "100%", label: "Team Adoption" },
    ],
  },
];
