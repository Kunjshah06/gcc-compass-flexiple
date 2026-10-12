"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Building2,
  Calculator,
  FileCheck2,
  Coins,
  Bot,
  BarChart3,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Executive Briefing", href: "/", icon: BarChart3, step: "0" },
  { name: "1. Discover GCCs", href: "/explorer", icon: Building2, step: "1" },
  { name: "2. TCO Calculator", href: "/calculator", icon: Calculator, step: "2", highlight: true },
  { name: "3. State Subsidies", href: "/policies", icon: FileCheck2, step: "3" },
  { name: "4. Salary Grids", href: "/salaries", icon: Coins, step: "4" },
  { name: "5. AI Setup Architect", href: "/advisor", icon: Bot, isAi: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#030712]/60 backdrop-blur-sm">
              <Compass className="h-5 w-5 text-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                GCC Compass
              </span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-400 tracking-wider">
                DECISION OS
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 -mt-0.5">
              India Entry & Location Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Workflow */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            if (item.isAi) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 border ml-1 ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30"
                      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20 hover:text-white"
                  }`}
                >
                  <Bot className="h-3.5 w-3.5 text-indigo-400" />
                  {item.name}
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                </Link>
              );
            }

            if (item.highlight) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-300"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.name}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                    : "text-slate-300 hover:bg-slate-900/80 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5 text-slate-400" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/calculator"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:brightness-110 active:scale-95"
          >
            <Calculator className="h-3.5 w-3.5" />
            Calculate 1Y TCO
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden border border-slate-800"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-slate-800 bg-[#030712] px-4 pt-2 pb-4 lg:hidden">
          <div className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
