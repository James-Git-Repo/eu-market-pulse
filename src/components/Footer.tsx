import { Link } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-6">
      <div className="container mx-auto px-4 sm:px-6 py-7 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Left: Social logos */}
          <div>
            <div className="flex gap-3.5 items-center" aria-label="Social links">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-[10px] grid place-items-center bg-card border border-border transition-transform hover:-translate-y-0.5 hover:border-primary/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-[10px] grid place-items-center bg-card border border-border transition-transform hover:-translate-y-0.5 hover:border-primary/50"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-[10px] grid place-items-center bg-card border border-border transition-transform hover:-translate-y-0.5 hover:border-primary/50"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Middle: Legal links */}
          <div className="text-center text-sm text-muted-foreground font-sans">
            <div className="h-px bg-border opacity-90 mb-3" aria-hidden="true" />
            <div>
              © {new Date().getFullYear()} The (un)Stable Net · {" "}
              <Link to="/legal/terms" className="text-foreground hover:text-primary transition-colors">
                Terms &amp; Conditions
              </Link>
              {" · "}
              <Link to="/legal/privacy" className="text-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Right: About blurb */}
          <div className="text-sm text-muted-foreground font-sans leading-relaxed">
            <strong className="text-foreground">About</strong><br />
            I'm a Swiss–Italian analyst &amp; builder focused on fintech &amp; AI. With a curious and delivery‑oriented mindset, I'm always down for a new challenge.
          </div>
        </div>
      </div>
    </footer>
  );
};
