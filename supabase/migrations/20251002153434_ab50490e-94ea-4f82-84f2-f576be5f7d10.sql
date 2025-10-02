-- Add columns to Articles table (with correct case)
ALTER TABLE public."Articles" 
ADD COLUMN title TEXT NOT NULL DEFAULT '',
ADD COLUMN subtitle TEXT,
ADD COLUMN tag TEXT NOT NULL DEFAULT '',
ADD COLUMN published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
ADD COLUMN read_time TEXT NOT NULL DEFAULT '5 min read',
ADD COLUMN content TEXT NOT NULL DEFAULT '',
ADD COLUMN image_url TEXT,
ADD COLUMN slug TEXT NOT NULL DEFAULT '',
ADD COLUMN author TEXT NOT NULL DEFAULT 'Editorial Team';

-- Create unique index on slug for URL routing
CREATE UNIQUE INDEX articles_slug_idx ON public."Articles"(slug);

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on Articles table
ALTER TABLE public."Articles" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read articles (public access)
CREATE POLICY "Articles are viewable by everyone" 
ON public."Articles" 
FOR SELECT 
USING (true);

-- Allow authenticated users to insert articles (editors/admins)
CREATE POLICY "Authenticated users can create articles" 
ON public."Articles" 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to update articles
CREATE POLICY "Authenticated users can update articles" 
ON public."Articles" 
FOR UPDATE 
TO authenticated
USING (true);

-- Allow authenticated users to delete articles
CREATE POLICY "Authenticated users can delete articles" 
ON public."Articles" 
FOR DELETE 
TO authenticated
USING (true);

-- Storage policies for article images
CREATE POLICY "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can update article images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can delete article images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'article-images');