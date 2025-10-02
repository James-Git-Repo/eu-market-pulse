import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

const EUROPEAN_INDICES = [
  { 
    name: "STOXX 600", 
    symbol: "^STOXX", 
    value: "487.23", 
    change: "+0.42",
    yahooUrl: "https://finance.yahoo.com/quote/%5ESTOXX"
  },
  { 
    name: "DAX", 
    symbol: "^GDAXI", 
    value: "16,234.50", 
    change: "-0.15",
    yahooUrl: "https://finance.yahoo.com/quote/%5EGDAXI"
  },
  { 
    name: "CAC 40", 
    symbol: "^FCHI", 
    value: "7,521.30", 
    change: "+0.28",
    yahooUrl: "https://finance.yahoo.com/quote/%5EFCHI"
  },
  { 
    name: "FTSE 100", 
    symbol: "^FTSE", 
    value: "7,445.32", 
    change: "+0.18",
    yahooUrl: "https://finance.yahoo.com/quote/%5EFTSE"
  },
  { 
    name: "FTSE MIB", 
    symbol: "FTSEMIB.MI", 
    value: "28,945.67", 
    change: "+0.51",
    yahooUrl: "https://finance.yahoo.com/quote/FTSEMIB.MI"
  },
  { 
    name: "IBEX 35", 
    symbol: "^IBEX", 
    value: "10,123.45", 
    change: "-0.22",
    yahooUrl: "https://finance.yahoo.com/quote/%5EIBEX"
  },
  { 
    name: "AEX", 
    symbol: "^AEX", 
    value: "883.45", 
    change: "+0.35",
    yahooUrl: "https://finance.yahoo.com/quote/%5EAEX"
  },
  { 
    name: "BEL 20", 
    symbol: "^BFX", 
    value: "4,123.67", 
    change: "-0.08",
    yahooUrl: "https://finance.yahoo.com/quote/%5EBFX"
  },
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

  const items = EUROPEAN_INDICES.map((index, i) => {
    const isPositive = index.change.startsWith("+");
    return (
      <a
        key={`index-${i}`}
        href={index.yahooUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors whitespace-nowrap group cursor-pointer"
        aria-label={`View ${index.name} on Yahoo Finance`}
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
        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  });

  return (
    <div
      className="relative w-full overflow-hidden py-3 sm:py-4 bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="European market indices ticker - Click any index to view live data on Yahoo Finance"
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
