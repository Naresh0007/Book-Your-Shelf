
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'google' | 'outlook' | 'facebook' | 'instagram' | 'email';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: User['provider'], email?: string, password?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock function to simulate login with social providers or email/password
const mockLogin = (provider: User['provider'], email?: string): Promise<User> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      let userEmail = email || `user${Math.floor(Math.random() * 1000)}@example.com`;
      let userName = email ? email.split('@')[0] : `User ${Math.floor(Math.random() * 1000)}`;
      
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        name: userName,
        email: userEmail,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
        provider
      };
      resolve(mockUser);
    }, 1000);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (provider: User['provider'], email?: string, password?: string) => {
    setIsLoading(true);
    try {
      const user = await mockLogin(provider, email);
      setUser(user);
      toast({
        title: "Login successful",
        description: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
