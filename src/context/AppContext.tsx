import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  bodyType?: string;
  measurements?: {
    shoulders: number;
    chest: number;
    waist: number;
    hips: number;
    height: number;
    weight: number;
  };
  skinTone?: string;
  stylePersonality?: string[];
  preferredBrands?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  savedLooks: OutfitRecommendation[];
  preferences: StylePreferences;
  profileImage?: string;
  isLoggedIn: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface StylePreferences {
  occasions: string[];
  colors: string[];
  patterns: string[];
  fits: string[];
  materials: string[];
  lifestyle: string;
  formality: 'casual' | 'business-casual' | 'formal' | 'mixed';
}

interface OutfitRecommendation {
  id: string;
  lookName: string;
  items: OutfitItem[];
  confidenceScore: number;
  styleNote: string;
  occasion: string;
  weather: string;
  season: string;
  ageGroup: string;
  gender: string;
  bodyType: string;
  budget: number;
  totalPrice: number;
  saved?: boolean;
  liked?: boolean;
  tags: string[];
  aiAnalysis: {
    bodyFitReason: string;
    colorHarmony: string;
    styleCoherence: string;
    occasionMatch: string;
  };
  outfitImage?: string;
}

interface OutfitItem {
  id: string;
  type: 'top' | 'bottom' | 'shoes' | 'accessories' | 'outerwear' | 'dress' | 'suit' | 'underwear';
  category: string;
  name: string;
  brand: string;
  color: string;
  pattern?: string;
  material: string;
  size: string;
  price: number;
  image?: string;
  purchaseUrl?: string;
  description: string;
  fit: 'slim' | 'regular' | 'loose' | 'oversized';
  sustainability?: {
    rating: number;
    certifications: string[];
  };
}

interface AppState {
  user: UserProfile | null;
  currentRecommendations: OutfitRecommendation[];
  isLoading: boolean;
  uploadedImage: string | null;
  analysisData: {
    bodyMeasurements?: any;
    skinTone?: string;
    bodyType?: string;
    recommendations?: any;
  };
  preferences: {
    gender: string;
    ageGroup: string;
    skinTone: string;
    bodyType: string;
    stylePersonality: string[];
    occasion: string;
    weather: string;
    season: string;
    budget: number;
    location: string;
    lifestyle: string;
    formality: string;
  };
  searchFilters: {
    category: string;
    priceRange: [number, number];
    brands: string[];
    colors: string[];
    sizes: string[];
    occasions: string[];
  };
  showNotifications: boolean;
  showSettings: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'UPDATE_USER_PROFILE'; payload: Partial<UserProfile> }
  | { type: 'SET_RECOMMENDATIONS'; payload: OutfitRecommendation[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_UPLOADED_IMAGE'; payload: string }
  | { type: 'SET_ANALYSIS_DATA'; payload: any }
  | { type: 'SET_PREFERENCES'; payload: Partial<AppState['preferences']> }
  | { type: 'SET_SEARCH_FILTERS'; payload: Partial<AppState['searchFilters']> }
  | { type: 'SAVE_LOOK'; payload: string }
  | { type: 'LIKE_LOOK'; payload: string }
  | { type: 'REMOVE_SAVED_LOOK'; payload: string }
  | { type: 'LOGIN_USER'; payload: { email: string; password: string } }
  | { type: 'LOGOUT_USER' }
  | { type: 'TOGGLE_NOTIFICATIONS' }
  | { type: 'TOGGLE_SETTINGS' }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id'> };

const initialState: AppState = {
  user: null,
  currentRecommendations: [],
  isLoading: false,
  uploadedImage: null,
  analysisData: {},
  preferences: {
    gender: '',
    ageGroup: '',
    skinTone: '',
    bodyType: '',
    stylePersonality: [],
    occasion: '',
    weather: '',
    season: '',
    budget: 100,
    location: '',
    lifestyle: '',
    formality: 'mixed'
  },
  searchFilters: {
    category: '',
    priceRange: [0, 1000],
    brands: [],
    colors: [],
    sizes: [],
    occasions: []
  },
  showNotifications: false,
  showSettings: false
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER_PROFILE':
      return { 
        ...state, 
        user: state.user ? { ...state.user, ...action.payload } : null 
      };
    case 'SET_RECOMMENDATIONS':
      return { ...state, currentRecommendations: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_UPLOADED_IMAGE':
      return { ...state, uploadedImage: action.payload };
    case 'SET_ANALYSIS_DATA':
      return { ...state, analysisData: { ...state.analysisData, ...action.payload } };
    case 'SET_PREFERENCES':
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload }
      };
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: { ...state.searchFilters, ...action.payload }
      };
    case 'SAVE_LOOK':
      return {
        ...state,
        currentRecommendations: state.currentRecommendations.map(rec =>
          rec.id === action.payload ? { ...rec, saved: !rec.saved } : rec
        )
      };
    case 'LIKE_LOOK':
      return {
        ...state,
        currentRecommendations: state.currentRecommendations.map(rec =>
          rec.id === action.payload ? { ...rec, liked: !rec.liked } : rec
        )
      };
    case 'REMOVE_SAVED_LOOK':
      return {
        ...state,
        currentRecommendations: state.currentRecommendations.map(rec =>
          rec.id === action.payload ? { ...rec, saved: false } : rec
        )
      };
    case 'LOGIN_USER':
      // Mock login - in production, this would validate credentials
      const mockUser: UserProfile = {
        id: '1',
        name: 'Alexandra Chen',
        email: action.payload.email,
        age: 32,
        gender: 'female',
        bodyType: 'hourglass',
        skinTone: 'medium',
        stylePersonality: ['classic', 'modern', 'luxury'],
        preferredBrands: ['The Row', 'Bottega Veneta', 'Hermès'],
        budgetRange: { min: 200, max: 2000 },
        savedLooks: [],
        preferences: {
          occasions: ['Business Professional', 'Business Casual'],
          colors: ['Black', 'White', 'Navy', 'Beige'],
          patterns: ['Solid', 'Minimal'],
          fits: ['Tailored', 'Classic'],
          materials: ['Wool', 'Silk', 'Cotton'],
          lifestyle: 'Corporate Professional',
          formality: 'business-casual'
        },
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isLoggedIn: true,
        notifications: [
          {
            id: '1',
            title: 'New Style Recommendations',
            message: 'We have 3 new outfit suggestions based on your recent preferences.',
            type: 'info',
            timestamp: new Date(),
            read: false
          },
          {
            id: '2',
            title: 'Budget Alert',
            message: 'Great deals found within your $2000 budget range!',
            type: 'success',
            timestamp: new Date(Date.now() - 86400000),
            read: false
          }
        ]
      };
      return { ...state, user: mockUser };
    case 'LOGOUT_USER':
      return { ...state, user: null };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, showNotifications: !state.showNotifications, showSettings: false };
    case 'TOGGLE_SETTINGS':
      return { ...state, showSettings: !state.showSettings, showNotifications: false };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          notifications: state.user.notifications.map(notif =>
            notif.id === action.payload ? { ...notif, read: true } : notif
          )
        } : null
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          notifications: [
            {
              ...action.payload,
              id: Date.now().toString(),
              timestamp: new Date()
            },
            ...state.user.notifications
          ]
        } : null
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export type { UserProfile, OutfitRecommendation, OutfitItem, StylePreferences, Notification };