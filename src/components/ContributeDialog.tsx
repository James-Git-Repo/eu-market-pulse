import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Newspaper } from "lucide-react";

interface ContributeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContributeDialog = ({ open, onOpenChange }: ContributeDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    content: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consent required",
        description: "Please agree to our submission terms.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Wire to actual submission handler
    setTimeout(() => {
      toast({
        title: "Submission received!",
        description: "We'll review your contribution and get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        topic: "",
        content: "",
        consent: false,
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Newspaper className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Contribute to TSN</DialogTitle>
          <DialogDescription>
            Share your insights and analysis with our community.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="topic" className="block text-sm font-medium mb-2">
              Article Topic
            </label>
            <Input
              id="topic"
              type="text"
              placeholder="e.g., ECB Policy Impact on EU Banks"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Article Summary / Pitch
            </label>
            <Textarea
              id="content"
              placeholder="Provide a brief summary of your article idea, key insights, and why it matters..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={6}
              className="resize-none"
            />
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, consent: checked as boolean })
              }
            />
            <label
              htmlFor="consent"
              className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
            >
              I agree that my submission may be published on The (un)Stable Net and that
              I hold the rights to this content.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
