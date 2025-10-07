-- Enable RLS on Contributions table (if not already enabled)
ALTER TABLE public."Contributions" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contributions (public form)
CREATE POLICY "Anyone can submit contributions"
ON public."Contributions"
FOR INSERT
TO public
WITH CHECK (true);

-- Enable RLS on Newsletter Sub table (if not already enabled)
ALTER TABLE public."Newsletter Sub" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe to newsletter (public form)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public."Newsletter Sub"
FOR INSERT
TO public
WITH CHECK (true);