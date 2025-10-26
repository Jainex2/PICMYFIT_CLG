import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, ShoppingBag, Star, ArrowLeft, Bookmark, ExternalLink, Sparkles, TrendingUp, Award, Copy, Check, AlertCircle, Brain, Eye, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';
import { OutfitRecommendation } from '../context/AppContext';
import { getBudgetTier } from '../services/productDatabase';

const RecommendationsPage: React.FC = () => {
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const [copiedLook, setCopiedLook] = useState<string | null>(null);
  const [savedLooks, setSavedLooks] = useState<Set<string>>(new Set());
  const [likedLooks, setLikedLooks] = useState<Set<string>>(new Set());
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'detailed'>('grid');

  // Load user's saved and liked looks when component mounts
  useEffect(() => {
    if (user) {
      loadUserLooks();
    }
  }, [user]);

  const loadUserLooks = async () => {
    if (!user) return;
    
    try {
      const [savedResult, likedResult] = await Promise.all([
        dataService.getSavedLooks(user.id),
        dataService.getLikedLooks(user.id)
      ]);

      if (!savedResult.error && savedResult.data) {
        const savedIds = new Set(savedResult.data.map((look: any) => look.look_name));
        setSavedLooks(savedIds);
      }

      if (!likedResult.error && likedResult.data) {
        const likedIds = new Set(likedResult.data.map((look: any) => look.look_name));
        setLikedLooks(likedIds);
      }
    } catch (error) {
      console.error('Error loading user looks:', error);
    }
  };

  const handleSaveLook = async (recommendation: OutfitRecommendation) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      if (savedLooks.has(recommendation.lookName)) {
        console.log('Look already saved');
        return;
      }

      const { data, error } = await dataService.saveLook(user.id, recommendation);
      if (!error && data) {
        setSavedLooks(prev => new Set([...prev, recommendation.lookName]));
        console.log('Look saved successfully!');
      } else {
        console.error('Error saving look:', error);
      }
    } catch (error) {
      console.error('Error saving look:', error);
    }
  };

  const handleLikeLook = async (recommendation: OutfitRecommendation) => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      if (!savedLooks.has(recommendation.lookName)) {
        const saveResult = await dataService.saveLook(user.id, recommendation);
        if (!saveResult.error) {
          setSavedLooks(prev => new Set([...prev, recommendation.lookName]));
        }
      }

      const { data: existingLook } = await dataService.checkIfLookSaved(user.id, recommendation.lookName);
      
      if (existingLook) {
        const { error } = await dataService.toggleLikeLook(user.id, existingLook.id, true);
        if (!error) {
          setLikedLooks(prev => new Set([...prev, recommendation.lookName]));
          console.log('Look liked successfully!');
        }
      }
    } catch (error) {
      console.error('Error liking look:', error);
    }
  };

  const handleShareLook = async (recommendation: OutfitRecommendation) => {
    const shareText = `Check out this amazing ${recommendation.lookName} outfit from PICMYFIT! 

${recommendation.styleNote}

Total: $${recommendation.totalPrice.toLocaleString()}
Items: ${recommendation.items.map(item => `${item.name} by ${item.brand}`).join(', ')}

#PICMYFIT #AIFashion #StyleRecommendation`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recommendation.lookName} - PICMYFIT`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard(shareText, recommendation.id);
      }
    } else {
      copyToClipboard(shareText, recommendation.id);
    }
  };

  const copyToClipboard = async (text: string, lookId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLook(lookId);
      setTimeout(() => setCopiedLook(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Helper function to get item by category
  const getItemByCategory = (items: any[], category: string) => {
    const categoryMap: { [key: string]: string[] } = {
      'top': ['Shirt', 'T-Shirt', 'Polo', 'Sweater', 'Hoodie', 'Blazer'],
      'bottom': ['Pants', 'Jeans', 'Shorts', 'Cargo', 'Joggers'],
      'shoes': ['Shoes']
    };
    
    return items.find(item => 
      categoryMap[category]?.includes(item.type) || 
      (category === 'shoes' && item.type === 'Shoes')
    );
  };

  // Show loading state
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-luxury-200 border-t-luxury-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-coffee-900 mb-4">Generating your personalized recommendations...</p>
          <p className="text-coffee-600">Analyzing thousands of real products from top brands</p>
        </div>
      </div>
    );
  }

  // Show empty state if no recommendations
  if (state.currentRecommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-luxury-600 mx-auto mb-4" />
          <p className="text-xl text-coffee-900 mb-4">No styling recommendations found</p>
          <p className="text-coffee-600 mb-6">Please complete the styling process to see your recommendations</p>
          <Link
            to="/upload"
            className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Start Styling Process
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/upload"
            className="flex items-center text-luxury-600 hover:text-luxury-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Styling
          </Link>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-luxury-100 text-luxury-700' : 'text-coffee-600 hover:bg-luxury-50'}`}
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'detailed' ? 'bg-luxury-100 text-luxury-700' : 'text-coffee-600 hover:bg-luxury-50'}`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
            Your Curated
            <span className="block luxury-text-gradient">Style Collection</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto leading-relaxed">
            AI-powered recommendations from <strong>{state.currentRecommendations.reduce((total, rec) => total + rec.items.length, 0)} real products</strong> across top brands, 
            tailored to your ${getBudgetTier(state.preferences.budget || 100).toLowerCase()} budget of ${state.preferences.budget || 100}.
          </p>
        </div>

        {/* Login Prompt Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-luxury-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-coffee-900 mb-2">Login Required</h3>
                <p className="text-coffee-600 mb-6">
                  Please log in to save and like your favorite outfit recommendations.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="flex-1 px-4 py-2 border border-luxury-300 text-coffee-700 rounded-lg hover:bg-luxury-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Link
                    to="/login"
                    className="flex-1 luxury-button text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Summary */}
        <div className="premium-card rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="flex items-center mb-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 premium-gradient rounded-xl flex items-center justify-center mr-4">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-coffee-900">Real Product Analysis</h3>
              <p className="text-coffee-600">Curated from thousands of authentic items</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-luxury-600 mb-2">
                {state.currentRecommendations.reduce((total, rec) => total + rec.items.length, 0)}
              </div>
              <div className="text-coffee-600 text-sm">Real Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-luxury-600 mb-2">
                {new Set(state.currentRecommendations.flatMap(rec => rec.items.map(item => item.brand))).size}
              </div>
              <div className="text-coffee-600 text-sm">Brands Featured</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-luxury-600 mb-2">${state.preferences.budget || 100}</div>
              <div className="text-coffee-600 text-sm">Your Budget</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-luxury-600 mb-2">
                {getBudgetTier(state.preferences.budget || 100)}
              </div>
              <div className="text-coffee-600 text-sm">Budget Tier</div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className={`grid gap-6 sm:gap-8 mb-12 sm:mb-16 ${viewMode === 'grid' ? 'lg:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-1 xl:grid-cols-2'}`}>
          {state.currentRecommendations.map((recommendation) => {
            const topItem = getItemByCategory(recommendation.items, 'top');
            const bottomItem = getItemByCategory(recommendation.items, 'bottom');
            const shoesItem = getItemByCategory(recommendation.items, 'shoes');
            
            return (
              <div key={recommendation.id} className="premium-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 premium-hover">
                {/* Outfit Preview with Individual Item Images */}
                <div className="relative bg-gradient-to-br from-luxury-100 to-coffee-100 p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Top Item */}
                    <div className="text-center">
                      <div className="w-full h-24 bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        {topItem ? (
                          <img
                            src={topItem.image || 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=100&h=100&fit=crop'}
                            alt={topItem.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-coffee-400 text-xs">Top</div>
                        )}
                      </div>
                      <div className="text-xs text-coffee-600 font-medium">
                        {topItem ? topItem.type : 'Top'}
                      </div>
                      <div className="text-xs text-luxury-600 font-semibold">
                        {topItem ? `$${topItem.price}` : ''}
                      </div>
                    </div>
                    
                    {/* Bottom Item */}
                    <div className="text-center">
                      <div className="w-full h-24 bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        {bottomItem ? (
                          <img
                            src={bottomItem.image || 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=100&h=100&fit=crop'}
                            alt={bottomItem.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-coffee-400 text-xs">Bottom</div>
                        )}
                      </div>
                      <div className="text-xs text-coffee-600 font-medium">
                        {bottomItem ? bottomItem.type : 'Bottom'}
                      </div>
                      <div className="text-xs text-luxury-600 font-semibold">
                        {bottomItem ? `$${bottomItem.price}` : ''}
                      </div>
                    </div>
                    
                    {/* Shoes Item */}
                    <div className="text-center">
                      <div className="w-full h-24 bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                        {shoesItem ? (
                          <img
                            src={shoesItem.image || 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?w=100&h=100&fit=crop'}
                            alt={shoesItem.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-coffee-400 text-xs">Shoes</div>
                        )}
                      </div>
                      <div className="text-xs text-coffee-600 font-medium">
                        {shoesItem ? shoesItem.type : 'Shoes'}
                      </div>
                      <div className="text-xs text-luxury-600 font-semibold">
                        {shoesItem ? `$${shoesItem.price}` : ''}
                      </div>
                    </div>
                  </div>
                  
                  {/* Confidence Score */}
                  <div className="absolute top-4 right-4 glass-effect rounded-full px-3 sm:px-4 py-1 sm:py-2 flex items-center space-x-2">
                    <Star className="w-3 sm:w-4 h-3 sm:h-4 text-luxury-600 fill-current" />
                    <span className="text-sm font-semibold text-coffee-900">{Math.round(recommendation.confidenceScore * 100)}%</span>
                  </div>

                  {/* Budget Badge */}
                  <div className="absolute top-4 left-4 glass-effect rounded-full px-2 sm:px-3 py-1 flex items-center space-x-1">
                    <Award className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-600">{getBudgetTier(recommendation.budget)}</span>
                  </div>

                  {/* Real Products Badge */}
                  <div className="absolute bottom-4 left-4 glass-effect rounded-full px-2 sm:px-3 py-1 flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">{recommendation.items.length} Real Items</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-display font-semibold text-coffee-900 mb-3">
                    {recommendation.lookName}
                  </h3>
                  
                  <p className="text-coffee-600 text-sm mb-4 sm:mb-6 leading-relaxed">
                    {recommendation.styleNote}
                  </p>

                  {/* Brand Showcase */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-coffee-900 font-semibold mb-2 text-sm">Featured Brands:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(recommendation.items.map(item => item.brand))].map((brand, index) => (
                        <span key={index} className="px-2 py-1 bg-luxury-100 text-luxury-700 text-xs rounded-full font-medium">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {recommendation.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-xs sm:text-sm p-2 bg-luxury-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-coffee-900">{item.name}</div>
                          <div className="text-coffee-600">{item.brand} • {item.color} • Size {item.size}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-luxury-600">${item.price.toLocaleString()}</div>
                          <a
                            href={item.purchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:text-blue-500 transition-colors"
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Price */}
                  <div className="border-t border-luxury-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-900 font-semibold text-sm sm:text-base">Total Investment:</span>
                      <span className="text-xl sm:text-2xl font-bold text-luxury-600">${recommendation.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      {recommendation.totalPrice <= recommendation.budget ? 
                        `Within your $${recommendation.budget.toLocaleString()} budget` : 
                        `$${(recommendation.totalPrice - recommendation.budget).toLocaleString()} over budget`
                      }
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                    {recommendation.tags.map((tag, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-luxury-100 text-luxury-700 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2 sm:space-x-3">
                      <button
                        onClick={() => handleLikeLook(recommendation)}
                        className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                          likedLooks.has(recommendation.lookName)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-luxury-50 text-coffee-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-4 sm:w-5 h-4 sm:h-5 ${likedLooks.has(recommendation.lookName) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => handleSaveLook(recommendation)}
                        className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                          savedLooks.has(recommendation.lookName)
                            ? 'bg-luxury-100 text-luxury-600'
                            : 'bg-luxury-50 text-coffee-600 hover:bg-luxury-100 hover:text-luxury-600'
                        }`}
                      >
                        <Bookmark className={`w-4 sm:w-5 h-4 sm:h-5 ${savedLooks.has(recommendation.lookName) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button 
                        onClick={() => handleShareLook(recommendation)}
                        className="p-2 sm:p-3 rounded-xl bg-luxury-50 text-coffee-600 hover:bg-luxury-100 hover:text-coffee-900 transition-all duration-300 relative"
                      >
                        {copiedLook === recommendation.id ? (
                          <Check className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
                        ) : (
                          <Share2 className="w-4 sm:w-5 h-4 sm:h-5" />
                        )}
                      </button>
                    </div>
                    
                    <a
                      href={recommendation.items[0]?.purchaseUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="luxury-button text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
                    >
                      <ShoppingBag className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>Shop Look</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link
              to="/dashboard"
              className="border border-luxury-400 text-luxury-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold text-base sm:text-lg"
            >
              View Saved Looks
            </Link>
            <Link
              to="/upload"
              className="luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-base sm:text-lg"
            >
              Create New Look
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;