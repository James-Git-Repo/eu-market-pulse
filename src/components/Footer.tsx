import { Link, useLocation } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="w-full py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="container mx-auto px-4">
        {isHomePage && (
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-4">
            {/* Social Links - Left */}
            <div className="flex flex-col gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            
            {/* About - Right */}
            <div className="max-w-2xl bg-accent/5 border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300">
              <h3 className="text-2xl font-bold font-body mb-4 text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">About</h3>
              <p className="text-foreground/90 font-body leading-relaxed text-lg">
                I'm a Swiss–Italian analyst & builder focused on fintech AI. With a curious and delivery-oriented mindset, I'm always down for a new challenge.
              </p>
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
