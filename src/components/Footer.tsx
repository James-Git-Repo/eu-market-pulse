import { Link, useLocation } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="w-full py-4 sm:py-6 mt-6 sm:mt-8">
      <div className="container mx-auto px-4">
        {isHomePage && (
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-4">
            {/* Social Links - Left */}
            <div className="flex flex-col gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">LinkedIn</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Youtube className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">YouTube</span>
              </a>
            </div>
            
            {/* About Text - Left of Photo */}
            <div className="flex-1 max-w-md">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">About</h3>
              <p className="text-foreground/80 font-body text-sm leading-relaxed">
                Welcome to The (un)Stable Net, where we explore the intersection of technology, 
                finance, and innovation. Stay informed with our latest insights and analysis.
              </p>
            </div>
            
            {/* Profile Photo - Right */}
            <div className="flex items-center justify-center bg-accent/5 border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                <span className="text-foreground/40 text-sm font-body">Photo</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Legal Links */}
        <div className="text-center text-xs sm:text-sm text-foreground font-body pt-8 border-t border-border">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <span>© {new Date().getFullYear()} The (un)Stable Net</span>
            <span className="hidden sm:inline">{" · "}</span>
            <Link to="/legal/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline">{" · "}</span>
            <Link to="/legal/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
