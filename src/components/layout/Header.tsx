import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import UserMenu from './UserMenu';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  
  useEffect(() => {
    setIsMenuOpen(false);
    setShowSearch(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setShowSearch(false);
    }
  };

  const hasNotification = className.includes('notification-visible');

  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      } ${hasNotification ? 'mt-14' : ''}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover-lift"
            aria-label="Bookstore Home"
          >
            <img 
              src="/lovable-uploads/f3deb412-7736-416b-b32a-0a4f2153e5a5.png" 
              alt="Book Your Shelf Logo" 
              className="h-8 w-8"
            />
            <span className="font-semibold text-lg md:text-xl text-foreground">Book Your Shelf</span>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex space-x-8">
              <NavLinks />
            </nav>
          )}
          
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-4">
              {showSearch ? (
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search books..."
                    className="w-56 py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    autoFocus
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Search books"
                  >
                    <Search className="h-4 w-4 text-gray-500" />
                  </button>
                  <button 
                    type="button"
                    onClick={toggleSearch}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={toggleSearch}
                  className="p-2 rounded-full hover:bg-secondary transition-colors" 
                  aria-label="Search books"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
              
              <Link 
                to="/wishlist" 
                className="p-2 rounded-full hover:bg-secondary transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-secondary transition-colors relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <UserMenu />
            </div>
          )}
          
          {isMobile && (
            <div className="flex items-center gap-2">
              {showSearch ? (
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search books..."
                    className="w-48 py-1.5 px-3 pr-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button 
                    type="button"
                    onClick={toggleSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Close search"
                  >
                    <X className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                </form>
              ) : (
                <>
                  <button 
                    onClick={toggleSearch}
                    className="p-1.5 rounded-md"
                    aria-label="Search books"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={toggleMenu}
                    className="p-1.5 rounded-md"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                  >
                    {isMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {isMobile && (
        <div 
          className={`
            fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ top: hasNotification ? '120px' : '64px' }}
        >
          <div className="px-4 py-6 space-y-8">
            <nav className="flex flex-col space-y-6">
              <NavLinks />
            </nav>
            
            <div className="flex items-center space-x-4 mt-6 pt-6 border-t">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({cartCount})</span>
              </Link>
            </div>
            
            <div className="mt-4">
              <UserMenu />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = () => {
  const location = useLocation();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'New Releases', path: '/books?filter=new' },
    { name: 'Best Sellers', path: '/books?filter=best' },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`
            relative py-2 text-base font-medium transition-colors
            before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0
            before:bg-accent before:transition-all before:duration-300
            hover:text-accent hover:before:w-full
            ${location.pathname === link.path ? 'text-accent before:w-full' : 'text-foreground'}
          `}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
};

export default Header;
