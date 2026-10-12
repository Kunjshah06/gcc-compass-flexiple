"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import AuthModal from "@/components/AuthModal";
import {
  CheckSquare,
  Square,
  Clock,
  ShieldCheck,
  Building,
  Users,
  Award,
  ChevronDown,
  ChevronRight,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  ArrowRight,
  Bot,
  Layers,
  FileText,
  RotateCcw,
  Cloud,
  CheckCircle2,
  ExternalLink,
  Lock,
} from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  statutoryAuthority?: string;
  daysEstimate: number;
}

interface Phase {
  id: string;
  number: number;
  weeks: string;
  title: string;
  category: "Legal & Regulatory" | "Tax & Governance" | "Real Estate & IT" | "Talent & Pods" | "Go-Live";
  description: string;
  milestones: Milestone[];
  template: {
    title: string;
    description: string;
    content: string;
  };
}

const PHASES_DATA: Phase[] = [
  {
    id: "phase-1",
    number: 1,
    weeks: "Weeks 1–4",
    title: "Entity Incorporation & Statutory Charter",
    category: "Legal & Regulatory",
    description: "Incorporate wholly-owned Indian subsidiary (WOS), reserve company name, and obtain pan-India statutory registrations.",
    milestones: [
      {
        id: "p1-m1",
        title: "Reserve Name on MCA V3 Portal (RUN Form)",
        description: "Submit name approval application on Ministry of Corporate Affairs portal adhering to Companies (Incorporation) Rules.",
        statutoryAuthority: "MCA / RoC",
        daysEstimate: 4,
      },
      {
        id: "p1-m2",
        title: "Obtain Digital Signature Certificates (DSC) & DIN",
        description: "Procure Class 3 DSCs and Director Identification Numbers for at least two authorized directors (one resident in India).",
        statutoryAuthority: "Certifying Authority",
        daysEstimate: 5,
      },
      {
        id: "p1-m3",
        title: "Draft Memorandum (MoA) & Articles of Association (AoA)",
        description: "Draft MoA with main object clause explicitly covering software development, AI R&D, and global capability services.",
        statutoryAuthority: "Legal Counsel",
        daysEstimate: 6,
      },
      {
        id: "p1-m4",
        title: "File SPICe+ (INC-32) with AGILE-PRO-S",
        description: "Execute single-window filing for Certificate of Incorporation, PAN, TAN, GST, EPFO, and ESIC registrations.",
        statutoryAuthority: "MCA / CBDT / EPFO",
        daysEstimate: 7,
      },
      {
        id: "p1-m5",
        title: "Bank Current Account & FDI Inflow Reporting (FIRMS)",
        description: "Open Indian Scheduled Commercial Bank account and file Form FC-GPR via RBI FIRMS portal within 30 days of equity infusion.",
        statutoryAuthority: "Reserve Bank of India",
        daysEstimate: 6,
      },
    ],
    template: {
      title: "Board Charter: Wholly-Owned Subsidiary Incorporation Resolution",
      description: "Standard board resolution for authorizing Indian subsidiary setup, FDI capital infusion, and appointing resident directors.",
      content: `### CERTIFIED TRUE COPY OF RESOLUTION PASSED BY THE BOARD OF DIRECTORS
**DATE:** [Date]
**COMPANY:** [Parent MNC Inc.]

**RESOLVED THAT:**
1. The Company be and is hereby authorized to incorporate a Wholly Owned Subsidiary (WOS) in India under the Companies Act, 2013, with an authorized share capital of INR 10,000,000 (Indian Rupees Ten Million) divided into 1,000,000 equity shares of INR 10 each.
2. The primary corporate objective shall be research, engineering development, artificial intelligence workflows, and IT/ITeS services.
3. [Director Name 1] and [Director Name 2] are hereby authorized to sign statutory declarations (Form INC-9), appoint resident statutory agents, and execute RBI FIRMS reporting.`,
    },
  },
  {
    id: "phase-2",
    number: 2,
    weeks: "Weeks 5–8",
    title: "SEZ/STPI Registration & Transfer Pricing Safe Harbour",
    category: "Tax & Governance",
    description: "Establish intercompany cross-border tax compliance, duty-free hardware import eligibility, and Safe Harbour markups.",
    milestones: [
      {
        id: "p2-m1",
        title: "Execute Intercompany Master Services Agreement (MSA)",
        description: "Draft comprehensive cross-border service agreement between US/EU Parent and Indian subsidiary with explicit IP assignment clauses.",
        statutoryAuthority: "CBDT / IRS",
        daysEstimate: 6,
      },
      {
        id: "p2-m2",
        title: "Adopt 15.5% Transfer Pricing Safe Harbour (Rule 10TD)",
        description: "Opt into Central Board of Direct Taxes (CBDT) Safe Harbour rules for software development services (15.5% operating margin markup).",
        statutoryAuthority: "Income Tax Dept",
        daysEstimate: 5,
      },
      {
        id: "p2-m3",
        title: "Register with STPI / SEZ Customs Bonded Unit",
        description: "Obtain Software Technology Parks of India (STPI) or SEZ Letter of Approval (LoA) for duty-free capital equipment imports.",
        statutoryAuthority: "STPI / Development Commissioner",
        daysEstimate: 9,
      },
      {
        id: "p2-m4",
        title: "Procure Import Export Code (IEC) & GST LUT Filing",
        description: "Obtain 10-digit IEC from DGFT and file Letter of Undertaking (LUT) on GST portal for zero-rated export of IT services.",
        statutoryAuthority: "DGFT / GST Network",
        daysEstimate: 4,
      },
    ],
    template: {
      title: "Intercompany Transfer Pricing & Safe Harbour Schedule",
      description: "Transfer pricing benchmark document adhering to CBDT Rule 10TD (15.5% Cost-Plus markup) for software development.",
      content: `### SCHEDULE B: PRICING & SAFE HARBOUR MARGIN AUDIT
**EFFECTIVE PERIOD:** FY 2026–2028
**GOVERNING REGULATION:** Section 92CB, Income Tax Act, 1961 read with Rule 10TD

1. **Service Fee Calculation:**
   The Parent Entity shall remunerate the Indian GCC on a cost-plus basis equal to:
   \`Service Fee = Total Operating Costs (OC) + 15.5% (Operating Margin)\`

2. **Covered Costs:**
   Operating Costs shall include all direct personnel expenses, facility leases, IT licenses, cloud infrastructure, and administrative overheads, excluding non-operating finance charges.

3. **Form 3CEFA Filing:**
   The GCC shall file Form 3CEFA on or before the due date under section 139(1) of the Act opting for Safe Harbour rules.`,
    },
  },
  {
    id: "phase-3",
    number: 3,
    weeks: "Weeks 9–14",
    title: "Real Estate & Enterprise IT Infrastructure",
    category: "Real Estate & IT",
    description: "Finalize micro-market Grade A office space, commission dual redundant gigabit connectivity, and establish SOC2 security.",
    milestones: [
      {
        id: "p3-m1",
        title: "Execute Commercial Term Sheet (Managed vs Direct Lease)",
        description: "Finalize agreement for Grade A facility (Outer Ring Road, HITEC City, or Kharadi) with 3-year lock-in and 100% DG power backup.",
        statutoryAuthority: "CRE / Developer",
        daysEstimate: 12,
      },
      {
        id: "p3-m2",
        title: "Deploy Redundant Enterprise Fiber & SD-WAN",
        description: "Install dual 1-Gbps diverse path fiber lines from tier-1 telcos (Tata Communications & Airtel) with sub-140ms latency to US East.",
        statutoryAuthority: "DoT / Telco",
        daysEstimate: 10,
      },
      {
        id: "p3-m3",
        title: "Implement Zero Trust Network Access (ZTNA) & MDM",
        description: "Roll out cloud-managed device MDM (Jamf/InTune), hardware security keys, and encrypted developer work stations.",
        statutoryAuthority: "InfoSec Team",
        daysEstimate: 8,
      },
      {
        id: "p3-m4",
        title: "Facility Physical Security & Access Control System",
        description: "Commission biometric/RFID access control, 24/7 CCTV retention (90 days), and clean desk compliance zones for proprietary IP.",
        statutoryAuthority: "Facility Ops",
        daysEstimate: 6,
      },
    ],
    template: {
      title: "Grade A GCC Managed Workspace Specification (RFP)",
      description: "Enterprise real estate RFP specification for managed office providers (Awfis, Smartworks, Table Space, WeWork).",
      content: `### ENTERPRISE GCC WORKSPACE SPECIFICATION (RFP)
**CAPACITY:** [100–250 Seats Dedicated Enterprise Private Suite]
**MICRO-MARKET:** [e.g. Hyderabad Financial District / Bengaluru Bellandur]

1. **Power & Redundancy:**
   - 100% N+1 DG power backup with seamless UPS changeover (<5ms).
   - Dual sub-station feeder power source.

2. **Network Infrastructure:**
   - Dedicated server room with independent biometric access control.
   - Dual diverse duct entries for carrier-neutral fiber paths.
   - Category 6A structured cabling with gigabit termination per seat.

3. **Commercial Terms:**
   - Lock-in period: 24 to 36 months.
   - Security Deposit: 3 to 6 months rent.
   - Turnkey handover timeline: Maximum 21 calendar days from agreement signing.`,
    },
  },
  {
    id: "phase-4",
    number: 4,
    weeks: "Weeks 12–20",
    title: "Leadership Cohort & Flexiple Pod Deployment",
    category: "Talent & Pods",
    description: "Overcome Indian 90-day notice periods by deploying pre-vetted pods, establishing HRMS, and hiring site executive leadership.",
    milestones: [
      {
        id: "p4-m1",
        title: "Appoint India Managing Director & Head of Engineering",
        description: "Recruit senior GCC leader with track record of scaling 200+ engineer capabilities in Bengaluru or Hyderabad.",
        statutoryAuthority: "Executive Search",
        daysEstimate: 18,
      },
      {
        id: "p4-m2",
        title: "Deploy Flexiple Pre-Vetted Core Pod (21-Day Ramp)",
        description: "Bypass 90-day notice period bottlenecks by commissioning 20–30 vetted Staff/Senior engineers via Flexiple Enterprise Network.",
        statutoryAuthority: "Flexiple Advisory",
        daysEstimate: 14,
      },
      {
        id: "p4-m3",
        title: "Establish India Compensation Grid & HRMS Engine",
        description: "Deploy Indian salary matrix (Basic, HRA, Retirals, ESOPs) and automate payroll, TDS, and PF compliance via Darwinbox/greytHR.",
        statutoryAuthority: "HR / Finance",
        daysEstimate: 8,
      },
      {
        id: "p4-m4",
        title: "Group Health & Term Insurance Policy Procurement",
        description: "Underwrite comprehensive group health (₹10L family floater + OPD coverage) and group term life insurance for incoming cohort.",
        statutoryAuthority: "IRDAI Insurer",
        daysEstimate: 7,
      },
    ],
    template: {
      title: "Flexiple Agile Pod Deployment & Captive Transition Charter",
      description: "Agreement schedule outlining 21-day engineer deployment timeline, technical vetting scores, and captive transfer at Month 12.",
      content: `### FLEXIPLE RAPID POD DEPLOYMENT PROTOCOL
**TARGET VELOCITY:** 21 Calendar Days to Day-1 Sprint Contribution
**ENGAGEMENT ARCHETYPE:** [AI DeepTech Pod / Core Cloud Microservices]

1. **Pre-Vetted Standard:**
   - Candidates evaluated through Flexiple 3-stage vetting (algorithmic rigour, system architecture, leadership soft skills).
   - Zero offer-renege risk: talent guaranteed available for immediate onboarding.

2. **Transition to Captive Subsidiary:**
   - At Month 12 of operations, client retains sole option to transition pod engineers to direct Indian WOS employment with zero placement penalty.
   - Seamless continuity of codebase context and institutional memory.`,
    },
  },
  {
    id: "phase-5",
    number: 5,
    weeks: "Weeks 21–26",
    title: "Day 180 Go-Live & Steady-State Velocity",
    category: "Go-Live",
    description: "Execute shadow sprints with US/EU headquarters, complete DLP security audits, and cut the ribbon on live operations.",
    milestones: [
      {
        id: "p5-m1",
        title: "Complete Shadow Sprint & Architecture Handshake",
        description: "Run 2-week dual-hemisphere shadow sprint with HQ engineering team to validate code review velocity and CI/CD pipelines.",
        statutoryAuthority: "Global CTO",
        daysEstimate: 10,
      },
      {
        id: "p5-m2",
        title: "Information Security & Data Leak Prevention (DLP) Audit",
        description: "Conduct third-party SOC2 Type II readiness penetration test and endpoint DLP verification on all developer machines.",
        statutoryAuthority: "Cert-In Auditor",
        daysEstimate: 7,
      },
      {
        id: "p5-m3",
        title: "Official Day-180 Ribbon Cutting & Executive Town Hall",
        description: "Hold formal inaugural opening ceremony with Global CEO/Board members and local government IT department dignitaries.",
        statutoryAuthority: "Executive Sponsor",
        daysEstimate: 3,
      },
      {
        id: "p5-m4",
        title: "Quarter 1 KPI Dashboard & Cost Arbitrage Review",
        description: "Benchmark operational velocity: sprint throughput, retention rates, and actual cost savings against initial Board Memo TCO.",
        statutoryAuthority: "GCC Compass Engine",
        daysEstimate: 5,
      },
    ],
    template: {
      title: "Day 180 Operational Readiness Sign-Off Certificate",
      description: "Official executive sign-off verifying complete legal, technical, and operational readiness for full production operations.",
      content: `### DAY 180 GCC OPERATIONAL READINESS CERTIFICATE
**LOCATION:** [Facility Address, India Hub]
**GO-LIVE DATE:** [Day 180 Target Date]

**COMPLIANCE VERIFICATION:**
- [x] Wholly Owned Subsidiary incorporation confirmed (CIN: U72200...).
- [x] Transfer Pricing 15.5% safe harbour intercompany agreement executed.
- [x] Grade A workspace commissioned with 100% N+1 redundancy.
- [x] Initial engineering pod onboarded and contributing to production repositories.
- [x] SOC2 security perimeter and DLP endpoint policies verified.

**EXECUTIVE SIGN-OFF:**
Global Chief Technology Officer: ___________________
India Managing Director: ___________________`,
    },
  },
];

