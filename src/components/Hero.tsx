import { TickerStripe } from "./TickerStripe";

export const Hero = () => {
  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d3] via-[#ffd7a8] to-[#e8d4b8] dark:from-[#2a1f15] dark:via-[#3d2a1a] dark:to-[#1f1812]" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Animated diagonal lines */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full animate-slide-diagonal" 
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, hsl(var(--accent) / 0.3) 40px, hsl(var(--accent) / 0.3) 42px)',
          }} 
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 animate-float" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
        <div className="absolute top-40 right-20 w-24 h-24 border border-accent/20 animate-float-delayed" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-secondary/20 animate-spin-slow" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }} />
        <div className="absolute bottom-32 right-1/3 w-28 h-28 border border-primary/20 animate-float" style={{ transform: 'rotate(45deg)' }} />
      </div>

      {/* Chart-like lines animation */}
      <svg className="absolute inset-0 w-full h-full opacity-15 dark:opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path 
          d="M 0 200 Q 200 150, 400 180 T 800 160 T 1200 200 T 1600 180" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          fill="none"
          className="animate-draw-line"
        />
        <path 
          d="M 0 300 Q 250 280, 500 320 T 1000 290 T 1500 310" 
          stroke="url(#lineGradient)" 
          strokeWidth="2" 
          fill="none"
          className="animate-draw-line-delayed"
        />
      </svg>

      <div className="container mx-auto text-center relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-hero font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent px-4">
          European Market Mover
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-hero-subtitle text-foreground/80 dark:text-foreground/90 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4">
          Signals, not noise. Actionable briefs across EU markets.
        </p>
        
        <TickerStripe />
      </div>
    </section>
  );
};
