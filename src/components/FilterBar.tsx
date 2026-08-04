import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  tags: string[];
  variant?: "default" | "editorial";
}

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagChange,
  tags,
  variant = "default",
}: FilterBarProps) => {
  if (variant === "editorial") {
    const options = ["all", ...tags];
    return (
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        <div className="flex-1 -mx-4 px-4 lg:mx-0 lg:px-0 overflow-x-auto">
          <div className="flex items-center gap-2 w-max">
            {options.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagChange(tag)}
                  aria-pressed={active}
                  title={tag === "all" ? "All stories" : tag}
                  className={`px-3.5 py-1.5 text-xs font-body uppercase tracking-[0.12em] border transition-colors whitespace-nowrap ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                  } max-w-[16rem] overflow-hidden text-ellipsis`}
                >
                  {tag === "all" ? "All stories" : tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative w-full lg:w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-9 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
            aria-label="Search articles"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <Select value={selectedTag} onValueChange={onTagChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filter by tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Tags</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
