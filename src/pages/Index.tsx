import { Link } from "react-router-dom";
import { Linkedin, Github, Youtube } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFD6A5] via-[#FFBE7B] to-[#FFA94D]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-body text-foreground mb-6">
          The (un)Stable Net
        </h1>
        <p className="text-xl md:text-2xl font-body text-foreground/90 max-w-3xl mx-auto">
          A blog about financial markets, tech & AI and content creation
        </p>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-4xl font-bold font-body text-foreground mb-12">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Newsletter Project Card - Links to Articles */}
          <Link to="/articles" className="block group">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full hover:shadow-xl transition-all duration-300 border border-border">
              <h3 className="text-2xl font-bold font-body mb-3">Newsletter project</h3>
              <p className="text-muted-foreground font-body mb-6">
                European Market Movers — weekly macro & market signals
              </p>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
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
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full border border-border">
            <h3 className="text-2xl font-bold font-body mb-3">The Million Slots AI Billboard</h3>
            <p className="text-muted-foreground font-body mb-6">
              A 1,000,000-tile digital mosaic of AI micro-videos
            </p>
            <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 rounded-lg overflow-hidden">
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
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-6 h-full border border-border">
            <h3 className="text-2xl font-bold font-body mb-3">Coming soon</h3>
            <p className="text-muted-foreground font-body mb-6">
              New projects and deep dives are landing shortly.
            </p>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg overflow-hidden flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 pb-20">
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
