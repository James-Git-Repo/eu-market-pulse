import { Link } from "react-router-dom";
import { ArrowRight, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEditor } from "@/contexts/EditorContext";

interface PostCardProps {
  id: number;
  slug: string;
  title: string;
  dek: string;
  tag: string;
  date: string;
  readTime: string;
  coverUrl: string;
  onDelete?: () => void;
}

export const PostCard = ({ id, slug, title, dek, tag, date, readTime, coverUrl, onDelete }: PostCardProps) => {
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

  return (
    <div className="relative group">
      {isEditorMode && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
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
      )}
      
      <Link to={`/post/${slug}`} className="block">
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
    </div>
  );
};
