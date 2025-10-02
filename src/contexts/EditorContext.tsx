import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface EditorContextType {
  isEditorMode: boolean;
  session: Session | null;
  showLoginDialog: boolean;
  setShowLoginDialog: (show: boolean) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session) {
          setShowLoginDialog(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+Shift+E to enter editor mode
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        if (!session) {
          setShowLoginDialog(true);
        }
      }
      // Ctrl+Shift+L to exit editor mode
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        signOut();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [session]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <EditorContext.Provider
      value={{
        isEditorMode: !!session,
        session,
        showLoginDialog,
        setShowLoginDialog,
        signIn,
        signOut,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within EditorProvider');
  }
  return context;
};
