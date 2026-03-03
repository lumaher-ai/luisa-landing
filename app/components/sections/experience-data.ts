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
      { value: "12x", label: "Inference Cut" },
      { value: "20+", label: "LLM Providers" },
      { value: "<1s", label: "Latency" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Sept 2025 \u2014 Present",
        description:
          "Most AI projects fail on cost before they scale. Architected and shipped an AI sales agent from zero, reducing per-conversation cost from $0.25 to $0.02 (12x) while sustaining sub-second response times. Built a routing layer across 20+ LLM providers that dynamically balances cost and quality per conversation turn. Own hiring, technical budget, product roadmap, and report directly to investors.",
      },
    ],
  },
  {
    name: "MercadoLibre",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 210, 80)",
    metrics: [
      { value: "800K+", label: "Users Scaled" },
      { value: "99.9%", label: "Uptime Held" },
      { value: "$0", label: "SLA Penalties" },
    ],
    roles: [
      {
        title: "Technical Lead",
        period: "May 2024 \u2014 Sept 2025",
        description:
          "Led a 10-person engineering team that built and scaled the Affiliates program within MercadoLibre\u2019s ecosystem from first user to 800K+, with zero SLA breaches across 16 months. The program grew to contribute 1% of MercadoLibre\u2019s global revenue. Responsible for core architecture decisions, sprint delivery, and team growth.",
      },
    ],
  },
  {
    name: "Agua",
    location: "Bogot\u00e1",
    accentColor: "rgb(200, 200, 220)",
    metrics: [
      { value: "~$0", label: "Infra Cost" },
      { value: "2", label: "Custom Engines" },
      { value: "100%", label: "Client-Side" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Aug 2022 \u2014 May 2024",
        description:
          "As CTO, designed a fully client-side architecture for a low-code platform \u2014 keeping infrastructure costs near zero at scale. Built two custom engines: a 2D rendering layer for the visual editor and a transpiler that converted user designs into production code. Owned hiring, technical budget, product roadmap, and reported directly to investors.",
      },
    ],
  },
  {
    name: "Mr. Pink",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 120, 180)",
    metrics: [
      { value: "2x", label: "Output Velocity" },
      { value: "6", label: "Engineers Led" },
      { value: "1", label: "Enterprise Retained" },
    ],
    roles: [
      {
        title: "Lead Developer",
        period: "Dec 2021 \u2014 Aug 2022",
        description:
          "Served as the primary technical lead for the agency\u2019s largest enterprise account, building direct trust with their CTO. Led a team of 6 engineers delivering their core platform rebuild.",
      },
      {
        title: "Senior Developer",
        period: "Aug 2021 \u2014 Dec 2021",
        description:
          "Diagnosed a delivery bottleneck across client projects and built an automated scaffolding platform that cut project setup time in half, compressing timelines across the full portfolio.",
      },
    ],
  },
  {
    name: "Credibanco",
    location: "Bogot\u00e1",
    accentColor: "rgb(180, 130, 255)",
    metrics: [
      { value: "10x", label: "Dev Pool" },
      { value: "1000s", label: "Terminals" },
      { value: "C\u2192Python", label: "Stack Opened" },
    ],
    roles: [
      {
        title: "Senior Web Developer",
        period: "Dec 2020 \u2014 Aug 2021",
        description:
          "Credibanco\u2019s proprietary POS hardware required C \u2014 capping terminal development to a small specialist team. Built a Python-to-C transpiler that opened POS development to the company\u2019s broader Python developer base. Then led the deployment rollout across thousands of payment terminals nationwide.",
      },
    ],
  },
  {
    name: "Other dev jobs",
    location: "Bogot\u00e1",
    accentColor: "rgb(100, 180, 255)",
    metrics: [
      { value: "10+", label: "Projects" },
      { value: "2+", label: "Years" },
      { value: "3", label: "Core Stack" },
    ],
    roles: [
      {
        title: "Developer",
        period: "Oct 2018 \u2014 Dec 2020",
        description:
          "Built production applications in TypeScript, React, and Node.js across 10+ client projects \u2014 from MVPs to full-stack platforms \u2014 developing the full-stack depth that informed later architecture work at scale.",
      },
    ],
  },
];
