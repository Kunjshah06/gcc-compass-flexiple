"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import cityData from "@/data/cities.json";
import {
  Calculator,
  DollarSign,
  MapPin,
  ArrowRight,
  Bot,
  Layers,
  FileText,
} from "lucide-react";
import ExecutiveDossierModal from "@/components/ExecutiveDossierModal";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DomainProfile {
  name: string;
  avgSalaryLPA: number;
  sqftPerEmployee: number;
  aiPremiumPercent: number;
}

const DOMAINS: Record<string, DomainProfile> = {
  "ai-deeptech": {
    name: "AI, GenAI & Deep Tech R&D",
    avgSalaryLPA: 38,
    sqftPerEmployee: 90,
    aiPremiumPercent: 45,
  },
  "enterprise-saas": {
    name: "Cloud, Microservices & Enterprise SaaS",
    avgSalaryLPA: 26,
    sqftPerEmployee: 85,
    aiPremiumPercent: 25,
  },
  "bfsi-quant": {
    name: "BFSI Trading Tech & Quantitative Risk",
    avgSalaryLPA: 32,
    sqftPerEmployee: 85,
    aiPremiumPercent: 35,
  },
  "automotive-erd": {
    name: "Automotive ER&D & Embedded Systems",
    avgSalaryLPA: 22,
    sqftPerEmployee: 95,
    aiPremiumPercent: 20,
  },
  "gbs-operations": {
    name: "GBS Shared Services & Data Ops",
    avgSalaryLPA: 14,
    sqftPerEmployee: 75,
    aiPremiumPercent: 10,
  },
};

