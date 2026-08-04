import { useState, useMemo, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { PostCard } from "@/components/PostCard";
import { supabase } from "@/integrations/supabase/client";
import { useEditor } from "@/contexts/EditorContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";

const Newsletter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useEditor();
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Articles").select("*").order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data || []);
      // Extract unique tags from articles
      const uniqueTags = Array.from(new Set(data?.map((article) => article.tag).filter(Boolean))) as string[];
      setTags(uniqueTags);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === "all" || post.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, posts]);

  const featured = selectedTag === "all" && !searchQuery ? filteredPosts[0] : undefined;
  const gridPosts = featured ? filteredPosts.slice(1) : filteredPosts;

  const renderCard = (post: any, variant: "default" | "featured") => (
    <PostCard
      key={post.id}
      id={post.id}
      slug={post.slug}
      title={post.title}
      subtitle={post.subtitle}
      content={post.content}
      author={post.author}
      dek={post.subtitle || ""}
      tag={post.tag}
      variant={variant}
      coverUrl={post.image_url || ""}
      date={new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
      readTime={post.read_time}
      onDelete={fetchPosts}
      onEdit={(article) => navigate(`/newsletter/${article.id}/edit`, { state: { article } })}
    />
  );

  return (
    <main className="container mx-auto px-4 py-10 sm:py-14 md:py-16">
      <SEO
        title={"Newsletter: The (un)Stable Net"}
        description={
          "Weekly European Market Movers newsletter: macro signals, sector rotations and clear, actionable analysis."
        }
        path={"/newsletter"}
      />

      <header className="max-w-3xl mb-10 sm:mb-12">
        <span className="eyebrow mb-4">European Market Movers</span>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mt-3 mb-5">Newsletter</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Weekly macro and market signals from Europe: sector rotations, policy shifts and the numbers that actually
          move portfolios.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-end gap-4 lg:gap-8 border-t border-border/70 pt-5 mb-10 sm:mb-12">
        <FilterBar
          variant="editorial"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={tags}
        />

        {session && (
          <Button onClick={() => navigate("/newsletter/new")} className="shrink-0 rounded-none">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-muted rounded-md mb-5" />
              <div className="h-2.5 w-20 bg-muted mb-4" />
              <div className="h-4 bg-muted mb-2.5" />
              <div className="h-4 w-2/3 bg-muted mb-5" />
              <div className="h-3 w-1/2 bg-muted" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {featured && <div className="mb-12 sm:mb-16">{renderCard(featured, "featured")}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 sm:gap-y-14 mb-16">
            {gridPosts.map((post) => renderCard(post, "default"))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="border-t border-border/70 pt-16 pb-12 text-center">
              <p className="text-muted-foreground text-lg font-body italic">No stories match your search yet.</p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Newsletter;