export default function RoadmapPage() {
  const { user } = useAuth();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    "phase-1": true,
    "phase-2": true,
    "phase-3": false,
    "phase-4": false,
    "phase-5": false,
  });
  const [activeTemplate, setActiveTemplate] = useState<{ title: string; content: string } | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Storage key per user (or guest fallback)
  const storageKey = user ? `gcc_roadmap_completed_${user.id}` : "gcc_roadmap_completed_guest";

  // 1. Load saved checklist state on mount or user login
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedIds(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to read roadmap state:", e);
    }
    // Default initial sample: 3 milestones completed for demo richness
    setCompletedIds(["p1-m1", "p1-m2", "p1-m3"]);
  }, [storageKey]);

  // 2. Persist checklist state
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(completedIds));
    } catch (e) {
      console.warn("Failed to save roadmap state:", e);
    }
  }, [completedIds, storageKey]);

  // Aggregate statistics
  const allMilestones = useMemo(() => {
    return PHASES_DATA.flatMap((p) => p.milestones);
  }, []);

  const totalCount = allMilestones.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Estimated days remaining
  const daysRemaining = useMemo(() => {
    const uncompleted = allMilestones.filter((m) => !completedIds.includes(m.id));
    return uncompleted.reduce((acc, m) => acc + m.daysEstimate, 0);
  }, [allMilestones, completedIds]);

  const toggleMilestone = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const togglePhaseExpand = (phaseId: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const handleReset = () => {
    if (confirm("Reset all milestones to start fresh?")) {
      setCompletedIds([]);
    }
  };

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: "rgba(245,158,11,0.1)",
                color: "var(--accent)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <CheckSquare className="h-3 w-3" />
              Stage 3 of 4 · Execution Blueprint
            </div>
            <h1
              className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              GCC Setup Stage-Gate Roadmap &amp; Execution Tracker
            </h1>
            <p className="mt-2 text-[13px] max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              The end-to-end 6-month operational flight path from initial board charter to Day 180 Go-Live.
              Track regulatory MCA filings, Safe Harbour tax compliance, real estate fit-outs, and Flexiple seed pod deployment.
            </p>
          </div>

          {/* Cloud Sync & Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
            {user ? (
              <span
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-medium"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                <Cloud className="h-3.5 w-3.5 text-emerald-500" />
                Synced ({user.email?.split("@")[0]})
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                suppressHydrationWarning
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-semibold transition cursor-pointer hover:border-amber-500/50"
                style={{
                  backgroundColor: "var(--surface-2)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--accent)",
                }}
              >
                <Lock className="h-3.5 w-3.5" />
                Sign in to Sync
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              suppressHydrationWarning
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[11px] font-medium transition cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-tertiary)",
              }}
              title="Reset progress"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>

            <Link
              href="/calculator"
              className="flex items-center gap-1.5 rounded-md px-4 py-2 text-[11.5px] font-bold transition cursor-pointer hover:brightness-110"
              style={{
                backgroundColor: "var(--accent)",
                color: "#09090b",
              }}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Board Dossier</span>
            </Link>
          </div>
        </div>

        {/* ── Progress Executive Scoreboard ── */}
        <div
          className="rounded-xl p-6 shadow-sm"
          style={{
            backgroundColor: "var(--surface-1)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Stage-Gate Overall Execution Health
              </span>
              <h2 className="text-[18px] font-black tracking-tight mt-0.5">
                {completedCount} of {totalCount} Milestones Achieved ({progressPercent}%)
              </h2>
            </div>

            <div className="flex items-center gap-4 text-[12px]">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="font-mono font-bold text-[14px]">~{daysRemaining} Days</span>
                <span className="text-[10.5px] text-[var(--text-tertiary)]">to Go-Live</span>
              </div>
              <div className="h-6 w-px bg-[var(--border-subtle)]" />
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-emerald-500" />
                <span className="font-bold text-[13px]">
                  {progressPercent === 100 ? "Ready for Launch" : `Phase ${PHASES_DATA.find((p) => p.milestones.some((m) => !completedIds.includes(m.id)))?.number || 5} Active`}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden bg-[var(--surface-3)] p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Phase Quick Badges */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-[var(--border-subtle)] text-[10.5px]">
            {PHASES_DATA.map((phase) => {
              const phaseCompleted = phase.milestones.every((m) => completedIds.includes(m.id));
              const phaseInProgress = phase.milestones.some((m) => completedIds.includes(m.id)) && !phaseCompleted;

              return (
                <div
                  key={phase.id}
                  onClick={() => togglePhaseExpand(phase.id)}
                  className="p-2 rounded-lg cursor-pointer transition flex items-center justify-between"
                  style={{
                    backgroundColor: phaseCompleted
                      ? "rgba(34,197,94,0.08)"
                      : phaseInProgress
                      ? "rgba(245,158,11,0.08)"
                      : "var(--surface-2)",
                    border: phaseCompleted
                      ? "1px solid rgba(34,197,94,0.25)"
                      : phaseInProgress
                      ? "1px solid rgba(245,158,11,0.25)"
                      : "1px solid var(--border-subtle)",
                  }}
                >
                  <span className="font-bold">P{phase.number}: {phase.weeks}</span>
                  {phaseCompleted ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  ) : phaseInProgress ? (
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <span className="text-[9px] text-[var(--text-tertiary)]">Pending</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 5 Stage-Gate Phase Cards ── */}
        <div className="space-y-6">
          {PHASES_DATA.map((phase) => {
            const isExpanded = !!expandedPhases[phase.id];
            const phaseCompletedCount = phase.milestones.filter((m) => completedIds.includes(m.id)).length;
            const isAllCompleted = phaseCompletedCount === phase.milestones.length;

            return (
              <div
                key={phase.id}
                className="rounded-xl overflow-hidden transition"
                style={{
                  backgroundColor: "var(--surface-1)",
                  border: isAllCompleted
                    ? "1px solid rgba(34,197,94,0.3)"
                    : "1px solid var(--border-subtle)",
                }}
              >
                {/* Phase Header Accordion */}
                <div
                  onClick={() => togglePhaseExpand(phase.id)}
                  className="p-5 flex items-center justify-between cursor-pointer select-none transition hover:bg-[var(--surface-2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-black text-[13px]"
                      style={{
                        backgroundColor: isAllCompleted
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(245,158,11,0.12)",
                        color: isAllCompleted ? "var(--green)" : "var(--accent)",
                        border: isAllCompleted
                          ? "1px solid rgba(34,197,94,0.3)"
                          : "1px solid rgba(245,158,11,0.25)",
                      }}
                    >
                      {phase.number}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] font-mono">
                          {phase.weeks}
                        </span>
                        <span
                          className="text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold"
                          style={{
                            backgroundColor: "var(--surface-3)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {phase.category}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-bold mt-0.5">{phase.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md font-bold"
                      style={{
                        backgroundColor: isAllCompleted ? "rgba(34,197,94,0.12)" : "var(--surface-2)",
                        color: isAllCompleted ? "var(--green)" : "var(--text-secondary)",
                      }}
                    >
                      {phaseCompletedCount} / {phase.milestones.length} Done
                    </span>

                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-[var(--text-tertiary)]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)]" />
                    )}
                  </div>
                </div>

                {/* Phase Details (Collapsible) */}
                {isExpanded && (
                  <div
                    className="px-5 pb-5 pt-2 border-t space-y-4"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      {phase.description}
                    </p>

                    {/* Milestones Checklist */}
                    <div className="space-y-2.5">
                      {phase.milestones.map((m) => {
                        const isDone = completedIds.includes(m.id);

                        return (
                          <div
                            key={m.id}
                            onClick={() => toggleMilestone(m.id)}
                            className="p-3.5 rounded-lg flex items-start gap-3.5 cursor-pointer transition"
                            style={{
                              backgroundColor: isDone ? "rgba(34,197,94,0.04)" : "var(--surface-2)",
                              border: isDone
                                ? "1px solid rgba(34,197,94,0.2)"
                                : "1px solid var(--border-subtle)",
                            }}
                          >
                            <div className="mt-0.5 shrink-0 text-amber-500">
                              {isDone ? (
                                <CheckSquare className="h-4 w-4 text-emerald-500" />
                              ) : (
                                <Square className="h-4 w-4 text-[var(--text-tertiary)]" />
                              )}
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                <h4
                                  className={`text-[12.5px] font-bold ${
                                    isDone ? "line-through text-[var(--text-tertiary)]" : "text-[var(--text-primary)]"
                                  }`}
                                >
                                  {m.title}
                                </h4>
                                <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                                  {m.statutoryAuthority && (
                                    <span className="rounded px-1.5 py-0.5 bg-[var(--surface-3)]">
                                      {m.statutoryAuthority}
                                    </span>
                                  )}
                                  <span className="font-mono">~{m.daysEstimate} days</span>
                                </div>
                              </div>
                              <p className="text-[11.5px] mt-1 text-[var(--text-secondary)] leading-relaxed">
                                {m.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Downloadable Deliverable Template Action */}
                    <div
                      className="p-3.5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4"
                      style={{
                        backgroundColor: "var(--surface-2)",
                        border: "1px dashed var(--border-muted)",
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <span className="text-[11.5px] font-bold block">{phase.template.title}</span>
                          <span className="text-[10px] text-[var(--text-tertiary)]">
                            {phase.template.description}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTemplate(phase.template)}
                        suppressHydrationWarning
                        className="shrink-0 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold transition cursor-pointer self-start sm:self-auto hover:brightness-110"
                        style={{
                          backgroundColor: "var(--surface-3)",
                          color: "var(--accent)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Inspect Template</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Flexiple Acceleration Callout ── */}
        <div
          className="rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{
            backgroundColor: "var(--surface-1)",
            border: "1px solid var(--border-muted)",
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3 className="text-[15px] font-black tracking-tight">
                Want to compress this 6-month roadmap into 45 days?
              </h3>
            </div>
            <p className="text-[12px] mt-1 text-[var(--text-secondary)] max-w-2xl">
              Flexiple provides pre-incorporated managed incubator facilities and pre-vetted senior engineer cohorts,
              allowing global companies to push production commits within 21 days while legal incorporation finishes in parallel.
            </p>
          </div>

          <Link
            href="/advisor"
            className="shrink-0 flex items-center gap-2 rounded-md px-5 py-2.5 text-[12px] font-bold transition self-start sm:self-auto"
            style={{
              backgroundColor: "var(--accent)",
              color: "#09090b",
            }}
          >
            <Bot className="h-4 w-4" />
            <span>Consult AI Advisor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── Document Template Preview Slide-over Modal ── */}
      {activeTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: "var(--surface-1)",
              borderColor: "var(--border-muted)",
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <h3 className="text-[13px] font-bold flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-500" />
                {activeTemplate.title}
              </h3>
              <button
                type="button"
                onClick={() => setActiveTemplate(null)}
                className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 max-h-[60vh] overflow-y-auto font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-[var(--text-secondary)]">
              {activeTemplate.content}
            </div>

            <div
              className="px-5 py-3 border-t flex items-center justify-between"
              style={{
                backgroundColor: "var(--surface-2)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <span className="text-[10px] text-[var(--text-tertiary)]">
                Ready to copy and adapt for legal / operational filings.
              </span>
              <button
                type="button"
                onClick={() => handleCopyTemplate(activeTemplate.content)}
                suppressHydrationWarning
                className="flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[11px] font-bold transition cursor-pointer"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "#09090b",
                }}
              >
                {copiedTemplate ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedTemplate ? "Copied to Clipboard" : "Copy Template"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Supabase Auth Modal ── */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
