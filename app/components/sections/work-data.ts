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
    tagline: "AI sales agent that closes pipeline while you sleep",
    description:
      "Built the core intelligence layer of an AI sales agent that handles full conversations autonomously \u2014 reasoning through objections, maintaining context across sessions, and routing to the optimal model per turn. Reduced AI infrastructure costs by 12x while sustaining sub-second response times.",
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
    tagline: "Hard spending limits across every AI provider \u2014 zero infrastructure",
    description:
      "Built a TypeScript library that enforces hard spending and usage caps across multiple AI providers \u2014 preventing budget overruns before they happen. Supports automatic failover to backup models when limits are hit and recycles unused capacity in real time. Drop-in installation, no servers required. Currently in production at Closer AI and open-sourced.",
    stack: ["TypeScript", "Node.js", "Redis", "LLM APIs"],
    accentColor: "rgb(100, 180, 255)",
    signalType: "sawtooth",
    metrics: [
      { value: "0", label: "Extra Infra" },
      { value: "$0", label: "Overages" },
      { value: "Multi", label: "Provider" },
    ],
    link: "https://github.com/daviddominguezh/llm-rate-limiter",
    linkLabel: "github.com/daviddominguezh/llm-rate-limiter",
  },
  {
    name: "LLM Markdown WhatsApp",
    tag: "LIB-002",
    year: "2025",
    tagline: "Ship AI on WhatsApp in one function call",
    description:
      "Built a zero-configuration TypeScript library that converts raw AI output into properly formatted WhatsApp messages \u2014 handling lists, product cards, links, and Spanish punctuation automatically. One function call replaces days of custom formatting work per integration.",
    stack: ["TypeScript", "Node.js", "NLP", "WhatsApp"],
    accentColor: "rgb(232, 168, 94)",
    signalType: "harmonic",
    metrics: [
      { value: "1", label: "Function Call" },
      { value: "0", label: "Config" },
      { value: "2-3d", label: "Per Integration" },
    ],
    link: "https://github.com/daviddominguezh/llm-markdown-whatsapp",
    linkLabel: "github.com/daviddominguezh/llm-markdown-whatsapp",
  },
  {
    name: "LLM Graph Builder",
    tag: "LIB-003",
    year: "2025",
    tagline: "Persistent, relational memory for AI agents that make real decisions",
    description:
      "Built a TypeScript library that gives AI agents a structured knowledge graph memory \u2014 capturing how entities relate to each other across sessions, not just isolated facts. Addresses the memory problem that limits most agents to single-session tasks. Powers Closer AI\u2019s conversation memory in production.",
    stack: ["TypeScript", "Node.js", "Graph DB", "Agents"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "sine",
    metrics: [
      { value: "Typed", label: "Schema" },
      { value: "0", label: "Setup" },
      { value: "Live", label: "Powers Closer AI" },
    ],
    link: "https://github.com/daviddominguezh/llm-graph-builder",
    linkLabel: "github.com/daviddominguezh/llm-graph-builder",
  },
  {
    name: "Agua",
    tag: "PLT-001",
    year: "2023",
    tagline: "A low-code IDE that hit 1M users on near-zero infrastructure spend",
    description:
      "Architected the client-side IDE for a low-code platform from the ground up \u2014 including the 2D rendering engine and the transpiler that converted user designs into production code. The fully client-side architecture kept infrastructure costs near zero as the product grew past 1 million users.",
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
    tagline: "A new product inside MercadoLibre \u2014 from first user to 800,000",
    description:
      "Led a 10-person engineering team building a new product within MercadoLibre\u2019s ecosystem through its full growth phase \u2014 from first user to 800K. Responsible for core architecture decisions under real growth pressure: observability, scaling strategy, reliability thresholds. Maintained zero critical incidents across 16 months of 800x growth.",
    stack: ["Java", "React", "TypeScript", "Docker"],
    accentColor: "rgb(255, 210, 80)",
    signalType: "complex",
    metrics: [
      { value: "800K", label: "Users" },
      { value: "10", label: "Engineers" },
      { value: "0", label: "Critical Incidents" },
    ],
    link: "https://www.mercadolibre.com.mx/l/afiliados",
    linkLabel: "mercadolibre.com.mx/l/afiliados",
  },
  {
    name: "Credibanco POS",
    tag: "SYS-001",
    year: "2021",
    tagline: "Turned a 10-person bottleneck into a platform hundreds could build on",
    description:
      "Built a Python-to-C transpiler that opened POS terminal development from a small C-specialist team to the company\u2019s broader developer base. Deployed across thousands of payment terminals nationwide. The transpiler removed a structural hiring and knowledge bottleneck that had been limiting the company\u2019s hardware roadmap for years.",
    stack: ["Python", "C", "Embedded", "Jenkins"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "harmonic",
    metrics: [
      { value: "10x", label: "Dev Pool" },
      { value: "1000s", label: "Terminals" },
      { value: "Nationwide", label: "Deploy" },
    ],
  },
  {
    name: "K8s Scaffolding Platform",
    tag: "DEV-001",
    year: "2021",
    tagline: "Eliminated the hidden tax every engineer paid on every new project",
    description:
      "Identified that engineers were rebuilding identical scaffolding from scratch on every client engagement. Designed and built an automated Kubernetes-based platform that cut setup time in half and standardized delivery quality across the full engineering team.",
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