export default function TCOCalculatorPage() {
  const [headcount, setHeadcount] = useState<number>(100);
  const [domainKey, setDomainKey] = useState<string>("ai-deeptech");
  const [workspaceType, setWorkspaceType] = useState<"managed" | "traditional">("managed");
  const [includeSubsidies, setIncludeSubsidies] = useState<boolean>(true);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  const selectedDomain = DOMAINS[domainKey];

  const modeledCities = useMemo(() => [
    "Bengaluru",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Coimbatore",
    "Ahmedabad / GIFT City",
  ], []);

  const results = useMemo(() => {
    return modeledCities.map((cityName) => {
      const city = cityData.find((c) => c.city === cityName) || cityData[0];
      const cityRatio = (city.mid_salary_min + city.mid_salary_max) / (1800000 + 3600000);
      const avgSalaryInCityLPA = selectedDomain.avgSalaryLPA * cityRatio;
      const annualPayrollCr = (headcount * avgSalaryInCityLPA) / 100;

      let annualRealEstateCr = 0;
      if (workspaceType === "managed") {
        const avgDeskRate = (city.managed_office_rate_min + city.managed_office_rate_max) / 2;
        annualRealEstateCr = (headcount * avgDeskRate * 12) / 10000000;
      } else {
        const sqftNeeded = headcount * selectedDomain.sqftPerEmployee;
        const avgRent = (city.avg_rent_min + city.avg_rent_max) / 2;
        const totalRentPerSqftMonth = avgRent + 16;
        const leaseOpExAnnual = sqftNeeded * totalRentPerSqftMonth * 12;
        const fitoutCapExAmortizedAnnual = (sqftNeeded * 4500) / 3;
        annualRealEstateCr = (leaseOpExAnnual + fitoutCapExAmortizedAnnual) / 10000000;
      }

      const annualOverheadsCr = annualPayrollCr * 0.12;
      let estimatedSubsidyCr = 0;
      if (includeSubsidies) {
        if (cityName === "Chennai") {
          estimatedSubsidyCr = annualPayrollCr * 0.8 * 0.3;
        } else if (cityName === "Coimbatore") {
          estimatedSubsidyCr = annualPayrollCr * 0.8 * 0.3 + 0.5;
        } else if (cityName === "Ahmedabad / GIFT City") {
          estimatedSubsidyCr = annualRealEstateCr * 0.15 + annualPayrollCr * 0.05;
        } else if (cityName === "Bengaluru") {
          estimatedSubsidyCr = 0.3;
        } else if (cityName === "Pune") {
          estimatedSubsidyCr = 0.5;
        } else if (cityName === "Hyderabad") {
          estimatedSubsidyCr = 0.4;
        }
      }

      const grossTCOCr = annualPayrollCr + annualRealEstateCr + annualOverheadsCr;
      const netTCOCr = Math.max(0, grossTCOCr - estimatedSubsidyCr);
      const netTCOUSD = (netTCOCr * 10000000) / 84 / 1000000;

      return {
        city: cityName,
        tier: city.tier,
        payrollCr: Number(annualPayrollCr.toFixed(2)),
        realEstateCr: Number(annualRealEstateCr.toFixed(2)),
        overheadsCr: Number(annualOverheadsCr.toFixed(2)),
        subsidyCr: Number(estimatedSubsidyCr.toFixed(2)),
        netTCOCr: Number(netTCOCr.toFixed(2)),
        netTCOUSD: Number(netTCOUSD.toFixed(2)),
        costPerFTEAnnualUSD: Math.round((netTCOUSD * 1000000) / headcount),
      };
    }).sort((a, b) => a.netTCOCr - b.netTCOCr);
  }, [headcount, selectedDomain, workspaceType, includeSubsidies, modeledCities]);

  const blrCost = results.find((r) => r.city === "Bengaluru")?.netTCOCr || 1;

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <Calculator className="h-3 w-3" />
              Decision Engine · Stage 2 of 4
            </div>
            <h1
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              GCC Total Cost of Ownership Calculator
            </h1>
            <p className="mt-2 text-[13px] max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              Simulate fully loaded 1-year operational costs across candidate Indian cities. Factors in
              micro-market rents, role-specific engineering salaries, and state government cash subsidies.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsDossierOpen(true)}
            suppressHydrationWarning
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold transition cursor-pointer hover:brightness-110 active:scale-95 shadow-md shrink-0 self-start md:self-end"
            style={{
              backgroundColor: "var(--accent)",
              color: "#09090b",
            }}
          >
            <FileText className="h-4 w-4" />
            <span>Generate Board Dossier (PDF)</span>
          </button>
        </div>

        {/* ── Parameters Panel ── */}
        <div
          className="mt-8 rounded-lg p-5"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          <div
            className="flex items-center justify-between pb-4 mb-5"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <h2 className="text-[13px] font-bold flex items-center gap-2">
              <Layers className="h-4 w-4" style={{ color: "var(--accent)" }} />
              Scenario Parameters
            </h2>
            <span className="text-[10.5px] hidden sm:inline" style={{ color: "var(--text-tertiary)" }}>
              Adjust levers to dynamically update financial models
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Headcount */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
                  Target Headcount
                </label>
                <span className="stat-num text-[13px] font-black" style={{ color: "var(--accent)" }}>
                  {headcount} FTEs
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                suppressHydrationWarning
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[9.5px] font-mono mt-1.5" style={{ color: "var(--text-tertiary)" }}>
                <span>20 (Pod)</span>
                <span>100</span>
                <span>250</span>
                <span>500 (Campus)</span>
              </div>
            </div>

            {/* Domain */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
                Engineering Domain
              </label>
              <select
                value={domainKey}
                onChange={(e) => setDomainKey(e.target.value)}
                suppressHydrationWarning
                className="w-full rounded-md px-3 py-2 text-[12px] font-medium outline-none cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              >
                {Object.entries(DOMAINS).map(([key, dom]) => (
                  <option key={key} value={key}>{dom.name}</option>
                ))}
              </select>
              <p className="mt-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                Baseline avg: ₹{selectedDomain.avgSalaryLPA} LPA (+{selectedDomain.aiPremiumPercent}% AI premium)
              </p>
            </div>

            {/* Workspace Model */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
                Workspace Model
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(["managed", "traditional"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWorkspaceType(type)}
                    suppressHydrationWarning
                    className="rounded-md px-3 py-2 text-[11.5px] font-semibold transition cursor-pointer"
                    style={{
                      backgroundColor: workspaceType === type ? "rgba(245,158,11,0.12)" : "var(--surface-2)",
                      border: workspaceType === type ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                      color: workspaceType === type ? "var(--accent)" : "var(--text-secondary)",
                    }}
                  >
                    {type === "managed" ? "Flex / Managed" : "Direct Lease"}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {workspaceType === "managed"
                  ? "All-inclusive OpEx (Awfis / TableSpace)"
                  : "Lease + CAM + 3y fitout amortized"}
              </p>
            </div>

            {/* Subsidies Toggle */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-tertiary)" }}>
                Incentive Application
              </label>
              <button
                type="button"
                onClick={() => setIncludeSubsidies(!includeSubsidies)}
                suppressHydrationWarning
                className="w-full flex items-center justify-between rounded-md px-3 py-2.5 transition cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
                  State Cash Rebates
                </span>
                <div
                  className="relative h-5 w-9 rounded-full transition-colors flex items-center px-0.5"
                  style={{ backgroundColor: includeSubsidies ? "var(--green)" : "var(--surface-3)" }}
                >
                  <div
                    className="h-4 w-4 rounded-full bg-white transition-transform"
                    style={{ transform: includeSubsidies ? "translateX(16px)" : "translateX(0)" }}
                  />
                </div>
              </button>
              <p className="mt-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {includeSubsidies
                  ? "TN 30% payroll grant, GIFT IFSC tax holidays applied"
                  : "Gross costs before subsidies"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bar Chart ── */}
        <div
          className="mt-6 rounded-lg p-5"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-2"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <div>
              <h3 className="text-[13px] font-bold flex items-center gap-2">
                <DollarSign className="h-4 w-4" style={{ color: "var(--accent)" }} />
                Comparative 1-Year Net TCO (INR Crores)
              </h3>
              <p className="text-[10.5px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Modeled for {headcount} FTEs in {selectedDomain.name}
              </p>
            </div>
            <div
              className="stat-num rounded px-3 py-1 text-[11px] font-bold self-start sm:self-auto"
              style={{
                backgroundColor: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                color: "var(--green)",
              }}
            >
              Lowest: {results[0].city} (₹{results[0].netTCOCr} Cr)
            </div>
          </div>

          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={results} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="city" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
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
                  formatter={(val: any) => [
                    `₹${val} Cr ($${((val * 10000000) / 84 / 1000000).toFixed(2)} M)`,
                    "Net Annual Cost",
                  ]}
                />
                <Bar dataKey="netTCOCr" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Net 1Y TCO (₹ Cr)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="mt-2 text-center text-[11px]" style={{ color: "var(--text-tertiary)" }}>
            A high-capability Tier-2 city like Coimbatore can save up to{" "}
            <strong style={{ color: "var(--accent)" }}>
              {Math.round((1 - results[0].netTCOCr / blrCost) * 100)}%
            </strong>{" "}
            vs. Bengaluru while delivering single-digit attrition rates.
          </p>
        </div>

        {/* ── Financial Table ── */}
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-[13px] font-bold">Line-by-Line Financial Telemetry</h3>
              <span className="stat-num text-[10.5px]" style={{ color: "var(--text-tertiary)" }}>
                Converted at ₹84 / USD
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsDossierOpen(true)}
              suppressHydrationWarning
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition cursor-pointer self-start sm:self-auto hover:border-amber-500/50"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--accent)",
              }}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Export Board Investment Memo</span>
            </button>
          </div>

          <div
            className="overflow-x-auto rounded-lg"
            style={{ border: "1px solid var(--border-subtle)" }}
          >
            <table className="w-full text-left">
              <thead>
                <tr style={{ backgroundColor: "var(--surface-2)", borderBottom: "1px solid var(--border-muted)" }}>
                  {["Candidate Hub", "Annual Payroll", "Workspace OpEx", "Overheads", "State Subsidies", "Net TCO (INR)", "Net TCO (USD)", "Cost / FTE / Yr"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-[9.5px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => {
                  const isCheapest = i === 0;
                  const isBLR = r.city === "Bengaluru";
                  return (
                    <tr
                      key={r.city}
                      className="transition"
                      style={{
                        backgroundColor: isCheapest ? "rgba(34,197,94,0.04)" : "var(--surface-1)",
                        borderBottom: "1px solid var(--border-subtle)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-2)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = isCheapest
                          ? "rgba(34,197,94,0.04)"
                          : "var(--surface-1)";
                      }}
                    >
                      <td className="px-4 py-3 text-[12px] font-bold">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <MapPin className="h-3 w-3 shrink-0" style={{ color: "var(--text-tertiary)" }} />
                          {r.city}
                          {isCheapest && (
                            <span
                              className="rounded px-1.5 py-0.5 text-[8.5px] font-bold uppercase"
                              style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }}
                            >
                              LOWEST
                            </span>
                          )}
                          {isBLR && (
                            <span
                              className="rounded px-1.5 py-0.5 text-[8.5px] font-bold uppercase"
                              style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)" }}
                            >
                              MAX TALENT
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="stat-num px-4 py-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>₹{r.payrollCr} Cr</td>
                      <td className="stat-num px-4 py-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>₹{r.realEstateCr} Cr</td>
                      <td className="stat-num px-4 py-3 text-[11.5px]" style={{ color: "var(--text-secondary)" }}>₹{r.overheadsCr} Cr</td>
                      <td className="stat-num px-4 py-3 text-[11.5px] font-medium" style={{ color: r.subsidyCr > 0 ? "var(--green)" : "var(--text-tertiary)" }}>
                        {r.subsidyCr > 0 ? `-₹${r.subsidyCr} Cr` : "—"}
                      </td>
                      <td className="stat-num px-4 py-3 text-[13px] font-black">₹{r.netTCOCr} Cr</td>
                      <td className="stat-num px-4 py-3 text-[12px] font-bold" style={{ color: "var(--accent)" }}>
                        ${r.netTCOUSD} M
                      </td>
                      <td className="stat-num px-4 py-3 text-[11.5px] font-mono" style={{ color: "var(--text-secondary)" }}>
                        ${r.costPerFTEAnnualUSD.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Next Step CTA ── */}
        <div
          className="mt-12 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-muted)" }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "var(--accent)" }}>
              Stage 3 — Architect Your Roadmap
            </p>
            <h3 className="text-[16px] font-black" style={{ letterSpacing: "-0.02em" }}>
              Feed this {headcount}-FTE budget into the AI Setup Advisor
            </h3>
            <p className="text-[11.5px] mt-1" style={{ color: "var(--text-secondary)" }}>
              Generate a custom 24-week legal, real estate, and leadership hiring timeline for your board.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsDossierOpen(true)}
              suppressHydrationWarning
              className="flex items-center gap-2 rounded-md px-4 py-2.5 text-[12.5px] font-bold transition cursor-pointer hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: "var(--surface-3)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-muted)",
              }}
            >
              <FileText className="h-4 w-4 text-amber-500" />
              <span>Board Dossier</span>
            </button>
            <Link
              href="/advisor"
              className="flex items-center gap-2 rounded-md px-5 py-2.5 text-[12.5px] font-bold transition"
              style={{ backgroundColor: "var(--accent)", color: "#09090b" }}
            >
              <Bot className="h-4 w-4" />
              <span>Generate Blueprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Executive Dossier Modal ── */}
      <ExecutiveDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        headcount={headcount}
        domainName={selectedDomain.name}
        workspaceType={workspaceType}
        includeSubsidies={includeSubsidies}
        results={results}
      />
    </div>
  );
}
