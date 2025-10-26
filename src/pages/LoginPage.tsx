import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Sparkles, User, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // Handle email confirmation on page load
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const confirmed = searchParams.get('confirmed');
      
      if (confirmed === 'true') {
        setLoading(true);
        try {
          const result = await authService.handleEmailConfirmation();
          if (result.success) {
            setMessage({ 
              type: 'success', 
              text: 'Email confirmed successfully! You are now logged in.' 
            });
            // Small delay to show the success message
            setTimeout(() => {
              navigate('/profile');
            }, 2000);
          } else {
            setMessage({ 
              type: 'info', 
              text: 'Email confirmed! Please sign in with your credentials.' 
            });
            setIsLogin(true);
          }
        } catch (error) {
          setMessage({ 
            type: 'error', 
            text: 'There was an issue confirming your email. Please try signing in.' 
          });
        } finally {
          setLoading(false);
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !searchParams.get('confirmed')) {
      navigate('/profile');
    }
  }, [user, navigate, searchParams]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isLogin && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        // Sign in with email or username
        const { user, error } = await signIn({
          email: formData.email, // Can be email or username
          password: formData.password
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else if (user) {
          setMessage({ type: 'success', text: 'Successfully signed in!' });
          setTimeout(() => navigate('/profile'), 1000);
        }
      } else {
        // Sign up
        const { user, error } = await signUp({
          email: formData.email,
          password: formData.password,
          username: formData.username,
          fullName: formData.fullName
        });

        if (error) {
          setMessage({ type: 'error', text: error.message });
        } else {
          setMessage({ 
            type: 'info', 
            text: 'Please check your email and click the confirmation link to complete your registration.' 
          });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setMessage(null);
    setFormData({ username: '', email: '', password: '', confirmPassword: '', fullName: '' });
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) {
      setMessage({ type: 'error', text: 'Please enter your email address first' });
      return;
    }

    setLoading(true);
    try {
      const { error } = await authService.resendConfirmation(formData.email);
      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Confirmation email sent! Please check your inbox.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend confirmation email' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
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
                LUXURY AI FASHION
              </span>
            </div>
          </Link>
          
          <h1 className="text-3xl font-display font-bold text-coffee-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-coffee-600">
            {isLogin 
              ? 'Sign in to access your personalized style recommendations' 
              : 'Join PICMYFIT and discover your perfect style'
            }
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {message.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {message.type === 'info' && <AlertCircle className="w-5 h-5" />}
            <div className="flex-1">
              <span className="text-sm">{message.text}</span>
              {message.type === 'info' && message.text.includes('confirmation') && (
                <button
                  onClick={handleResendConfirmation}
                  className="block mt-2 text-xs underline hover:no-underline"
                  disabled={loading}
                >
                  Resend confirmation email
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="premium-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-cream-50 border rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent transition-all duration-300 ${
                        errors.username ? 'border-red-400' : 'border-luxury-200'
                      }`}
                      placeholder="Choose a username"
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-coffee-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 bg-cream-50 border rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent transition-all duration-300 ${
                        errors.fullName ? 'border-red-400' : 'border-luxury-200'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                {isLogin ? 'Email or Username' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
                <input
                  type={isLogin ? 'text' : 'email'}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-cream-50 border rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-400' : 'border-luxury-200'
                  }`}
                  placeholder={isLogin ? 'Enter email or username' : 'Enter your email'}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-coffee-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-cream-50 border rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-400' : 'border-luxury-200'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-coffee-500 hover:text-coffee-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-coffee-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-cream-50 border rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent transition-all duration-300 ${
                      errors.confirmPassword ? 'border-red-400' : 'border-luxury-200'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full luxury-button text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Form */}
          <div className="mt-6 text-center">
            <p className="text-coffee-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="ml-2 text-luxury-600 hover:text-luxury-500 font-semibold transition-colors"
                disabled={loading}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-coffee-600 hover:text-luxury-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;