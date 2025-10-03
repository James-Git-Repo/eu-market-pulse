-- Create Covers table to store cover images metadata
CREATE TABLE IF NOT EXISTS public.Covers (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  storage_path TEXT,
  public_url TEXT,
  CONSTRAINT unique_cover_name UNIQUE (name)
);

-- Enable RLS
ALTER TABLE public.Covers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view covers
CREATE POLICY "Covers are viewable by everyone"
ON public.Covers
FOR SELECT
USING (true);

-- Create policy to allow authenticated users to insert covers
CREATE POLICY "Authenticated users can insert covers"
ON public.Covers
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to update covers
CREATE POLICY "Authenticated users can update covers"
ON public.Covers
FOR UPDATE
TO authenticated
USING (true);