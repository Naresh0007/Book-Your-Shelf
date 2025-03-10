
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Share2 } from 'lucide-react';
import { FeaturedBooks } from '@/components/ui/FeaturedBooks';
import { BookProps } from '@/components/ui/BookCard';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

// Sample book data
const allBooks: BookProps[] = [
  {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price: 24.99,
    isBestseller: true
  },
  {
    id: '2',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    price: 19.99
  },
  {
    id: '3',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
    price: 22.50,
    isNew: true
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    price: 21.99
  },
  {
    id: '5',
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2730&q=80',
    price: 18.99,
    isBestseller: true
  }
];

// Extended book details
const bookDetails: Record<string, {
  description: string;
  pages: number;
  publisher: string;
  publicationDate: string;
  language: string;
  isbn: string;
  genres: string[];
}> = {
  '1': {
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    pages: 336,
    publisher: "Celadon Books",
    publicationDate: "February 5, 2019",
    language: "English",
    isbn: "978-1250301697",
    genres: ["Psychological Thriller", "Mystery", "Fiction"]
  },
  '2': {
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    pages: 304,
    publisher: "Viking",
    publicationDate: "August 13, 2020",
    language: "English",
    isbn: "978-0525559474",
    genres: ["Fiction", "Fantasy", "Contemporary"]
  },
  '3': {
    description: "From the bestselling and Booker Prize-winning author of Never Let Me Go and The Remains of the Day, a stunning new novel that asks: what does it mean to love?",
    pages: 320,
    publisher: "Knopf",
    publicationDate: "March 2, 2021",
    language: "English",
    isbn: "978-0593318171",
    genres: ["Science Fiction", "Literary Fiction"]
  },
  '4': {
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.",
    pages: 496,
    publisher: "Ballantine Books",
    publicationDate: "May 4, 2021",
    language: "English",
    isbn: "978-0593135204",
    genres: ["Science Fiction", "Adventure", "Space"]
  },
  '5': {
    description: "The Vignes twin sisters will always be identical. But after growing up together in a small, southern Black community and running away at age sixteen, it's not just the shape of their daily lives that is different as adults, it's everything.",
    pages: 352,
    publisher: "Riverhead Books",
    publicationDate: "June 2, 2020",
    language: "English",
    isbn: "978-0525536291",
    genres: ["Historical Fiction", "Literary Fiction"]
  }
};

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Find the book with the matching ID
  const book = allBooks.find(book => book.id === id);
  const details = id ? bookDetails[id] : null;
  const inWishlist = id ? isInWishlist(id) : false;
  
  // Handle adding to cart
  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      toast({
        title: "Added to cart",
        description: `${book.title} has been added to your cart.`,
      });
    }
  };
  
  // Handle wishlist toggle
  const handleToggleWishlist = () => {
    if (book) {
      if (inWishlist) {
        removeFromWishlist(book.id);
      } else {
        addToWishlist(book);
      }
    }
  };
  
  // If book not found
  if (!book || !details) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
        <p className="text-muted-foreground mb-8">The book you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/books"
          className="inline-flex items-center text-accent hover:text-accent/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to books
        </Link>
      </div>
    );
  }
  
  // Calculate related books (excluding current book)
  const relatedBooks = allBooks.filter(b => b.id !== id).slice(0, 5);
  
  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/books"
          className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to books
        </Link>
      </div>
      
      {/* Book details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Book cover */}
          <div className="flex justify-center md:justify-end">
            <div className="relative overflow-hidden rounded-lg shadow-xl max-w-sm">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title} by ${book.author}`}
                className="w-full h-auto"
              />
              
              {/* Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.isNew && (
                  <span className="bg-accent/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
                    New
                  </span>
                )}
                {book.isBestseller && (
                  <span className="bg-primary/90 text-white text-xs px-2 py-1 rounded-sm font-medium">
                    Bestseller
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Book info */}
          <div className="animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{book.author}</p>
            
            {/* Price */}
            <div className="flex items-center mb-8">
              <span className="text-2xl font-semibold">${book.price.toFixed(2)}</span>
              {book.originalPrice && (
                <span className="text-muted-foreground line-through ml-3">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.genres.map((genre, i) => (
                <span 
                  key={i}
                  className="bg-secondary text-foreground text-xs px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <div className="mb-8">
              <h2 className="font-medium mb-3">Description</h2>
              <p className="text-muted-foreground">{details.description}</p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>
              
              <button
                onClick={handleToggleWishlist}
                className={`border ${inWishlist 
                  ? 'bg-accent/10 border-accent text-accent' 
                  : 'border-border hover:bg-secondary'} px-6 py-3 rounded-md font-medium transition-colors flex items-center`}
              >
                <Heart className={`mr-2 h-5 w-5 ${inWishlist ? 'fill-accent' : ''}`} />
                {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                className="border border-border hover:bg-secondary p-3 rounded-md transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
            
            {/* Book details */}
            <div className="border-t border-border pt-8">
              <h2 className="font-medium mb-4">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher</span>
                  <span>{details.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publication Date</span>
                  <span>{details.publicationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages</span>
                  <span>{details.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span>{details.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN</span>
                  <span>{details.isbn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* You may also like section */}
      <FeaturedBooks
        title="You May Also Like"
        books={relatedBooks}
      />
    </div>
  );
};

export default BookDetails;
