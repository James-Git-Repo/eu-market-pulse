import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { RichTextEditor } from "@/components/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";

const NewsletterEditor = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isEditorMode } = useEditor();
  const [pageContent, setPageContent] = useState({
    title: "Subscribe to The (un)Stable Net",
    description: "Get actionable briefs across EU markets delivered to your inbox.",
    cardTitle: "Join our newsletter",
    cardDescription: "Signals, not noise. We send curated market analysis weekly."
  });

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("Covers")
        .select("*")
        .eq("category", "newsletter-content")
        .single();
      
      if (data?.name) {
        try {
          const content = JSON.parse(data.name);
          setPageContent(content);
        } catch (e) {
          console.error("Failed to parse newsletter content:", e);
        }
      }
    };
    
    fetchContent();
  }, []);

  useEffect(() => {
    if (isEditorMode) {
      const saveContent = async () => {
        await supabase
          .from("Covers")
          .upsert({
            category: "newsletter-content",
            name: JSON.stringify(pageContent)
          });
      };
      
      const timeoutId = setTimeout(saveContent, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [pageContent, isEditorMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please agree to receive our newsletter.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase
      .from("Newsletter Sub")
      .insert({ email, policy_agreement: consent });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our next newsletter soon.",
      });
      setEmail("");
      setConsent(false);
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          {isEditorMode ? (
            <div className="space-y-4">
              <Input
                value={pageContent.title}
                onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
                className="text-4xl md:text-5xl font-bold text-center"
              />
              <Input
                value={pageContent.description}
                onChange={(e) => setPageContent({ ...pageContent, description: e.target.value })}
                className="text-xl text-center"
              />
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {pageContent.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {pageContent.description}
              </p>
            </>
          )}
        </div>

        <Card>
          <CardHeader>
            {isEditorMode ? (
              <div className="space-y-4">
                <Input
                  value={pageContent.cardTitle}
                  onChange={(e) => setPageContent({ ...pageContent, cardTitle: e.target.value })}
                  className="text-2xl font-semibold"
                />
                <RichTextEditor
                  content={pageContent.cardDescription}
                  onChange={(content) => setPageContent({ ...pageContent, cardDescription: content })}
                />
              </div>
            ) : (
              <>
                <CardTitle>{pageContent.cardTitle}</CardTitle>
                <CardDescription>
                  <div dangerouslySetInnerHTML={{ __html: pageContent.cardDescription }} />
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-lg"
                />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked as boolean)}
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                >
                  I agree to receive newsletters from The (un)Stable Net. I can unsubscribe at any time.
                  By subscribing, you agree to our Privacy Policy.
                </label>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">Weekly</div>
            <p className="text-sm text-muted-foreground">Delivery frequency</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5 min</div>
            <p className="text-sm text-muted-foreground">Average read time</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">0 spam</div>
            <p className="text-sm text-muted-foreground">Guaranteed</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewsletterEditor;
