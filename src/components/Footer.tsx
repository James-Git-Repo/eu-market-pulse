import { Link, useLocation } from "react-router-dom";
import { Linkedin, Github, Youtube, Upload } from "lucide-react";
import { useEditor } from "@/contexts/EditorContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isEditorMode } = useEditor();
  const { toast } = useToast();
  const [footerPhoto, setFooterPhoto] = useState<{ id: number | null; imageUrl: string }>({
    id: null,
    imageUrl: ""
  });
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const fetchFooterPhoto = async () => {
      const { data } = await supabase
        .from("Covers")
        .select("*")
        .eq("category", "footer-photo")
        .single();
      
      if (data) {
        setFooterPhoto({ id: data.id, imageUrl: data.image || "" });
      }
    };
    
    if (isHomePage) {
      fetchFooterPhoto();
    }
  }, [isHomePage]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `footer-photo-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('article-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(filePath);

      const { data, error: upsertError } = await supabase
        .from('Covers')
        .upsert({
          id: footerPhoto.id,
          category: 'footer-photo',
          name: 'Footer Photo',
          image: publicUrl
        })
        .select()
        .single();

      if (upsertError) throw upsertError;

      setFooterPhoto({ id: data.id, imageUrl: publicUrl });
      toast({
        title: "Success",
        description: "Footer photo updated successfully",
      });
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="w-full py-4 sm:py-6 mt-6 sm:mt-8">
      <div className="container mx-auto px-4">
        {isHomePage && (
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-4">
            {/* Social Links - Left */}
            <div className="flex flex-col gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">LinkedIn</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Github className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">GitHub</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <Youtube className="w-6 h-6" />
                </div>
                <span className="text-foreground font-body text-sm font-medium">YouTube</span>
              </a>
            </div>
            
            {/* Photo and About Section - Right Side */}
            <div className="flex items-start gap-4 md:ml-auto">
              {/* About Text - Left of Photo */}
              <div className="flex-1 max-w-md">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-3">About</h3>
                <p className="text-foreground/80 font-body text-sm leading-relaxed">
                  Welcome to The (un)Stable Net, where we explore the intersection of technology, 
                  finance, and innovation. Stay informed with our latest insights and analysis.
                </p>
              </div>
              
              {/* Profile Photo */}
              <div className="relative flex-shrink-0">
                <div 
                  className="bg-accent/5 border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  onClick={() => isEditorMode && setShowEditDialog(true)}
                >
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
                    {footerPhoto.imageUrl ? (
                      <img src={footerPhoto.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-foreground/40 text-sm font-body">Photo</span>
                    )}
                  </div>
                </div>
                {isEditorMode && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -top-2 -right-2"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Footer Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {footerPhoto.imageUrl && (
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-accent/5">
                  <img src={footerPhoto.imageUrl} alt="Current footer photo" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Legal Links */}
        <div className="text-center text-xs sm:text-sm text-foreground font-body pt-8 border-t border-border">
          <p className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0">
            <span>© {new Date().getFullYear()} The (un)Stable Net</span>
            <span className="hidden sm:inline">{" · "}</span>
            <Link to="/legal/terms" className="hover:text-primary transition-colors">
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline">{" · "}</span>
            <Link to="/legal/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
