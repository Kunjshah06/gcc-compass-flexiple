"use client";

import React, { useState } from "react";
import salaryData from "@/data/salaries.json";
import { Coins, TrendingUp } from "lucide-react";

const CITIES = [
  { key: "salary_blr_lpa" as const,   label: "Bengaluru", isSpecial: false },
  { key: "salary_hyd_lpa" as const,   label: "Hyderabad", isSpecial: false },
  { key: "salary_ncr_lpa" as const,   label: "Delhi-NCR", isSpecial: false },
  { key: "salary_pune_lpa" as const,  label: "Pune", isSpecial: false },
  { key: "salary_tier2_lpa" as const, label: "Tier-2 Cities", isSpecial: true },
];

export default function SalariesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(salaryData.map((s) => s.category)))];
  const filtered = salaryData.filter(
    (s) => selectedCategory === "All" || s.category === selectedCategory
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
            <Coins className="h-3 w-3" />
            Compensation Intelligence
          </div>
          <h1
            className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            GCC Salary Benchmarks &amp; Talent Density
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Verified annual compensation bands (INR Lakhs Per Annum) and GCC wage premiums over traditional IT outsourcing.
          </p>
        </div>

        {/* ── GCC Premium Alert ── */}
        <div
          className="mt-8 rounded-lg p-4 flex items-start gap-3"
          style={{
            backgroundColor: "rgba(245,158,11,0.05)",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
        >
          <TrendingUp className="h-5 w-5 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
          <div>
            <h4 className="text-[13px] font-bold">The GCC Compensation Premium (+25% to +50%)</h4>
            <p className="text-[11.5px] mt-0.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              GCCs consistently pay 25–50% above third-party IT service vendors (TCS, Infosys, Wipro) to hire
              product-grade engineers capable of full lifecycle ownership and GenAI engineering.
            </p>
          </div>
        </div>

        {/* ── Category Filter ── */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-md px-3 py-1.5 text-[11.5px] font-semibold transition"
                style={{
                  backgroundColor: isActive ? "rgba(245,158,11,0.1)" : "var(--surface-2)",
                  color: isActive ? "var(--accent)" : "var(--text-secondary)",
                  border: isActive ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-3)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-2)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Role Cards Grid ── */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.role}
              className="rounded-lg p-5 transition-all duration-150"
              style={{
                backgroundColor: "var(--surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-muted)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className="text-[9.5px] font-bold uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.category} · {item.experience}
                  </span>
                  <h3 className="text-[14px] font-bold mt-1 tracking-tight">{item.role}</h3>
                </div>
                <span
                  className="shrink-0 rounded px-2.5 py-0.5 text-[10px] font-bold"
                  style={{
                    backgroundColor: "rgba(34,197,94,0.08)",
                    color: "var(--green)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  {item.gcc_premium} Premium
                </span>
              </div>

              {/* City Salary Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CITIES.map(({ key, label, isSpecial }) => (
                  <div
                    key={key}
                    className={`rounded-md p-2.5${isSpecial ? " col-span-2 sm:col-span-2" : ""}`}
                    style={{
                      backgroundColor: "var(--surface-2)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <span className="text-[9.5px] block mb-1" style={{ color: "var(--text-tertiary)" }}>
                      {isSpecial ? "Tier-2 (Coimbatore / Kochi / Jaipur)" : label}
                    </span>
                    <span
                      className="stat-num text-[12.5px] font-black block"
                      style={{ color: isSpecial ? "var(--accent)" : "var(--text-primary)" }}
                    >
                      ₹{item[key]} LPA
                    </span>
                  </div>
                ))}
              </div>

              {/* Skills & Scarcity */}
              <div
                className="mt-4 pt-3.5"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9.5px] font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                    Talent Scarcity
                  </span>
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: "var(--red)" }}
                  >
                    {item.scarcity}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {item.key_skills.map((s) => (
                    <span
                      key={s}
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: "var(--surface-3)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
