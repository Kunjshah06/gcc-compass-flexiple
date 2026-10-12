"use client";

import React, { useState } from "react";
import cityData from "@/data/cities.json";
import {
  Scale,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function CitiesComparisonPage() {
  const [cityA, setCityA] = useState("Bengaluru");
  const [cityB, setCityB] = useState("Hyderabad");

  const dataA = cityData.find((c) => c.city === cityA) || cityData[0];
  const dataB = cityData.find((c) => c.city === cityB) || cityData[1];

  const CityCard = ({ data, label, accentColor }: { data: typeof dataA; label: string; accentColor: string }) => (
    <div
      className="rounded-lg p-5"
      style={{
        backgroundColor: "var(--surface-1)",
        border: `1px solid ${accentColor === "amber" ? "rgba(245,158,11,0.3)" : "var(--border-muted)"}`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className="rounded px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: accentColor === "amber" ? "rgba(245,158,11,0.1)" : "var(--surface-3)",
              color: accentColor === "amber" ? "var(--accent)" : "var(--text-secondary)",
              border: `1px solid ${accentColor === "amber" ? "rgba(245,158,11,0.2)" : "var(--border-muted)"}`,
            }}
          >
            {label} · {data.tier === 1 ? "Tier 1 Metro" : "Tier 2 Emerging"}
          </span>
          <h2 className="mt-2.5 text-2xl font-black" style={{ letterSpacing: "-0.03em" }}>
            {data.city}
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {data.state} · MoHUA Livability Rank #{data.ease_of_living_rank}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div
            className="stat-num text-2xl font-black"
            style={{ color: accentColor === "amber" ? "var(--accent)" : "var(--text-primary)" }}
          >
            {data.gcc_units}
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            GCC units ({data.gcc_share_percent}%)
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div
        className="mt-5 grid grid-cols-2 gap-3 py-4"
        style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        {[
          {
            label: "Grade A Office Rent",
            value: `₹${data.avg_rent_min}–₹${data.avg_rent_max}`,
            sub: "/sq ft/month",
          },
          {
            label: "Tech Talent Depth",
            value: `${(data.it_workforce / 1000).toLocaleString()}k`,
            sub: "installed engineers",
          },
          {
            label: "Mid-Tech Salary (3–7y)",
            value: `₹${data.mid_salary_min / 100000}–${data.mid_salary_max / 100000} LPA`,
            sub: `Senior: ₹${data.senior_salary_min / 100000}–${data.senior_salary_max / 100000} LPA`,
          },
          {
            label: "Annual Attrition",
            value: `${data.attrition_min}–${data.attrition_max}%`,
            sub: `AI premium: +${data.ai_ml_premium_percent}%`,
          },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-md p-3"
            style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="block text-[9.5px] font-medium uppercase tracking-wider mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              {metric.label}
            </span>
            <span className="stat-num text-[13px] font-black block">{metric.value}</span>
            <span className="text-[10px] block mt-0.5" style={{ color: "var(--text-tertiary)" }}>{metric.sub}</span>
          </div>
        ))}
      </div>

      {/* Micro-markets */}
      <div className="mt-4">
        <span className="text-[9.5px] font-bold uppercase tracking-wider block mb-2" style={{ color: "var(--text-tertiary)" }}>
          Key Micro-Markets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {data.key_micro_markets.map((m) => (
            <span
              key={m}
              className="rounded px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                backgroundColor: "var(--surface-3)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div
          className="rounded-md p-3"
          style={{ backgroundColor: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}
        >
          <span
            className="font-bold flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-2"
            style={{ color: "var(--green)" }}
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Advantages
          </span>
          <ul className="space-y-1">
            {data.pros.map((p, i) => (
              <li key={i} className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                · {p}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="rounded-md p-3"
          style={{ backgroundColor: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.15)" }}
        >
          <span
            className="font-bold flex items-center gap-1.5 text-[10px] uppercase tracking-wider mb-2"
            style={{ color: "var(--red)" }}
          >
            <XCircle className="h-3.5 w-3.5" /> Friction Points
          </span>
          <ul className="space-y-1">
            {data.cons.map((c, i) => (
              <li key={i} className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                · {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
            style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <Scale className="h-3 w-3" />
            Empirical Location Benchmarking
          </div>
          <h1
            className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            City Comparator &amp; Real Estate Telemetry
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Side-by-side comparison across Grade A rents, tech talent depth, compensation bands, and attrition.
          </p>
        </div>

        {/* ── Selector Bar ── */}
        <div
          className="mt-8 flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex flex-1 items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider shrink-0" style={{ color: "var(--accent)" }}>
              City A
            </span>
            <select
              value={cityA}
              onChange={(e) => setCityA(e.target.value)}
              suppressHydrationWarning
              className="flex-1 rounded-md px-4 py-2 text-[12.5px] font-medium outline-none cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {cityData.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city} ({c.tier === 1 ? "Tier 1" : "Tier 2"})
                </option>
              ))}
            </select>
          </div>

          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black self-center"
            style={{
              backgroundColor: "var(--surface-3)",
              border: "1px solid var(--border-muted)",
              color: "var(--text-tertiary)",
            }}
          >
            VS
          </div>

          <div className="flex flex-1 items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider shrink-0" style={{ color: "var(--text-secondary)" }}>
              City B
            </span>
            <select
              value={cityB}
              onChange={(e) => setCityB(e.target.value)}
              suppressHydrationWarning
              className="flex-1 rounded-md px-4 py-2 text-[12.5px] font-medium outline-none cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {cityData.map((c) => (
                <option key={c.city} value={c.city}>
                  {c.city} ({c.tier === 1 ? "Tier 1" : "Tier 2"})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Side-by-Side Cards ── */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <CityCard data={dataA} label="City A" accentColor="amber" />
          <CityCard data={dataB} label="City B" accentColor="default" />
        </div>
      </div>
    </div>
  );
}
