import { Link, useLocation } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="w-full py-6 sm:py-8 mt-12 sm:mt-16 border-t border-border">
      <div className="container mx-auto px-4">
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
      </div>
    </footer>
  );
};
