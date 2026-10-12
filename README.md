# 🧭 GCC Compass — Single Source of Truth for India's GCC Ecosystem

> **A strategic intelligence platform and AI setup advisor for India's \$98.4B Global Capability Centre (GCC) ecosystem.**  
> Built as part of the **Flexiple Product Intern Assignment**.

---

## 📌 Executive Summary

India is home to **2,117+ Global Capability Centres (GCCs)** spanning **3,728 physical units**, employing **2.36 million professionals**, and contributing **\$98.4 billion** in economic value. Yet, global enterprises (Fortune 500s and mid-market leaders) looking to establish or expand their India footprint face severe **information asymmetry**:

1. **No Centralized GCC Registry**: Indian corporate law registers GCCs as generic Private Limited entities (`NIC 620`). Over 400+ mid-market GCCs operate without public record.
2. **Opaque Service Provider Pricing**: Turnkey BOT models bundle 15–25% hidden salary markups and \$150K–\$500K exit penalty clauses.
3. **Scattered State Incentives**: Cash subsidies (e.g., Tamil Nadu 30% escalating payroll grant, Karnataka intern stipends, Gujarat GIFT City 10-year 100% tax holiday) are buried across bureaucratic gazettes.
4. **Compensation & Attrition Disconnect**: 30–50% Day-1 drop-off rates occur in Tier-1 metros due to outdated salary intelligence.

**GCC Compass** eliminates this asymmetry through structured data telemetry, interactive TCO modeling, and real-time AI advisory reasoning.

---

## 🚀 Key Modules & Product Capabilities

### 1. Executive Briefing & Feasibility Gateway (`/`)
* Macro economic dashboard with FY2026 ground truth metrics.
* Interactive **Quick Scenario Builder** to preview team size and technical mandate budgets.
* Geographic concentration and sector breakdown charts powered by Recharts.
* The 4 core market friction points and how software solves them.

### 2. GCC Directory & Intelligence Explorer (`/explorer`)
* Curated directory of **20 benchmark mega-GCCs** (JPMorgan, Bosch, Google, Goldman Sachs, Walmart, Optum, etc.).
* Instant multi-keyword search (company name, parent HQ, core engineering workstreams).
* Dual-filter faceted navigation across Industry Verticals and City Hubs.

### 3. Total Cost of Ownership (TCO) Calculator (`/calculator`)
* Dynamic **financial modeling engine** for planned teams from 20 (Initial Pod) to 500 FTEs (Campus).
* Toggle levers: Headcount slider, Technical domain profile, Workspace model (Enterprise Flex vs. Direct Lease), and State Cash Subsidies.
* Interactive comparative bar chart and line-by-line financial telemetry table (Payroll, CRE OpEx, Overheads, Net TCO in INR Crores and USD Millions).

### 4. City Comparator & Real Estate Telemetry (`/cities`)
* Side-by-side empirical benchmarking between any 2 candidate cities across 10 top Indian hubs.
* Metrics: Grade A office rents (₹/sq ft/mo), tech workforce depth, mid vs. senior salary bands, attrition rates, and airport connectivity.
* Curated list of micro-markets, core advantages, and location friction points.

### 5. State Policy Navigator (`/policies`)
* 10-state comparative incentive engine (Karnataka, Tamil Nadu, Telangana, Maharashtra, Gujarat GIFT City, Uttar Pradesh, Rajasthan, Madhya Pradesh, Kerala, Odisha).
* 4-pillar breakdown: Capital Subsidy / R&D, Payroll & Skilling Grants, Rental Support & Stamp Duty, and Power Tariff rebates.
* Single-window portal links and strategic differentiators.

### 6. Salary Intelligence & Talent Scarcity (`/salaries`)
* Verified compensation bands across 8 benchmark GCC roles (Principal AI/ML, Cloud Architect, Full-Stack, Site Leaders).
* City salary breakdown across Bengaluru, Hyderabad, Delhi-NCR, Pune, and Tier-2 hubs.
* The **GCC Compensation Premium** (+25% to +50% over traditional IT outsourcing).

