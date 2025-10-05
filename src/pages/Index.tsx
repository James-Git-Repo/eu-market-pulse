import { Link } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated tech background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD6A5] via-[#FFBE7B] to-[#FFA94D]">
        {/* Binary rain effect */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to bottom, transparent 0%, transparent 95%, #000 95%, #000 100%)`,
          backgroundSize: '20px 20px',
          animation: 'scroll-down 20s linear infinite'
        }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 15s linear infinite'
        }} />
        
        {/* Data flow lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFA94D" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FFBE7B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFD6A5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M 0 100 L 200 150 L 400 100 L 600 180 L 800 120 L 1000 160 L 1200 100 L 1400 140 L 1600 100" 
            stroke="url(#techGradient)" strokeWidth="2" fill="none" className="animate-draw-line" />
          <path d="M 0 250 L 250 200 L 500 270 L 750 220 L 1000 280 L 1250 240 L 1500 260 L 1600 230" 
            stroke="url(#techGradient)" strokeWidth="2" fill="none" className="animate-draw-line-delayed" />
        </svg>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-foreground/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-foreground/20 rounded-full animate-float-delayed" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-foreground/20 rounded-full animate-float" />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-foreground/20 rounded-full animate-float-delayed" />
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold font-body mb-6 bg-gradient-to-r from-[#FFA94D] via-[#FF8C3D] to-[#FF6B2B] bg-clip-text text-transparent">
          The (un)Stable Net
        </h1>
        <p className="text-xl md:text-2xl font-body text-foreground/90 max-w-3xl mx-auto">
          A blog about financial markets, tech & AI and content creation
        </p>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <h2 className="text-4xl font-bold font-body text-foreground mb-12">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Newsletter Project Card - Links to Articles */}
          <Link to="/articles" className="block group">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full hover:shadow-xl transition-all duration-300 border border-border">
              <h3 className="text-2xl font-bold font-body mb-3">Newsletter project</h3>
              <p className="text-muted-foreground font-body mb-6">
                European Market Movers — weekly macro & market signals
              </p>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <svg className="w-full h-full" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,150 Q100,100 200,120 T400,100 L400,250 L0,250 Z" fill="url(#grad1)" opacity="0.6"/>
                  <path d="M0,170 Q100,130 200,150 T400,140 L400,250 L0,250 Z" fill="url(#grad2)" opacity="0.4"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </Link>

          {/* Million Slots Card */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full border border-border group">
            <h3 className="text-2xl font-bold font-body mb-3">The Million Slots AI Billboard</h3>
            <p className="text-muted-foreground font-body mb-6">
              A 1,000,000-tile digital mosaic of AI micro-videos
            </p>
            <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full grid grid-cols-10 grid-rows-10 gap-0.5 p-2">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gradient-to-br from-primary to-accent rounded-sm opacity-70"
                    style={{
                      animationDelay: `${i * 0.02}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full border border-border group">
            <h3 className="text-2xl font-bold font-body mb-3">Coming soon</h3>
            <p className="text-muted-foreground font-body mb-6">
              New projects and deep dives are landing shortly.
            </p>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 pb-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex gap-4">
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-foreground/80 transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold font-body mb-3">About</h3>
            <p className="text-foreground/90 font-body max-w-2xl">
              I'm a Swiss–Italian analyst & builder focused on fintech AI. With a curious and delivery-oriented mindset, I'm always down for a new challenge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
