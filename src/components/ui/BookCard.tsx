
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useToast } from '@/hooks/use-toast';

export interface BookProps {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
}

export const BookCard: React.FC<BookProps> = ({
  id,
  title,
  author,
  coverImage,
  price,
  originalPrice,
  isNew,
  isBestseller,
  isSale,
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  
  const inWishlist = isInWishlist(id);

  // Calculate discount percentage if originalPrice exists
  const discountPercentage = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      title,
      author,
      coverImage,
      price,
      originalPrice,
      isNew,
      isBestseller,
      isSale,
    });
    
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        title,
        author,
        coverImage,
        price,
        originalPrice,
        isNew,
        isBestseller,
        isSale,
      });
    }
  };
  
  return (
    <div className="book-card group rounded-md overflow-hidden bg-white">
      <Link to={`/books/${id}`} className="block relative">
        {/* Book tags */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {isNew && (
            <span className="bg-accent/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
              New
            </span>
          )}
          {isBestseller && (
            <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
              Bestseller
            </span>
          )}
          {isSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-medium">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className={`p-1.5 rounded-full ${inWishlist 
              ? 'bg-accent text-white' 
              : 'bg-white/90 backdrop-blur-sm hover:bg-white'} transition-colors`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="p-1.5 rounded-full bg-accent/90 backdrop-blur-sm hover:bg-accent transition-colors"
            aria-label="Add to cart"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 text-white" />
          </button>
        </div>
        
        {/* Book cover */}
        <div className="img-hover-zoom h-64 sm:h-72 bg-muted flex items-center justify-center">
          <img 
            src={coverImage} 
            alt={`Cover of ${title} by ${author}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </Link>
      
      {/* Book details */}
      <div className="p-4">
        <Link to={`/books/${id}`} className="block group">
          <h3 className="font-medium text-base line-clamp-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{author}</p>
        </Link>
        
        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className={`font-semibold ${originalPrice ? 'text-red-600' : ''}`}>
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="text-xs bg-accent/10 text-accent hover:bg-accent hover:text-white px-2 py-1 rounded transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
