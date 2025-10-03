import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoImage from "@/assets/tsn-logo.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <span className="text-base sm:text-xl font-navbar font-bold tracking-tight">The (un)Stable Net</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/contribute">
            <Button variant="outline">Contribute</Button>
          </Link>
          <Link to="/subscribe">
            <Button>Subscribe</Button>
          </Link>
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
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <Link to="/contribute" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Contribute</Button>
            </Link>
            <Link to="/subscribe" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Subscribe</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
