REVOKE SELECT ON public.comments FROM anon, authenticated;
GRANT SELECT (id, article_id, user_name, content, created_at) ON public.comments TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.comments TO authenticated;
GRANT INSERT ON public.comments TO anon;
GRANT ALL ON public.comments TO service_role;