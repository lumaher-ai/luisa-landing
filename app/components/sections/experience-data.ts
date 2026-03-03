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
          "Most enterprise AI projects fail on cost before they scale \u2014 inference budgets balloon and kill the economics. Architected and shipped an AI sales agent from zero, cutting inference costs 12x while sustaining sub-second response times. Built a proprietary routing layer across 20+ LLM providers that dynamically balances cost and performance, making enterprise-grade AI viable at startup economics.",
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
          "Scaling to 800,000 users in Latin America\u2019s most competitive e-commerce market is a failure condition waiting to happen \u2014 one wrong architecture decision loses tens of millions. Led a 10-person engineering team through that journey, from zero to 800K users, with zero SLA breaches. Owned architecture, delivery, and team growth end-to-end.",
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
      { value: "2", label: "Custom Engines" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Aug 2022 \u2014 May 2024",
        description:
          "Cloud infrastructure at scale is a budget line that can consume a startup\u2019s entire runway. As CTO, designed a client-side architecture that eliminated server infrastructure costs entirely \u2014 allowing a low-code platform to reach 1M+ users at near-zero marginal cost. Built two custom engines from scratch, a graphics engine and a compiler, to make the product technically possible.",
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
          "Won and retained the agency\u2019s highest-value enterprise account by building direct executive trust with their CTO \u2014 the kind of relationship that turns a vendor into a strategic partner. Led a team of 6 engineers to deliver their digital transformation.",
      },
      {
        title: "Senior Developer",
        period: "Aug 2021 \u2014 Dec 2021",
        description:
          "Diagnosed a delivery bottleneck across all client projects and built an automated scaffolding platform that doubled team output velocity, compressing timelines and protecting margin across the entire portfolio.",
      },
    ],
  },
  {
    name: "Credibanco",
    location: "Bogot\u00e1",
    accentColor: "rgb(180, 130, 255)",
    metrics: [
      { value: "100x", label: "Dev Capacity" },
      { value: "1000s", label: "Terminals" },
      { value: "10\u2192100s", label: "Devs Unlocked" },
    ],
    roles: [
      {
        title: "Senior Web Developer",
        period: "Dec 2020 \u2014 Aug 2021",
        description:
          "A payment network running on proprietary POS hardware creates a talent crisis: only developers who know C can ship to it, capping innovation at a handful of people. Removed that constraint entirely by building a Python-to-C interpreter that expanded the capable developer pool from 10 to hundreds overnight. Then personally led the deployment of thousands of payment terminals across the network.",
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
          "Built the technical foundation \u2014 TypeScript, React, Node.js \u2014 across 10+ client projects, developing the full-stack fluency that would later enable solo architecture decisions at companies scaling to millions of users.",
      },
    ],
  },
];
