-- ============================================================
-- GCC COMPASS DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Run this in your Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================

-- 1. Create the gccs table
CREATE TABLE IF NOT EXISTS public.gccs (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  parent_hq TEXT NOT NULL,
  hq_country TEXT NOT NULL,
  sector TEXT NOT NULL,
  year_established INT,
  india_headcount INT NOT NULL DEFAULT 0,
  india_cities TEXT[] NOT NULL DEFAULT '{}',
  key_functions TEXT[] NOT NULL DEFAULT '{}',
  maturity_level TEXT NOT NULL DEFAULT 'Portfolio Hub',
  website TEXT,
  notable_fact TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) but allow Public Read access
ALTER TABLE public.gccs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to GCCs" 
ON public.gccs 
FOR SELECT 
USING (true);

CREATE POLICY "Allow insert via anon or authenticated" 
ON public.gccs 
FOR INSERT 
WITH CHECK (true);

-- 3. Create performance indexes for search and filters
CREATE INDEX IF NOT EXISTS idx_gccs_sector ON public.gccs(sector);
CREATE INDEX IF NOT EXISTS idx_gccs_headcount ON public.gccs(india_headcount DESC);
CREATE INDEX IF NOT EXISTS idx_gccs_company ON public.gccs(company);
