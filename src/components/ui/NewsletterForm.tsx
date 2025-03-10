
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "default",
      });
      
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-background border border-border focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-sm"
          required
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 bg-accent hover:bg-accent/90 text-white px-4 rounded-md transition-colors flex items-center gap-1.5 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>Subscribing...</span>
          ) : (
            <>
              <Mail className="h-4 w-4" />
              <span>Subscribe</span>
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        By subscribing, you agree to our Privacy Policy.
      </p>
    </form>
  );
};
