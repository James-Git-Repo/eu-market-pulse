import { Link } from "react-router-dom";
import { ArrowRight, Trash2, Pencil } from "lucide-react";
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
  subtitle?: string;
  content?: string;
  author?: string;
  dek: string;
  tag: string;
  date: string;
  readTime: string;
  coverUrl: string;
  onDelete?: () => void;
  onEdit?: (article: any) => void;
}

export const PostCard = ({ id, slug, title, subtitle, content, author, dek, tag, date, readTime, coverUrl, onDelete, onEdit }: PostCardProps) => {
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
    <Card className="group grid grid-rows-[auto_auto_220px] overflow-hidden border border-border rounded-[var(--radius)] bg-gradient-to-b from-card to-background shadow-[0_10px_30px_rgba(0,0,0,.25),0_2px_8px_rgba(0,0,0,.2)] transition-all duration-200 hover:shadow-[0_12px_38px_rgba(0,0,0,.35),0_6px_16px_rgba(0,0,0,.25)] hover:-translate-y-0.5 relative">
      {isEditorMode && (
        <div className="absolute top-2 right-2 z-20 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={handleEdit}
            className="w-8 h-8"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive" className="w-8 h-8">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Article</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this article? This action cannot be undone.
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

      <div className="p-4 sm:p-5 pb-2">
        <h3 className="text-lg font-sans font-semibold m-0">{title}</h3>
      </div>

      <p className="mx-4 sm:mx-5 mb-3 text-sm text-muted-foreground font-sans">{dek}</p>

      <div className="relative h-full overflow-hidden border-t border-border">
        <img
          src={coverUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 scale-105 group-hover:scale-100"
        />
        <Link 
          to={`/post/${slug}`} 
          className="absolute inset-0"
          aria-label={`Read article: ${title}`}
        />
      </div>
    </Card>
  );
};
