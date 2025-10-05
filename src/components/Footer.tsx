import { Link, useLocation } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="w-full py-6 sm:py-8 mt-12 sm:mt-16 border-t border-border">
      <div className="container mx-auto px-4">
        {isHomePage && (
          <>
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
              {/* Social Links - Left */}
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
                >
                  <Youtube className="w-6 h-6" />
                </a>
              </div>
              
              {/* About - Right */}
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold font-body mb-3 text-foreground">About</h3>
                <p className="text-foreground font-body">
                  I'm a Swiss–Italian analyst & builder focused on fintech AI. With a curious and delivery-oriented mindset, I'm always down for a new challenge.
                </p>
              </div>
            </div>
            
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
          </>
        )}
        
        {!isHomePage && (
          <div className="text-center text-xs sm:text-sm text-foreground font-body">
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
        )}
      </div>
    </footer>
  );
};
