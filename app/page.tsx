"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  TrendingUp,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
  Calculator,
  Bot,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const cityDataChart = [
  { name: "Bengaluru", units: 1080 },
  { name: "Hyderabad", units: 515 },
  { name: "Delhi-NCR", units: 490 },
  { name: "Pune", units: 400 },
  { name: "Chennai", units: 355 },
  { name: "Mumbai", units: 340 },
  { name: "Tier 2/3", units: 220 },
];

const sectorDataChart = [
  { name: "Software & Tech", value: 42, color: "#f59e0b" },
  { name: "Industrial & ER&D", value: 19, color: "#a3a3a3" },
  { name: "BFSI", value: 16, color: "#71717a" },
  { name: "Healthcare", value: 11, color: "#52525b" },
  { name: "Retail & CPG", value: 8, color: "#3f3f46" },
  { name: "Others", value: 4, color: "#27272a" },
];

const METRICS = [
  {
    label: "Installed GCCs",
    value: "2,117",
    sub: "Across 3,728 physical units",
    icon: Building2,
    color: "var(--accent)",
  },
  {
    label: "Annual Market Value",
    value: "$98.4 B",
    sub: "FY2026 economic output",
    icon: DollarSign,
    color: "var(--green)",
  },
  {
    label: "Total Talent Base",
    value: "2.36 M",
    sub: "43% of India's tech base",
    icon: Users,
    color: "var(--accent)",
  },
  {
    label: "Grade A Absorption",
    value: "38–41%",
    sub: "Over 31 M sq. ft. absorbed",
    icon: TrendingUp,
    color: "var(--green)",
  },
];

const STEPS = [
  {
    step: "01",
    href: "/explorer",
    title: "Discover Peer Footprints",
    desc: "Filter 2,117 GCCs by sector, city, and maturity. See where Fortune 500 leaders concentrate their engineering operations.",
    color: "var(--accent)",
  },
  {
    step: "02",
    href: "/calculator",
    title: "Model Location TCO",
    desc: "Simulate fully loaded 1-year budgets across 6 cities with team size sliders, CRE rates, and state subsidy deductions.",
    color: "var(--accent)",
  },
  {
    step: "03",
    href: "/policies",
    title: "Unlock State Grants",
    desc: "Navigate TN 30% payroll subsidy, Karnataka intern stipends, and Gujarat GIFT City 10-year 100% tax holiday.",
    color: "var(--accent)",
  },
  {
    step: "04",
    href: "/advisor",
    title: "Generate AI Blueprint",
    desc: "Board-ready 24-week execution roadmap covering DEMPE tax rules, BOT risk traps, and hiring velocity.",
    color: "var(--accent)",
  },
];

const PAIN_POINTS = [
  {
    num: "01",
    title: "No Centralized GCC Registry",
    desc: "Indian corporate law classifies GCCs as generic Private Limited entities (NIC 620). 400+ mid-market GCCs operate without public record.",
  },
  {
    num: "02",
    title: "Opaque Service Provider Pricing",
    desc: "Turnkey BOT models routinely bundle 15–25% hidden salary spreads and $150K–$500K exit penalty traps without transparent reviews.",
  },
  {
    num: "03",
    title: "60–90 Day Notice Dropouts",
    desc: "Candidate offer shopping leads to 30–50% Day-1 drop-off rates across Bengaluru and Hyderabad without real-time compensation grids.",
  },
  {
    num: "04",
    title: "Scattered State Subsidies",
    desc: "Karnataka (50% intern stipend), Tamil Nadu (30% payroll), and Gujarat GIFT City (10-yr tax holiday) are buried across bureaucratic gazettes.",
  },
];

