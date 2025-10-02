import { useState, useMemo } from "react";
import { FilterBar } from "@/components/FilterBar";
import { PostCard } from "@/components/PostCard";
import { MOCK_POSTS, TAGS } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const years = useMemo(() => {
    const yearSet = new Set(
      MOCK_POSTS.map((post) => new Date(post.publishedAt).getFullYear())
    );
    return Array.from(yearSet).sort((a, b) => b - a);
  }, []);

  const [selectedYear, setSelectedYear] = useState<string>("all");

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = MOCK_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.dek.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tag.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === "all" || post.tag === selectedTag;

      const postYear = new Date(post.publishedAt).getFullYear().toString();
      const matchesYear = selectedYear === "all" || postYear === selectedYear;

      return matchesSearch && matchesTag && matchesYear;
    });

    if (sortBy === "latest") {
      filtered.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return filtered;
  }, [searchQuery, selectedTag, selectedYear, sortBy]);

  return (
    <main className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Archive</h1>
      <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
        Browse all published articles
      </p>

      <div className="space-y-4 mb-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          tags={TAGS}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {filteredAndSortedPosts.map((post) => (
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

      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No articles found matching your criteria.
          </p>
        </div>
      )}
    </main>
  );
};

export default Archive;
