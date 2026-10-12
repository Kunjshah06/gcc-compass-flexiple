"use client";

import React, { useState, useEffect, useCallback } from "react";
import fallbackData from "@/data/gccs.json";
import {
  Search,
  Building2,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  SlidersHorizontal,
  Database,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface GCCItem {
  id: string | number;
  company: string;
  parent_hq: string;
  hq_country?: string;
  sector: string;
  year_established?: number;
  india_headcount: number;
  india_cities: string[];
  key_functions: string[];
  maturity_level: string;
  website?: string;
  notable_fact?: string;
}

const SECTORS = [
  "All",
  "BFSI",
  "Tech & Software",
  "Retail & CPG",
  "Industrial & Manufacturing",
  "Healthcare & Life Sciences",
];

const CITIES = [
  "All",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Mumbai",
  "Noida",
  "Gurugram",
  "Coimbatore",
  "Ahmedabad",
];

export default function GCCExplorerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const [gccList, setGccList] = useState<GCCItem[]>(fallbackData as any);
  const [total, setTotal] = useState<number>(fallbackData.length);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<"supabase" | "local">("local");

  // Fetch paginated & filtered data from Supabase API route
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sector: selectedSector,
        city: selectedCity,
        search: searchTerm,
      });

      const res = await fetch(`/api/gccs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch from Supabase");

      const json = await res.json();
      if (json.data && json.data.length > 0) {
        setGccList(json.data);
        setTotal(json.total);
        setTotalPages(json.totalPages);
        setSource("supabase");
      } else if (json.data && json.data.length === 0 && (searchTerm || selectedSector !== "All" || selectedCity !== "All")) {
        // Legitimate empty filter result from database
        setGccList([]);
        setTotal(0);
        setTotalPages(1);
        setSource("supabase");
      } else {
        // Fallback to local dataset
        useLocalFallback();
      }
    } catch {
      useLocalFallback();
    } finally {
      setLoading(false);
    }
  }, [page, limit, selectedSector, selectedCity, searchTerm]);

  const useLocalFallback = () => {
    let filtered = (fallbackData as any).filter((item: GCCItem) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.parent_hq.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.key_functions.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSector = selectedSector === "All" || item.sector === selectedSector;
      const matchesCity = selectedCity === "All" || item.india_cities.includes(selectedCity);
      return matchesSearch && matchesSector && matchesCity;
    });

    const from = (page - 1) * limit;
    setGccList(filtered.slice(from, from + limit));
    setTotal(filtered.length);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / limit)));
    setSource("local");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchData]);

  // Reset to page 1 on filter or search change
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setPage(1);
  };

  const handleSectorChange = (val: string) => {
    setSelectedSector(val);
    setPage(1);
  };

  const handleCityChange = (val: string) => {
    setSelectedCity(val);
    setPage(1);
  };

  return (
    <div
      className="min-h-screen px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--surface-base)", color: "var(--text-primary)" }}
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-3xl">
            <div
              className="inline-flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "var(--accent)", border: "1px solid rgba(245,158,11,0.2)" }}
            >
              <Building2 className="h-3 w-3" />
              Verified Enterprise Directory
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

          {/* Database Live Status Badge */}
          <div
            className="rounded-lg p-3 self-start sm:self-auto flex items-center gap-3 shrink-0"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-md"
              style={{ backgroundColor: source === "supabase" ? "rgba(34,197,94,0.12)" : "rgba(245,158,11,0.12)" }}
            >
              <Database
                className="h-4 w-4"
                style={{ color: source === "supabase" ? "var(--green)" : "var(--accent)" }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11.5px] font-bold">
                  {source === "supabase" ? "Supabase PostgreSQL" : "Local Benchmark Cache"}
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: source === "supabase" ? "var(--green)" : "var(--accent)" }}
                />
              </div>
              <span className="text-[10px] block" style={{ color: "var(--text-tertiary)" }}>
                {source === "supabase" ? "Live Server Database Connection" : "Local Verified Dataset"}
              </span>
            </div>
          </div>
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
              placeholder="Search enterprise company, parent HQ, or tech workstream..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
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
              onChange={(e) => handleSectorChange(e.target.value)}
              aria-label="Filter by Sector"
              suppressHydrationWarning
              className="rounded-md px-3 py-2 text-[11.5px] font-medium outline-none cursor-pointer transition"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Sectors" : s}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              aria-label="Filter by City"
              suppressHydrationWarning
              className="rounded-md px-3 py-2 text-[11.5px] font-medium outline-none cursor-pointer transition"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Hubs" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results Count & Source ── */}
        <div className="mt-3 flex items-center justify-between text-[11px] px-0.5" style={{ color: "var(--text-tertiary)" }}>
          <span>
            Showing page <strong style={{ color: "var(--text-primary)" }}>{page}</strong> of{" "}
            <strong style={{ color: "var(--text-primary)" }}>{totalPages}</strong> (
            <strong style={{ color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>{total}</strong> total GCCs found)
          </span>
          <span className="hidden sm:inline">Sorted by Installed India Headcount</span>
        </div>

        {/* ── Cards Grid ── */}
        {loading ? (
          <div className="py-24 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3" style={{ color: "var(--accent)" }} />
            <p className="text-[13px] font-medium" style={{ color: "var(--text-secondary)" }}>
              Querying enterprise directory from Supabase...
            </p>
          </div>
        ) : gccList.length === 0 ? (
          <div
            className="mt-6 rounded-lg p-12 text-center"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <p className="text-sm font-bold">No GCCs match your search or filter criteria.</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-tertiary)" }}>
              Try clearing your search keyword or switching the sector/city dropdown to "All".
            </p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gccList.map((gcc) => (
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
                  {gcc.year_established && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
                      <span style={{ color: "var(--text-tertiary)" }}>Est.</span>
                      <span className="stat-num font-bold">{gcc.year_established}</span>
                    </div>
                  )}
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
                  {gcc.website && (
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
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination Controls ── */}
        {totalPages > 1 && (
          <div
            className="mt-8 flex items-center justify-between rounded-lg p-3"
            style={{ backgroundColor: "var(--surface-1)", border: "1px solid var(--border-subtle)" }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>

            <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              style={{
                backgroundColor: "var(--surface-2)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
              }}
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
