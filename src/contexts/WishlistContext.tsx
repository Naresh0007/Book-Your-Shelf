
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookProps } from '@/components/ui/BookCard';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlistItems: BookProps[];
  addToWishlist: (book: BookProps) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize wishlist from localStorage if available
  const [wishlistItems, setWishlistItems] = useState<BookProps[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add a book to wishlist
  const addToWishlist = (book: BookProps) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        toast({
          title: "Already in wishlist",
          description: `${book.title} is already in your wishlist.`,
        });
        return prevItems;
      } else {
        toast({
          title: "Added to wishlist",
          description: `${book.title} has been added to your wishlist.`,
        });
        return [...prevItems, book];
      }
    });
  };

  // Remove a book from wishlist
  const removeFromWishlist = (bookId: string) => {
    setWishlistItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === bookId);
      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.title} has been removed from your wishlist.`,
        });
      }
      return prevItems.filter(item => item.id !== bookId);
    });
  };

  // Check if a book is in the wishlist
  const isInWishlist = (bookId: string) => {
    return wishlistItems.some(item => item.id === bookId);
  };

  // Clear all items from wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  // Get total number of items in wishlist
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      getWishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
