import { Link } from "react-router-dom";
import { ArrowRight, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEditor } from "@/contexts/EditorContext";

interface PostCardProps {
  id: number;
  slug: string;
  title: string;
  subtitle?: string;
  content?: string;
  author?: string;
  dek: string;
  tag: string;
  date: string;
  readTime: string;
  coverUrl: string;
  variant?: "default" | "featured";
  onDelete?: () => void;
  onEdit?: (article: any) => void;
}

export const PostCard = ({ id, slug, title, subtitle, content, author, dek, tag, date, readTime, coverUrl, variant = "default", onDelete, onEdit }: PostCardProps) => {
  const { isEditorMode } = useEditor();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('Articles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Article deleted',
        description: 'The article has been successfully deleted.',
      });

      onDelete?.();
    } catch (error: any) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit({
        id,
        title,
        subtitle: subtitle || '',
        content: content || '',
        tag,
        author: author || 'Editorial Team',
        read_time: readTime,
        image_url: coverUrl,
      });
    }
  };

  return (
    <div className="relative group h-full">
      {isEditorMode && (
        <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="bg-background"
            aria-label="Edit article"
            onClick={(e) => {
              e.preventDefault();
              handleEdit();
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                aria-label="Delete article"
                onClick={(e) => e.preventDefault()}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Article</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
      )}
      
      {variant === "featured" ? (
        <Link
          to={`/post/${slug}`}
          className="grid md:grid-cols-2 gap-6 md:gap-10 items-center border-y border-border/70 py-8 md:py-10"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-md bg-muted">
            {coverUrl && (
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow">{tag}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-[0.14em]">Latest</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-body font-bold leading-[1.12] mb-4 group-hover:underline decoration-1 underline-offset-[6px]">
              {title}
            </h2>
            <p className="text-base md:text-lg font-body text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {dek}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {author && <span>{author}</span>}
              {author && <span className="text-border">/</span>}
              <span>{date}</span>
              <span className="text-border">/</span>
              <span>{readTime}</span>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/post/${slug}`} className="flex h-full flex-col">
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted mb-5">
            {coverUrl && (
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            )}
          </div>

          <span className="eyebrow mb-2.5">{tag}</span>

          <h3 className="text-xl font-body font-bold leading-snug mb-2.5 line-clamp-2 group-hover:underline decoration-1 underline-offset-[5px]">
            {title}
          </h3>

          <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5 line-clamp-2">
            {dek}
          </p>

          <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/70 text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="truncate">{date} / {readTime}</span>
            <span className="flex items-center gap-1 text-primary shrink-0">
              Read
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};
