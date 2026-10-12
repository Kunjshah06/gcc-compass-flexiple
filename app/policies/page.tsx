"use client";

import React, { useState } from "react";
import incentiveData from "@/data/incentives.json";
import {
  FileCheck2,
  Building,
  Coins,
  Zap,
  Lightbulb,
} from "lucide-react";

const PILLARS = [
  {
    key: "capital_subsidy" as const,
    label: "Capital Subsidy / R&D",
    icon: Building,
  },
  {
    key: "payroll_subsidy" as const,
    label: "Payroll & Skilling Grants",
    icon: Coins,
  },
  {
    key: "rent_support" as const,
    label: "Rental & Stamp Duty",
    icon: FileCheck2,
  },
  {
    key: "power_incentives" as const,
    label: "Power Tariff & Tax",
    icon: Zap,
  },
];

export default function StatePoliciesPage() {
  const [selectedState, setSelectedState] = useState(incentiveData[0].state);
  const active = incentiveData.find((s) => s.state === selectedState) || incentiveData[0];

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
            <FileCheck2 className="h-3 w-3" />
            State Gazettes & Policies 2024–2026
          </div>
          <h1
            className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            State GCC Incentive Navigator
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Comparative intelligence across Karnataka, Tamil Nadu, Telangana, Gujarat GIFT City, and UP policies.
          </p>
        </div>

        {/* ── State Tabs ── */}
        <div
          className="mt-8 flex flex-wrap gap-1.5 pb-4"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          {incentiveData.map((item) => {
            const isActive = selectedState === item.state;
            return (
              <button
                key={item.state}
                onClick={() => setSelectedState(item.state)}
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
                {item.state}
              </button>
            );
          })}
        </div>

        {/* ── Active State Detail ── */}
        <div
          className="mt-6 rounded-lg p-5"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          {/* State Header */}
          <div
            className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-4"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div>
              <span
                className="stat-num rounded px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: "var(--surface-3)", color: "var(--text-tertiary)", border: "1px solid var(--border-muted)" }}
              >
                Notified: {active.notified_date}
              </span>
              <h2 className="mt-2.5 text-xl font-black sm:text-2xl" style={{ letterSpacing: "-0.025em" }}>
                {active.policy_name}
              </h2>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Key Hubs: {active.key_cities.join(" · ")}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="text-[10px] block" style={{ color: "var(--text-tertiary)" }}>Single-Window Portal</span>
              <span className="text-[11.5px] font-bold" style={{ color: "var(--green)" }}>{active.single_window}</span>
            </div>
          </div>

          {/* Target & Vision */}
          <div
            className="mt-4 rounded-md p-3.5"
            style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Policy Target & Vision
            </span>
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{active.targets}</p>
          </div>

          {/* 4 Incentive Pillars */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.key}
                  className="rounded-md p-4"
                  style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--accent)" }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                      {pillar.label}
                    </span>
                  </div>
                  <p className="text-[11.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {active[pillar.key]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Special Focus */}
          <div
            className="mt-5 rounded-md p-4 flex gap-3"
            style={{ backgroundColor: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)" }}
          >
            <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--accent)" }} />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: "var(--accent)" }}>
                Strategic Differentiator
              </span>
              <p className="text-[11.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {active.special_focus}
              </p>
            </div>
          </div>
        </div>

        {/* ── Quick Matrix ── */}
        <div className="mt-12">
          <h3 className="text-[15px] font-bold">All 10 States — Quick Policy Matrix</h3>
          <p className="text-[11.5px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            Rapid overview across India's competing investment promotion councils.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {incentiveData.map((st) => (
              <button
                key={st.state}
                onClick={() => setSelectedState(st.state)}
                className="rounded-lg p-4 text-left transition"
                style={{
                  backgroundColor: selectedState === st.state ? "var(--surface-2)" : "var(--surface-1)",
                  border: selectedState === st.state ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border-muted)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    selectedState === st.state ? "var(--accent)" : "var(--border-subtle)";
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[13px] font-bold">{st.state}</h4>
                  <span className="stat-num text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                    {st.notified_date}
                  </span>
                </div>
                <p className="text-[11px] mb-3" style={{ color: "var(--text-tertiary)" }}>{st.policy_name}</p>
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.5rem" }}>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider block mb-1" style={{ color: "var(--text-tertiary)" }}>
                    Payroll Highlight
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    {st.payroll_subsidy.slice(0, 90)}{st.payroll_subsidy.length > 90 ? "…" : ""}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
