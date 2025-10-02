import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PostCardProps {
  slug: string;
  title: string;
  dek: string;
  tag: string;
  date: string;
  readTime: string;
  coverUrl: string;
}

export const PostCard = ({ slug, title, dek, tag, date, readTime, coverUrl }: PostCardProps) => {
  return (
    <Link to={`/post/${slug}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-video overflow-hidden">
          <img 
            src={coverUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {tag}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {dek}
          </p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>{date}</span>
              <span>•</span>
              <span>{readTime}</span>
            </div>
            
            <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
