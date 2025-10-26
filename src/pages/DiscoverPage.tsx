import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Star, Heart, Bookmark, Grid3X3, List, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DiscoverPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const trendingStyles = [
    {
      id: '1',
      name: 'Quiet Luxury',
      description: 'Understated elegance with premium materials',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      popularity: 95,
      tags: ['Minimalist', 'Premium', 'Timeless']
    },
    {
      id: '2',
      name: 'Neo-Classic',
      description: 'Modern interpretation of classic silhouettes',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      popularity: 88,
      tags: ['Classic', 'Modern', 'Sophisticated']
    },
    {
      id: '3',
      name: 'Sustainable Luxury',
      description: 'Eco-conscious high-end fashion',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      popularity: 82,
      tags: ['Sustainable', 'Luxury', 'Conscious']
    }
  ];

  const featuredLooks = [
    {
      id: '1',
      title: 'Executive Power Dressing',
      brand: 'Curated Collection',
      price: 2850,
      rating: 4.9,
      likes: 234,
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Professional', 'Power', 'Luxury']
    },
    {
      id: '2',
      title: 'Minimalist Elegance',
      brand: 'The Row Collection',
      price: 1950,
      rating: 4.8,
      likes: 189,
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Minimalist', 'Elegant', 'Timeless']
    },
    {
      id: '3',
      title: 'Contemporary Edge',
      brand: 'Modern Luxury',
      price: 1650,
      rating: 4.7,
      likes: 156,
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Contemporary', 'Edgy', 'Bold']
    }
  ];

  const categories = [
    'All Styles', 'Business Professional', 'Casual Luxury', 'Evening Wear', 
    'Weekend Chic', 'Travel Essentials', 'Special Occasions'
  ];

  const priceRanges = [
    'Under $500', '$500 - $1,000', '$1,000 - $2,000', '$2,000 - $5,000', 'Above $5,000'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
            Discover
            <span className="luxury-text-gradient"> Luxury Styles</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto">
            Explore curated collections, trending styles, and personalized recommendations 
            from the world's most prestigious fashion houses.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="premium-card rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search styles, brands, or occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent text-base sm:text-lg"
              />
            </div>
            
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-4 border border-luxury-200 rounded-xl text-coffee-700 hover:bg-luxury-50 transition-all duration-300 text-base sm:text-lg font-medium"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
              </button>
              
              <div className="flex items-center space-x-2 bg-luxury-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-luxury-600 text-white' : 'text-coffee-600 hover:text-coffee-900'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-luxury-600 text-white' : 'text-coffee-600 hover:text-coffee-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-luxury-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Category</label>
                  <select className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent">
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-cream-50">{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Price Range</label>
                  <select className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent">
                    {priceRanges.map(range => (
                      <option key={range} value={range} className="bg-cream-50">{range}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Sort By</label>
                  <select className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent">
                    <option value="trending" className="bg-cream-50">Trending</option>
                    <option value="newest" className="bg-cream-50">Newest</option>
                    <option value="price-low" className="bg-cream-50">Price: Low to High</option>
                    <option value="price-high" className="bg-cream-50">Price: High to Low</option>
                    <option value="rating" className="bg-cream-50">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trending Styles */}
        <div className="mb-16 sm:mb-20">
          <div className="flex items-center mb-8 sm:mb-12">
            <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-luxury-600 mr-3 sm:mr-4" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-coffee-900">Trending Now</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trendingStyles.map((style) => (
              <div key={style.id} className="group premium-hover">
                <div className="premium-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-luxury-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {style.popularity}% Popular
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-2 sm:mb-3">{style.name}</h3>
                    <p className="text-coffee-600 mb-4 sm:mb-6 text-base sm:text-lg">{style.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {style.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-luxury-100 text-luxury-700 text-xs sm:text-sm rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Looks */}
        <div>
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="flex items-center">
              <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-luxury-600 mr-3 sm:mr-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-coffee-900">Featured Looks</h2>
            </div>
          </div>
          
          <div className={`grid gap-6 sm:gap-8 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {featuredLooks.map((look) => (
              <div key={look.id} className={`premium-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}>
                <div className={`relative ${viewMode === 'list' ? 'sm:w-64 h-48 sm:h-auto' : 'h-64 sm:h-72'}`}>
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-coffee-900/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-luxury-400 fill-current" />
                    <span className="text-white text-sm font-medium">{look.rating}</span>
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 flex-1">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-1 sm:mb-2">{look.title}</h3>
                      <p className="text-coffee-600 text-sm sm:text-base">{look.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-luxury-600">${look.price.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {look.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-luxury-50 text-coffee-600 text-xs sm:text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 rounded-xl bg-luxury-50 text-coffee-600 hover:bg-red-50 hover:text-red-500 transition-all duration-300">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl bg-luxury-50 text-coffee-600 hover:bg-luxury-100 hover:text-luxury-700 transition-all duration-300">
                        <Bookmark className="w-4 h-4" />
                      </button>
                      <span className="text-coffee-600 text-sm">{look.likes} likes</span>
                    </div>
                    
                    <button className="luxury-button text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;