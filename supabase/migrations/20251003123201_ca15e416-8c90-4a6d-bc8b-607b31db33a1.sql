-- Fix search_path for auto_create_cover_category function
CREATE OR REPLACE FUNCTION public.auto_create_cover_category()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if a cover with this category already exists
  IF NOT EXISTS (
    SELECT 1 FROM public."Covers" WHERE category = NEW.tag
  ) THEN
    -- Create a new cover entry for this category
    INSERT INTO public."Covers" (category, name)
    VALUES (NEW.tag, NEW.tag);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Fix search_path for auto_delete_cover_category function
CREATE OR REPLACE FUNCTION public.auto_delete_cover_category()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if any articles still exist with this tag
  IF NOT EXISTS (
    SELECT 1 FROM public."Articles" WHERE tag = OLD.tag
  ) THEN
    -- Delete the cover entry for this category
    DELETE FROM public."Covers" WHERE category = OLD.tag;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;