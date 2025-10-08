import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoImage from "@/assets/new-logo.png";
import { SubscribeDialog } from "./SubscribeDialog";
import { ContributeDialog } from "./ContributeDialog";
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
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [askQuestionsOpen, setAskQuestionsOpen] = useState(false);
  
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isResourcesPage = location.pathname === "/resources";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true" || 
      (!localStorage.getItem("darkMode") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
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
    <header 
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <img 
            src={logoImage} 
            alt="The (un)Stable Net logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-105"
          />
          <span className="text-base sm:text-xl font-body font-bold tracking-wide text-primary uppercase">THE (UN)STABLE NET</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isHomePage ? (
            <>
              <Link to="/articles" className="text-foreground hover:text-primary transition-colors font-body">
                Newsletter
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors font-body"
              >
                About
              </Link>
            </>
          ) : isAboutPage ? (
            <Button 
              onClick={() => setAskQuestionsOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-body"
            >
              Ask questions
            </Button>
          ) : isResourcesPage ? (
            <></>
          ) : (
            <>
              <button
                onClick={() => setContributeOpen(true)}
                className="text-foreground hover:text-primary transition-colors font-body"
              >
                Contribute
              </button>
              <Button 
                onClick={() => setSubscribeOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-body"
              >
                Subscribe
              </Button>
            </>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {isHomePage ? (
              <>
                <Link to="/articles" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-lg hover:bg-muted transition-colors font-body">
                  Newsletter
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-lg hover:bg-muted transition-colors font-body text-left block"
                >
                  About
                </Link>
              </>
            ) : isAboutPage ? (
              <Button 
                onClick={() => {
                  setAskQuestionsOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body"
              >
                Ask questions
              </Button>
            ) : isResourcesPage ? (
              <></>
            ) : (
              <>
                <button
                  onClick={() => {
                    setContributeOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 rounded-lg hover:bg-muted transition-colors font-body text-left"
                >
                  Contribute
                </button>
                <Button 
                  onClick={() => {
                    setSubscribeOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body"
                >
                  Subscribe
                </Button>
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Dialogs */}
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
      <ContributeDialog open={contributeOpen} onOpenChange={setContributeOpen} />
      
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
    </header>
  );
};
