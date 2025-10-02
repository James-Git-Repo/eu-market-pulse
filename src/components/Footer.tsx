import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-border">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} The (un)Stable Net
          {" · "}
          <Link to="/legal/terms" className="hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
          {" · "}
          <Link to="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};
