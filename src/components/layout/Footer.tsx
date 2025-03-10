
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { NewsletterForm } from '../ui/NewsletterForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-50 py-12 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/f3deb412-7736-416b-b32a-0a4f2153e5a5.png" 
                alt="Book Your Shelf Logo" 
                className="h-6 w-6"
              />
              <span className="font-semibold text-lg">Book Your Shelf</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your personal sanctuary for literature, where stories come alive and imagination thrives.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" aria-label="Facebook" className="text-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Trading Hours (replacing Shop) */}
          <div>
            <h3 className="font-medium text-base mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Trading Hours
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </li>
              <li className="text-sm text-muted-foreground flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li className="text-sm text-muted-foreground flex justify-between">
                <span>Sunday</span>
                <span>11:00 AM - 5:00 PM</span>
              </li>
              <li className="text-sm text-muted-foreground flex justify-between">
                <span>Public Holidays</span>
                <span>11:00 AM - 4:00 PM</span>
              </li>
              <li className="text-sm italic mt-2 text-muted-foreground">
                * Special hours may apply during events
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-medium text-base mb-4">About</h3>
            <ul className="space-y-3">
              {['Our Story', 'Blog', 'Authors', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to="/" 
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-base mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates on new releases and special offers.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Contact Us Section - Added before the newsletter */}
        <div className="bg-white shadow-sm rounded-lg p-6 mt-12 mb-12">
          <h3 className="font-medium text-lg mb-6 text-center">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Phone className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-medium text-sm mb-2">Call Us</h4>
              <p className="text-muted-foreground text-sm text-center">(123) 456-7890</p>
              <p className="text-muted-foreground text-sm text-center">Mon-Fri, 9am-5pm</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Mail className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-medium text-sm mb-2">Email Us</h4>
              <p className="text-muted-foreground text-sm text-center">hello@bookyourshelf.com</p>
              <p className="text-muted-foreground text-sm text-center">We reply within 24 hours</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <h4 className="font-medium text-sm mb-2">Visit Us</h4>
              <p className="text-muted-foreground text-sm text-center">123 Book Street</p>
              <p className="text-muted-foreground text-sm text-center">Reading City, RC 10001</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Book Your Shelf. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-accent transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
