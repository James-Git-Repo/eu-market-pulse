import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface IndexData {
  name: string;
  symbol: string;
  value: string;
  change: string;
  yahooUrl: string;
}

export const TickerStripe = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMarketData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-market-data');
      
      if (error) {
        console.error('Error fetching market data:', error);
        return;
      }
      
      if (data?.indices) {
        setIndices(data.indices);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchMarketData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchMarketData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading || indices.length === 0) {
    return (
      <div className="relative w-full overflow-hidden py-3 sm:py-4 bg-card/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-border">
        <div className="flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Loading market data...</span>
        </div>
      </div>
    );
  }

  const items = indices.map((index, i) => {
    const isPositive = parseFloat(index.change) >= 0;
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
          {isPositive ? '+' : ''}{index.change}%
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
