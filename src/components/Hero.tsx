import { TickerStripe } from "./TickerStripe";

export const Hero = () => {
  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5e6d3] via-[#ffd7a8] to-[#ffb366] dark:from-[#3d2f1f] dark:via-[#5c3d1f] dark:to-[#8b5a2b] animate-gradient" />
      
      {/* Animated overlay shapes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-orange-400/30 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-amber-400/30 to-transparent rounded-full blur-3xl animate-float-delayed" />
      </div>

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
