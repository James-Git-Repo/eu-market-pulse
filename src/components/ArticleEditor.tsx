import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

interface ArticleEditorProps {
  article: {
    id: number;
    title: string;
    subtitle?: string;
    content: string;
    tag: string;
    author: string;
    read_time: string;
    image_url?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const ArticleEditor = ({ article, open, onOpenChange, onUpdate }: ArticleEditorProps) => {
  const [formData, setFormData] = useState(article);
  const [isLoading, setIsLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload cover if new file selected
      let coverUrl = formData.image_url;
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${article.id || Date.now()}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('article-images')
          .upload(fileName, coverFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('article-images')
          .getPublicUrl(fileName);

        coverUrl = publicUrl;
      }

      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      if (article.id === 0) {
        // Create new article
        const { error } = await supabase
          .from('Articles')
          .insert({
            slug,
            title: formData.title,
            subtitle: formData.subtitle,
            content: formData.content,
            tag: formData.tag,
            author: formData.author,
            read_time: formData.read_time,
            image_url: coverUrl,
          });

        if (error) throw error;

        toast({
          title: 'Article created',
          description: 'New article has been published successfully.',
        });
      } else {
        // Update existing article
        const { error } = await supabase
          .from('Articles')
          .update({
            title: formData.title,
            subtitle: formData.subtitle,
            content: formData.content,
            tag: formData.tag,
            author: formData.author,
            read_time: formData.read_time,
            image_url: coverUrl,
          })
          .eq('id', article.id);

        if (error) throw error;

        toast({
          title: 'Article updated',
          description: 'Changes have been saved successfully.',
        });
      }

      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: article.id === 0 ? 'Create failed' : 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{article.id === 0 ? 'Create Article' : 'Edit Article'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image</Label>
            <div className="flex gap-2">
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tag">Tag</Label>
              <Input
                id="tag"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="read_time">Read Time</Label>
            <Input
              id="read_time"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving...' : (article.id === 0 ? 'Create Article' : 'Save Changes')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
