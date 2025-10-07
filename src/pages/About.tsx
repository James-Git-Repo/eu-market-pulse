import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useEditor } from "@/contexts/EditorContext";
import { Upload } from "lucide-react";
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
import { Linkedin, Youtube, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function About() {
  const { isEditorMode } = useEditor();
  const [askQuestionsOpen, setAskQuestionsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [gridImage, setGridImage] = useState("");
  const [heroImageId, setHeroImageId] = useState<number | null>(null);
  const [gridImageId, setGridImageId] = useState<number | null>(null);
  const { toast } = useToast();

  // Fetch images from Supabase on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('Covers')
          .select('*')
          .eq('category', 'about');

        if (error) throw error;

        if (data) {
          const heroData = data.find(img => img.name === 'hero-photo');
          const gridData = data.find(img => img.name === 'grid-photo');

          if (heroData) {
            setHeroImage(heroData.image || '');
            setHeroImageId(heroData.id);
          }
          if (gridData) {
            setGridImage(gridData.image || '');
            setGridImageId(gridData.id);
          }
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageType: 'hero' | 'grid') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `about-${imageType}-${Math.random()}.${fileExt}`;
      const filePath = `about-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      // Update Supabase Covers table
      const coverName = imageType === 'hero' ? 'hero-photo' : 'grid-photo';
      const coverId = imageType === 'hero' ? heroImageId : gridImageId;

      if (coverId) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('Covers')
          .update({ image: publicUrl })
          .eq('id', coverId);

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { data: newCover, error: insertError } = await supabase
          .from('Covers')
          .insert({
            category: 'about',
            name: coverName,
            image: publicUrl,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        if (newCover) {
          if (imageType === 'hero') {
            setHeroImageId(newCover.id);
          } else {
            setGridImageId(newCover.id);
          }
        }
      }

      if (imageType === 'hero') {
        setHeroImage(publicUrl);
      } else {
        setGridImage(publicUrl);
      }
      
      toast({
        title: "Image uploaded",
        description: "Your photo has been uploaded and saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('Questions')
        .insert({
          name: name,
          email: email,
          question: question,
        });

      if (error) throw error;

      toast({
        title: "Question submitted!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setName("");
      setEmail("");
      setQuestion("");
      setAskQuestionsOpen(false);
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Title */}
        <div className="relative bg-gradient-to-br from-[#1a1f2e] via-[#0f1419] to-[#0a0d14] py-20 md:py-32">
          {/* Circuit Board Overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-primary" />
                <circle cx="50" cy="50" r="1.5" fill="currentColor" className="text-primary" />
                <circle cx="98" cy="98" r="1" fill="currentColor" className="text-primary" />
                <line x1="2" y1="2" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
                <line x1="50" y1="50" x2="98" y2="98" stroke="currentColor" strokeWidth="0.5" className="text-primary/40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
          
          {/* Subtle Dot Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_1px)] [background-size:24px_24px] opacity-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                {/* Photo Space - Left */}
                <div className="order-2 md:order-1">
                  <div className="relative aspect-square rounded-full overflow-hidden bg-background/20 backdrop-blur-sm border-8 border-background/40">
                    {heroImage ? (
                      <img src={heroImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-foreground/40 text-lg font-body">
                        Photo placeholder
                      </div>
                    )}
                    {isEditorMode && (
                      <label className="absolute bottom-4 right-4 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'hero')}
                          className="hidden"
                        />
                        <Button size="sm" variant="secondary" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </span>
                        </Button>
                      </label>
                    )}
                  </div>
                </div>
                
                {/* Title - Right */}
                <div className="order-1 md:order-2 text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-bold font-body mb-6 bg-gradient-to-r from-[#FFA94D] via-[#FF8C3D] to-[#FF6B2B] bg-clip-text text-transparent leading-tight">
                    In the end it always comes down to the same old tradeoff:
                  </h1>
                  <p className="text-xl md:text-2xl font-body text-foreground/90 italic">
                    what's more valuable for you time or money?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-body mb-8 text-center">
                  I'm Jacopo — And I strongly believe that clarity beats complexity.
                </h2>
                
                <div className="prose prose-lg max-w-none text-foreground/80">
                  <p className="leading-relaxed mb-6 text-justify">
                    Hi I'm Jacopo, Swiss–Italian and endlessly curious. I love the moment an idea clicks; the scribble that turns into a plan, the first draft that suddenly breathes. I write The (un)Stable Net to make sense of markets, tech, and the ways we work; not with hype, but with patient curiosity and useful notes. I'm happiest building small things that make bigger things possible: a tidy workflow, a clear brief, a tool that quietly does its job. What pulls me forward: well-crafted design, honest conversations, and teams that care about the details. I like rooms where people listen, events that actually create serendipity, and dashboards that tell a story at a glance. I enjoy tinkering with AI and finance not for the buzz but for the craft; turning data into something you can feel and use.
                  </p>
                </div>
              </div>

              {/* Photo Grid Section */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                  {gridImage ? (
                    <img src={gridImage} alt="About" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <span className="text-muted-foreground text-lg font-body">Photo placeholder</span>
                  )}
                  {isEditorMode && (
                    <label className="absolute bottom-4 right-4 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'grid')}
                        className="hidden"
                      />
                      <Button size="sm" variant="secondary" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload
                        </span>
                      </Button>
                    </label>
                  )}
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  <div className="prose prose-lg max-w-none text-foreground/80">
                    <p className="leading-relaxed text-justify">
                      A life between languages and borders taught me to build bridges; between Italy and Switzerland, between ideas and execution, between vision and everyday habits. I care about clarity, momentum, and kindness. If what I create helps you take the next step, quicker or clearer, I'm happy.
                    </p>
                    <p className="leading-relaxed text-justify">
                      Outside work you'll usually find me in the mountains, hiking when the trails are open and skiing all winter. I grew up crisscrossing the Alps, so I'm biased toward early starts, long ridgelines, and the kind of clear air that resets your head. Those days feed the writing here. If you're into thoughtful tools, better workflows, and work that respects people's time, you'll feel at home here.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="bg-gradient-to-br from-[#D4A574]/20 via-[#C89B68]/10 to-[#B8865A]/20 dark:from-[#2a1f15]/50 dark:via-[#3d2a1a]/30 dark:to-[#1f1812]/50 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl font-bold font-body mb-8 text-center">Connect with me</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-6 bg-background/60 backdrop-blur-sm rounded-xl hover:bg-background/80 transition-all hover:scale-105"
                  >
                    <Linkedin className="w-10 h-10 text-primary" />
                    <span className="text-sm font-body text-foreground">LinkedIn</span>
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-6 bg-background/60 backdrop-blur-sm rounded-xl hover:bg-background/80 transition-all hover:scale-105"
                  >
                    <Youtube className="w-10 h-10 text-primary" />
                    <span className="text-sm font-body text-foreground">YouTube</span>
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-6 bg-background/60 backdrop-blur-sm rounded-xl hover:bg-background/80 transition-all hover:scale-105"
                  >
                    <Github className="w-10 h-10 text-primary" />
                    <span className="text-sm font-body text-foreground">GitHub</span>
                  </a>
                  <a 
                    href="https://xing.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-6 bg-background/60 backdrop-blur-sm rounded-xl hover:bg-background/80 transition-all hover:scale-105"
                  >
                    <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.016z"/>
                    </svg>
                    <span className="text-sm font-body text-foreground">Xing</span>
                  </a>
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
