import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload, X, Loader2, MapPin, DollarSign, Calendar, Palette, Sun, User, Users, Heart, Brain, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { enhancedRecommendationService } from '../services/enhancedRecommendationService';

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [formData, setFormData] = useState({
    gender: '',
    ageGroup: '',
    skinTone: '',
    bodyType: '',
    stylePersonality: [] as string[],
    occasion: '',
    weather: '',
    season: '',
    budget: 200,
    location: '',
    lifestyle: '',
    formality: 'mixed'
  });

  const genderOptions = [
    { id: 'male', name: 'Male', icon: '👨' },
    { id: 'female', name: 'Female', icon: '👩' },
    { id: 'non-binary', name: 'Non-Binary', icon: '🧑' },
    { id: 'prefer-not-to-say', name: 'Prefer Not to Say', icon: '👤' }
  ];

  const ageGroups = [
    { id: 'teen', name: 'Teen (13-19)', range: '13-19' },
    { id: 'young-adult', name: 'Young Adult (20-29)', range: '20-29' },
    { id: 'adult', name: 'Adult (30-39)', range: '30-39' },
    { id: 'mature', name: 'Mature (40-49)', range: '40-49' },
    { id: 'senior', name: 'Senior (50+)', range: '50+' }
  ];

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

  const bodyTypes = [
    { id: 'pear', name: 'Pear', description: 'Hips wider than shoulders' },
    { id: 'apple', name: 'Apple', description: 'Fuller midsection' },
    { id: 'hourglass', name: 'Hourglass', description: 'Balanced shoulders and hips' },
    { id: 'rectangle', name: 'Rectangle', description: 'Similar measurements' },
    { id: 'inverted-triangle', name: 'Inverted Triangle', description: 'Shoulders wider than hips' },
    { id: 'athletic', name: 'Athletic', description: 'Muscular build' }
  ];

  const stylePersonalities = [
    { id: 'classic', name: 'Classic Elegance', colors: 'from-neutral-800 to-neutral-600' },
    { id: 'modern', name: 'Modern Minimalist', colors: 'from-gray-800 to-gray-600' },
    { id: 'bohemian', name: 'Bohemian Free Spirit', colors: 'from-amber-600 to-orange-600' },
    { id: 'edgy', name: 'Edgy Contemporary', colors: 'from-red-600 to-pink-600' },
    { id: 'romantic', name: 'Romantic Feminine', colors: 'from-pink-600 to-rose-600' },
    { id: 'sporty', name: 'Sporty Casual', colors: 'from-blue-600 to-cyan-600' },
    { id: 'luxury', name: 'Luxury Statement', colors: 'from-luxury-600 to-luxury-800' },
    { id: 'vintage', name: 'Vintage Inspired', colors: 'from-purple-600 to-indigo-600' }
  ];

  const occasions = [
    'Casual Daily Wear', 'Business Professional', 'Business Casual', 'Date Night', 
    'Wedding Guest', 'Job Interview', 'Party/Event', 'Travel', 'Formal Dinner', 
    'Weekend Brunch', 'Workout/Gym', 'Beach/Vacation', 'Cultural Event', 'Networking'
  ];

  const weatherOptions = [
    'Sunny & Warm (75°F+)', 'Mild & Pleasant (60-75°F)', 'Cool & Crisp (45-60°F)', 
    'Cold & Chilly (30-45°F)', 'Freezing (Below 30°F)', 'Rainy', 'Snowy', 'Humid'
  ];

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const lifestyles = [
    'Corporate Professional', 'Creative Professional', 'Entrepreneur', 'Student', 
    'Stay-at-Home Parent', 'Retiree', 'Freelancer', 'Healthcare Worker', 'Educator', 'Other'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        dispatch({ type: 'SET_UPLOADED_IMAGE', payload: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    dispatch({ type: 'SET_UPLOADED_IMAGE', payload: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const updateProcessingStatus = (status: string, progress: number) => {
    setProcessingStatus(status);
    setProcessingProgress(progress);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePreview) {
      alert('Please upload an image first');
      return;
    }

    if (!formData.gender || !formData.ageGroup || !formData.skinTone || !formData.occasion) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Store preferences in context immediately
    dispatch({ type: 'SET_PREFERENCES', payload: formData });

    try {
      // Step 1: Initialize AI analysis
      updateProcessingStatus('Initializing AI analysis...', 10);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Connecting to backend
      updateProcessingStatus('Connecting to AI backend...', 20);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 3: Upload and analyze image
      updateProcessingStatus('Uploading and analyzing your image...', 35);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 4: Detect body measurements
      updateProcessingStatus('Detecting body measurements and proportions...', 50);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 5: Analyze skin tone and features
      updateProcessingStatus('Analyzing skin tone and facial features...', 65);
      await new Promise(resolve => setTimeout(resolve, 600));

      // Step 6: Generate recommendations using the enhanced service
      updateProcessingStatus('Generating personalized outfit recommendations...', 80);
      
      console.log('Generating recommendations with form data:', formData);
      
      const { analysis, recommendations } = await enhancedRecommendationService.getRecommendations(
        imagePreview,
        formData
      );

      console.log('Received recommendations:', recommendations);
      console.log('Received analysis:', analysis);

      // Step 7: Store results in context
      updateProcessingStatus('Finalizing your style recommendations...', 95);
      
      // Make sure we have valid recommendations
      if (!recommendations || recommendations.length === 0) {
        throw new Error('No recommendations generated');
      }

      // Store both analysis and recommendations
      dispatch({ type: 'SET_ANALYSIS_DATA', payload: analysis });
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations });
      
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 8: Complete
      updateProcessingStatus('Complete! Redirecting to your recommendations...', 100);
      await new Promise(resolve => setTimeout(resolve, 800));

      console.log('Navigating to recommendations page with', recommendations.length, 'recommendations');
      navigate('/recommendations');
      
    } catch (error) {
      console.error('Error processing image:', String(error));
      updateProcessingStatus('Error occurred. Generating fallback recommendations...', 90);
      
      // Generate fallback recommendations
      try {
        console.log('Generating fallback recommendations...');
        const fallbackRecommendations = await enhancedRecommendationService.getRecommendations(
          imagePreview,
          formData
        );
        
        console.log('Fallback recommendations generated:', fallbackRecommendations.recommendations);
        
        if (fallbackRecommendations.recommendations && fallbackRecommendations.recommendations.length > 0) {
          dispatch({ type: 'SET_ANALYSIS_DATA', payload: fallbackRecommendations.analysis });
          dispatch({ type: 'SET_RECOMMENDATIONS', payload: fallbackRecommendations.recommendations });
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          navigate('/recommendations');
        } else {
          throw new Error('Fallback recommendations also failed');
        }
      } catch (fallbackError) {
        console.error('Fallback also failed:', String(fallbackError));
        alert('Unable to process your image. Please try again with a different photo.');
      }
    } finally {
      setIsProcessing(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateFormData = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleStylePersonality = (style: string) => {
    const current = formData.stylePersonality;
    if (current.includes(style)) {
      updateFormData('stylePersonality', current.filter(s => s !== style));
    } else if (current.length < 3) {
      updateFormData('stylePersonality', [...current, style]);
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Show processing screen
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 border-4 border-luxury-200 border-t-luxury-600 rounded-full animate-spin mx-auto mb-8"></div>
          
          <div className="mb-6">
            <Brain className="w-16 h-16 text-luxury-600 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-coffee-900 mb-2">AI Processing Your Style</h2>
            <p className="text-coffee-600">{processingStatus}</p>
          </div>

          <div className="bg-luxury-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between text-sm text-coffee-700 mb-2">
              <span>Processing Progress</span>
              <span>{processingProgress}%</span>
            </div>
            <div className="w-full bg-luxury-200 rounded-full h-2">
              <div 
                className="premium-gradient h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="text-xs text-coffee-600 space-y-1">
            <p className={processingProgress >= 10 ? 'text-green-600' : ''}>
              {processingProgress >= 10 ? '✓' : '→'} AI analysis initialized
            </p>
            <p className={processingProgress >= 35 ? 'text-green-600' : processingProgress >= 20 ? 'text-luxury-600' : ''}>
              {processingProgress >= 35 ? '✓' : processingProgress >= 20 ? '→' : ''} Image uploaded and analyzed
            </p>
            <p className={processingProgress >= 65 ? 'text-green-600' : processingProgress >= 50 ? 'text-luxury-600' : ''}>
              {processingProgress >= 65 ? '✓' : processingProgress >= 50 ? '→' : ''} Body analysis complete
            </p>
            <p className={processingProgress >= 80 ? 'text-green-600' : processingProgress >= 65 ? 'text-luxury-600' : ''}>
              {processingProgress >= 80 ? '✓' : processingProgress >= 65 ? '→' : ''} Style preferences processed
            </p>
            <p className={processingProgress >= 100 ? 'text-green-600' : processingProgress >= 80 ? 'text-luxury-600' : ''}>
              {processingProgress >= 100 ? '✓' : processingProgress >= 80 ? '→' : ''} Generating recommendations...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-3">Upload Your Photo</h2>
              <p className="text-base sm:text-lg text-coffee-700">Let our AI analyze your unique features for personalized recommendations</p>
            </div>

            {!imagePreview ? (
              <div
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                  dragActive 
                    ? 'border-luxury-400 bg-luxury-400/10' 
                    : 'border-luxury-300 hover:border-luxury-400 hover:bg-luxury-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 sm:w-20 h-16 sm:h-20 text-luxury-400 mx-auto mb-4 sm:mb-6" />
                <p className="text-xl sm:text-2xl font-semibold text-coffee-900 mb-3 sm:mb-4">
                  Drop your photo here
                </p>
                <p className="text-coffee-600 mb-4 sm:mb-6 text-base">or click to browse</p>
                <div className="inline-block luxury-button text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-base">
                  Choose Photo
                </div>
              </div>
            ) : (
              <div className="relative max-w-md mx-auto">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-3">Tell Us About You</h2>
              <p className="text-base sm:text-lg text-coffee-700">Help us understand your unique identity and preferences</p>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-luxury-600" />
                Gender Identity *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateFormData('gender', option.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.gender === option.id
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <span className="text-coffee-900 font-medium text-sm">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-luxury-600" />
                Age Group *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ageGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => updateFormData('ageGroup', group.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.ageGroup === group.id
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <div className="text-coffee-900 font-semibold mb-1 text-sm">{group.name}</div>
                    <div className="text-coffee-600 text-xs">{group.range} years</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Skin Tone */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-luxury-600" />
                Skin Tone *
              </label>
              <div className="grid grid-cols-4 gap-2">
                {skinTones.map((tone) => (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => updateFormData('skinTone', tone.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      formData.skinTone === tone.id
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: tone.color }}
                    ></div>
                    <span className="text-coffee-900 text-xs font-medium">{tone.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-3">Your Style DNA</h2>
              <p className="text-base sm:text-lg text-coffee-700">Define your personal aesthetic and lifestyle preferences</p>
            </div>

            {/* Style Personality */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-luxury-600" />
                Style Personality (Choose up to 3)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {stylePersonalities.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleStylePersonality(style.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.stylePersonality.includes(style.id)
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <div className={`w-full h-6 rounded-lg mb-3 bg-gradient-to-r ${style.colors}`}></div>
                    <span className="text-coffee-900 font-medium text-sm">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4">
                Body Type (Optional - AI will analyze from photo)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {bodyTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => updateFormData('bodyType', type.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      formData.bodyType === type.id
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <div className="text-coffee-900 font-semibold mb-1 text-sm">{type.name}</div>
                    <div className="text-coffee-600 text-xs">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4">
                Lifestyle
              </label>
              <select
                value={formData.lifestyle}
                onChange={(e) => updateFormData('lifestyle', e.target.value)}
                className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 text-base focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
              >
                <option value="">Select your lifestyle</option>
                {lifestyles.map((lifestyle) => (
                  <option key={lifestyle} value={lifestyle} className="bg-cream-50">
                    {lifestyle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-3">Occasion & Context</h2>
              <p className="text-base sm:text-lg text-coffee-700">Set the scene for your perfect outfit recommendations</p>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-luxury-600" />
                Occasion *
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => updateFormData('occasion', e.target.value)}
                className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 text-base focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
              >
                <option value="">Select an occasion</option>
                {occasions.map((occasion) => (
                  <option key={occasion} value={occasion} className="bg-cream-50">
                    {occasion}
                  </option>
                ))}
              </select>
            </div>

            {/* Weather */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <Sun className="w-5 h-5 mr-2 text-luxury-600" />
                Weather
              </label>
              <select
                value={formData.weather}
                onChange={(e) => updateFormData('weather', e.target.value)}
                className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 text-base focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
              >
                <option value="">Auto-detect from location</option>
                {weatherOptions.map((weather) => (
                  <option key={weather} value={weather} className="bg-cream-50">
                    {weather}
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4">
                Season
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {seasons.map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => updateFormData('season', season)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                      formData.season === season
                        ? 'border-luxury-400 bg-luxury-400/10'
                        : 'border-luxury-200 hover:border-luxury-400/50'
                    }`}
                  >
                    <span className="text-coffee-900 font-medium text-sm">{season}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-luxury-600" />
                Budget: ${formData.budget}
              </label>
              <input
                type="range"
                min="50"
                max="3000"
                step="25"
                value={formData.budget}
                onChange={(e) => updateFormData('budget', parseInt(e.target.value))}
                className="w-full h-2 bg-luxury-100 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8B7355 0%, #8B7355 ${((formData.budget - 50) / 2950) * 100}%, #f5f2ed ${((formData.budget - 50) / 2950) * 100}%, #f5f2ed 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-coffee-600 mt-2">
                <span>$50</span>
                <span>$3,000+</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-coffee-600">
                  {formData.budget <= 100 ? 'Budget Friendly' : 
                   formData.budget <= 300 ? 'Mid Range' :
                   formData.budget <= 600 ? 'Premium' :
                   formData.budget <= 1200 ? 'Luxury' : 'Ultra Luxury'}
                </span>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-coffee-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-luxury-600" />
                Location (Optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormData('location', e.target.value)}
                placeholder="City, Country"
                className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 text-base focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-luxury-600">Step {currentStep} of 4</span>
            <span className="text-sm text-coffee-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-luxury-100 rounded-full h-2">
            <div 
              className="premium-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-6">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-luxury-300 text-coffee-700 rounded-xl hover:bg-luxury-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !imagePreview) ||
                  (currentStep === 2 && (!formData.gender || !formData.ageGroup || !formData.skinTone))
                }
                className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={isProcessing || !formData.occasion}
                className="luxury-button text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 text-sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Looks</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;