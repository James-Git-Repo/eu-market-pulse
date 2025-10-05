import { Link } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Circuit board animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] via-[#C89B68] to-[#B8865A]">
        {/* Circuit board pattern - SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA94D" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFBE7B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFD6A5" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          
          {/* Vertical lines with nodes */}
          <g className="animate-pulse-slow">
            <line x1="100" y1="0" x2="100" y2="200" stroke="url(#circuitGradient)" strokeWidth="2" />
            <circle cx="100" cy="50" r="4" fill="url(#circuitGradient)" />
            <circle cx="100" cy="150" r="4" fill="url(#circuitGradient)" />
            
            <line x1="250" y1="100" x2="250" y2="400" stroke="url(#circuitGradient)" strokeWidth="2" />
            <circle cx="250" cy="150" r="4" fill="url(#circuitGradient)" />
            <circle cx="250" cy="300" r="4" fill="url(#circuitGradient)" />
            
            <line x1="400" y1="50" x2="400" y2="300" stroke="url(#circuitGradient)" strokeWidth="2" />
            <circle cx="400" cy="100" r="4" fill="url(#circuitGradient)" />
            <circle cx="400" cy="250" r="4" fill="url(#circuitGradient)" />
          </g>
          
          {/* Horizontal lines with nodes */}
          <g className="animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <line x1="0" y1="100" x2="300" y2="100" stroke="url(#circuitGradient)" strokeWidth="2" />
            <circle cx="150" cy="100" r="4" fill="url(#circuitGradient)" />
            
            <line x1="200" y1="250" x2="600" y2="250" stroke="url(#circuitGradient)" strokeWidth="2" />
            <circle cx="400" cy="250" r="4" fill="url(#circuitGradient)" />
          </g>
          
          {/* Hexagons */}
          <g className="animate-float">
            <polygon points="200,200 220,210 220,230 200,240 180,230 180,210" 
              fill="none" stroke="url(#circuitGradient)" strokeWidth="2" />
            <polygon points="500,350 530,370 530,410 500,430 470,410 470,370" 
              fill="none" stroke="url(#circuitGradient)" strokeWidth="2" />
            <polygon points="150,450 170,460 170,480 150,490 130,480 130,460" 
              fill="none" stroke="url(#circuitGradient)" strokeWidth="2" />
          </g>
          
          {/* Diagonal circuit traces */}
          <g className="animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
            <path d="M 50 50 L 100 80 L 150 70 L 200 100" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" />
            <path d="M 300 150 L 350 180 L 400 170 L 450 200" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" />
          </g>
        </svg>
        
        {/* Repeating pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, #FFA94D 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold font-body mb-6 bg-gradient-to-r from-[#FFA94D] via-[#FF8C3D] to-[#FF6B2B] bg-clip-text text-transparent">
          The (un)Stable Net
        </h1>
        <p className="text-xl md:text-2xl font-body text-foreground max-w-3xl">
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

    </div>
  );
};

export default Index;
