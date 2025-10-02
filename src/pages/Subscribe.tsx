import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
    
    // TODO: Wire to actual email service
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our next newsletter soon.",
      });
      setEmail("");
      setConsent(false);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Subscribe to The (un)Stable Net
          </h1>
          <p className="text-xl text-muted-foreground">
            Get actionable briefs across EU markets delivered to your inbox.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Join our newsletter</CardTitle>
            <CardDescription>
              Signals, not noise. We send curated market analysis weekly.
            </CardDescription>
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

export default Subscribe;
