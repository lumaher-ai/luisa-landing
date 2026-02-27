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
  link: string;
  linkLabel: string;
}

export const PROJECTS: Project[] = [
  {
    name: "Project Alpha",
    tag: "PLT-001",
    year: "2026",
    tagline: "Design methodology, trained into an AI",
    description:
      "A design methodology where every site gets a signature moment no one has shipped before. 3D craft, full-stack thinking, and an AI agent trained as a design persona. From philosophy to production code.",
    stack: ["Next.js", "React 19", "Three.js", "Tailwind v4"],
    accentColor: "rgb(232, 168, 94)",
    signalType: "complex",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Beta",
    tag: "AGT-001",
    year: "2026",
    tagline: "Your personal Agent, governed and scheduled",
    description:
      "Schedule AI coding agents with CRON tasks, approval workflows, and notification channels. You're already paying for Claude. This makes it work while you sleep.",
    stack: ["Python", "FastAPI", "React", "Claude Code"],
    accentColor: "rgb(130, 230, 170)",
    signalType: "square",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Gamma",
    tag: "RAG-001",
    year: "2024",
    tagline: "RAG without the cloud tax",
    description:
      "A CLI that turns your documents into a searchable AI, entirely on your machine. No cloud. No API keys. No one else reading your data.",
    stack: ["Go", "Ollama", "Vector DB", "Semantic Search"],
    accentColor: "rgb(100, 180, 255)",
    signalType: "sawtooth",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Delta",
    tag: "MEM-001",
    year: "2024",
    tagline: "Total recall. Totally private.",
    description:
      "Captures, indexes, and recalls everything you do on your machine. Screenshot OCR, audio transcription, vector search. Every byte stays yours.",
    stack: ["Python", "PyTorch", "SQLite", "OCR"],
    accentColor: "rgb(180, 130, 255)",
    signalType: "harmonic",
    link: "https://github.com",
    linkLabel: "github.com",
  },
  {
    name: "Project Epsilon",
    tag: "RAG-002",
    year: "2024",
    tagline: "Portable intelligence",
    description:
      "RAG on mobile and desktop using local NLP for embeddings and local LLMs for generation. AI that actually runs in your pocket, not in a datacenter.",
    stack: ["Swift", "CoreML", "Embeddings", "Local LLM"],
    accentColor: "rgb(200, 200, 220)",
    signalType: "sine",
    link: "https://github.com",
    linkLabel: "github.com",
  },
];
