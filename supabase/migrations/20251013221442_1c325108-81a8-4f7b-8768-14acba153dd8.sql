-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can insert roles (this will be managed manually or through admin functions)
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update Articles table policies
DROP POLICY IF EXISTS "Authenticated users can create articles" ON public."Articles";
CREATE POLICY "Editors can create articles" ON public."Articles"
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can update articles" ON public."Articles";
CREATE POLICY "Editors can update articles" ON public."Articles"
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can delete articles" ON public."Articles";
CREATE POLICY "Editors can delete articles" ON public."Articles"
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- Update Covers table policies
DROP POLICY IF EXISTS "Authenticated users can insert covers" ON public."Covers";
CREATE POLICY "Editors can insert covers" ON public."Covers"
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can update covers" ON public."Covers";
CREATE POLICY "Editors can update covers" ON public."Covers"
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can delete covers" ON public."Covers";
CREATE POLICY "Editors can delete covers" ON public."Covers"
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- Update Resources table policies
DROP POLICY IF EXISTS "Authenticated users can insert resources" ON public."Resources";
CREATE POLICY "Editors can insert resources" ON public."Resources"
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can update resources" ON public."Resources";
CREATE POLICY "Editors can update resources" ON public."Resources"
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Authenticated users can delete resources" ON public."Resources";
CREATE POLICY "Editors can delete resources" ON public."Resources"
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'));

-- Add storage policies for article-images bucket (restricting uploads to editors)
CREATE POLICY "Editors can upload article images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'article-images' AND
  (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Editors can update article images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'article-images' AND
  (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Editors can delete article images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'article-images' AND
  (public.has_role(auth.uid(), 'editor') OR public.has_role(auth.uid(), 'admin'))
);