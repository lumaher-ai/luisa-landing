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
      { value: "12x", label: "Cost Savings" },
      { value: "20+", label: "AI Providers" },
      { value: "<1s", label: "Response Time" },
    ],
    roles: [
      {
        title: "CTO",
        period: "Sept 2025 \u2014 Present",
        description:
          "Architected and shipped an AI sales agent from zero, cutting inference costs 12x while maintaining sub-second response times. Built a proprietary routing layer across 20+ LLM providers that dynamically balances cost and performance \u2014 enabling enterprise-grade AI at startup economics.",
      },
    ],
  },
  {
    name: "MercadoLibre",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 210, 80)",
    metrics: [
      { value: "800K+", label: "Users Scaled" },
      { value: "99.9%", label: "Uptime" },
      { value: "10", label: "Team Size" },
    ],
    roles: [
      {
        title: "Technical Lead",
        period: "May 2024 \u2014 Sept 2025",
        description:
          "Led a 10-person engineering team through one of the most demanding scaling journeys in Latin American e-commerce \u2014 from zero to 800,000 users while sustaining 99.9% uptime. Owned delivery, architecture decisions, and team growth end-to-end.",
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
          "As CTO, designed a client-side architecture that eliminated server infrastructure costs entirely, allowing a low-code platform to scale to 1M+ users at near-zero marginal cost. Built two custom engines \u2014 a graphics engine and a compiler \u2014 to bring the product to life.",
      },
    ],
  },
  {
    name: "Mr. Pink",
    location: "Bogot\u00e1",
    accentColor: "rgb(255, 120, 180)",
    metrics: [
      { value: "2x", label: "Team Output" },
      { value: "6", label: "Engineers Led" },
      { value: "1", label: "Enterprise Won" },
    ],
    roles: [
      {
        title: "Lead Developer",
        period: "Dec 2021 \u2014 Aug 2022",
        description:
          "Landed and retained the agency\u2019s most valuable enterprise client by building direct executive trust with their CTO. Led a team of 6 engineers to deliver their digital transformation.",
      },
      {
        title: "Senior Developer",
        period: "Aug 2021 \u2014 Dec 2021",
        description:
          "Identified a development bottleneck and engineered an automated scaffolding platform that doubled the team\u2019s output velocity across all client projects.",
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
          "Removed a critical talent bottleneck by building a Python-to-C interpreter that unlocked company-wide development on POS devices \u2014 expanding the capable developer pool from 10 to hundreds. Personally led the deployment of thousands of payment terminals across the network.",
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
      { value: "4", label: "Technologies" },
    ],
    roles: [
      {
        title: "Developer",
        period: "Oct 2018 \u2014 Dec 2020",
        description:
          "Laid the technical foundation across 10+ client projects spanning web applications and full-stack development, establishing deep proficiency in the TypeScript, React, and Node.js stack that underpins all subsequent work.",
      },
    ],
  },
];
