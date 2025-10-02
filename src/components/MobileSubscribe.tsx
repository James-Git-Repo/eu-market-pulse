import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const MobileSubscribe = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t border-border shadow-lg p-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/subscribe" className="flex-1">
          <Button className="w-full">Subscribe to Newsletter</Button>
        </Link>
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
