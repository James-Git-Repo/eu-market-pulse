import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function About() {
  const [askQuestionsOpen, setAskQuestionsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Question submitted!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setQuestion("");
    setAskQuestionsOpen(false);
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex-1">
        <div className="relative bg-gradient-to-br from-[#D4A574] via-[#C89B68] to-[#B8865A] dark:from-[#2a1f15] dark:via-[#3d2a1a] dark:to-[#1f1812] py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold font-body mb-6 bg-gradient-to-r from-[#FFA94D] via-[#FF8C3D] to-[#FF6B2B] bg-clip-text text-transparent">
                  In the end it always comes down to the same old tradeoff:
                </h1>
                <p className="text-2xl md:text-3xl font-body text-foreground/90">
                  what's more valuable for you time or money?
                </p>
              </div>

              <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-primary/20">
                <div className="prose prose-lg max-w-none text-foreground">
                  <p className="leading-relaxed mb-6">
                    Hi I'm Jacopo, Swiss–Italian and endlessly curious. I love the moment an idea clicks; the scribble that turns into a plan, the first draft that suddenly breathes. I write The (un)Stable Net to make sense of markets, tech, and the ways we work; not with hype, but with patient curiosity and useful notes. I'm happiest building small things that make bigger things possible: a tidy workflow, a clear brief, a tool that quietly does its job. What pulls me forward: well-crafted design, honest conversations, and teams that care about the details. I like rooms where people listen, events that actually create serendipity, and dashboards that tell a story at a glance. I enjoy tinkering with AI and finance not for the buzz but for the craft; turning data into something you can feel and use.
                  </p>
                  <p className="leading-relaxed mb-6">
                    A life between languages and borders taught me to build bridges; between Italy and Switzerland, between ideas and execution, between vision and everyday habits. I care about clarity, momentum, and kindness. If what I create helps you take the next step, quicker or clearer, I'm happy.
                  </p>
                  <p className="leading-relaxed">
                    Outside work you'll usually find me in the mountains, hiking when the trails are open and skiing all winter. I grew up crisscrossing the Alps, so I'm biased toward early starts, long ridgelines, and the kind of clear air that resets your head. Those days feed the writing here. If you're into thoughtful tools, better workflows, and work that respects people's time, you'll feel at home here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Ask Questions Dialog */}
      <Dialog open={askQuestionsOpen} onOpenChange={setAskQuestionsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Have a question? I'd love to hear from you.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                placeholder="What would you like to know?"
                className="mt-1 min-h-32"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Send Question
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
