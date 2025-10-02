import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-6 sm:py-8 mt-12 sm:mt-16 border-t border-border">
      <div className="container mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
          <span>© {new Date().getFullYear()} The (un)Stable Net</span>
          <span className="hidden sm:inline">{" · "}</span>
          <Link to="/legal/terms" className="hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
          <span className="hidden sm:inline">{" · "}</span>
          <Link to="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};
