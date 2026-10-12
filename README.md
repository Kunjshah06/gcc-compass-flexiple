# 🧭 GCC Compass — Single Source of Truth for India's GCC Ecosystem

> **An enterprise intelligence platform, TCO financial simulator, and AI strategic advisor for India's \$98.4B Global Capability Centre (GCC) ecosystem.**  
> Built for the **Flexiple Product Intern Assignment** by **Shah Kunj**.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0%20(Turbopack)-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Supabase Auth](https://img.shields.io/badge/Auth-Supabase%20Auth-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)
[![Groq](https://img.shields.io/badge/AI%20Inference-Groq%20%2B%20Gemini-F55036?style=flat)](https://groq.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

---

## 📌 Executive Summary & Problem Thesis

India is home to **2,117+ Global Capability Centres (GCCs)** spanning **3,728 physical units**, employing **2.36 million professionals**, and contributing **\$98.4 billion** in economic value. Yet, global founders, VPs of Engineering, and CFOs looking to establish or scale operations in India face severe **information asymmetry**:

1. **No Centralized GCC Registry**: Indian corporate law registers GCCs as generic Private Limited entities (`NIC 620`). Over 400+ mid-market GCCs operate with zero public data.
2. **Opaque Service Provider Pricing**: Traditional Turnkey BOT (Build-Operate-Transfer) vendors bundle 15–25% hidden salary markups and \$150K–\$500K exit penalty clauses.
3. **Scattered State Subsidies**: Cash grants (e.g., Tamil Nadu 30% escalating payroll subsidy, Karnataka intern stipends, Gujarat GIFT City 10-year 100% tax holiday) are buried across bureaucratic gazettes.
4. **Compensation & Hiring Bottlenecks**: Metros suffer 28–35% offer renege rates and 90-day notice periods when companies lack real-time salary intelligence.

**GCC Compass** eliminates this asymmetry through **verified ground-truth telemetry**, an **interactive TCO financial engine**, **one-click Board Dossier generation**, a **6-month Stage-Gate operational tracker**, and an **auth-gated AI strategic advisor**.

> [!TIP]
> ### 🔑 Verified Demo / Test Credentials
> To evaluate authenticated features, isolated AI chat history, and cloud-synced stage-gate progress without creating a new account:
> - **Email**: `kunj@flexiple.com`
> - **Password**: `password123`
> *(You can also create a new corporate account directly via the in-app Sign Up modal).*

---

## 🚀 Core Platform Modules

### 1. Executive Briefing & Macro Intelligence (`/`)
* Live FY2026 macro indicators: \$98.4B annual revenue, 2,117 GCCs, 2.36M talent pool.
* Interactive **Quick Scenario Builder** for instant headcount and budget modeling.
* Geographic concentration and industry vertical distribution charts powered by Recharts.
* Deep-dive breakdown of the 4 structural market friction points and how modern software solves them.

### 2. GCC Directory & Intelligence Explorer (`/explorer`) — *Live Supabase PostgreSQL*
* Connected directly to a live **Supabase PostgreSQL database** with real-time query counters and dynamic pagination.
* Seeded with verified enterprise GCCs across all 5 sectors (BFSI, Tech & Software, Retail/CPG, Healthcare, Industrial/Manufacturing).
* Multi-field search (company, parent global HQ, key technical functions) and faceted sector/city filtering.

### 3. Total Cost of Ownership (TCO) Calculator (`/calculator`)
* Multi-year financial modeling engine simulating teams from **20 to 500 FTEs**.
* Levers: Target headcount, domain archetype (AI/DeepTech, Cloud SaaS, Quant FinTech, Automotive ER&D, GBS), workspace model (Enterprise Managed vs. Direct Lease), and state cash subsidies.
* Full line-by-line financial telemetry table: Annual Payroll, Real Estate OpEx, Overheads, Net TCO in ₹ Cr and \$M USD, and Cost per FTE per year.

### 4. 🏆 One-Click Board-Ready Executive Dossier & Investment Memo (`components/ExecutiveDossierModal.tsx`)
* **Enterprise Problem Solved**: Global decision-makers don't buy from web pages; they present **Board Investment Memos** to their CFO and Investment Committee.
* **The Feature**: Generates a publication-grade executive memorandum complete with:
  * Formal reference code (`REF: GCC-INV-2026-FTE`) and confidentiality watermark.
  * **3-Year Capital & OPEX Schedule** (Ramp, Steady-State, Scale) with **CBDT Rule 10TD Safe Harbour (15.5%)** transfer pricing markups.
  * **70–75% Cost Arbitrage Analysis** compared against US onshore baselines (\$220k/engineer).
  * **The Flexiple Advantage Matrix**: Contradicting traditional 90-day hiring traps against Flexiple's 21-day pre-vetted pod deployment with Month-12 captive transition.
  * Board Resolutions & official signature blocks (CFO, CTO, Flexiple Advisory Partner).
  * **1-Click Print / Save PDF** (clean `@media print` layout without navigation clutter) and **Copy Markdown** for Notion/Slack.

### 5. 📋 GCC Setup Stage-Gate Roadmap & Interactive Tracker (`/roadmap`)
* **Enterprise Problem Solved**: Navigating the 5 legal, tax, and operational stages over 6 months from Day 0 charter to Day 180 Go-Live.
* **The Feature**:
  * **Phase 1: Entity Incorporation & Statutory Charter (Weeks 1–4)** — MCA V3 RUN approval, DSC/DIN, MoA/AoA, SPICe+ INC-32, RBI FIRMS FDI inflow reporting.
  * **Phase 2: SEZ/STPI & Transfer Pricing Governance (Weeks 5–8)** — Intercompany MSA, 15.5% Safe Harbour mark-up, Customs Bonded Unit, IEC and GST LUT.
  * **Phase 3: Real Estate & Enterprise IT Infrastructure (Weeks 9–14)** — Grade A term sheets, redundant dual-path fiber, ZTNA & MDM security perimeters.
  * **Phase 4: Leadership Cohort & Flexiple Pod Deployment (Weeks 12–20)** — Site Managing Director hire, 21-Day Flexiple Core Engineering Pods, Indian compensation grids.
  * **Phase 5: Day 180 Go-Live & Steady-State Velocity (Weeks 21–26)** — Shadow sprints with US/HQ, SOC2 Type II audit, ribbon-cutting ceremony.
  * **Dynamic Scoreboard**: Live progress bar and estimated days countdown to Go-Live.
  * **Inspectable Document Templates**: Downloadable board charters, RFP specifications, transfer pricing schedules, and readiness certificates.
  * **Cloud Persistence**: Saved directly to user sessions via Supabase and browser cache.

### 6. City Comparator & Real Estate Telemetry (`/cities`)
* Side-by-side empirical benchmarking between any 2 candidate cities across 10 top Indian hubs (Bengaluru, Hyderabad, Pune, Chennai, Delhi-NCR, Mumbai, Ahmedabad/GIFT City, Coimbatore, Kochi, Jaipur).
* Metrics: Grade A office rents (₹/sq ft/mo), tech workforce depth, mid vs. senior salary bands, attrition rates, and airport connectivity.

### 7. State Policy Navigator (`/policies`)
* 10-state comparative incentive matrix (Karnataka, Tamil Nadu, Telangana, Maharashtra, Gujarat GIFT City, Uttar Pradesh, Rajasthan, Madhya Pradesh, Kerala, Odisha).
* 4-pillar breakdown: Capital Subsidies, Payroll/Skilling Grants, Real Estate/Stamp Duty concessions, and Power Tariff rebates.

### 8. Salary Intelligence & Talent Scarcity (`/salaries`)
* Verified compensation bands across 8 benchmark GCC roles (Principal AI/ML, Cloud Architect, Full-Stack, Site Leaders).
* Analysis of the **GCC Compensation Premium** (+25% to +50% over traditional IT service vendors).

### 9. 🤖 AI Setup Strategic Advisor (`/advisor`) — *Auth-Gated & Isolated History*
* Conversational AI engine grounded in verified FY2026 ground-truth data, CBDT transfer pricing safe harbour rules, and state IT gazettes.
* **Multi-LLM Fallback Architecture**: Powered by Groq LLM (`openai/gpt-oss-120b`, `openai/gpt-oss-20b`, `qwen/qwen3.8-27b`) with graceful fallback.
* **Authentication Gating**: Gated to authenticated corporate users to maintain data security and eliminate abuse.
* **Per-User Chat History Isolation**: Messages are bound directly to `user.id`. When an executive logs in, their previous strategic history is automatically restored; signing out switches to a clean guest view with zero data leakage.

---

## 🔐 Authentication & Database Architecture

* **Supabase PostgreSQL**: Live managed relational database hosting GCC directory records (`public.gccs`).
* **Supabase Auth**: Executive corporate authentication (`AuthProvider.tsx` + `AuthModal.tsx`).
* **Serverless API Route (`/api/gccs`)**: Handles server-side pagination, search queries, sector and city filters, and returns structured metadata.
* **Hydration-Safe Controls**: Optimized with `suppressHydrationWarning` on interactive controls to prevent browser-extension injection errors (`fdprocessedid`).

---

## 🎨 Enterprise Design System

* **Monochromatic Amber-Gold Theme**: Sleek obsidian dark base (`--surface-base: #09090b`) with a single disciplined **Amber Gold (`#f59e0b`)** primary accent.
* **Light / Dark Theme Support**: Global toggle with a circular radial ripple animation using the Web View Transitions API.
* **Pixel-Perfect Alignment**: Desktop sidebar brand header and main content viewports share an identical `56px` (`h-14`) vertical line for seamless horizontal alignment across all views.
* **Tabular Typography**: `font-variant-numeric: tabular-nums` for crisp financial figure alignments.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16.4.0 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Database** | Supabase (PostgreSQL with Row Level Security) |
| **Authentication** | Supabase Auth (Email & Password, Session listener) |
| **AI Inference** | Groq SDK (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`) + Google Gemini 2.0 |
| **Styling** | Tailwind CSS v4, CSS Custom Properties Design Tokens |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Markdown** | `react-markdown` + `remark-gfm` |

---

## ⚡ Quick Start (Running Locally)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Kunjshah06/gcc-compass-flexiple.git
cd gcc-compass
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# Groq AI Inference
GROQ_API_KEY=your_groq_api_key_here

# Supabase PostgreSQL & Auth
NEXT_PUBLIC_SUPABASE_URL=https://ykrocdnicdyqadqmtyib.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. (Optional) Seed the Database
To re-seed the Supabase PostgreSQL table with verified enterprise GCC records:
```bash
node scripts/seed_supabase.js
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```
*(Verified: compiles with exit code 0 and zero TypeScript/prerender errors across all 13 routes).*

### 6. Test Account Credentials
Use the pre-configured executive account to test authenticated workflows (AI Advisor queries, history sync, and stage-gate tracking):
* **Email**: `kunj@flexiple.com`
* **Password**: `password123`

---

## 📁 Project Structure

```
gcc-compass/
├── app/
│   ├── page.tsx                     # Executive Briefing & Macro Intelligence
│   ├── explorer/page.tsx            # GCC Explorer (Supabase PostgreSQL Querying)
│   ├── calculator/page.tsx          # TCO Calculator & Board Dossier Trigger
│   ├── roadmap/page.tsx             # 6-Month Stage-Gate Execution Tracker
│   ├── cities/page.tsx              # City Benchmarking & Real Estate Telemetry
│   ├── policies/page.tsx            # 10-State Policy & Subsidy Comparison
│   ├── salaries/page.tsx            # Salary Intelligence & Role Bands
│   ├── advisor/page.tsx             # Auth-Gated AI Strategic Setup Advisor
│   ├── api/
│   │   ├── gccs/route.ts            # Supabase GCCs Pagination & Filtering API
│   │   └── chat/route.ts            # Groq & Gemini AI Inference Route Handler
│   └── layout.tsx                   # App Root Layout with Auth & Theme Providers
├── components/
│   ├── AuthModal.tsx                # Corporate Sign In / Sign Up Modal
│   ├── AuthProvider.tsx             # Supabase Authentication Context
│   ├── ExecutiveDossierModal.tsx    # Board-Ready Investment Memorandum (PDF/Print)
│   ├── SidebarLayout.tsx            # Responsive Sidebar Navigation & Theme Toggles
│   └── ThemeProvider.tsx            # Dark/Light Mode with View Transitions
├── data/
│   ├── cities.json                  # Top 10 Indian GCC City Benchmarks
│   ├── gccs.json                    # Enterprise GCC Fallback Data
│   ├── incentives.json              # State IT/ITeS Policy Incentive Matrix
│   └── salaries.json                # Benchmark Engineering Salary Bands
├── lib/
│   └── supabase.ts                  # Supabase Client Configuration
├── scripts/
│   └── seed_supabase.js             # Automated Database Seeding Script
└── supabase_migration.sql           # PostgreSQL Schema & Indexes
```

---

## 👥 Candidate & Assignment Context

* **Candidate**: Shah Kunj
* **Application**: Flexiple Product Intern Assignment
* **Repository**: [https://github.com/Kunjshah06/gcc-compass-flexiple.git](https://github.com/Kunjshah06/gcc-compass-flexiple.git)
* **Date**: October 2026
