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

  const SITE = "https://the-un-stable.net";
  const jsonLd = useMemo(() => {
    const schemas: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": ["CollectionPage", "Blog"],
        name: "European Market Movers — Weekly Newsletter",
        headline: "European Market Movers — Weekly Newsletter",
        description:
          "The weekly European Market Movers newsletter: macro signals, sector rotations, policy shifts and the numbers that actually move European portfolios.",
        url: `${SITE}/newsletter`,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", name: "The (un)Stable Net", url: `${SITE}/` },
        publisher: {
          "@type": "Organization",
          name: "The (un)Stable Net",
          url: `${SITE}/`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Newsletter", item: `${SITE}/newsletter` },
        ],
      },
    ];

    if (posts.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Latest newsletter issues",
        itemListElement: posts.slice(0, 10).map((post, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: post.title,
          url: `${SITE}/post/${post.slug}`,
        })),
      });
    }

    return schemas;
  }, [posts]);

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
        title={"European Market Movers — Weekly Newsletter | The (un)Stable Net"}
        description={
          "Every week: European equities, macro signals, sector rotations and AI-driven market shifts, explained in a short, actionable brief. Read the latest issue of European Market Movers."
        }
        path={"/newsletter"}
        image={featured?.image_url || undefined}
        jsonLd={jsonLd}
      />

      <header className="max-w-3xl mb-10 sm:mb-12">
        <span className="eyebrow mb-4">European Market Movers</span>
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mt-3 mb-5">Newsletter</h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          European Market Movers is the weekly newsletter of The (un)Stable Net: macro and market signals from Europe,
          sector rotations, policy shifts and the numbers that actually move portfolios.
        </p>
      </header>

      <div className="border-t border-border/70 pt-6 mb-10 sm:mb-12">
        <FilterBar
          variant="editorial"
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={tags}
        />

        {session && (
          <div className="mt-6 flex justify-end">
            <Button onClick={() => navigate("/newsletter/new")} className="shrink-0 rounded-none">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </div>
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
