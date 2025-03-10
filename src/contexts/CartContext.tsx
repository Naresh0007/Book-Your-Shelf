
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookProps } from '@/components/ui/BookCard';

interface CartItem extends BookProps {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: BookProps) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a book to cart or increment quantity if already in cart
  const addToCart = (book: BookProps) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map(item => 
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  // Remove a book from cart
  const removeFromCart = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  // Update quantity of a book in cart
  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price of all items in cart
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
