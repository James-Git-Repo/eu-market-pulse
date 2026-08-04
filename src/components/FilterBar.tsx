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
    return (
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-10 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary"
            aria-label="Search articles"
          />
        </div>

        <Select value={selectedTag} onValueChange={onTagChange}>
          <SelectTrigger
            className="w-full sm:w-[220px] h-10 bg-transparent border-0 border-b border-border rounded-none focus:ring-0 focus-visible:ring-0 focus-visible:border-primary px-3"
            aria-label="Filter by tag"
          >
            <SelectValue placeholder="All tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tags</SelectItem>
            {tags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
