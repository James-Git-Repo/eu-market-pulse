-- Add category column to Covers table to identify different types of images
ALTER TABLE public."Covers" 
ADD COLUMN IF NOT EXISTS category text;

-- Add name column to Covers table for additional identification
ALTER TABLE public."Covers" 
ADD COLUMN IF NOT EXISTS name text;

-- Insert default entries for About page images if they don't exist
INSERT INTO public."Covers" (category, name, image)
VALUES 
  ('about', 'hero-photo', NULL),
  ('about', 'grid-photo', NULL)
ON CONFLICT DO NOTHING;