import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, TrendingUp, Calendar, ShoppingBag, Settings, Plus, Filter, Star, Award, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/dataService';

const DashboardPage: React.FC = () => {
  const { user, userProfile, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'saved' | 'liked' | 'history' | 'analytics'>('saved');
  const [savedLooks, setSavedLooks] = useState<any[]>([]);
  const [likedLooks, setLikedLooks] = useState<any[]>([]);
  const [userStats, setUserStats] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    setDataLoading(true);
    try {
      const [savedResult, likedResult, statsResult] = await Promise.all([
        dataService.getSavedLooks(user.id),
        dataService.getLikedLooks(user.id),
        dataService.getUserStats(user.id)
      ]);

      if (!savedResult.error) {
        setSavedLooks(savedResult.data || []);
      }
      
      if (!likedResult.error) {
        setLikedLooks(likedResult.data || []);
      }

      setUserStats(statsResult);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleDeleteLook = async (lookId: string) => {
    if (!user) return;
    
    try {
      const { error } = await dataService.deleteSavedLook(user.id, lookId);
      if (!error) {
        setSavedLooks(prev => prev.filter(look => look.id !== lookId));
        setLikedLooks(prev => prev.filter(look => look.id !== lookId));
        // Reload stats
        const statsResult = await dataService.getUserStats(user.id);
        setUserStats(statsResult);
      }
    } catch (error) {
      console.error('Error deleting look:', error);
    }
  };

  const handleToggleLike = async (lookId: string, currentLiked: boolean) => {
    if (!user) return;
    
    try {
      const { error } = await dataService.toggleLikeLook(user.id, lookId, !currentLiked);
      if (!error) {
        // Update both saved and liked looks
        const updateLook = (look: any) => 
          look.id === lookId ? { ...look, is_liked: !currentLiked } : look;
        
        setSavedLooks(prev => prev.map(updateLook));
        
        if (!currentLiked) {
          // Add to liked looks
          const likedLook = savedLooks.find(look => look.id === lookId);
          if (likedLook) {
            setLikedLooks(prev => [{ ...likedLook, is_liked: true }, ...prev]);
          }
        } else {
          // Remove from liked looks
          setLikedLooks(prev => prev.filter(look => look.id !== lookId));
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-luxury-200 border-t-luxury-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-coffee-900 mb-4">Loading your dashboard...</p>
          <p className="text-coffee-600">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <Bookmark className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-coffee-900 mb-4">Login Required</h2>
          <p className="text-coffee-600 mb-6">Please log in to access your dashboard and saved looks.</p>
          <Link
            to="/login"
            className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            Login to Continue
          </Link>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Looks Created', value: userStats?.totalLooks || 0, icon: Sparkles, color: 'text-luxury-600', trend: '+12%' },
    { label: 'Saved Outfits', value: savedLooks.length, icon: Bookmark, color: 'text-blue-600', trend: '+8%' },
    { label: 'Style Score', value: `${userStats?.averageConfidence || 0}%`, icon: Star, color: 'text-green-600', trend: '+4%' },
    { label: 'Total Investment', value: `$${(userStats?.totalInvestment || 0).toLocaleString()}`, icon: TrendingUp, color: 'text-purple-600', trend: '+15%' }
  ];

  const tabs = [
    { id: 'saved', label: 'Saved Looks', icon: Bookmark, count: savedLooks.length },
    { id: 'liked', label: 'Liked Styles', icon: Heart, count: likedLooks.length },
    { id: 'history', label: 'Style History', icon: Calendar, count: userStats?.recentActivity?.length || 0 },
    { id: 'analytics', label: 'Style Analytics', icon: TrendingUp, count: 0 }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-luxury-500' : 'text-coffee-300'}`}>
        ★
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 sm:mb-16">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
              Style
              <span className="luxury-text-gradient"> Dashboard</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700">
              Welcome back, {userProfile?.full_name || userProfile?.username || 'Fashionista'}! Track your fashion journey and curated collections
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6 lg:mt-0 w-full lg:w-auto">
            <Link
              to="/upload"
              className="luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-base sm:text-lg"
            >
              <Plus className="w-5 h-5" />
              <span>New Styling</span>
            </Link>
            <Link
              to="/profile"
              className="border border-luxury-300 text-coffee-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-luxury-50 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-base sm:text-lg"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="premium-card rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-all duration-300 premium-hover">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <Icon className={`w-6 sm:w-8 h-6 sm:h-8 ${stat.color}`} />
                  <div className="text-right">
                    <span className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</span>
                    <div className="text-green-600 text-xs sm:text-sm font-medium">{stat.trend}</div>
                  </div>
                </div>
                <p className="text-coffee-600 font-medium text-sm sm:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="premium-card rounded-2xl overflow-hidden">
          <div className="border-b border-luxury-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-max flex items-center justify-center space-x-2 px-4 sm:px-6 py-4 sm:py-6 text-sm sm:text-base font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-luxury-600 border-b-2 border-luxury-600 bg-luxury-50'
                        : 'text-coffee-600 hover:text-coffee-900 hover:bg-luxury-25'
                    }`}
                  >
                    <Icon className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                    {tab.count > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeTab === tab.id
                          ? 'bg-luxury-100 text-luxury-700'
                          : 'bg-coffee-100 text-coffee-600'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {dataLoading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-luxury-600 mx-auto mb-4" />
                <p className="text-coffee-600">Loading your fashion data...</p>
              </div>
            ) : (
              <>
                {/* Saved Looks */}
                {activeTab === 'saved' && (
                  <div>
                    {savedLooks.length === 0 ? (
                      <div className="text-center py-12 sm:py-16">
                        <Bookmark className="w-16 sm:w-20 h-16 sm:h-20 text-coffee-300 mx-auto mb-4 sm:mb-6" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-3 sm:mb-4">No Saved Looks Yet</h3>
                        <p className="text-coffee-600 mb-6 sm:mb-8 max-w-md mx-auto text-base sm:text-lg">
                          Save your favorite outfit recommendations to build your luxury style collection
                        </p>
                        <Link
                          to="/upload"
                          className="luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-base sm:text-lg"
                        >
                          Create Your First Look
                        </Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {savedLooks.map((look) => (
                          <div key={look.id} className="bg-luxury-50 border border-luxury-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 premium-hover">
                            <div className="relative h-64">
                              <img
                                src={look.outfit_image_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'}
                                alt={look.look_name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                                <Star className="w-3 h-3 text-luxury-600 fill-current" />
                                <span className="text-xs font-semibold text-coffee-900">
                                  {Math.round((look.confidence_score || 0.96) * 100)}%
                                </span>
                              </div>
                              <div className="absolute top-3 left-3 flex space-x-2">
                                <button
                                  onClick={() => handleToggleLike(look.id, look.is_liked)}
                                  className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                                    look.is_liked ? 'bg-red-500 text-white' : 'bg-white/90 text-coffee-600 hover:text-red-500'
                                  }`}
                                >
                                  <Heart className={`w-4 h-4 ${look.is_liked ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                            </div>
                            <div className="p-4 sm:p-6">
                              <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <h4 className="font-semibold text-coffee-900 text-base sm:text-lg">{look.look_name}</h4>
                                <button
                                  onClick={() => handleDeleteLook(look.id)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Delete
                                </button>
                              </div>
                              <p className="text-sm text-coffee-600 mb-3 sm:mb-4 leading-relaxed">{look.style_note}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {(look.tags || []).map((tag: string, index: number) => (
                                  <span key={index} className="px-2 py-1 bg-luxury-100 text-luxury-700 text-xs rounded-full font-medium">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-luxury-600">
                                  ${look.total_price.toLocaleString()}
                                </span>
                                <span className="text-xs text-coffee-500">
                                  {formatDate(look.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Liked Styles */}
                {activeTab === 'liked' && (
                  <div>
                    {likedLooks.length === 0 ? (
                      <div className="text-center py-12 sm:py-16">
                        <Heart className="w-16 sm:w-20 h-16 sm:h-20 text-coffee-300 mx-auto mb-4 sm:mb-6" />
                        <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-3 sm:mb-4">No Liked Styles Yet</h3>
                        <p className="text-coffee-600 mb-6 sm:mb-8 max-w-md mx-auto text-base sm:text-lg">
                          Like outfit recommendations that resonate with your personal style
                        </p>
                        <Link
                          to="/upload"
                          className="luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-base sm:text-lg"
                        >
                          Explore Recommendations
                        </Link>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {likedLooks.map((look) => (
                          <div key={look.id} className="bg-luxury-50 border border-luxury-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 premium-hover">
                            <div className="relative h-64">
                              <img
                                src={look.outfit_image_url || 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop'}
                                alt={look.look_name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-3 left-3">
                                <Heart className="w-5 h-5 text-red-500 fill-current" />
                              </div>
                            </div>
                            <div className="p-4 sm:p-6">
                              <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <h4 className="font-semibold text-coffee-900 text-base sm:text-lg">{look.look_name}</h4>
                              </div>
                              <p className="text-sm text-coffee-600 mb-3 sm:mb-4 leading-relaxed">{look.style_note}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold text-luxury-600">
                                  ${look.total_price.toLocaleString()}
                                </span>
                                <button
                                  onClick={() => handleToggleLike(look.id, true)}
                                  className="text-red-500 hover:text-coffee-600 text-sm font-semibold transition-colors"
                                >
                                  Unlike
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Style History */}
                {activeTab === 'history' && (
                  <div>
                    <div className="space-y-4 sm:space-y-6">
                      {(userStats?.recentActivity || []).map((entry: any, index: number) => (
                        <div key={index} className="bg-luxury-50 border border-luxury-200 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 premium-hover">
                          <div className="flex flex-col sm:flex-row justify-between items-start">
                            <div className="flex-1 mb-4 sm:mb-0">
                              <div className="flex flex-wrap items-center space-x-4 mb-2 sm:mb-3">
                                <span className="text-sm text-coffee-600">{formatDate(entry.created_at)}</span>
                                <span className="px-3 py-1 bg-luxury-100 text-luxury-700 text-xs rounded-full font-medium">
                                  {entry.occasion}
                                </span>
                                <span className="text-sm text-green-600 font-medium">
                                  ${entry.total_price.toLocaleString()}
                                </span>
                              </div>
                              <h4 className="font-semibold text-coffee-900 text-base sm:text-lg mb-2">{entry.look_name}</h4>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-coffee-600">Confidence:</span>
                                <div className="flex">
                                  {renderStars(Math.round(entry.confidence_score * 5))}
                                </div>
                                <span className="text-sm text-coffee-600">
                                  {Math.round(entry.confidence_score * 100)}%
                                </span>
                              </div>
                            </div>
                            <button className="text-luxury-600 hover:text-luxury-500 text-sm font-semibold transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                      {(!userStats?.recentActivity || userStats.recentActivity.length === 0) && (
                        <div className="text-center py-12">
                          <Calendar className="w-16 h-16 text-coffee-300 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-coffee-900 mb-2">No Style History Yet</h3>
                          <p className="text-coffee-600">Start creating looks to see your style journey</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Style Analytics */}
                {activeTab === 'analytics' && (
                  <div>
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                      <div className="bg-luxury-50 border border-luxury-200 rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-coffee-900 mb-3 sm:mb-4 flex items-center">
                          <Award className="w-5 h-5 text-luxury-600 mr-2" />
                          Top Occasions
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {(userStats?.topOccasions || []).map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-coffee-600 text-sm sm:text-base">{item.occasion}</span>
                              <span className="text-coffee-900 font-semibold">{item.count} looks</span>
                            </div>
                          ))}
                          {(!userStats?.topOccasions || userStats.topOccasions.length === 0) && (
                            <p className="text-coffee-600 text-sm">No data available yet</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-luxury-50 border border-luxury-200 rounded-2xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-semibold text-coffee-900 mb-3 sm:mb-4 flex items-center">
                          <TrendingUp className="w-5 h-5 text-luxury-600 mr-2" />
                          Budget Breakdown
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {userStats?.budgetBreakdown && Object.entries(userStats.budgetBreakdown).map(([range, count]: [string, any]) => (
                            <div key={range} className="flex justify-between items-center">
                              <span className="text-coffee-600 text-sm sm:text-base">{range}</span>
                              <span className="text-coffee-900 font-semibold">{count} looks</span>
                            </div>
                          ))}
                          {!userStats?.budgetBreakdown && (
                            <p className="text-coffee-600 text-sm">No data available yet</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;