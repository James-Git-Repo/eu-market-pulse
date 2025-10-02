import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useEditor } from '@/contexts/EditorContext';
import { useToast } from '@/hooks/use-toast';

export const EditorLoginDialog = () => {
  const { showLoginDialog, setShowLoginDialog, signIn } = useEditor();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: 'Authentication failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Editor mode activated',
        description: 'You can now edit articles and covers.',
      });
      setEmail('');
      setPassword('');
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editor Authentication</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
