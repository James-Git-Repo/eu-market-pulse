-- Function to auto-create cover category when new tag is used
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to auto-delete cover category when last article with tag is deleted
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create category on article insert
CREATE TRIGGER trigger_auto_create_cover_category
AFTER INSERT ON public."Articles"
FOR EACH ROW
EXECUTE FUNCTION public.auto_create_cover_category();

-- Trigger to delete category on article delete
CREATE TRIGGER trigger_auto_delete_cover_category
AFTER DELETE ON public."Articles"
FOR EACH ROW
EXECUTE FUNCTION public.auto_delete_cover_category();