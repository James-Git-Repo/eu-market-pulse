-- Add RLS policies for Covers table
CREATE POLICY "Covers are viewable by everyone"
ON public."Covers"
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert covers"
ON public."Covers"
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update covers"
ON public."Covers"
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete covers"
ON public."Covers"
FOR DELETE
TO authenticated
USING (true);