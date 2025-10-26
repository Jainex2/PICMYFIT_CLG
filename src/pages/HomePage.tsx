import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Instagram, Twitter, Facebook, Mail, Calendar, ShoppingBag, Settings, Plus, Filter, Star, Award, Globe, Brain, Crown, Gem, Palette, Target, TrendingUp, Wand2, ArrowRight, Play } from 'lucide-react';
import BrandSlider from '../components/BrandSlider';
import SEOHead from '../components/SEOHead';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Analysis',
      description: 'Cutting-edge computer vision analyzes your physique, skin tone, and personal features for perfect fit recommendations'
    },
    {
      icon: Palette,
      title: 'Universal Color Science',
      description: 'Sophisticated color theory matching for every skin tone, age, and personal style preference with luxury brand expertise'
    },
    {
      icon: Target,
      title: 'Occasion Intelligence',
      description: 'Context-aware styling for any event, weather, culture, and professional requirement with premium brand curation'
    },
    {
      icon: TrendingUp,
      title: 'All Budget Ranges',
      description: 'From affordable fashion to luxury brands - curated selection for every budget from $5 to $10,000+'
    }
  ];

  const stats = [
    { number: '2M+', label: 'Style Combinations', icon: Sparkles },
    { number: '500+', label: 'Brands (All Budgets)', icon: Award },
    { number: '99.2%', label: 'Satisfaction Rate', icon: Star },
    { number: '180+', label: 'Countries Served', icon: Globe }
  ];

  const testimonials = [
    {
      name: 'Alexandra Chen',
      role: 'Executive, 34',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'PICMYFIT transformed my professional wardrobe. The AI understands my body type and lifestyle perfectly, recommending pieces from brands I love.'
    },
    {
      name: 'Marcus Johnson',
      role: 'Creative Director, 28',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Finally, a platform that gets men\'s fashion right. The recommendations are sophisticated and perfectly curated for my style.'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Entrepreneur, 45',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Age-appropriate luxury styling that makes me feel confident and elegant. The AI recommendations are absolutely revolutionary.'
    }
  ];

  return (
    <>
      <SEOHead 
        title="PICMYFIT - AI-Powered Personal Fashion Stylist | Luxury Style Recommendations"
        description="Transform your style with PICMYFIT's AI-powered fashion intelligence. Get personalized luxury outfit recommendations for every body type, age, and budget. Professional styling made accessible."
        keywords="AI fashion stylist, personal stylist, outfit recommendations, luxury fashion, style advice, fashion AI, wardrobe consultant, outfit planner, fashion technology, style matching, body type styling, fashion intelligence, AI styling app, virtual stylist, fashion technology, style recommendations, personal shopping AI"
        url="https://picmyfit.style/"
        image="https://picmyfit.style/og-image.jpg"
      />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 luxury-gradient opacity-30"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-luxury-200/20 rounded-full blur-3xl luxury-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-coffee-200/20 rounded-full blur-3xl luxury-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-12">
              <div className="inline-flex items-center space-x-3 glass-effect rounded-full px-6 py-3 mb-8 luxury-shadow">
                <Sparkles className="w-5 h-5 text-luxury-600" />
                <span className="text-coffee-800 text-sm font-medium tracking-wide">PERSONALISED AI STYLIST</span>
                <div className="text-xs bg-luxury-600 text-white px-2 py-1 rounded-full">
                  PICMYFIT
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-coffee-900 mb-8 leading-tight">
                Your Personal
                <span className="block luxury-text-gradient whitespace-nowrap">
                  Fashion Stylist
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-coffee-700 mb-12 max-w-4xl mx-auto leading-relaxed">
                Discover your perfect style with AI-powered fashion 
                <span className="hidden sm:inline"> intelligence</span>. 
                Luxury recommendations for every body, every age, every budget.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
              <Link
                to="/upload"
                className="group luxury-button px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 sm:space-x-3"
              >
                <Wand2 className="w-5 h-5" />
                <span>Customize Your Style</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://youtu.be/xVIyflBdKxw"
                target="_blank"
                rel="noopener noreferrer"
                className="elegant-border text-luxury-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-luxury-50 transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Watch Experience</span>
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center premium-hover">
                    <div className="flex items-center justify-center mb-3">
                      <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-luxury-600 mr-2 sm:mr-3" />
                      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-800">{stat.number}</div>
                    </div>
                    <div className="text-coffee-600 text-xs sm:text-sm lg:text-base font-medium tracking-wide">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-luxury-50 to-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
                Signature Fashion
                <span className="block luxury-text-gradient">For Everyone</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-coffee-700 max-w-4xl mx-auto leading-relaxed">
                Our AI understands the nuances of style across all ages, genders, and budgets, 
                delivering personalized recommendations from affordable to luxury brands worldwide.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group premium-hover">
                    <div className="premium-card rounded-2xl p-6 sm:p-8 h-full luxury-shadow">
                      <div className="w-12 sm:w-16 h-12 sm:h-16 premium-gradient rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-coffee-900 mb-3 sm:mb-4">{feature.title}</h3>
                      <p className="text-coffee-700 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-cream-100 to-beige-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
                Referred by those
                <span className="block luxury-text-gradient">with an eye for style</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-coffee-700 max-w-3xl mx-auto">
                Join thousands of fashion enthusiasts who trust our AI for their styling needs across all budgets
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="premium-card rounded-2xl p-6 sm:p-8 text-center luxury-shadow premium-hover">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 sm:w-20 h-16 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 object-cover luxury-shadow"
                  />
                  <p className="text-coffee-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="text-coffee-900 font-semibold text-base sm:text-lg">{testimonial.name}</h4>
                    <p className="text-luxury-600 text-sm sm:text-base">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
          {/* Background with luxury pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-100 via-coffee-100 to-beige-200"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-luxury-300/20 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-coffee-300/20 to-transparent"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-luxury-200/30 rounded-full blur-2xl luxury-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-coffee-200/30 rounded-full blur-2xl luxury-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-beige-300/30 rounded-full blur-xl luxury-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Premium badge */}
            <div className="inline-flex items-center space-x-2 premium-card rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 luxury-shadow">
              <Crown className="w-4 sm:w-5 h-4 sm:h-5 text-luxury-600" />
              <span className="text-coffee-800 text-xs sm:text-sm font-semibold tracking-wide">FASHION FOR EVERY BUDGET</span>
              <Gem className="w-3 sm:w-4 h-3 sm:h-4 text-luxury-600" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6 leading-tight">
              Transform Your Style
              <span className="block luxury-text-gradient mt-2">
                Today
              </span>
            </h2>
            
            <p className="text-base sm:text-lg lg:text-xl text-coffee-700 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed">
              Join the future of personal styling. Experience fashion intelligence 
              tailored specifically for your unique identity, lifestyle, and budget.
            </p>
            
            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12">
              <Link
                to="/upload"
                className="group relative overflow-hidden luxury-button px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-luxury-600 via-coffee-600 to-luxury-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Brain className="relative z-10 w-5 sm:w-6 h-5 sm:h-6" />
                <span className="relative z-10">Start Your Transformation</span>
                <Sparkles className="relative z-10 w-4 sm:w-5 h-4 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
              </Link>
              
              <a
                href="https://youtu.be/xVIyflBdKxw"
                target="_blank"
                rel="noopener noreferrer"
                className="elegant-border text-luxury-700 px-8 sm:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-luxury-50 transition-all duration-300 backdrop-blur-sm flex items-center space-x-2"
              >
                <Play className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>View Portfolio</span>
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-luxury-600 mb-1">$5-$10K</div>
                <div className="text-coffee-600 text-xs sm:text-sm">Budget Range</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-luxury-600 mb-1">99.2%</div>
                <div className="text-coffee-600 text-xs sm:text-sm">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-luxury-600 mb-1">24/7</div>
                <div className="text-coffee-600 text-xs sm:text-sm">AI Styling</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-luxury-600 mb-1">180+</div>
                <div className="text-coffee-600 text-xs sm:text-sm">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Slider */}
        <BrandSlider />
      </div>
    </>
  );
};

export default HomePage;