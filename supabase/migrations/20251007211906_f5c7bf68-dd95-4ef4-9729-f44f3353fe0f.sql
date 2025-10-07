-- Enable RLS on Questions table (if not already enabled)
ALTER TABLE public."Questions" ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit questions (public form)
CREATE POLICY "Anyone can submit questions"
ON public."Questions"
FOR INSERT
TO public
WITH CHECK (true);