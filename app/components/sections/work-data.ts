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
    tagline: "AI sales agent with reasoning and memory",
    description:
      "Multi-step agentic system with dynamic tool orchestration, long-term conversation memory, and reasoning loops. Routing layer across 20+ LLM providers with intent classification, fallbacks, and adaptive model selection. Reduced inference costs 12x.",
    stack: ["TypeScript", "Node.js", "LLM Routing", "Semantic Search"],
    accentColor: "rgb(130, 230, 170)",
    signalType: "complex",
    metrics: [
      { value: "12x", label: "Cost Reduction" },
      { value: "20+", label: "Providers Routed" },
      { value: "<1s", label: "Avg Latency" },
    ],
    link: "https://usecloser.ai",
    linkLabel: "usecloser.ai",
  },
  {
    name: "LLM Rate Limiter",
    tag: "LIB-001",
    year: "2025",
    tagline: "Rate limiting for LLM APIs at any scale",
    description:
      "In-process TypeScript library that enforces RPM, TPM, RPD, TPD, concurrency, and memory limits across multiple LLM providers. Supports multi-model fallback, actual usage adjustment (refunds unused capacity mid-window), and distributed coordination via Redis — no sidecars, no proxies.",
    stack: ["TypeScript", "Node.js", "Redis", "LLM APIs"],
    accentColor: "rgb(100, 180, 255)",
    signalType: "sawtooth",
    metrics: [
      { value: "6", label: "Limit Types" },
      { value: "0", label: "Proxies Needed" },
      { value: "Redis", label: "Distributed" },
    ],
    link: "https://github.com/daviddominguezh/llm-rate-limiter",
    linkLabel: "github.com/daviddominguezh/llm-rate-limiter",
  },
  {
    name: "LLM Markdown WhatsApp",
    tag: "LIB-002",
    year: "2025",
    tagline: "Splits LLM markdown into WhatsApp-ready chunks",
    description:
      "Zero-config TypeScript library that intelligently splits LLM-generated markdown for WhatsApp delivery. Preserves list structure, detects product cards, protects URLs and emails from mid-split, handles Spanish punctuation. One function call — no setup required. 17 stars.",
    stack: ["TypeScript", "Node.js", "NLP", "WhatsApp"],
    accentColor: "rgb(232, 168, 94)",
    signalType: "harmonic",
    metrics: [
      { value: "17", label: "GitHub Stars" },
      { value: "0", label: "Config Lines" },
      { value: "1", label: "Function Call" },
    ],
    link: "https://github.com/daviddominguezh/llm-markdown-whatsapp",
    linkLabel: "github.com/daviddominguezh/llm-markdown-whatsapp",
  },
  {
    name: "LLM Graph Builder",
    tag: "LIB-003",
    year: "2025",
    tagline: "Build knowledge graphs from LLM outputs",
    description:
      "TypeScript library for constructing and traversing knowledge graphs from LLM-generated data. Enables structured memory and reasoning over connected entities — a foundation for long-running agents that need to understand relationships, not just facts.",
    stack: ["TypeScript", "Node.js", "Graph DB", "Agents"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "sine",
    metrics: [
      { value: "N:N", label: "Entity Relations" },
      { value: "Typed", label: "Schema" },
      { value: "0", label: "Setup Required" },
    ],
    link: "https://github.com/daviddominguezh/llm-graph-builder",
    linkLabel: "github.com/daviddominguezh/llm-graph-builder",
  },
  {
    name: "Agua",
    tag: "PLT-001",
    year: "2023",
    tagline: "Low-code IDE that scaled to 1M+ users",
    description:
      "Client-side IDE for a low-code platform. Built a graphics engine and compiler that transforms user interactions into code. Architecture allowed the product to reach 1M+ users with virtually zero infrastructure cost.",
    stack: ["React", "TypeScript", "Graphics Engine", "Compiler"],
    accentColor: "rgb(200, 200, 220)",
    signalType: "square",
    metrics: [
      { value: "1M+", label: "Users" },
      { value: "~$0", label: "Infra Cost" },
      { value: "1", label: "Client-Side IDE" },
    ],
  },
  {
    name: "MercadoLibre",
    tag: "SCL-001",
    year: "2024",
    tagline: "0 to 800,000 users",
    description:
      "Led a team of 10 engineers through a full-scale growth phase. Configured observability and monitoring across all systems. Navigated the architecture from first user to 800K while keeping availability and performance metrics in the green.",
    stack: ["Java", "React", "TypeScript", "Docker"],
    accentColor: "rgb(255, 210, 80)",
    signalType: "complex",
    metrics: [
      { value: "10", label: "Engineers Led" },
      { value: "800K+", label: "Users Scaled" },
      { value: "24/7", label: "Monitoring" },
    ],
    link: "https://www.mercadolibre.com.mx/l/afiliados",
    linkLabel: "mercadolibre.com.mx/l/afiliados",
  },
  {
    name: "Credibanco POS",
    tag: "SYS-001",
    year: "2021",
    tagline: "Python interpreter for C on payment terminals",
    description:
      "Designed and led a Python interpreter for C that allowed hundreds of collaborators to develop POS devices — previously only 10 developers could. Led implementation and deployment across thousands of terminals nationwide.",
    stack: ["Python", "C", "Embedded", "Jenkins"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "harmonic",
    metrics: [
      { value: "100x", label: "Dev Capacity" },
      { value: "1000s", label: "Terminals" },
      { value: "Py\u2192C", label: "Bridge" },
    ],
  },
  {
    name: "K8s Scaffolding Platform",
    tag: "DEV-001",
    year: "2021",
    tagline: "Automated scaffolding that doubled dev speed",
    description:
      "Identified repetitive scaffolding patterns across client projects at Mr. Pink. Built an automated platform using Kubernetes that cut project setup time in half and standardised delivery across the whole engineering team.",
    stack: ["Kubernetes", "Docker", "Node.js", "CI/CD"],
    accentColor: "rgb(130, 210, 180)",
    signalType: "sawtooth",
    metrics: [
      { value: "2x", label: "Dev Velocity" },
      { value: "0", label: "Manual Steps" },
      { value: "K8s", label: "Powered" },
    ],
  },
];
