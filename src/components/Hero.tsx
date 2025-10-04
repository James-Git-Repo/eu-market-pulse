export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Animated gradient mesh background */}
      <div 
        className="absolute inset-[-20%] blur-[50px] opacity-85"
        style={{
          background: `
            radial-gradient(60% 60% at 20% 30%, rgba(76, 130, 255, 0.35), transparent 70%),
            radial-gradient(50% 50% at 80% 40%, rgba(60, 255, 221, 0.18), transparent 70%),
            radial-gradient(45% 45% at 40% 80%, rgba(110, 126, 255, 0.28), transparent 70%),
            linear-gradient(120deg, rgba(10, 24, 60, 1), rgba(10, 18, 44, 1))
          `,
          animation: 'floaty 18s ease-in-out infinite alternate',
        }}
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero font-extrabold mb-4 leading-tight">
          THE <span className="opacity-80 font-semibold">(UN)</span>STABLE NET
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          A blog about financial markets, tech &amp; AI and content creation
        </p>
      </div>
    </section>
  );
};
