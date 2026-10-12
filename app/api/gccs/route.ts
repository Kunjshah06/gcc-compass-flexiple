import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const sector = searchParams.get("sector") || "All";
    const city = searchParams.get("city") || "All";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let query = supabase.from("gccs").select("*", { count: "exact" });

    // Filter by sector
    if (sector && sector !== "All") {
      query = query.eq("sector", sector);
    }

    // Filter by city (PostgreSQL array contains)
    if (city && city !== "All") {
      query = query.contains("india_cities", [city]);
    }

    // Filter by search query (company, parent HQ, or functions)
    if (search && search.trim() !== "") {
      const term = `%${search.trim()}%`;
      query = query.or(`company.ilike.${term},parent_hq.ilike.${term}`);
    }

    // Sort by largest headcount first
    query = query.order("india_headcount", { ascending: false });

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      source: "supabase",
    });
  } catch (err: any) {
    if (err?.digest?.includes("NEXT_PRERENDER")) {
      throw err;
    }
    console.error("API /api/gccs error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
