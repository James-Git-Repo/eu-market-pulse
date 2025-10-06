import { TickerStripe } from "./TickerStripe";

export const Hero = () => {
  return (
    <section 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] via-[#C89B68] to-[#B8865A] dark:from-[#2a1f15] dark:via-[#3d2a1a] dark:to-[#1f1812]" />
      
      {/* Circuit board pattern overlay - inspired by tech aesthetics */}
      <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA94D" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFBE7B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFD6A5" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        
        {/* Vertical circuit lines descending from top */}
        <g className="animate-pulse-slow">
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="10%" cy="15%" r="5" fill="url(#circuitGrad)" />
          <circle cx="10%" cy="45%" r="5" fill="url(#circuitGrad)" />
          <circle cx="10%" cy="75%" r="5" fill="url(#circuitGrad)" />
          
          <line x1="25%" y1="0" x2="25%" y2="85%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="25%" cy="20%" r="5" fill="url(#circuitGrad)" />
          <circle cx="25%" cy="55%" r="5" fill="url(#circuitGrad)" />
          
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="40%" cy="25%" r="5" fill="url(#circuitGrad)" />
          <circle cx="40%" cy="60%" r="5" fill="url(#circuitGrad)" />
          <circle cx="40%" cy="90%" r="5" fill="url(#circuitGrad)" />
          
          <line x1="55%" y1="0" x2="55%" y2="80%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="55%" cy="18%" r="5" fill="url(#circuitGrad)" />
          <circle cx="55%" cy="50%" r="5" fill="url(#circuitGrad)" />
          
          <line x1="70%" y1="0" x2="70%" y2="100%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="70%" cy="30%" r="5" fill="url(#circuitGrad)" />
          <circle cx="70%" cy="65%" r="5" fill="url(#circuitGrad)" />
          
          <line x1="85%" y1="0" x2="85%" y2="90%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <circle cx="85%" cy="22%" r="5" fill="url(#circuitGrad)" />
          <circle cx="85%" cy="58%" r="5" fill="url(#circuitGrad)" />
        </g>
        
        {/* Horizontal connecting lines */}
        <g className="animate-pulse-slow" style={{animationDelay: '0.5s'}}>
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <line x1="15%" y1="50%" x2="95%" y2="50%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <line x1="0" y1="75%" x2="85%" y2="75%" stroke="url(#circuitGrad)" strokeWidth="2" />
          <line x1="20%" y1="90%" x2="100%" y2="90%" stroke="url(#circuitGrad)" strokeWidth="2" />
        </g>
        
        {/* Hexagon shapes scattered */}
        <g className="animate-float">
          <polygon points="150,100 175,115 175,145 150,160 125,145 125,115" 
            fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" />
          <polygon points="450,250 485,272 485,316 450,338 415,316 415,272" 
            fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" />
          <polygon points="800,150 830,167 830,201 800,218 770,201 770,167" 
            fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" />
          <polygon points="300,450 320,463 320,489 300,502 280,489 280,463" 
            fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" />
          <polygon points="650,400 680,420 680,460 650,480 620,460 620,420" 
            fill="none" stroke="url(#circuitGrad)" strokeWidth="2.5" />
        </g>
        
        {/* Diagonal circuit paths */}
        <g className="animate-pulse-slow" style={{animationDelay: '1s'}}>
          <path d="M 0 100 L 100 130 L 200 120 L 300 145" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
          <path d="M 200 250 L 350 270 L 500 265 L 650 280" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
          <path d="M 400 350 L 550 330 L 700 340 L 850 325" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
        </g>
        
        {/* Additional connection nodes */}
        <g className="animate-pulse-slow" style={{animationDelay: '1.5s'}}>
          <circle cx="5%" cy="35%" r="4" fill="url(#circuitGrad)" />
          <circle cx="20%" cy="40%" r="4" fill="url(#circuitGrad)" />
          <circle cx="35%" cy="28%" r="4" fill="url(#circuitGrad)" />
          <circle cx="50%" cy="42%" r="4" fill="url(#circuitGrad)" />
          <circle cx="65%" cy="38%" r="4" fill="url(#circuitGrad)" />
          <circle cx="80%" cy="45%" r="4" fill="url(#circuitGrad)" />
          <circle cx="95%" cy="32%" r="4" fill="url(#circuitGrad)" />
        </g>
      </svg>
      
      {/* Subtle dot grid overlay */}
      <div className="absolute inset-0 opacity-25" style={{
        backgroundImage: `radial-gradient(circle at center, #FFA94D 1.5px, transparent 1.5px)`,
        backgroundSize: '35px 35px',
        animation: 'grid-move 25s linear infinite'
      }} />

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
