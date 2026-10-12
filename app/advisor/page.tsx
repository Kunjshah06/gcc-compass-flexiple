"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  Send,
  User,
  RotateCcw,
  Cpu,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  provider?: string;
  timestamp?: string;
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `### Welcome to the GCC Strategic Advisory Engine

I am grounded directly in verified **FY2026 ground-truth data** for India's **2,117 GCCs (\$98.4B revenue)**.

**I can assist you with:**
- **Location Strategy** — Deep micro-market rent, salary, and attrition trade-offs across 10 top hubs
- **State Incentives** — Navigating Karnataka, Tamil Nadu, Telangana, and Gujarat GIFT City 10-year tax policies
- **Operating Models** — Captive vs. BOT markups (15–25% spread risks) vs. EOR transitions
- **Total Cost of Operations (TCO)** — Budgets, safe harbour margins (15.5%), and hiring velocity

*Type your question below to begin:*`,
      provider: "GCC Compass Intelligence Engine",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = { role: "user", content: query, timestamp: timeStr };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: data.reply,
            provider: data.provider,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "An unexpected error occurred. Please retry.", timestamp: timeStr },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Network error connecting to the AI inference gateway.", timestamp: timeStr },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetSession = () => {
    setMessages([
      {
        role: "assistant",
        content: `### Session Reset\n\nReady for your next evaluation. How can I help you architect your India capability centre?`,
        provider: "GCC Compass Intelligence Engine",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      {/* ── Header ── */}
      <div
        className="shrink-0 px-4 py-3 sm:px-8"
        style={{ borderBottom: "1px solid var(--border-subtle)", backgroundColor: "var(--surface-1)" }}
      >
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md shrink-0"
              style={{ backgroundColor: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}
            >
              <Bot className="h-4 w-4" style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[13px] font-bold">GCC Setup Strategic Advisor</h1>
                <span
                  className="flex items-center gap-1 rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: "rgba(34,197,94,0.1)",
                    color: "var(--green)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--green)" }}
                  />
                  Live · Groq + Gemini
                </span>
              </div>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-tertiary)" }}>
                Real-time reasoning over 2,117 GCCs · 10 state policies · CRE data
              </p>
            </div>
          </div>

          <button
            onClick={resetSession}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition"
            style={{
              backgroundColor: "var(--surface-2)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
            title="Clear chat and start fresh"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-5xl space-y-5 pb-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "assistant" && (
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md mt-0.5"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  <Bot className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                </div>
              )}

              <div
                className="max-w-[90%] sm:max-w-[82%] rounded-lg px-4 py-3.5"
                style={
                  m.role === "user"
                    ? {
                        backgroundColor: "var(--surface-3)",
                        border: "1px solid var(--border-muted)",
                        color: "var(--text-primary)",
                      }
                    : {
                        backgroundColor: "var(--surface-1)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                      }
                }
              >
                {m.role === "user" ? (
                  <p className="text-[12.5px] leading-relaxed whitespace-pre-wrap">{m.content}</p>
                ) : (
                  <div className="prose-custom overflow-x-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </div>
                )}

                <div
                  className="mt-2.5 flex items-center justify-between text-[9.5px] pt-2"
                  style={{
                    borderTop: "1px solid var(--border-subtle)",
                    color: "var(--text-tertiary)",
                  }}
                >
                  <span className="flex items-center gap-1">
                    {m.role === "assistant" && <Cpu className="h-2.5 w-2.5" style={{ color: "var(--accent)" }} />}
                    {m.provider || (m.role === "user" ? "You" : "Advisor Engine")}
                  </span>
                  <span className="stat-num">{m.timestamp}</span>
                </div>
              </div>

              {m.role === "user" && (
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md mt-0.5"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{
                  backgroundColor: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                <Bot className="h-3.5 w-3.5 animate-spin" style={{ color: "var(--accent)" }} />
              </div>
              <div
                className="rounded-lg px-4 py-3 text-[11px] flex items-center gap-3"
                style={{
                  backgroundColor: "var(--surface-1)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-tertiary)",
                }}
              >
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:0.15s]" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:0.3s]" style={{ backgroundColor: "var(--accent)" }} />
                </div>
                <span>Analyzing GCC benchmarks and synthesizing recommendation...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>


      {/* ── Input Bar ── */}
      <div
        className="shrink-0 px-4 py-3 sm:px-8"
        style={{ borderTop: "1px solid var(--border-subtle)", backgroundColor: "var(--surface-1)" }}
      >
        <div className="mx-auto max-w-5xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 rounded-md p-1.5 transition focus-within:ring-1 focus-within:ring-amber-500/50"
            style={{
              backgroundColor: "var(--surface-2)",
              border: "1px solid var(--border-muted)",
            }}
          >
            <input
              type="text"
              placeholder="Ask anything about GCC setup, TCO, state subsidies, BOT models..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={loading}
              suppressHydrationWarning
              className="flex-1 bg-transparent px-3 py-1.5 text-[12.5px] outline-none disabled:opacity-50"
              style={{ color: "var(--text-primary)" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-md transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
              style={{
                backgroundColor: input.trim() && !loading ? "var(--accent)" : "var(--surface-3)",
                color: input.trim() && !loading ? "#09090b" : "var(--text-tertiary)",
              }}
              aria-label="Send query"
              title="Send message (Enter)"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
          <p className="mt-2 text-center text-[9.5px]" style={{ color: "var(--text-tertiary)" }}>
            Ground-truth data from NASSCOM-Zinnov 2026 · State gazettes · CBRE/JLL Grade A leasing reports
          </p>
        </div>
      </div>
    </div>
  );
}
