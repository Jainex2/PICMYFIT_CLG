import React from 'react';
import { Heart, Sparkles, Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-luxury-100 to-coffee-100 border-t border-luxury-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 sm:mb-8">
              <div className="w-10 sm:w-16 h-10 sm:h-16 rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/picmyfitlogo.jpeg" 
                  alt="PICMYFIT Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-display font-bold luxury-text-gradient">
                  PICMYFIT
                </span>
                <span className="text-xs text-coffee-600 font-medium tracking-wider">
                  AI STYLIST
                </span>
              </div>
            </div>
            <p className="text-coffee-700 mb-6 sm:mb-8 max-w-md leading-relaxed text-base">
              Revolutionizing personal style with AI-powered fashion intelligence. 
              Luxury styling for every individual, every occasion, every moment.
            </p>
            <div className="flex space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-luxury-100 text-coffee-600 hover:text-luxury-700 hover:bg-luxury-200 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-luxury-100 text-coffee-600 hover:text-luxury-700 hover:bg-luxury-200 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-luxury-100 text-coffee-600 hover:text-luxury-700 hover:bg-luxury-200 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:picmyfit@gmail.com" className="p-2 rounded-lg bg-luxury-100 text-coffee-600 hover:text-luxury-700 hover:bg-luxury-200 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-coffee-900 font-semibold mb-4 sm:mb-6 text-lg">Platform</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/upload" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">AI Styling</Link></li>
              <li><Link to="/dashboard" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Virtual Wardrobe</Link></li>
              <li><Link to="/discover" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Style Analytics</Link></li>
              <li><Link to="/profile" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Personal Shopper</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-coffee-900 font-semibold mb-4 sm:mb-6 text-lg">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/help" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Help Center</Link></li>
              <li><Link to="/size-guide" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Size Guide</Link></li>
              <li><Link to="/returns" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Returns</Link></li>
              <li><Link to="/contact" className="text-coffee-700 hover:text-luxury-700 transition-colors text-base">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-luxury-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-base text-coffee-700 mb-4 md:mb-0">
              <span>BUILD with </span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>by</span>
              <span className="font-semibold text-luxury-700">PICMYFIT</span>
            </div>
            
            <div className="text-base text-coffee-700">
              <p>&copy; 2025 PICMYFIT. AI Stylist.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;