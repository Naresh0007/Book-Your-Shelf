
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookCard, BookProps } from '@/components/ui/BookCard';
import { Check, ChevronDown, X } from 'lucide-react';

// Sample book data (in a real app, this would come from API)
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
  },
  {
    id: '6',
    title: 'Cloud Cuckoo Land',
    author: 'Anthony Doerr',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
    price: 23.99,
    isNew: true
  },
  {
    id: '7',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    price: 20.99,
    isNew: true
  },
  {
    id: '8',
    title: 'Great Circle',
    author: 'Maggie Shipstead',
    coverImage: 'https://images.unsplash.com/photo-1531928351158-2f736078e0a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 19.50,
    isNew: true
  },
  {
    id: '9',
    title: 'The Lincoln Highway',
    author: 'Amor Towles',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80',
    price: 22.99,
    isNew: true
  },
  {
    id: '10',
    title: 'Harlem Shuffle',
    author: 'Colson Whitehead',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 21.50,
    isNew: true
  },
  {
    id: '11',
    title: 'Beautiful World, Where Are You',
    author: 'Sally Rooney',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80',
    price: 18.99
  },
  {
    id: '12',
    title: 'The Hill We Climb',
    author: 'Amanda Gorman',
    coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2829&q=80',
    price: 15.99
  }
];

// Filter options
const categories = ['Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 'Romance', 'Fantasy'];
const priceRanges = [
  { min: 0, max: 10, label: 'Under $10' },
  { min: 10, max: 20, label: '$10 - $20' },
  { min: 20, max: 30, label: '$20 - $30' },
  { min: 30, max: Infinity, label: 'Over $30' },
];

const Books = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookProps[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Parse URL query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');
    
    if (filter === 'new') {
      setShowNewOnly(true);
    } else if (filter === 'best') {
      setShowBestsellersOnly(true);
    }
    
    // Apply filters
    filterBooks();
  }, [location.search]);
  
  // Filter books based on selected filters
  const filterBooks = () => {
    let filteredBooks = [...allBooks];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      // In a real app, books would have categories
      // This is just for demonstration
    }
    
    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      filteredBooks = filteredBooks.filter(book => {
        return selectedPriceRanges.some(rangeIndex => {
          const range = priceRanges[rangeIndex];
          return book.price >= range.min && book.price < range.max;
        });
      });
    }
    
    // Filter by new releases
    if (showNewOnly) {
      filteredBooks = filteredBooks.filter(book => book.isNew);
    }
    
    // Filter by bestsellers
    if (showBestsellersOnly) {
      filteredBooks = filteredBooks.filter(book => book.isBestseller);
    }
    
    setBooks(filteredBooks);
  };
  
  // Apply filters when selection changes
  useEffect(() => {
    filterBooks();
  }, [selectedCategories, selectedPriceRanges, showNewOnly, showBestsellersOnly]);
  
  // Initialize with all books
  useEffect(() => {
    setBooks(allBooks);
  }, []);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Toggle price range selection
  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setShowNewOnly(false);
    setShowBestsellersOnly(false);
    navigate('/books');
  };
  
  return (
    <div className="animate-fade-in pt-8">
      {/* Page header */}
      <div className="bg-secondary">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
          <h1 className="text-3xl font-bold">Browse Our Collection</h1>
          <p className="text-muted-foreground mt-2">Discover your next favorite read</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="md:hidden flex items-center justify-between mb-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-md"
            >
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || showNewOnly || showBestsellersOnly) && (
              <button 
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-accent underline"
              >
                Clear all
              </button>
            )}
          </div>
          
          {/* Filters - Sidebar */}
          <div 
            className={`
              md:w-72 space-y-6 bg-white p-4 rounded-lg border
              ${isFilterOpen ? 'block' : 'hidden'} md:block
            `}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">Filters</h2>
              {(selectedCategories.length > 0 || selectedPriceRanges.length > 0 || showNewOnly || showBestsellersOnly) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-accent"
                >
                  Clear all
                </button>
              )}
            </div>
            
            {/* Category filter */}
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <div 
                      className={`
                        h-5 w-5 border rounded-sm flex items-center justify-center
                        ${selectedCategories.includes(category) ? 'bg-accent border-accent' : 'border-input'}
                      `}
                      onClick={() => toggleCategory(category)}
                    >
                      {selectedCategories.includes(category) && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Price filter */}
            <div>
              <h3 className="font-medium mb-3">Price</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <div 
                      className={`
                        h-5 w-5 border rounded-sm flex items-center justify-center
                        ${selectedPriceRanges.includes(index) ? 'bg-accent border-accent' : 'border-input'}
                      `}
                      onClick={() => togglePriceRange(index)}
                    >
                      {selectedPriceRanges.includes(index) && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Special filters */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div 
                  className={`
                    h-5 w-5 border rounded-sm flex items-center justify-center
                    ${showNewOnly ? 'bg-accent border-accent' : 'border-input'}
                  `}
                  onClick={() => setShowNewOnly(!showNewOnly)}
                >
                  {showNewOnly && (
                    <Check className="h-3.5 w-3.5 text-white" />
                  )}
                </div>
                <span className="text-sm">New Releases</span>
              </label>
              
              <label className="flex items-center space-x-2 cursor-pointer">
                <div 
                  className={`
                    h-5 w-5 border rounded-sm flex items-center justify-center
                    ${showBestsellersOnly ? 'bg-accent border-accent' : 'border-input'}
                  `}
                  onClick={() => setShowBestsellersOnly(!showBestsellersOnly)}
                >
                  {showBestsellersOnly && (
                    <Check className="h-3.5 w-3.5 text-white" />
                  )}
                </div>
                <span className="text-sm">Bestsellers</span>
              </label>
            </div>
          </div>
          
          {/* Books Grid */}
          <div className="flex-1">
            {/* Active filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map(category => (
                <div 
                  key={category}
                  className="bg-secondary text-foreground text-sm py-1 px-3 rounded-full flex items-center"
                >
                  {category}
                  <button 
                    onClick={() => toggleCategory(category)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {selectedPriceRanges.map(index => (
                <div 
                  key={index}
                  className="bg-secondary text-foreground text-sm py-1 px-3 rounded-full flex items-center"
                >
                  {priceRanges[index].label}
                  <button 
                    onClick={() => togglePriceRange(index)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {showNewOnly && (
                <div className="bg-secondary text-foreground text-sm py-1 px-3 rounded-full flex items-center">
                  New Releases
                  <button 
                    onClick={() => setShowNewOnly(false)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {showBestsellersOnly && (
                <div className="bg-secondary text-foreground text-sm py-1 px-3 rounded-full flex items-center">
                  Bestsellers
                  <button 
                    onClick={() => setShowBestsellersOnly(false)}
                    className="ml-2"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-6">
              Showing {books.length} {books.length === 1 ? 'book' : 'books'}
            </p>
            
            {/* Books grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 staggered-fade-in">
              {books.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
            
            {/* Empty state */}
            {books.length === 0 && (
              <div className="text-center py-12">
                <h3 className="font-medium text-lg mb-2">No books found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={clearFilters}
                  className="text-accent hover:text-accent/90 font-medium underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
