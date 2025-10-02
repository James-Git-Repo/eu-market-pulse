import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const MOCK_INDICES = [
  { name: "STOXX 600", value: "487.23", change: "+0.42" },
  { name: "DAX", value: "16,234.50", change: "-0.15" },
  { name: "CAC 40", value: "7,521.30", change: "+0.28" },
  { name: "FTSE MIB", value: "28,945.67", change: "+0.51" },
  { name: "IBEX 35", value: "10,123.45", change: "-0.22" },
];

const MOCK_POSTS = [
  { slug: "eu-banks-nim-compression", title: "EU Banks' NIM Compression" },
  { slug: "semis-cyclicals-growth", title: "Semis: Cyclicals Wearing Growth" },
  { slug: "pharma-pricing-pressure", title: "Pharma Pricing Under Pressure" },
];

export const TickerStripe = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const items = [
    ...MOCK_POSTS.map((post, i) => (
      <Link
        key={`post-${i}`}
        to={`/post/${post.slug}`}
        className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors whitespace-nowrap"
      >
        <span className="text-xs sm:text-sm font-medium">{post.title}</span>
      </Link>
    )),
    ...MOCK_INDICES.map((index, i) => {
      const isPositive = index.change.startsWith("+");
      return (
        <div
          key={`index-${i}`}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 whitespace-nowrap"
        >
          <span className="text-xs sm:text-sm font-semibold">{index.name}</span>
          <span className="text-xs sm:text-sm text-muted-foreground hidden sm:inline">{index.value}</span>
          <span
            className={`inline-flex items-center text-xs font-medium ${
              isPositive ? "text-chip-up" : "text-chip-down"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            )}
            {index.change}%
          </span>
        </div>
      );
    }),
  ];

  return (
    <div
      className="relative w-full overflow-hidden py-3 sm:py-4 bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Market indices and latest posts ticker"
    >
      {!prefersReducedMotion && (
        <button
          className="sr-only"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume ticker animation" : "Pause ticker animation"}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}
      
      <div className="flex gap-3">
        <div
          className={`flex gap-3 ${
            !prefersReducedMotion && !isPaused ? "animate-marquee" : ""
          }`}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {items}
        </div>
        <div
          className={`flex gap-3 ${
            !prefersReducedMotion && !isPaused ? "animate-marquee" : ""
          }`}
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
          aria-hidden="true"
        >
          {items}
        </div>
      </div>
    </div>
  );
};
