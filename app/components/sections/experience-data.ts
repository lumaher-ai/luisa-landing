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
    name: "Closer AI",
    location: "Bogot\u00e1",
    accentColor: "rgb(130, 230, 170)",
    metrics: [
      { value: "12x", label: "Cost Reduction" },
      { value: "20+", label: "LLM Providers" },
      { value: "<1s", label: "Avg Latency" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Sept 2025 \u2014 Present",
        description:
          "Built an AI sales agent with a multi-step agentic system using dynamic tool orchestration, long-term conversation memory, and reasoning loops. Designed a routing layer across 20+ LLM providers with intent classification, fallbacks, and adaptive model selection to balance costs, latency, and complexity. Reduced inference costs 12x.",
      },
    ],
  },
  {
    name: "MercadoLibre",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 210, 80)",
    metrics: [
      { value: "10", label: "Engineers Led" },
      { value: "800K+", label: "Users Scaled" },
      { value: "99.9%", label: "Availability" },
    ],
    roles: [
      {
        title: "Technical Lead",
        period: "May 2024 \u2014 Sept 2025",
        description:
          "Led a team of 10 engineers using Docker, Java, React, and TypeScript. Configured monitoring for system availability and performance. Helped the team navigate scaling from the first user to more than 800,000.",
      },
    ],
  },
  {
    name: "Agua",
    location: "Bogot\u00e1",
    accentColor: "rgb(200, 200, 220)",
    metrics: [
      { value: "1M+", label: "Users" },
      { value: "~$0", label: "Infra Cost" },
      { value: "2", label: "Engines Built" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Aug 2022 \u2014 May 2024",
        description:
          "Created a client-side IDE for a low-code platform. Built the FE and BE, including a graphics engine and compiler for transforming user interactions into code. This design allowed the product to scale to 1M+ users with virtually zero cost.",
      },
    ],
  },
  {
    name: "Mr. Pink",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 120, 180)",
    metrics: [
      { value: "6", label: "Engineers Led" },
      { value: "2x", label: "Dev Speed" },
      { value: "1", label: "Major Client Won" },
    ],
    roles: [
      {
        title: "Lead Developer",
        period: "Dec 2021 \u2014 Aug 2022",
        description:
          "Convinced the CTO of the agency\u2019s biggest client to hire us for their marketing department\u2019s digital transformation. Led a team of 6 engineers through the milestones while managing the execution of the backlog.",
      },
      {
        title: "Senior Developer",
        period: "Aug 2021 \u2014 Dec 2021",
        description:
          "Built web apps for clients. After identifying repetitive scaffolding tasks, built a platform for automated project scaffolding using Kubernetes \u2014 doubling the team\u2019s development speed.",
      },
    ],
  },
  {
    name: "Credibanco",
    location: "Bogot\u00e1",
    accentColor: "rgb(180, 130, 255)",
    metrics: [
      { value: "100x", label: "Dev Capacity" },
      { value: "1000s", label: "Terminals Deployed" },
      { value: "1", label: "Language Bridge" },
    ],
    roles: [
      {
        title: "Senior Web Developer",
        period: "Dec 2020 \u2014 Aug 2021",
        description:
          "Presented and developed a Python interpreter for C, allowing hundreds of collaborators to develop the company\u2019s POS devices \u2014 previously only 10 developers could work on them. Led implementation and deployment of thousands of terminals.",
      },
    ],
  },
  {
    name: "Other dev jobs",
    location: "Bogot\u00e1",
    accentColor: "rgb(100, 180, 255)",
    metrics: [
      { value: "2+", label: "Years" },
      { value: "10+", label: "Projects" },
      { value: "4", label: "Core Technologies" },
    ],
    roles: [
      {
        title: "Developer",
        period: "Oct 2018 \u2014 Dec 2020",
        description:
          "Various development roles building web applications and growing fundamentals in TypeScript, React, Node.js, and backend systems.",
      },
    ],
  },
];
