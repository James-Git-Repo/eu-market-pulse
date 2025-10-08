-- Create Resources table for storing community resources
CREATE TABLE public."Resources" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  category text NOT NULL, -- 'podcasts', 'articles', 'tools'
  title text NOT NULL,
  description text,
  metadata text, -- for storing duration, read time, or other info
  url text, -- optional external link
  icon text, -- icon name or emoji
  sort_order integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE public."Resources" ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view resources
CREATE POLICY "Resources are viewable by everyone"
  ON public."Resources"
  FOR SELECT
  USING (true);

-- Allow authenticated users to manage resources
CREATE POLICY "Authenticated users can insert resources"
  ON public."Resources"
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update resources"
  ON public."Resources"
  FOR UPDATE
  USING (true);

CREATE POLICY "Authenticated users can delete resources"
  ON public."Resources"
  FOR DELETE
  USING (true);