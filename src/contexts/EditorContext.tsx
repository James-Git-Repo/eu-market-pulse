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
  const [hasEditorRole, setHasEditorRole] = useState(false);

  // Check if user has editor or admin role
  const checkEditorRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'editor'
      });
      
      if (error) {
        console.error('Error checking editor role:', error);
        return false;
      }
      
      // Also check for admin role
      const { data: adminData, error: adminError } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      
      if (adminError) {
        console.error('Error checking admin role:', adminError);
        return false;
      }
      
      return data === true || adminData === true;
    } catch (err) {
      console.error('Error in checkEditorRole:', err);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        // Check role when session changes
        if (session?.user) {
          setTimeout(() => {
            checkEditorRole(session.user.id).then(setHasEditorRole);
          }, 0);
          setShowLoginDialog(false);
        } else {
          setHasEditorRole(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        checkEditorRole(session.user.id).then(setHasEditorRole);
      }
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
        isEditorMode: !!session && hasEditorRole,
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
