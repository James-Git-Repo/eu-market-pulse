import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoImage from "@/assets/new-logo.png";
import { SubscribeDialog } from "./SubscribeDialog";
import { ContributeDialog } from "./ContributeDialog";

export const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  
  const isHomePage = location.pathname === "/";

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
    </header>
  );
};
