-- Insert default entries for home page project covers if they don't exist
INSERT INTO public."Covers" (category, name, image)
VALUES 
  ('project', 'newsletter', NULL),
  ('project', 'million-slots', NULL),
  ('project', 'coming-soon', NULL)
ON CONFLICT DO NOTHING;