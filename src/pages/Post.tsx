import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEditor } from "@/contexts/EditorContext";
import { SafeHTML } from "@/components/SafeHTML";
import { useToast } from "@/hooks/use-toast";
import { CommentSection } from "@/components/CommentSection";
import { SEO } from "@/components/SEO";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { session } = useEditor();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
      
      // Fetch related posts - same tag first, then backfill with recent
      if (data) {
        const { data: sameTag } = await supabase
          .from('Articles')
          .select('*')
          .eq('tag', data.tag)
          .neq('id', data.id)
          .order('published_at', { ascending: false })
          .limit(3);
        
        let combined = sameTag || [];
        
        if (combined.length < 3) {
          const excludeIds = [data.id, ...combined.map(a => a.id)];
          const { data: recent } = await supabase
            .from('Articles')
            .select('*')
            .not('id', 'in', `(${excludeIds.join(',')})`)
            .order('published_at', { ascending: false })
            .limit(3 - combined.length);
          
          combined = [...combined, ...(recent || [])];
        }
        
        setRelatedPosts(combined);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!post) return;
    
    const { error } = await supabase
      .from('Articles')
      .delete()
      .eq('id', post.id);

    if (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Article deleted',
        description: 'The article has been removed.',
      });
      window.location.href = '/';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:py-12">
      <SEO
        title={`${post.title} — The (un)Stable Net`}
        description={post.subtitle || `Read "${post.title}" on The (un)Stable Net.`}
        path={`/post/${post.slug}`}
        image={post.image_url}
        type="article"
        publishedTime={post.published_at}
        author={post.author}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.subtitle || undefined,
          image: post.image_url || undefined,
          datePublished: post.published_at,
          author: { "@type": "Person", name: post.author || "Editorial Team" },
          publisher: {
            "@type": "Organization",
            name: "The (un)Stable Net",
            url: "https://the-un-stable.net/",
          },
          mainEntityOfPage: `https://the-un-stable.net/post/${post.slug}`,
        }}
      />
      <div className="reading-column flex justify-between items-center mb-8 sm:mb-10">
        <Link to="/" className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>
        
        {session && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/newsletter/${post.id}/edit`, { state: { article: post } })}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <article className="reading-column">
        <header className="mb-8 sm:mb-10">
          <span className="eyebrow">{post.tag}</span>
          <h1 className="text-4xl sm:text-5xl font-body font-bold mt-4 mb-5 leading-[1.08] tracking-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg sm:text-xl font-body italic text-muted-foreground leading-relaxed mb-7">
              {post.subtitle}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border/70 py-3 text-[0.7rem] uppercase tracking-[0.14em] font-body text-muted-foreground">
            <span>{post.author}</span>
            <span className="text-border">/</span>
            <span>
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-border">/</span>
            <span>{post.read_time}</span>
          </div>
        </header>

        {post.image_url && (
          <figure className="mb-10 sm:mb-12 overflow-hidden rounded-md">
            <img
              src={post.image_url}
              alt={post.title}
              fetchPriority="high"
              width={1200}
              height={675}
              className="w-full aspect-video object-cover"
            />
          </figure>
        )}

        <SafeHTML 
          html={post.content}
          className="article-prose prose dark:prose-invert max-w-none mb-12 sm:mb-16 
                     [&_p:empty]:min-h-[1rem]
                     [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold
                     [&_ul]:!list-disc [&_ul]:!pl-10 [&_ol]:!list-decimal [&_ol]:!pl-10
                     [&_li]:!list-item [&_li]:!ml-0
                     [&_img]:rounded-md"
        />

        <div className="border-t border-border/70 pt-8 mb-10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/subscribe" className="flex-1">
              <Button className="w-full" size="lg">
                Subscribe to Newsletter
              </Button>
            </Link>
            <Link to="/contribute" className="flex-1">
              <Button variant="outline" className="w-full" size="lg">
                Contribute an Article
              </Button>
            </Link>
          </div>
        </div>

        <CommentSection articleId={post.id} />

        {relatedPosts.length > 0 && (
          <div className="mt-14 sm:mt-16 border-t border-border/70 pt-8">
            <h2 className="eyebrow mb-6">Continue Reading</h2>
            <div className="grid gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  to={`/post/${related.slug}`}
                  className="group grid sm:grid-cols-[10rem_1fr] gap-4 sm:gap-6 items-start"
                >
                  {related.image_url && (
                    <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
                      <img
                        src={related.image_url}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                  )}
                  <div>
                    <span className="eyebrow mb-2">{related.tag}</span>
                    <h3 className="text-lg font-body font-bold mt-1 mb-1.5 line-clamp-2 group-hover:underline decoration-1 underline-offset-[5px]">
                      {related.title}
                    </h3>
                    <p className="text-sm font-body text-muted-foreground mb-2 line-clamp-2">{related.subtitle}</p>
                    <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.12em] font-body text-muted-foreground">
                      <span>{new Date(related.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span className="text-border">/</span>
                      <span>{related.read_time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{post.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default Post;
