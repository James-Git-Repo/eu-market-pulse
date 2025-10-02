import { TickerStripe } from "./TickerStripe";

export const Hero = () => {
  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          European Market Mover
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Signals, not noise. Actionable briefs across EU markets.
        </p>
        
        <TickerStripe />
      </div>
    </section>
  );
};
