"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Building2,
  Calculator,
  CheckSquare,
  FileCheck2,
  Coins,
  Bot,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MapPin,
  Sun,
  Moon,
  LogIn,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";
import AuthModal from "./AuthModal";

const NAV_ITEMS = [
  { name: "Executive Briefing",  href: "/",           icon: BarChart3,   label: "Home" },
  { name: "GCC Explorer",        href: "/explorer",   icon: Building2,   label: "2,117" },
  { name: "TCO Calculator",      href: "/calculator", icon: Calculator,  label: "Stage 2" },
  { name: "Setup Roadmap",       href: "/roadmap",    icon: CheckSquare, label: "6-Mo Plan" },
  { name: "City Benchmarks",     href: "/cities",     icon: MapPin,      label: "10 cities" },
  { name: "State Policies",      href: "/policies",   icon: FileCheck2,  label: "10 states" },
  { name: "Salary Intelligence", href: "/salaries",   icon: Coins,       label: "Live" },
  { name: "AI Setup Advisor",    href: "/advisor",    icon: Bot,         label: "Groq LLM", isAi: true },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}>

      {/* ── Mobile Top Bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex h-13 items-center justify-between px-4 md:hidden"
        style={{ backgroundColor: "var(--surface-1)", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ backgroundColor: "var(--accent)", color: "#09090b" }}
          >
            <Compass className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            GCC Compass
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* User Sign In / Profile */}
          {user ? (
            <button
              onClick={() => signOut()}
              suppressHydrationWarning
              className="flex h-8 w-8 items-center justify-center rounded-md transition cursor-pointer"
              style={{
                backgroundColor: "rgba(34,197,94,0.12)",
                color: "var(--green)",
                border: "1px solid rgba(34,197,94,0.25)",
              }}
              title={`Signed in as ${user.email} (Click to Sign Out)`}
            >
              <UserIcon className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode("signin");
                setAuthModalOpen(true);
              }}
              suppressHydrationWarning
              className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-bold transition cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--accent)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <LogIn className="h-3 w-3" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={(e) => toggleTheme(e)}
            suppressHydrationWarning
            className="flex h-8 w-8 items-center justify-center rounded-md transition cursor-pointer"
            style={{
              backgroundColor: "var(--surface-2)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            suppressHydrationWarning
            className="rounded-md p-2 transition cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex flex-col justify-between fixed top-0 bottom-0 left-0 z-40 transition-all duration-200 ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
        style={{
          backgroundColor: "var(--surface-1)",
          borderRight: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          {/* Brand Header */}
          <div
            className={`flex h-14 items-center ${collapsed ? "justify-center px-2" : "justify-between px-3"}`}
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            {!collapsed ? (
              <>
                <Link href="/" className="flex items-center gap-2.5 overflow-hidden min-w-0">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                    style={{ backgroundColor: "var(--accent)", color: "#09090b" }}
                  >
                    <Compass className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-[13px] font-bold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
                      GCC Compass
                    </div>
                    <div className="text-[10px] truncate" style={{ color: "var(--text-tertiary)" }}>
                      India Entry Intelligence
                    </div>
                  </div>
                </Link>

                <button
                  onClick={() => setCollapsed(true)}
                  suppressHydrationWarning
                  className="rounded-md p-1.5 transition shrink-0 cursor-pointer"
                  style={{ color: "var(--text-tertiary)", backgroundColor: "var(--surface-2)" }}
                  title="Collapse sidebar"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setCollapsed(false)}
                suppressHydrationWarning
                className="flex h-9 w-9 items-center justify-center rounded-md transition cursor-pointer group"
                style={{ backgroundColor: "rgba(245,158,11,0.12)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.25)" }}
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-4 w-4 transition-transform group-hover:scale-110" />
              </button>
            )}
          </div>

          {/* Nav Label */}
          {!collapsed && (
            <div className="px-4 pt-5 pb-1.5">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                Decision Pipeline
              </span>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="mt-2 px-2 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.name : undefined}
                  className={`flex items-center rounded-md text-[12.5px] font-medium transition-all duration-150 group relative ${
                    collapsed
                      ? "justify-center h-10 w-full"
                      : "gap-2.5 px-2.5 py-2"
                  } ${
                    !collapsed && isActive
                      ? "border-l-2 border-l-amber-500"
                      : !collapsed
                      ? "border-l-2 border-l-transparent"
                      : isActive
                      ? "border border-amber-500/40"
                      : "border border-transparent"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--surface-3)" : "transparent",
                    color: isActive
                      ? "var(--text-primary)"
                      : item.isAi
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-2)";
                      (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = item.isAi
                        ? "var(--accent)"
                        : "var(--text-secondary)";
                    }
                  }}
                >
                  <Icon className="h-4 w-4 shrink-0" />

                  {!collapsed && (
                    <div className="flex flex-1 items-center justify-between overflow-hidden">
                      <span className="truncate">{item.name}</span>
                      {item.label && (
                        <span
                          className="text-[9px] font-mono ml-2 shrink-0"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {item.label}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Tooltip on collapsed */}
                  {collapsed && (
                    <span
                      className="pointer-events-none absolute left-full ml-3 hidden rounded-md px-2.5 py-1 text-xs font-medium shadow-xl group-hover:block whitespace-nowrap z-50"
                      style={{
                        backgroundColor: "var(--surface-3)",
                        color: "var(--text-primary)",
                        border: "1px solid var(--border-muted)",
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom — Theme Toggle & User Account */}
        <div className="p-3 space-y-2" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          {/* Theme Toggle Button */}
          {!collapsed ? (
            <button
              onClick={(e) => toggleTheme(e)}
              suppressHydrationWarning
              className="flex items-center justify-between w-full rounded-md px-3 py-2 text-[11.5px] font-medium transition cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                ) : (
                  <Moon className="h-3.5 w-3.5 text-slate-700" />
                )}
                <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
              </div>
              <span
                className="text-[9px] font-mono rounded px-1.5 py-0.5"
                style={{ backgroundColor: "var(--surface-3)", color: "var(--text-tertiary)" }}
              >
                {theme.toUpperCase()}
              </span>
            </button>
          ) : (
            <button
              onClick={(e) => toggleTheme(e)}
              suppressHydrationWarning
              className="flex h-9 w-9 items-center justify-center rounded-md transition mx-auto cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-subtle)",
              }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          {/* User Sign In / Profile Status (Placed at very bottom) */}
          {!collapsed ? (
            user ? (
              <div
                className="flex items-center justify-between rounded-md p-2"
                style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full shrink-0"
                    style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "var(--green)" }}
                  >
                    <UserIcon className="h-3 w-3" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold block truncate" style={{ color: "var(--text-primary)" }}>
                      {user.user_metadata?.full_name || user.email?.split("@")[0] || "Executive"}
                    </span>
                    <span className="text-[9px] block truncate" style={{ color: "var(--text-tertiary)" }}>
                      {user.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  suppressHydrationWarning
                  className="rounded p-1 transition cursor-pointer hover:bg-zinc-800"
                  style={{ color: "var(--text-tertiary)" }}
                  title="Sign Out"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("signin");
                  setAuthModalOpen(true);
                }}
                suppressHydrationWarning
                className="flex items-center justify-center gap-2 w-full rounded-md py-2 text-[11.5px] font-bold transition cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-2)",
                  color: "var(--accent)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Executive Sign In</span>
              </button>
            )
          ) : (
            user ? (
              <button
                onClick={() => signOut()}
                suppressHydrationWarning
                className="flex h-9 w-9 items-center justify-center rounded-md transition mx-auto cursor-pointer"
                style={{
                  backgroundColor: "rgba(34,197,94,0.12)",
                  color: "var(--green)",
                  border: "1px solid rgba(34,197,94,0.25)",
                }}
                title={`Signed in as ${user.email} (Click to Sign Out)`}
              >
                <UserIcon className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("signin");
                  setAuthModalOpen(true);
                }}
                suppressHydrationWarning
                className="flex h-9 w-9 items-center justify-center rounded-md transition mx-auto cursor-pointer"
                style={{
                  backgroundColor: "var(--surface-2)",
                  color: "var(--accent)",
                  border: "1px solid var(--border-subtle)",
                }}
                title="Executive Sign In"
              >
                <LogIn className="h-4 w-4" />
              </button>
            )
          )}
        </div>
      </aside>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div
            className="fixed inset-y-0 left-0 w-[240px] flex flex-col justify-between p-4"
            style={{
              backgroundColor: "var(--surface-1)",
              borderRight: "1px solid var(--border-subtle)",
            }}
          >
            <div>
              <div
                className="flex items-center justify-between pb-3"
                style={{ borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-md"
                    style={{ backgroundColor: "var(--accent)", color: "#09090b" }}
                  >
                    <Compass className="h-4 w-4" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold">GCC Compass</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  suppressHydrationWarning
                  style={{ color: "var(--text-secondary)" }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-0.5">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[12.5px] font-medium transition ${
                        isActive
                          ? "border-l-2 border-l-amber-500"
                          : "border-l-2 border-l-transparent"
                      }`}
                      style={{
                        backgroundColor: isActive ? "var(--surface-3)" : "transparent",
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <p className="text-[9.5px]" style={{ color: "var(--text-tertiary)" }}>
              Flexiple Product Intern Assignment · FY2026
            </p>
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <main
        className={`flex-1 transition-all duration-200 w-full pt-13 md:pt-0 ${
          collapsed ? "md:pl-[68px]" : "md:pl-[240px]"
        }`}
      >
        <div className="min-h-screen">{children}</div>
      </main>

      {/* ── Supabase Auth Modal ── */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
