REVOKE SELECT ON public.comments FROM authenticated;
GRANT SELECT (id, article_id, user_name, content, created_at) ON public.comments TO authenticated;