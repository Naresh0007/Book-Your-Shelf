
import React from 'react';
import { X, Clock } from 'lucide-react';

interface NotificationBannerProps {
  message: string;
  expiryDate?: string;
  onClose?: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  message,
  expiryDate,
  onClose
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) onClose();
  };

  return (
    <div className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground py-3 px-4 relative animate-slide-down shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {expiryDate && (
            <Clock className="h-5 w-5 flex-shrink-0" />
          )}
          <p className="text-sm md:text-base font-medium">{message}</p>
          {expiryDate && (
            <span className="text-sm font-bold hidden sm:inline-block">Ends {expiryDate}</span>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="ml-3 p-1.5 hover:bg-accent-foreground/10 rounded-full transition-colors"
          aria-label="Close notification"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
