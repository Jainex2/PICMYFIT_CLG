import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead 
        title="Page Not Found - PICMYFIT"
        description="The page you're looking for doesn't exist. Return to PICMYFIT to discover your perfect style with AI-powered fashion recommendations."
        noIndex={true}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 flex items-center justify-center py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated 404 Icon */}
          <div className="mb-8 sm:mb-12">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 premium-gradient rounded-full flex items-center justify-center luxury-float">
                <AlertTriangle className="w-16 sm:w-20 h-16 sm:h-20 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-luxury-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-display font-bold luxury-text-gradient mb-4 sm:mb-6">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
              Style Not Found
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-coffee-700 max-w-xl mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off the runway. 
              Let's get you back to discovering your perfect style.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
            <Link
              to="/"
              className="group luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            <Link
              to="/upload"
              className="border border-luxury-400 text-luxury-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold flex items-center space-x-2 sm:space-x-3 text-base sm:text-lg"
            >
              <Search className="w-5 h-5" />
              <span>Find Your Style</span>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="premium-card rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-coffee-900 mb-4 sm:mb-6">
              Popular Destinations
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/upload"
                className="text-coffee-700 hover:text-luxury-600 transition-colors text-sm sm:text-base font-medium"
              >
                AI Styling
              </Link>
              <Link
                to="/discover"
                className="text-coffee-700 hover:text-luxury-600 transition-colors text-sm sm:text-base font-medium"
              >
                Discover
              </Link>
              <Link
                to="/dashboard"
                className="text-coffee-700 hover:text-luxury-600 transition-colors text-sm sm:text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="text-coffee-700 hover:text-luxury-600 transition-colors text-sm sm:text-base font-medium"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="text-coffee-600 hover:text-luxury-600 transition-colors flex items-center space-x-2 mx-auto text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;