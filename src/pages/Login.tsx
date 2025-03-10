import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, LogIn, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const { login, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (provider: 'google' | 'outlook' | 'facebook' | 'instagram' | 'email') => {
    if (provider === 'email' && !showEmailForm) {
      setShowEmailForm(true);
      return;
    }
    
    if (provider === 'email' && showEmailForm) {
      if (!email || !email.includes('@') || !password) {
        toast({
          title: "Invalid credentials",
          description: "Please enter a valid email and password",
          variant: "destructive",
        });
        return;
      }
      
      login(provider);
    } else {
      login(provider);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('email');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[70vh] animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-2xl font-bold text-center mb-8">Log in to your account</h1>
          
          {showEmailForm ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-accent border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-accent hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {isLoading ? 'Logging in...' : 'Log in'} 
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="text-sm text-accent hover:underline"
                >
                  Back to all login options
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => handleLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 border border-gray-300 rounded-md transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12.1 12.9H5.5c-.5 0-.9.4-.9.9v5.9c0 .5.4.9.9.9h6.6V4.3zM19.9 12.9H13v6.8h6.9a.9.9 0 0 0 .9-.9v-5.9c0-.5-.4-.9-.9-.9zM12.1 12.9H5.5c-.5 0-.9.4-.9.9v5.9c0 .5.4.9.9.9h6.6v-7.7z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <button
                onClick={() => handleLogin('outlook')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#0078d4] hover:bg-[#0078d4]/90 text-white font-medium py-3 px-4 border border-[#0078d4] rounded-md transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M21.1 4.3H13V11h8.1V4.3zM12.1 4.3H5.5c-.5 0-.9.4-.9.9v5.9c0 .5.4.9.9.9h6.6V4.3zM19.9 12.9H13v6.8h6.9a.9.9 0 0 0 .9-.9v-5.9c0-.5-.4-.9-.9-.9zM12.1 12.9H5.5c-.5 0-.9.4-.9.9v5.9c0 .5.4.9.9.9h6.6v-7.7z"
                  />
                </svg>
                <span>Continue with Outlook</span>
              </button>
              
              <button
                onClick={() => handleLogin('facebook')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-[#1877f2] hover:bg-[#1877f2]/90 text-white font-medium py-3 px-4 border border-[#1877f2] rounded-md transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                <span>Continue with Facebook</span>
              </button>
              
              <button
                onClick={() => handleLogin('instagram')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 text-white font-medium py-3 px-4 border border-transparent rounded-md transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28.073-1.689.073-4.948 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
                <span>Continue with Instagram</span>
              </button>
              
              <button
                onClick={() => handleLogin('email')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground font-medium py-3 px-4 border border-border rounded-md transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>Continue with Email</span>
              </button>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-1">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span>This is a demo login. No actual authentication is performed.</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
