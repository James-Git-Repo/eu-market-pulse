import billboardVideo from "@/assets/billboard-demo.mp4";

const MillionSlots = () => {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">The Million Slots AI Billboard</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A 1,000,000-tile digital mosaic of AI micro-videos
        </p>
        <div className="aspect-video rounded-lg overflow-hidden bg-black">
          <video 
            className="w-full h-full object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={billboardVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </main>
  );
};

export default MillionSlots;
