"use client";

import React, { useState, useMemo } from "react";
import gccData from "@/data/gccs.json";
import {
  Search,
  Building2,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";

export default function GCCExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");

  const sectors = useMemo(() => {
    const list = Array.from(new Set(gccData.map((g) => g.sector)));
    return ["All", ...list];
  }, []);

  const cities = useMemo(() => {
    const allCities = gccData.flatMap((g) => g.india_cities);
    const unique = Array.from(new Set(allCities));
    return ["All", ...unique.sort()];
  }, []);

  const filteredData = useMemo(() => {
    return gccData.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_hq.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.key_functions.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSector = selectedSector === "All" || item.sector === selectedSector;
      const matchesCity = selectedCity === "All" || item.india_cities.includes(selectedCity);
      return matchesSearch && matchesSector && matchesCity;
    });
  }, [searchTerm, selectedSector, selectedCity]);

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
            <Building2 className="h-3 w-3" />
            Verified Enterprise Dataset
          </div>
          <h1
            className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            GCC Directory &amp; Intelligence Explorer
          </h1>
          <p className="mt-2 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            Browse verified mega-GCCs and high-impact innovation centres operating in India.
          </p>
        </div>

        {/* ── Controls Bar ── */}
        <div
          className="mt-8 flex flex-col gap-3 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
              style={{ color: "var(--text-tertiary)" }}
            />
            <input
              type="text"
              placeholder="Search company, parent HQ, or tech workstream..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md py-2 pl-9 pr-4 text-[12.5px] outline-none transition"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className="flex items-center gap-1.5 text-[11px] font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter:
            </span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              aria-label="Filter by Sector"
              suppressHydrationWarning
              className="rounded-md px-3 py-2 text-[11.5px] font-medium outline-none cursor-pointer transition"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Sectors" : s}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by City"
              suppressHydrationWarning
              className="rounded-md px-3 py-2 text-[11.5px] font-medium outline-none cursor-pointer transition"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Hubs" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results Count ── */}
        <div className="mt-3 flex items-center justify-between text-[11px] px-0.5" style={{ color: "var(--text-tertiary)" }}>
          <span>
            Showing{" "}
            <strong style={{ color: "var(--text-primary)", fontVariantNumeric: "tabular-nums" }}>
              {filteredData.length}
            </strong>{" "}
            of {gccData.length} benchmark GCCs
          </span>
          <span className="hidden sm:inline">Maturity spectrum: Portfolio Hub → Transformation Engine</span>
        </div>

        {/* ── Cards Grid ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((gcc) => (
            <div
              key={gcc.id}
              className="flex flex-col rounded-lg p-5 transition-all duration-150"
              style={{
                backgroundColor: "var(--surface-1)",
                border: "1px solid var(--border-subtle)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-muted)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="text-[14px] font-bold tracking-tight truncate">{gcc.company}</h3>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--text-tertiary)" }}>
                    HQ: {gcc.parent_hq}
                  </p>
                </div>
                <span
                  className="shrink-0 rounded px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--surface-3)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-muted)",
                  }}
                >
                  {gcc.sector}
                </span>
              </div>

              {/* Stats Row */}
              <div
                className="mt-4 flex items-center gap-5 py-3 text-[11.5px]"
                style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
                  <span className="stat-num font-bold">{gcc.india_headcount.toLocaleString("en-IN")}</span>
                  <span style={{ color: "var(--text-tertiary)" }}>FTEs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
                  <span style={{ color: "var(--text-tertiary)" }}>Est.</span>
                  <span className="stat-num font-bold">{gcc.year_established}</span>
                </div>
              </div>

              {/* Cities */}
              <div className="mt-3.5">
                <div
                  className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <MapPin className="h-2.5 w-2.5" />
                  Locations
                </div>
                <div className="flex flex-wrap gap-1">
                  {gcc.india_cities.map((city) => (
                    <span
                      key={city}
                      className="rounded px-2 py-0.5 text-[10.5px] font-medium"
                      style={{
                        backgroundColor: "var(--surface-2)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workstreams */}
              <div className="mt-3">
                <div
                  className="text-[9.5px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Workstreams
                </div>
                <div className="flex flex-wrap gap-1">
                  {gcc.key_functions.map((func) => (
                    <span
                      key={func}
                      className="rounded px-2 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: "rgba(245,158,11,0.07)",
                        color: "var(--accent)",
                        border: "1px solid rgba(245,158,11,0.18)",
                      }}
                    >
                      {func}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notable Fact */}
              {gcc.notable_fact && (
                <div
                  className="mt-3.5 rounded p-3 text-[11px] leading-relaxed"
                  style={{
                    backgroundColor: "var(--surface-2)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span className="font-bold" style={{ color: "var(--accent)" }}>Intel: </span>
                  {gcc.notable_fact}
                </div>
              )}

              {/* Footer */}
              <div
                className="mt-4 pt-3 flex items-center justify-between text-[10.5px]"
                style={{ borderTop: "1px solid var(--border-subtle)" }}
              >
                <span className="font-semibold" style={{ color: "var(--green)" }}>
                  {gcc.maturity_level}
                </span>
                <a
                  href={gcc.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 transition"
                  style={{ color: "var(--text-tertiary)" }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)"}
                >
                  Official Portal <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
