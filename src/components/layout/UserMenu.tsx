
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, UserCircle, Heart, Settings, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const UserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        className="flex items-center space-x-1 p-2 rounded-md hover:bg-secondary transition-colors"
      >
        <User className="h-5 w-5" />
        <span className="hidden md:inline">Login</span>
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-secondary transition-colors focus:outline-none"
        aria-label="Open user menu"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="hidden md:inline text-sm font-medium">{user.name.split(' ')[0]}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeMenu}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-border overflow-hidden z-50">
            <div className="p-3 border-b border-border">
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
            
            <div className="py-1">
              <Link
                to="/wishlist"
                className="flex items-center px-4 py-2 text-sm hover:bg-secondary transition-colors"
                onClick={closeMenu}
              >
                <Heart className="mr-3 h-4 w-4" />
                My Wishlist
              </Link>
              
              <Link
                to="/cart"
                className="flex items-center px-4 py-2 text-sm hover:bg-secondary transition-colors"
                onClick={closeMenu}
              >
                <ShoppingBag className="mr-3 h-4 w-4" />
                My Cart
              </Link>
              
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm hover:bg-secondary transition-colors"
                onClick={closeMenu}
              >
                <UserCircle className="mr-3 h-4 w-4" />
                Profile
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm hover:bg-secondary transition-colors"
                onClick={closeMenu}
              >
                <Settings className="mr-3 h-4 w-4" />
                Settings
              </Link>
            </div>
            
            <div className="py-1 border-t border-border">
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
              >
                <LogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
