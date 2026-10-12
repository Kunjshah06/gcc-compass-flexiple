"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Copy,
  Check,
  X,
  ShieldCheck,
  TrendingDown,
  Building2,
  Users,
  Award,
  Download,
  Share2,
  Calendar,
  DollarSign,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export interface DossierCityResult {
  city: string;
  tier: number;
  payrollCr: number;
  realEstateCr: number;
  overheadsCr: number;
  subsidyCr: number;
  netTCOCr: number;
  netTCOUSD: number;
  costPerFTEAnnualUSD: number;
}

interface ExecutiveDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  headcount: number;
  domainName: string;
  workspaceType: "managed" | "traditional";
  includeSubsidies: boolean;
  results: DossierCityResult[];
}

export default function ExecutiveDossierModal({
  isOpen,
  onClose,
  headcount,
  domainName,
  workspaceType,
  includeSubsidies,
  results,
}: ExecutiveDossierModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Selected top cities for comparison
  const primaryCity = results[0] || {
    city: "Hyderabad",
    payrollCr: 28,
    realEstateCr: 4,
    overheadsCr: 3.5,
    subsidyCr: 0.4,
    netTCOCr: 35.1,
    netTCOUSD: 4.18,
    costPerFTEAnnualUSD: 41800,
  };
  const blrCity = results.find((r) => r.city === "Bengaluru") || results[1] || primaryCity;
  const runnerUpCity = results[1] || primaryCity;

  // 3-Year Projections (assuming 8% merit ramp in Year 2 and Year 3)
  const y1USD = primaryCity.netTCOUSD;
  const y2USD = Number((y1USD * 1.08).toFixed(2));
  const y3USD = Number((y1USD * 1.16).toFixed(2));
  const threeYearTotalUSD = Number((y1USD + y2USD + y3USD).toFixed(2));

  const y1INR = primaryCity.netTCOCr;
  const y2INR = Number((y1INR * 1.08).toFixed(2));
  const y3INR = Number((y1INR * 1.16).toFixed(2));
  const threeYearTotalINR = Number((y1INR + y2INR + y3INR).toFixed(2));

  // US Benchmark Equivalent ($220k fully loaded per engineer in US tech hubs)
  const usAnnualPerEngineer = 220000;
  const usThreeYearTotalUSD = Number(
    (((headcount * usAnnualPerEngineer * 3) * 1.04) / 1000000).toFixed(2)
  );
  const netSavingsUSD = Number((usThreeYearTotalUSD - threeYearTotalUSD).toFixed(2));
  const arbitragePercent = Math.round((netSavingsUSD / usThreeYearTotalUSD) * 100);

  // Safe Harbour Transfer Pricing 15.5% (CBDT Rule 10TD)
  const safeHarbourMarkupUSD = Number((threeYearTotalUSD * 0.155).toFixed(2));

  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const memo = `
# CONFIDENTIAL INVESTMENT MEMORANDUM
**TO:** Board of Directors / Investment Committee
**FROM:** GCC Strategy & Flexiple Enterprise Advisory
**DATE:** ${todayStr}
**SUBJECT:** India Global Capability Centre (GCC) Feasibility & TCO Architecture
**TARGET ARCHETYPE:** ${headcount} FTEs | ${domainName} | ${workspaceType.toUpperCase()} Workspace

---

### 1. EXECUTIVE SUMMARY & STRATEGIC RECOMMENDATION
We recommend the authorization of Phase 1 capital commitment of **$${y1USD}M USD (₹${y1INR} Cr)** to establish a ${headcount}-person GCC in **${primaryCity.city}**, scaling over 18 months.

* **3-Year Cumulative TCO:** $${threeYearTotalUSD}M USD (vs. $${usThreeYearTotalUSD}M US onshore equivalent)
* **Net 3-Year Capital Savings:** $${netSavingsUSD}M USD (${arbitragePercent}% cost arbitrage)
* **Target Delivery Speed:** 21-day deployment utilizing Flexiple Pre-Vetted Cohort (5 months faster than traditional 90-day hiring ramp).

### 2. THREE-YEAR CAPITAL & OPEX SCHEDULE
* **Year 1 (Ramp & Setup):** $${y1USD}M (₹${y1INR} Cr)
* **Year 2 (Steady State):** $${y2USD}M (₹${y2INR} Cr)
* **Year 3 (Innovation Velocity):** $${y3USD}M (₹${y3INR} Cr)
* **3-Year Total:** $${threeYearTotalUSD}M USD (₹${threeYearTotalINR} Cr)
* **CBDT Safe Harbour 15.5% Mark-Up:** $${safeHarbourMarkupUSD}M

### 3. HUB BENCHMARK MATRIX
1. ${primaryCity.city} (Optimal TCO): $${primaryCity.costPerFTEAnnualUSD.toLocaleString()}/FTE/yr
2. ${blrCity.city} (Max Talent Depth): $${blrCity.costPerFTEAnnualUSD.toLocaleString()}/FTE/yr
3. ${runnerUpCity.city}: $${runnerUpCity.costPerFTEAnnualUSD.toLocaleString()}/FTE/yr

### 4. GOVERNANCE & SAFE HARBOUR
- Transfer Pricing compliant under CBDT Rule 10TD (15.5% cost-plus).
- FEMA / RBI External Commercial Borrowing compliance scheduled.
- IP assignment protected via master services agreement (MSA).
`.trim();

    navigator.clipboard.writeText(memo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 print:p-0 print:bg-white print:overflow-visible">
      {/* Container */}
      <div className="mx-auto max-w-4xl rounded-xl bg-[var(--surface-1)] border border-[var(--border-muted)] shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:bg-white print:text-black">
        
        {/* Modal Action Header (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--surface-2)] print:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11.5px] font-bold uppercase tracking-wider text-[var(--accent)]">
              Board-Ready Investment Dossier
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)] hidden sm:inline">
              · Ready for CFO / Investment Committee
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-medium transition cursor-pointer bg-[var(--surface-1)] hover:bg-[var(--surface-3)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
              title="Copy memo in Markdown format"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[11px] font-bold transition cursor-pointer bg-[var(--accent)] hover:brightness-110 text-zinc-950 shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] transition cursor-pointer"
              aria-label="Close dossier"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Printable Memo Document Body ── */}
        <div className="p-6 sm:p-10 space-y-8 font-sans print:p-8 print:space-y-6 print:text-black">
          
          {/* Document Confidentiality Banner */}
          <div className="border-b-2 border-amber-500/80 pb-6 print:border-black">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono tracking-widest text-[var(--text-tertiary)] print:text-zinc-600">
              <span className="flex items-center gap-1.5 font-bold text-amber-500 print:text-black">
                <ShieldCheck className="h-3.5 w-3.5" />
                STRICTLY CONFIDENTIAL · BOARD OF DIRECTORS / INVESTMENT COMMITTEE
              </span>
              <span>REF: GCC-INV-{new Date().getFullYear()}-{headcount}FTE</span>
            </div>

            <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] print:text-black">
              STRATEGIC INVESTMENT MEMORANDUM
            </h1>
            <p className="text-[13.5px] font-medium text-[var(--text-secondary)] mt-1 print:text-zinc-700">
              India Global Capability Centre (GCC) Feasibility, Total Cost of Operations (TCO) &amp; Talent Ramp
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-3 border-t border-[var(--border-subtle)] print:border-zinc-300">
              <div>
                <span className="text-[var(--text-tertiary)] block text-[9.5px] uppercase print:text-zinc-500">Target Archetype</span>
                <span className="font-bold text-[var(--text-primary)] print:text-black">{domainName}</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)] block text-[9.5px] uppercase print:text-zinc-500">Planned Headcount</span>
                <span className="font-bold text-[var(--text-primary)] print:text-black">{headcount} FTE Engineers</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)] block text-[9.5px] uppercase print:text-zinc-500">Workspace Model</span>
                <span className="font-bold text-[var(--text-primary)] print:text-black">{workspaceType === "managed" ? "Managed / Flex" : "Direct Lease"}</span>
              </div>
              <div>
                <span className="text-[var(--text-tertiary)] block text-[9.5px] uppercase print:text-zinc-500">Prepared On</span>
                <span className="font-bold text-[var(--text-primary)] print:text-black">{todayStr}</span>
              </div>
            </div>
          </div>

          {/* Section 1: Strategic Recommendation */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2 print:text-black print:font-extrabold">
              1. Executive Recommendation &amp; Value Creation Thesis
            </h2>
            <div className="mt-3 rounded-lg p-4 bg-[var(--surface-2)] border border-[var(--border-subtle)] print:bg-zinc-50 print:border-zinc-300">
              <p className="text-[12.5px] leading-relaxed text-[var(--text-primary)] print:text-black">
                We recommend authorizing an initial Year 1 operating commitment of{" "}
                <strong className="text-[var(--accent)] font-bold print:text-black">
                  ${y1USD}M USD (₹{y1INR} Cr)
                </strong>{" "}
                to establish a dedicated capability centre in{" "}
                <strong className="font-bold">{primaryCity.city}</strong>, scaling to {headcount} engineering FTEs over 18 months. Over a 3-year horizon, this facility generates{" "}
                <strong className="font-bold">${netSavingsUSD}M USD in cumulative operational savings</strong> compared to equivalent US-onshore staffing ({arbitragePercent}% net cost reduction), while positioning core intellectual property in an owned captive structure.
              </p>

              {/* KPI Summary Cards */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded p-2.5 bg-[var(--surface-1)] border border-[var(--border-muted)] print:bg-white print:border-zinc-300">
                  <span className="text-[9.5px] text-[var(--text-tertiary)] uppercase font-semibold block print:text-zinc-500">Year 1 TCO</span>
                  <span className="text-[15px] font-black text-[var(--accent)] print:text-black">${y1USD}M</span>
                  <span className="text-[9.5px] text-[var(--text-tertiary)] block">₹{y1INR} Cr INR</span>
                </div>
                <div className="rounded p-2.5 bg-[var(--surface-1)] border border-[var(--border-muted)] print:bg-white print:border-zinc-300">
                  <span className="text-[9.5px] text-[var(--text-tertiary)] uppercase font-semibold block print:text-zinc-500">3-Year Cumulative</span>
                  <span className="text-[15px] font-black text-[var(--text-primary)] print:text-black">${threeYearTotalUSD}M</span>
                  <span className="text-[9.5px] text-[var(--text-tertiary)] block">₹{threeYearTotalINR} Cr INR</span>
                </div>
                <div className="rounded p-2.5 bg-[var(--surface-1)] border border-[var(--border-muted)] print:bg-white print:border-zinc-300">
                  <span className="text-[9.5px] text-[var(--text-tertiary)] uppercase font-semibold block print:text-zinc-500">Cost / FTE / Year</span>
                  <span className="text-[15px] font-black text-emerald-500 print:text-black">
                    ${primaryCity.costPerFTEAnnualUSD.toLocaleString()}
                  </span>
                  <span className="text-[9.5px] text-[var(--text-tertiary)] block">Fully loaded cost</span>
                </div>
                <div className="rounded p-2.5 bg-[var(--surface-1)] border border-[var(--border-muted)] print:bg-white print:border-zinc-300">
                  <span className="text-[9.5px] text-[var(--text-tertiary)] uppercase font-semibold block print:text-zinc-500">3-Yr Net Savings</span>
                  <span className="text-[15px] font-black text-emerald-500 print:text-black">${netSavingsUSD}M</span>
                  <span className="text-[9.5px] text-[var(--text-tertiary)] block">{arbitragePercent}% vs US baseline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 3-Year Capital & OPEX Schedule */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2 print:text-black print:font-extrabold">
              2. Three-Year Capital &amp; Operational Expenditure Schedule
            </h2>
            <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--border-subtle)] print:border-zinc-300">
              <table className="w-full text-left text-[11.5px]">
                <thead>
                  <tr className="bg-[var(--surface-2)] border-b border-[var(--border-muted)] text-[9.5px] uppercase tracking-wider text-[var(--text-tertiary)] print:bg-zinc-100 print:text-black">
                    <th className="px-3.5 py-2.5">Financial Line Item</th>
                    <th className="px-3.5 py-2.5">Year 1 (Ramp)</th>
                    <th className="px-3.5 py-2.5">Year 2 (Steady)</th>
                    <th className="px-3.5 py-2.5">Year 3 (Scale)</th>
                    <th className="px-3.5 py-2.5 font-bold">3-Year Cumulative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] print:divide-zinc-200">
                  <tr>
                    <td className="px-3.5 py-2 font-medium">Engineering Compensation &amp; Payroll</td>
                    <td className="px-3.5 py-2 font-mono">₹{primaryCity.payrollCr} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.payrollCr * 1.08).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.payrollCr * 1.16).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-bold font-mono">₹{(primaryCity.payrollCr * 3.24).toFixed(2)} Cr</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-medium">Workspace &amp; Real Estate OpEx</td>
                    <td className="px-3.5 py-2 font-mono">₹{primaryCity.realEstateCr} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.realEstateCr * 1.05).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.realEstateCr * 1.10).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-bold font-mono">₹{(primaryCity.realEstateCr * 3.15).toFixed(2)} Cr</td>
                  </tr>
                  <tr>
                    <td className="px-3.5 py-2 font-medium">G&amp;A, HR, IT Security &amp; Telecom Overheads</td>
                    <td className="px-3.5 py-2 font-mono">₹{primaryCity.overheadsCr} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.overheadsCr * 1.05).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-mono">₹{(primaryCity.overheadsCr * 1.10).toFixed(2)} Cr</td>
                    <td className="px-3.5 py-2 font-bold font-mono">₹{(primaryCity.overheadsCr * 3.15).toFixed(2)} Cr</td>
                  </tr>
                  {includeSubsidies && primaryCity.subsidyCr > 0 && (
                    <tr className="bg-emerald-500/5 print:bg-zinc-50">
                      <td className="px-3.5 py-2 text-emerald-500 font-semibold print:text-black">
                        State IT Policy Subsidies &amp; Payroll Rebates
                      </td>
                      <td className="px-3.5 py-2 font-mono text-emerald-500 print:text-black">-₹{primaryCity.subsidyCr} Cr</td>
                      <td className="px-3.5 py-2 font-mono text-emerald-500 print:text-black">-₹{(primaryCity.subsidyCr * 0.8).toFixed(2)} Cr</td>
                      <td className="px-3.5 py-2 font-mono text-emerald-500 print:text-black">-₹{(primaryCity.subsidyCr * 0.5).toFixed(2)} Cr</td>
                      <td className="px-3.5 py-2 font-bold font-mono text-emerald-500 print:text-black">-₹{(primaryCity.subsidyCr * 2.3).toFixed(2)} Cr</td>
                    </tr>
                  )}
                  <tr className="bg-[var(--surface-2)] font-bold print:bg-zinc-100">
                    <td className="px-3.5 py-2.5">NET TOTAL EXPENDITURE (INR)</td>
                    <td className="px-3.5 py-2.5 font-mono text-[var(--accent)] print:text-black">₹{y1INR} Cr</td>
                    <td className="px-3.5 py-2.5 font-mono">₹{y2INR} Cr</td>
                    <td className="px-3.5 py-2.5 font-mono">₹{y3INR} Cr</td>
                    <td className="px-3.5 py-2.5 font-mono font-black">₹{threeYearTotalINR} Cr</td>
                  </tr>
                  <tr className="bg-[var(--surface-3)] font-bold print:bg-zinc-200">
                    <td className="px-3.5 py-2.5">NET TOTAL EXPENDITURE (USD @ ₹84)</td>
                    <td className="px-3.5 py-2.5 font-mono text-[var(--accent)] print:text-black">${y1USD}M</td>
                    <td className="px-3.5 py-2.5 font-mono">${y2USD}M</td>
                    <td className="px-3.5 py-2.5 font-mono">${y3USD}M</td>
                    <td className="px-3.5 py-2.5 font-mono font-black text-[var(--accent)] print:text-black">${threeYearTotalUSD}M</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[10px] text-[var(--text-tertiary)] print:text-zinc-500">
              * Note: Safe Harbour Transfer Pricing mark-up of 15.5% (CBDT Rule 10TD) applied to intercompany service agreements ($ {safeHarbourMarkupUSD}M).
            </p>
          </div>

          {/* Section 3: Candidate Hub Benchmark */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2 print:text-black print:font-extrabold">
              3. Strategic Location Trade-Off Evaluation
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[primaryCity, blrCity, runnerUpCity].slice(0, 3).map((hub, idx) => (
                <div
                  key={idx}
                  className="rounded-lg p-3.5 bg-[var(--surface-2)] border border-[var(--border-subtle)] print:bg-zinc-50 print:border-zinc-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[12.5px] print:text-black">{hub.city}</h3>
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-[var(--surface-3)] text-[var(--accent)] print:bg-zinc-200 print:text-black">
                      Tier {hub.tier}
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)] print:text-zinc-600">Annual Net TCO:</span>
                      <span className="font-bold font-mono">${hub.netTCOUSD}M USD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)] print:text-zinc-600">Cost / FTE / Yr:</span>
                      <span className="font-bold font-mono">${hub.costPerFTEAnnualUSD.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-tertiary)] print:text-zinc-600">Annual Payroll:</span>
                      <span className="font-mono">₹{hub.payrollCr} Cr</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: The Flexiple Execution Advantage */}
          <div className="rounded-lg p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 print:bg-zinc-50 print:border-zinc-300">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-[var(--accent)] flex items-center gap-2 print:text-black">
              <Award className="h-4 w-4" />
              4. Execution Roadmap: The Flexiple Talent Velocity Advantage
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11.5px]">
              <div className="space-y-1.5 p-3 rounded bg-[var(--surface-1)] border border-[var(--border-subtle)] print:bg-white print:border-zinc-200">
                <span className="font-bold text-red-400 block text-[11px] uppercase print:text-red-700">
                  ❌ Traditional GCC Setup Trap (6–9 Months)
                </span>
                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)] list-disc list-inside print:text-zinc-700">
                  <li>Indian market 90-day notice periods cause severe hiring latency</li>
                  <li>28–35% offer renege rates when candidates counter-offer</li>
                  <li>Hefty staffing agency markups (18–22% per hire)</li>
                  <li>High initial Capex risk before validating product momentum</li>
                </ul>
              </div>

              <div className="space-y-1.5 p-3 rounded bg-[var(--surface-1)] border border-amber-500/40 print:bg-white print:border-zinc-300">
                <span className="font-bold text-[var(--accent)] block text-[11px] uppercase print:text-black">
                  ⚡ Flexiple Pre-Vetted Cohort Deployment (3 Weeks)
                </span>
                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)] list-disc list-inside print:text-zinc-700">
                  <li><strong>Day 21 Deployment:</strong> Top 1% vetted engineering pods deployed immediately</li>
                  <li><strong>Zero Renege Risk:</strong> Guaranteed talent continuity and skill matching</li>
                  <li><strong>Captive Transition:</strong> Seamless transfer to own Indian legal entity at Month 12</li>
                  <li><strong>5 Months Faster Time-to-Market:</strong> Core roadmap shipped 2 quarters ahead</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 5: Governance & Board Sign-off */}
          <div className="border-t border-[var(--border-subtle)] pt-6 space-y-4 print:border-zinc-300">
            <h2 className="text-[12.5px] font-bold uppercase tracking-wider text-[var(--text-secondary)] print:text-black">
              5. Proposed Board Resolutions &amp; Sign-Off
            </h2>
            
            <div className="space-y-2 text-[11px] text-[var(--text-secondary)] print:text-zinc-800">
              <label className="flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded accent-amber-500" />
                <span>
                  <strong>Resolution 1:</strong> Authorize incorporation of a wholly-owned subsidiary (WOS) or Build-Operate-Transfer (BOT) framework in {primaryCity.city}.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded accent-amber-500" />
                <span>
                  <strong>Resolution 2:</strong> Approve Year 1 operational and capital budget ceiling of ${y1USD}M USD (₹{y1INR} Cr).
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded accent-amber-500" />
                <span>
                  <strong>Resolution 3:</strong> Commission Flexiple Enterprise Advisory for initial 25-engineer core sprint cohort.
                </span>
              </label>
            </div>

            {/* Signatures */}
            <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-6 text-[10.5px] print:border-zinc-300">
              <div>
                <div className="h-9 border-b border-dashed border-[var(--border-muted)] print:border-black" />
                <span className="block mt-1 font-bold text-[var(--text-primary)] print:text-black">Chief Financial Officer (CFO)</span>
                <span className="text-[9.5px] text-[var(--text-tertiary)] print:text-zinc-500">Date: _______________</span>
              </div>
              <div>
                <div className="h-9 border-b border-dashed border-[var(--border-muted)] print:border-black" />
                <span className="block mt-1 font-bold text-[var(--text-primary)] print:text-black">VP of Engineering / CTO</span>
                <span className="text-[9.5px] text-[var(--text-tertiary)] print:text-zinc-500">Date: _______________</span>
              </div>
              <div>
                <div className="h-9 border-b border-dashed border-[var(--border-muted)] print:border-black" />
                <span className="block mt-1 font-bold text-[var(--text-primary)] print:text-black">Flexiple Advisory Partner</span>
                <span className="text-[9.5px] text-[var(--text-tertiary)] print:text-zinc-500">Date: _______________</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-[9.5px] text-[var(--text-tertiary)] border-t border-[var(--border-subtle)] pt-4 print:border-zinc-300 print:text-zinc-500">
            Generated via GCC Compass Intelligence Engine · Based on NASSCOM-Zinnov FY2026 ground-truth telemetry &amp; CBRE Grade A leasing indexes.
          </div>
        </div>
      </div>
    </div>
  );
}
