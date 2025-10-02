import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_POSTS } from "@/data/mockData";
import { Card } from "@/components/ui/card";

const Post = () => {
  const { slug } = useParams();
  const post = MOCK_POSTS.find((p) => p.slug === slug);

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

  const relatedPosts = MOCK_POSTS.filter(
    (p) => p.id !== post.id && p.tag === post.tag
  ).slice(0, 2);

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8">
      <Link to="/" className="inline-flex items-center text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all articles
      </Link>

      <article className="max-w-3xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            {post.tag}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-4 sm:mb-6">{post.dek}</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span>{post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime} read</span>
          </div>
        </div>

        <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none mb-8 sm:mb-10 md:mb-12">
          {post.content.split('\n').map((paragraph, i) => {
            if (paragraph.startsWith('# ')) {
              return <h1 key={i} className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{paragraph.slice(2)}</h1>;
            } else if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-xl sm:text-2xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3">{paragraph.slice(3)}</h2>;
            } else if (paragraph.startsWith('### ')) {
              return <h3 key={i} className="text-lg sm:text-xl font-bold mt-4 mb-2">{paragraph.slice(4)}</h3>;
            } else if (paragraph.startsWith('- ')) {
              return <li key={i} className="ml-6">{paragraph.slice(2)}</li>;
            } else if (paragraph.trim()) {
              return <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>;
            }
            return null;
          })}
        </div>

        <div className="border-t border-border pt-6 sm:pt-8 mb-6 sm:mb-8">
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

        {relatedPosts.length > 0 && (
          <div className="mt-8 sm:mt-10 md:mt-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Related Articles</h2>
            <div className="grid gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} to={`/post/${related.slug}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                      {related.tag}
                    </span>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground mb-2">{related.dek}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{new Date(related.publishedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
};

export default Post;