export default function HomePage() {
  const [quickSize, setQuickSize] = useState("100");
  const [quickDomain, setQuickDomain] = useState("AI & Deep Tech");

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Hero Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              India's $98.4B GCC Ecosystem Intelligence Platform
            </div>

            <h1
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl lg:text-[3.25rem]"
              style={{ color: "var(--text-primary)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
            >
              The Single Source of Truth<br />
              for India's{" "}
              <span style={{ color: "var(--accent)" }}>2,117+ GCCs</span>
            </h1>

            <p
              className="mt-4 text-[14px] sm:text-[15px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Eliminating information asymmetry across India entry, micro-market benchmarking, state payroll
              subsidies, and compensation telemetry — with live LLM advisory reasoning.
            </p>

            {/* Quick Scenario Bar */}
            <div
              className="mt-6 rounded-lg p-4 sm:p-5"
              style={{
                backgroundColor: "var(--surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--text-tertiary)" }}
              >
                Quick Scenario Builder
              </p>
              <div className="flex flex-col sm:flex-row items-end gap-3">
                <div className="flex-1 w-full">
                  <label
                    className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Target Team
                  </label>
                  <select
                    value={quickSize}
                    onChange={(e) => setQuickSize(e.target.value)}
                    suppressHydrationWarning
                    className="w-full rounded-md px-3 py-2 text-[12px] font-medium outline-none cursor-pointer transition"
                    style={{
                      backgroundColor: "var(--surface-2)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="50">50 FTEs — Initial Pod</option>
                    <option value="100">100 FTEs — Core Center</option>
                    <option value="250">250 FTEs — Scale Hub</option>
                    <option value="500">500 FTEs — Mega Campus</option>
                  </select>
                </div>
                <div className="flex-1 w-full">
                  <label
                    className="block text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Core Mandate
                  </label>
                  <select
                    value={quickDomain}
                    onChange={(e) => setQuickDomain(e.target.value)}
                    suppressHydrationWarning
                    className="w-full rounded-md px-3 py-2 text-[12px] font-medium outline-none cursor-pointer transition"
                    style={{
                      backgroundColor: "var(--surface-2)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <option value="AI & Deep Tech">AI & Deep Tech R&D</option>
                    <option value="Enterprise SaaS">Cloud & Enterprise SaaS</option>
                    <option value="BFSI Quant">BFSI Trading & FinTech</option>
                    <option value="Auto ER&D">Automotive ER&D</option>
                  </select>
                </div>
                <Link
                  href="/calculator"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-md px-4 py-2 text-[12px] font-bold transition shrink-0"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#09090b",
                  }}
                >
                  <Calculator className="h-3.5 w-3.5" />
                  Calculate TCO
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Ecosystem Snapshot Terminal */}
          <div className="lg:col-span-5">
            <div
              className="rounded-lg p-5"
              style={{
                backgroundColor: "var(--surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="flex items-center justify-between pb-3.5"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                    FY2026 Ground Truth
                  </span>
                </div>
                <span className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
                  Verified NASSCOM · Zinnov
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div
                  className="rounded-md p-3 flex items-center justify-between"
                  style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold block" style={{ color: "var(--text-tertiary)" }}>
                      Annual Cost Advantage vs US / UK
                    </span>
                    <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>
                      68% – 74% Fully Loaded TCO Arbitrage
                    </span>
                  </div>
                  <span className="stat-num text-sm font-black" style={{ color: "var(--green)" }}>
                    -71%
                  </span>
                </div>

                <div
                  className="rounded-md p-3 flex items-center justify-between"
                  style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold block" style={{ color: "var(--text-tertiary)" }}>
                      Top Destination City
                    </span>
                    <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>
                      Bengaluru · 1,080 Active GCCs
                    </span>
                  </div>
                  <span className="stat-num text-sm font-black" style={{ color: "var(--accent)" }}>
                    29% Share
                  </span>
                </div>

                <div
                  className="rounded-md p-3 flex items-center justify-between"
                  style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold block" style={{ color: "var(--text-tertiary)" }}>
                      Highest State Payroll Subsidy
                    </span>
                    <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>
                      Tamil Nadu · 30% Escalating Payroll Grant
                    </span>
                  </div>
                  <span className="stat-num text-sm font-black" style={{ color: "var(--accent)" }}>
                    30% Yr 1
                  </span>
                </div>

                <div
                  className="rounded-md p-3 flex items-center justify-between"
                  style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div>
                    <span className="text-[10px] uppercase font-semibold block" style={{ color: "var(--text-tertiary)" }}>
                      AI Setup Inference Engine
                    </span>
                    <span className="text-[12.5px] font-bold" style={{ color: "var(--text-primary)" }}>
                      Groq Llama &amp; Gemini 2.0 Flash
                    </span>
                  </div>
                  <Link
                    href="/advisor"
                    className="flex items-center gap-1 text-[11px] font-bold transition"
                    style={{ color: "var(--accent)" }}
                  >
                    <span>Launch</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Key Metrics Strip ── */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="rounded-lg p-4"
                style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                    {m.label}
                  </span>
                  <Icon className="h-3.5 w-3.5" style={{ color: m.color }} />
                </div>
                <div className="mt-3 stat-num text-2xl font-black" style={{ color: m.color }}>
                  {m.value}
                </div>
                <p className="mt-1 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  {m.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── Charts Row ── */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Bar chart */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="flex items-center justify-between pb-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div>
                <h3 className="text-[13px] font-bold">Geographic Concentration</h3>
                <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  Installed GCC units across top hubs
                </p>
              </div>
              <MapPin className="h-4 w-4" style={{ color: "var(--text-tertiary)" }} />
            </div>

            <div className="mt-5 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityDataChart} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#3f3f46",
                      borderRadius: "6px",
                      fontSize: "11px",
                      color: "#fafafa",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="units" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-[11px] text-center" style={{ color: "var(--text-tertiary)" }}>
              Bengaluru leads with 29% share · Rapid multi-city growth in Hyderabad and Pune
            </p>
          </div>

          {/* Pie chart */}
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="flex items-center justify-between pb-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <div>
                <h3 className="text-[13px] font-bold">Sector Distribution</h3>
                <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                  Share of active GCC operations by industry
                </p>
              </div>
              <Briefcase className="h-4 w-4" style={{ color: "var(--text-tertiary)" }} />
            </div>

            <div className="mt-4 flex flex-col items-center sm:flex-row sm:items-center">
              <div className="h-48 w-48 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sectorDataChart}
                      innerRadius={45}
                      outerRadius={72}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {sectorDataChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        borderColor: "#3f3f46",
                        borderRadius: "6px",
                        fontSize: "11px",
                        color: "#fafafa",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-[11px] sm:mt-0 sm:ml-6">
                {sectorDataChart.map((sec) => (
                  <div key={sec.name} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: sec.color }} />
                    <span style={{ color: "var(--text-secondary)" }}>{sec.name}</span>
                    <span className="stat-num ml-auto font-mono text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                      {sec.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-[11px] text-center" style={{ color: "var(--text-tertiary)" }}>
              Tech & Software leads at 42% · Engineering R&D expanding at 1.3× ecosystem velocity
            </p>
          </div>
        </div>

        {/* ── 4-Step Pipeline ── */}
        <div className="mt-16">
          <div className="mb-8">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--accent)" }}
            >
              End-to-End Decision Pipeline
            </p>
            <h2
              className="mt-2 text-2xl font-black sm:text-3xl"
              style={{ letterSpacing: "-0.025em", color: "var(--text-primary)" }}
            >
              How Global Leaders Build in India
            </h2>
            <p className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
              Structured 4-pillar methodology from market benchmarking to operational readiness
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <Link
                key={step.step}
                href={step.href}
                className="group flex flex-col rounded-lg p-5 transition-all duration-150"
                style={{
                  backgroundColor: "var(--surface-1)",
                  border: "1px solid var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-1)";
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="stat-num text-[11px] font-black"
                    style={{ color: "var(--accent)" }}
                  >
                    {step.step}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--text-tertiary)" }}
                  />
                </div>
                <h3 className="mt-3 text-[13px] font-bold leading-snug">{step.title}</h3>
                <p className="mt-2 text-[11.5px] leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Pain Points ── */}
        <div className="mt-16">
          <div className="mb-8">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--text-tertiary)" }}
            >
              Market Friction Solved
            </p>
            <h2
              className="mt-2 text-2xl font-black sm:text-3xl"
              style={{ letterSpacing: "-0.025em", color: "var(--text-primary)" }}
            >
              Solving the 4 Critical Asymmetries
            </h2>
            <p className="mt-1 text-[12px]" style={{ color: "var(--text-secondary)" }}>
              Why enterprise leaders require a software-driven single source of truth for India entry
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PAIN_POINTS.map((pp) => (
              <div
                key={pp.num}
                className="rounded-lg p-5"
                style={{
                  backgroundColor: "var(--surface-1)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span
                  className="stat-num text-[11px] font-black"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {pp.num}
                </span>
                <h4 className="mt-3 text-[13px] font-bold leading-snug">{pp.title}</h4>
                <p className="mt-2 text-[11.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {pp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div
          className="mt-16 rounded-lg p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          style={{
            backgroundColor: "var(--surface-1)",
            border: "1px solid var(--border-muted)",
          }}
        >
          <div>
            <h3 className="text-xl font-black" style={{ letterSpacing: "-0.025em" }}>
              Ready to architect your India strategy?
            </h3>
            <p className="mt-1.5 text-[12px]" style={{ color: "var(--text-secondary)" }}>
              Our AI Setup Advisor combines verified data with Groq LLM reasoning to generate a
              board-ready 24-week execution plan.
            </p>
          </div>
          <Link
            href="/advisor"
            className="flex items-center gap-2 rounded-md px-6 py-3 text-[13px] font-bold shrink-0 transition"
            style={{ backgroundColor: "var(--accent)", color: "#09090b" }}
          >
            <Bot className="h-4 w-4" />
            Launch AI Advisor
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
