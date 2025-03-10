
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (bookId: string) => {
    const book = wishlistItems.find(item => item.id === bookId);
    if (book) {
      addToCart(book);
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        <div className="bg-secondary/50 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-xl mb-6">Your wishlist is empty</p>
          <Link 
            to="/books" 
            className="inline-flex items-center text-accent hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <button 
          onClick={clearWishlist}
          className="text-muted-foreground hover:text-destructive flex items-center text-sm"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((book) => (
          <div 
            key={book.id} 
            className="border border-border rounded-lg overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <Link to={`/books/${book.id}`} className="block overflow-hidden h-48">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </Link>
            
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/books/${book.id}`} className="block hover:text-accent transition-colors">
                <h3 className="font-medium text-lg mb-1">{book.title}</h3>
              </Link>
              <p className="text-muted-foreground text-sm mb-4">{book.author}</p>
              
              <div className="mt-auto flex justify-between items-center">
                <div className="font-semibold">${book.price.toFixed(2)}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(book.id)}
                    className="flex items-center gap-1 bg-accent text-white px-3 py-1.5 rounded text-sm hover:bg-accent/90 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(book.id)}
                    className="p-1.5 rounded bg-muted hover:bg-muted/80 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <Link 
          to="/books" 
          className="inline-flex items-center text-accent hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
