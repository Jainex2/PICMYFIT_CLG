import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Edit3, Save, Camera, Mail, Calendar, Ruler, Palette, MapPin, Award, Star, Crown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, userProfile, loading, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    age: 25,
    location: '',
    gender: 'prefer-not-to-say',
    bodyType: 'rectangle',
    measurements: {
      shoulders: 40,
      chest: 36,
      waist: 30,
      hips: 34,
      height: 170,
      weight: 65
    },
    skinTone: 'medium',
    stylePersonality: ['classic', 'modern'],
    preferredBrands: ['Zara', 'H&M', 'Uniqlo'],
    budgetRange: {
      min: 100,
      max: 500
    },
    lifestyle: 'Professional',
    formality: 'business-casual'
  });

  // Update form data when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        username: userProfile.username || '',
        age: userProfile.age || 25,
        location: userProfile.location || '',
        gender: userProfile.gender || 'prefer-not-to-say',
        bodyType: userProfile.body_type || 'rectangle',
        measurements: {
          shoulders: 40,
          chest: 36,
          waist: 30,
          hips: 34,
          height: 170,
          weight: 65
        },
        skinTone: userProfile.skin_tone || 'medium',
        stylePersonality: userProfile.style_personality || ['classic', 'modern'],
        preferredBrands: userProfile.preferred_brands || ['Zara', 'H&M', 'Uniqlo'],
        budgetRange: {
          min: userProfile.budget_min || 100,
          max: userProfile.budget_max || 500
        },
        lifestyle: userProfile.lifestyle || 'Professional',
        formality: 'business-casual'
      });
    }
  }, [userProfile]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-luxury-200 border-t-luxury-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-coffee-900 mb-4">Loading your profile...</p>
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
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-display font-bold text-coffee-900 mb-4">Login Required</h2>
          <p className="text-coffee-600 mb-6">Please log in to access your profile.</p>
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

  const skinTones = [
    { id: 'very-fair', name: 'Very Fair', color: '#F7E7CE' },
    { id: 'fair', name: 'Fair', color: '#F0D5A8' },
    { id: 'light', name: 'Light', color: '#E8B896' },
    { id: 'medium', name: 'Medium', color: '#D4A574' },
    { id: 'tan', name: 'Tan', color: '#C19A6B' },
    { id: 'deep', name: 'Deep', color: '#8B5A3C' },
    { id: 'dark', name: 'Dark', color: '#5D3317' },
    { id: 'very-dark', name: 'Very Dark', color: '#3D1F0F' }
  ];

  const bodyTypes = ['Pear', 'Apple', 'Hourglass', 'Rectangle', 'Inverted Triangle', 'Athletic'];
  
  const stylePersonalities = [
    'Classic Elegance', 'Modern Minimalist', 'Bohemian Free Spirit', 'Edgy Contemporary',
    'Romantic Feminine', 'Sporty Casual', 'Luxury Statement', 'Vintage Inspired'
  ];

  const luxuryBrands = [
    'The Row', 'Bottega Veneta', 'Hermès', 'Brunello Cucinelli', 'Loro Piana',
    'Saint Laurent', 'Celine', 'Chanel', 'Dior', 'Prada', 'Gucci', 'Valentino',
    'Zara', 'H&M', 'Uniqlo', 'COS', 'Mango', 'ASOS'
  ];

  const lifestyles = [
    'Corporate Professional', 'Creative Professional', 'Entrepreneur', 'Student', 
    'Stay-at-Home Parent', 'Retiree', 'Freelancer', 'Healthcare Worker', 'Educator', 'Other'
  ];

  const achievements = [
    { title: 'Style Connoisseur', description: 'Created 20+ looks', icon: Star },
    { title: 'Luxury Collector', description: 'Saved 10+ premium looks', icon: Crown },
    { title: 'Trendsetter', description: 'High style confidence score', icon: Award }
  ];

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: formData.full_name,
        username: formData.username,
        age: formData.age,
        location: formData.location,
        gender: formData.gender,
        body_type: formData.bodyType,
        skin_tone: formData.skinTone,
        style_personality: formData.stylePersonality,
        preferred_brands: formData.preferredBrands,
        budget_min: formData.budgetRange.min,
        budget_max: formData.budgetRange.max,
        lifestyle: formData.lifestyle
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
            Your Style
            <span className="luxury-text-gradient"> Profile</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700">Manage your luxury fashion preferences and personal details</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="premium-card rounded-2xl p-6 sm:p-8 text-center mb-6 sm:mb-8">
              <div className="relative mb-6 sm:mb-8">
                {userProfile?.profile_image_url ? (
                  <img
                    src={userProfile.profile_image_url}
                    alt="Profile"
                    className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 sm:w-32 h-24 sm:h-32 premium-gradient rounded-full mx-auto flex items-center justify-center text-white text-2xl sm:text-4xl font-bold">
                    {(userProfile?.full_name || userProfile?.username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <button className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2 bg-luxury-600 text-white p-2 sm:p-3 rounded-full hover:bg-luxury-500 transition-colors">
                  <Camera className="w-3 sm:w-4 h-3 sm:h-4" />
                </button>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-2">
                {userProfile?.full_name || userProfile?.username || 'User'}
              </h2>
              <p className="text-coffee-600 mb-2 text-sm sm:text-base">{user?.email}</p>
              <p className="text-luxury-600 text-sm font-medium mb-4 sm:mb-6">{formData.lifestyle}</p>
              
              <div className="space-y-2 sm:space-y-3 text-sm text-coffee-600 mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formData.age} years old</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{formData.location || 'Location not set'}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>{formData.skinTone} skin tone</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full luxury-button text-white px-4 sm:px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full border border-red-300 text-red-600 px-4 sm:px-6 py-3 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="premium-card rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-coffee-900 mb-4 sm:mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-luxury-600" />
                Style Achievements
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 sm:w-10 h-8 sm:h-10 premium-gradient rounded-full flex items-center justify-center">
                        <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-coffee-900 font-semibold text-sm sm:text-base">{achievement.title}</div>
                        <div className="text-coffee-600 text-xs sm:text-sm">{achievement.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Personal Information */}
            <div className="premium-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-6 sm:mb-8 flex items-center">
                <User className="w-5 sm:w-6 h-5 sm:h-6 mr-3 sm:mr-4 text-luxury-600" />
                Personal Information
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full p-3 sm:p-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">{formData.full_name || 'Not set'}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Username</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full p-3 sm:p-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">{formData.username}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Age</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                      className="w-full p-3 sm:p-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">{formData.age}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-3">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 sm:p-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    />
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">{formData.location || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Body & Style Information */}
            <div className="premium-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-6 sm:mb-8 flex items-center">
                <Ruler className="w-5 sm:w-6 h-5 sm:h-6 mr-3 sm:mr-4 text-luxury-600" />
                Body & Style Profile
              </h3>
              
              <div className="space-y-6 sm:space-y-8">
                {/* Body Type */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-4">Body Type</label>
                  {isEditing ? (
                    <select
                      value={formData.bodyType}
                      onChange={(e) => setFormData(prev => ({ ...prev, bodyType: e.target.value }))}
                      className="w-full p-3 sm:p-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    >
                      {bodyTypes.map(type => (
                        <option key={type} value={type} className="bg-cream-50">{type}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">{formData.bodyType}</p>
                  )}
                </div>

                {/* Skin Tone */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-4">Skin Tone</label>
                  {isEditing ? (
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {skinTones.map(tone => (
                        <button
                          key={tone.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, skinTone: tone.id }))}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.skinTone === tone.id ? 'border-luxury-400' : 'border-luxury-200'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full mx-auto mb-1" style={{ backgroundColor: tone.color }}></div>
                          <span className="text-xs text-coffee-900">{tone.name}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900 capitalize">{formData.skinTone}</p>
                  )}
                </div>

                {/* Style Personality */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-4">Style Personality (Choose up to 3)</label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {stylePersonalities.map(style => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => {
                            const current = formData.stylePersonality;
                            if (current.includes(style)) {
                              setFormData(prev => ({
                                ...prev,
                                stylePersonality: current.filter(s => s !== style)
                              }));
                            } else if (current.length < 3) {
                              setFormData(prev => ({
                                ...prev,
                                stylePersonality: [...current, style]
                              }));
                            }
                          }}
                          className={`p-3 rounded-xl border-2 transition-all text-sm ${
                            formData.stylePersonality.includes(style) 
                              ? 'border-luxury-400 bg-luxury-100 text-luxury-700' 
                              : 'border-luxury-200 text-coffee-900 hover:border-luxury-400'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.stylePersonality.map(style => (
                        <span key={style} className="px-3 py-2 bg-luxury-100 text-luxury-700 rounded-xl text-sm">
                          {style}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Preferred Brands */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-4">Preferred Brands</label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {luxuryBrands.map(brand => (
                        <button
                          key={brand}
                          type="button"
                          onClick={() => {
                            const current = formData.preferredBrands;
                            if (current.includes(brand)) {
                              setFormData(prev => ({
                                ...prev,
                                preferredBrands: current.filter(b => b !== brand)
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                preferredBrands: [...current, brand]
                              }));
                            }
                          }}
                          className={`p-3 rounded-xl border-2 transition-all text-sm ${
                            formData.preferredBrands.includes(brand) 
                              ? 'border-luxury-400 bg-luxury-100 text-luxury-700' 
                              : 'border-luxury-200 text-coffee-900 hover:border-luxury-400'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.preferredBrands.map(brand => (
                        <span key={brand} className="px-3 py-2 bg-luxury-50 text-coffee-900 rounded-xl text-sm">
                          {brand}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Budget Range */}
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-4">
                    Budget Range: ${formData.budgetRange.min} - ${formData.budgetRange.max}
                  </label>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-coffee-600">Minimum</label>
                        <input
                          type="range"
                          min="50"
                          max="1000"
                          step="50"
                          value={formData.budgetRange.min}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            budgetRange: { ...prev.budgetRange, min: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-luxury-100 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-coffee-600">Maximum</label>
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={formData.budgetRange.max}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            budgetRange: { ...prev.budgetRange, max: parseInt(e.target.value) }
                          }))}
                          className="w-full h-2 bg-luxury-100 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="p-3 sm:p-4 bg-luxury-50 rounded-xl text-coffee-900">
                      ${formData.budgetRange.min} - ${formData.budgetRange.max}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-luxury-300 text-coffee-700 rounded-xl hover:bg-luxury-50 transition-all duration-300 text-base sm:text-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 sm:px-8 py-3 sm:py-4 luxury-button text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-base sm:text-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;