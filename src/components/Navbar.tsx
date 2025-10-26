import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, User, Home, Upload, Grid3X3, Search, Bell, Settings, LogOut, Heart, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Style Me', href: '/upload', icon: Upload },
    { name: 'Discover', href: '/discover', icon: Search },
    { name: 'Dashboard', href: '/dashboard', icon: Grid3X3, protected: true },
    { name: 'Profile', href: '/profile', icon: User, protected: true }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
    setShowSettings(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      setShowSettings(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSavedLooks = () => {
    navigate('/dashboard');
    setShowSettings(false);
  };

  const handleBookmarks = () => {
    navigate('/dashboard');
    setShowSettings(false);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowSettings(false);
  };

  const handleSettingsClick = () => {
    setShowSettings(!showSettings);
    setShowNotifications(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock notifications for demo
  const notifications = [
    {
      id: '1',
      title: 'New Style Recommendations',
      message: 'We have 3 new outfit suggestions based on your recent preferences.',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'Budget Alert',
      message: 'Great deals found within your budget range!',
      time: '1 day ago',
      read: false
    }
  ];

  return (
    <nav className="fixed top-0 w-full bg-cream-50/95 backdrop-blur-md border-b border-luxury-200 z-50 luxury-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src="/picmyfitlogo.jpeg" 
                alt="PICMYFIT Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-2xl font-display font-bold luxury-text-gradient">
                PICMYFIT
              </span>
              <span className="text-xs text-coffee-600 font-medium tracking-wider hidden sm:block">
                AI STYLIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              // Hide protected routes if user is not logged in
              if (item.protected && !user) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-luxury-100 text-luxury-700 shadow-md'
                      : 'text-coffee-700 hover:text-luxury-700 hover:bg-luxury-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={handleNotificationClick}
                    className="relative p-2 rounded-lg text-coffee-600 hover:text-luxury-700 hover:bg-luxury-50 transition-all duration-300"
                  >
                    <Bell className="w-4 h-4" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-luxury-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-luxury-200">
                        <h3 className="font-semibold text-coffee-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div key={notification.id} className="px-4 py-3 hover:bg-luxury-50 border-b border-luxury-100 last:border-b-0">
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${notification.read ? 'bg-gray-300' : 'bg-luxury-500'}`}></div>
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-coffee-900">{notification.title}</h4>
                                  <p className="text-xs text-coffee-600 mt-1">{notification.message}</p>
                                  <span className="text-xs text-coffee-500 mt-1">{notification.time}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-coffee-600">
                            No notifications yet
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings */}
                <div className="relative" ref={settingsRef}>
                  <button 
                    onClick={handleSettingsClick}
                    className="p-2 rounded-lg text-coffee-600 hover:text-luxury-700 hover:bg-luxury-50 transition-all duration-300"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  {/* Settings Dropdown */}
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-luxury-200 py-2 z-50">
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full px-4 py-2 text-sm text-coffee-700 hover:bg-luxury-50 transition-colors"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile Settings
                      </button>
                      <button
                        onClick={handleSavedLooks}
                        className="flex items-center w-full px-4 py-2 text-sm text-coffee-700 hover:bg-luxury-50 transition-colors"
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        Saved Looks
                      </button>
                      <button
                        onClick={handleBookmarks}
                        className="flex items-center w-full px-4 py-2 text-sm text-coffee-700 hover:bg-luxury-50 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 mr-3" />
                        Bookmarks
                      </button>
                      <hr className="my-2 border-luxury-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Photo */}
                <button
                  onClick={handleProfileClick}
                  className="w-8 h-8 rounded-full overflow-hidden hover:ring-2 hover:ring-luxury-400 transition-all duration-300"
                >
                  {userProfile?.profile_image_url ? (
                    <img
                      src={userProfile.profile_image_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full premium-gradient flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="luxury-button text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-coffee-600 hover:text-luxury-700 hover:bg-luxury-50 transition-all duration-300"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-2 pb-6 space-y-2 bg-cream-50/98 backdrop-blur-md border-t border-luxury-200">
            {navigation.map((item) => {
              const Icon = item.icon;
              // Hide protected routes if user is not logged in
              if (item.protected && !user) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-luxury-100 text-luxury-700'
                      : 'text-coffee-700 hover:text-luxury-700 hover:bg-luxury-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile User Menu */}
            <div className="pt-4 border-t border-luxury-200">
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleProfileClick();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-coffee-700 hover:bg-luxury-50 rounded-lg transition-colors"
                  >
                    {userProfile?.profile_image_url ? (
                      <img
                        src={userProfile.profile_image_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 premium-gradient rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <span className="text-base">
                      {userProfile?.full_name || userProfile?.username || 'Profile'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleSavedLooks();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-coffee-700 hover:bg-luxury-50 rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Saved Looks</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 luxury-button text-white rounded-lg font-semibold"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;