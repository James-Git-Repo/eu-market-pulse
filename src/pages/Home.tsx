import { useState, useMemo } from "react";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { PostCard } from "@/components/PostCard";
import { MobileSubscribe } from "@/components/MobileSubscribe";
import { MOCK_POSTS, TAGS } from "@/data/mockData";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.dek.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === "all" || post.tag === selectedTag;

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <main>
      <Hero />
      
      <section className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={TAGS}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-14 md:mb-16">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              dek={post.dek}
              tag={post.tag}
              coverUrl={post.coverUrl}
              date={new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              readTime={post.readTime}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found matching your criteria.
            </p>
          </div>
        )}
      </section>

      <MobileSubscribe />
    </main>
  );
};

export default Home;