### 7. AI Setup Advisor (`/advisor`)
* Real-time conversational advisory engine powered by **Groq LLM** (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`) with fallback to **Google Gemini 2.0 Flash**.
* Markdown table and structured briefing formatting.
* Grounded in verified DEMPE tax transfer pricing (15.5% safe harbour), BOT exit traps, and 24-week setup roadmaps.

---

## 🎨 Enterprise Design System
* **Cohesive Monochromatic Palette**: Dark slate base (`--surface-base: #09090b`) with a single disciplined **Amber Gold (`#f59e0b`)** primary accent.
* **Light / Dark Theme Support**: Global toggle with an interactive **Circular Radial Ripple Effect** powered by the Web View Transitions API.
* **Collapsible Sidebar Layout**: Clean 240px expanded navigation rail with a 68px collapsed mode, tooltips, and responsive mobile drawer.
* **Tabular Typography**: `font-variant-numeric: tabular-nums` for precise financial figures and telemetry alignment.

---

## ⚠️ Prototype Status & Production Roadmap

> [!NOTE]
> **This project is a high-fidelity interactive prototype developed to showcase the core user experience, data schema, and decision funnel for the Flexiple assignment.**

To scale this platform to full enterprise production, the following architecture and features are planned:

### 1. Database Scaling (20 Benchmark GCCs → All 2,117+ Entities)
* **Current State**: Uses a curated benchmark dataset of 20 verified mega-GCCs in local JSON (`data/gccs.json`) for zero-latency prototype demonstration.
* **Production Roadmap**:
  - Migrate to **PostgreSQL (Supabase / Neon)** with **pgvector** and search indexing (**Meilisearch** or **Typesense**).
  - Scale directory to cover all **2,117+ installed GCCs** with detailed categorization (parent company revenue, employee count, physical campus addresses, business units, and captive vs. partner-operated models).
  - Automated data ingestion pipeline combining **Ministry of Corporate Affairs (MCA)** filings, commercial real estate lease registrations (**CBRE / JLL**), and verified LinkedIn talent telemetry.

### 2. User Authentication & Multi-Tenancy
* **Current State**: Open access for instant evaluation by recruiters and hiring managers.
* **Production Roadmap**:
  - Integrate **NextAuth.js / Clerk / Supabase Auth** with enterprise SSO (Google Workspace, Microsoft Entra ID).
  - Role-Based Access Control (**RBAC**): Separate roles for Enterprise Founders, GCC Site Leaders, HR / Talent Acquisition, and Government Investment Officers.

### 3. Persistent AI Chat History & Board Export
* **Current State**: Session-based memory in the AI Advisor (resets on reload or via the "Clear Chat" button).
* **Production Roadmap**:
  - Store conversation threads per authenticated user in PostgreSQL.
  - Multi-session drawer to review, rename, or resume previous advisory evaluations.
  - One-click **"Export Board Blueprint (PDF)"** feature to download executive-ready setup summaries with financial models.

### 4. Verified Service Provider Marketplace
* **Production Roadmap**:
  - Vetted marketplace connecting global entrants with top India entry partners (Legal/incorporation firms, CRE brokers, EOR/PEO providers, and executive search firms).
  - Transparent pricing grids and verified client reviews to prevent BOT markup traps.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 / 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, CSS Custom Properties Design Tokens
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Markdown Rendering**: `react-markdown` + `remark-gfm`
- **AI Inference**: Groq SDK (`openai/gpt-oss-120b`, `qwen/qwen3.8-27b`), `@google/genai` (`gemini-2.0-flash`)

---

## ⚡ Quick Start (Running Locally)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd gcc-compass
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API keys are provided, the platform gracefully uses its built-in knowledge engine fallback for all queries.)*

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 👥 Author & Assignment Context
- **Candidate**: Shah Kunj
- **Application**: Flexiple Product Intern Assignment
- **Submission Date**: October 2026
