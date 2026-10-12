import { NextRequest, NextResponse } from "next/server";
import gccData from "@/data/gccs.json";
import cityData from "@/data/cities.json";
import incentiveData from "@/data/incentives.json";
import salaryData from "@/data/salaries.json";

const SYSTEM_PROMPT = `You are "GCC Compass AI", an expert strategic advisor and product intelligence engine specializing in India's Global Capability Centres (GCC) ecosystem.
You are helping global founders, product managers, and enterprise executives (e.g., at Flexiple and Fortune 500/mid-market MNCs) evaluate setting up, benchmarking, or expanding their GCC operations in India.

You have access to the verified FY2026 ground truth dataset:
- Total GCCs in India: 2,117 enterprises across 3,728 units
- Total GCC workforce: 2.36 million professionals
- Annual GCC market revenue: $98.4 billion
- 10+ State Government GCC policies (Karnataka, Telangana, Tamil Nadu, Maharashtra, Gujarat GIFT City, Uttar Pradesh, etc.)
- Top cities with real estate Grade A rates, attrition, tech talent pool, and salary bands
- Major GCCs: JPMorgan (55k), HSBC (42k), Wells Fargo (37k), Bosch BGSW (36k), Optum (35k), Citi (32.5k), etc.

Tone: Crisp, highly quantitative, authoritative, actionable, and structured.
Always format your answers with markdown headings, bullet points, and data tables where relevant. Highlight trade-offs (e.g., Tier-1 high talent liquidity vs Tier-2 low attrition/cost).
If the user asks about specific cities, providers, tax safe harbour (15.5%), BOT models, or state payroll subsidies, cite actual numbers.
Always conclude every section and sentence completely. Do not leave trailing bullet points or incomplete thoughts.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required." }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // 1. Try Groq with model fallback
    if (groqKey && groqKey.trim() !== "") {
      try {
        const { default: Groq } = await import("groq-sdk");
        const groq = new Groq({ apiKey: groqKey });

        const formattedMessages = [
          { role: "system" as const, content: SYSTEM_PROMPT },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role === "user" ? ("user" as const) : ("assistant" as const),
            content: m.content,
          })),
        ];

        // List of currently verified active models on this Groq account
        const candidateModels = [
          "openai/gpt-oss-120b",
          "openai/gpt-oss-20b",
          "qwen/qwen3.8-27b",
        ];

        let reply = "";
        let usedModel = "";

        for (const modelId of candidateModels) {
          try {
            const chatCompletion = await groq.chat.completions.create({
              messages: formattedMessages,
              model: modelId,
              temperature: 0.3,
              max_tokens: 4096,
            });
            reply = chatCompletion.choices[0]?.message?.content || "";
            if (reply) {
              usedModel = modelId;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Groq model ${modelId} failed:`, modelErr?.status || modelErr?.message || modelErr);
          }
        }

        if (reply) {
          return NextResponse.json({ reply, provider: `Groq (${usedModel})` });
        }
      } catch (groqErr) {
        console.warn("Groq API error, attempting fallback:", groqErr);
      }
    }

    // 2. Fallback to Google Gemini
    if (geminiKey && geminiKey.trim() !== "") {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: geminiKey });

        const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }));
        const lastUserMessage = messages[messages.length - 1]?.content || "";

        const chat = ai.chats.create({
          model: "gemini-2.0-flash",
          config: {
            systemInstruction: SYSTEM_PROMPT,
            temperature: 0.3,
          },
          history,
        });

        const response = await chat.sendMessage({ message: lastUserMessage });
        const reply = response.text || "No response generated.";
        return NextResponse.json({ reply, provider: "Google Gemini 2.0 Flash" });
      } catch (geminiErr) {
        console.warn("Gemini API error:", geminiErr);
      }
    }

    // 3. Built-in Smart Local Fallback if no keys provided yet
    const lastQuery = (messages[messages.length - 1]?.content || "").toLowerCase();
    let localReply = "";

    if (lastQuery.includes("bangalore") || lastQuery.includes("bengaluru") || lastQuery.includes("hyderabad")) {
      localReply = `### 🏙️ Bengaluru vs. Hyderabad Head-to-Head Comparison

| Parameter | **Bengaluru** | **Hyderabad** | Advantage |
| :--- | :--- | :--- | :--- |
| **Active GCC Units** | 1,080+ units (29% share) | 515+ units (14% share) | **Bengaluru** (Volume & Network) |
| **Tech Talent Pool** | 1.65 Million | 850,000 | **Bengaluru** (Deepest AI/DeepTech) |
| **Grade A Rent (sq ft/mo)** | ₹95 – ₹145 | ₹68 – ₹95 | **Hyderabad** (~25% cheaper) |
| **Mid-Level Tech Salary** | ₹18 – ₹36 LPA | ₹16 – ₹32 LPA | **Hyderabad** (Lower wage base) |
| **Annual Attrition** | 16% – 22% (High turnover) | 14% – 18% (Moderate) | **Hyderabad** (Stickier talent) |
| **Strategic Focus** | AI/GenAI, DeepTech, Cloud, SaaS, Semi | BFSI Tech, Life Sciences/Pharma, Cloud | Specialized by vertical |

> **Advisor Recommendation:** Choose **Bengaluru** if building core AI research, global product ownership, or specialized semiconductor teams. Choose **Hyderabad** if scaling large-scale BFSI engineering, pharma analytics, or seeking superior infrastructure at lower capex.`;
    } else if (lastQuery.includes("incentive") || lastQuery.includes("state") || lastQuery.includes("policy")) {
      localReply = `### 🏛️ State Policy Landscape for GCCs (2025–2026)

1. **Karnataka GCC Policy (2024–2029):**
   - India's 1st dedicated standalone policy.
   - 50% rental reimbursement (Beyond Bengaluru clusters) capped at ₹2 Cr.
   - 50% student intern stipend reimbursement for up to 100,000 interns.
   - 45-day single-window fast-track (KATALYST).

2. **Tamil Nadu GCC Incentive Scheme:**
   - Escalating payroll subsidy: **30% (Yr 1) → 20% (Yr 2) → 10% (Yr 3)** for high-skill employees (>₹1L/month).
   - 25% capital subsidy on Fixed Assets up to ₹25 Cr for R&D labs.

3. **Gujarat GIFT City IFSC:**
   - **10-year 100% corporate tax holiday** under Sec 80LA.
   - 0% GST, freely convertible foreign currency transactions (USD/EUR).

4. **Telangana ICT Framework:**
   - 200-acre **Hyderabad AI City**, industrial power tariffs, deemed 15–30 day single window (TS-iPASS).`;
    } else {
      localReply = `### 🇮🇳 GCC Compass Intelligence Overview

India's GCC market is experiencing a massive shift from routine cost arbitrage to **"Enterprise Nerve Centers"**:
- **Market Size:** $98.4 Billion FY2026 across 2,117 enterprises (3,728 units)
- **Talent Pool:** 2.36 Million engineers & domain experts
- **Key Bottlenecks:** Lack of centralized directories, 30-50% candidate notice dropouts, and opaque service provider pricing.

*(💡 **Tip:** Add your free \`GROQ_API_KEY\` or \`GEMINI_API_KEY\` to \`.env.local\` to enable dynamic real-time AI reasoning across all queries!)*`;
    }

    return NextResponse.json({
      reply: localReply,
      provider: "Built-in Knowledge Engine (Demo Mode)",
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
