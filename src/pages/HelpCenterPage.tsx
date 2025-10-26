import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone, ArrowLeft, HelpCircle, Sparkles, Users, Settings, ShoppingBag } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Sparkles,
      description: 'Learn the basics of using PICMYFIT',
      articles: 8
    },
    {
      id: 'ai-styling',
      title: 'AI Styling',
      icon: Settings,
      description: 'How our AI creates personalized recommendations',
      articles: 12
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: Users,
      description: 'Managing your account and preferences',
      articles: 6
    },
    {
      id: 'shopping',
      title: 'Shopping & Orders',
      icon: ShoppingBag,
      description: 'Purchasing and order management',
      articles: 10
    }
  ];

  const faqs = [
    {
      id: '1',
      question: 'How does PICMYFIT\'s AI styling work?',
      answer: 'Our AI analyzes your uploaded photo to determine your body type, skin tone, and personal features. Combined with your style preferences, occasion, and budget, it generates personalized outfit recommendations from thousands of real products across various brands.'
    },
    {
      id: '2',
      question: 'Is my personal data and photos secure?',
      answer: 'Absolutely. We take privacy seriously. Your photos are processed securely and are not stored permanently. All personal data is encrypted and protected according to industry standards. We never share your information with third parties without your consent.'
    },
    {
      id: '3',
      question: 'Can I use PICMYFIT for different occasions?',
      answer: 'Yes! PICMYFIT can create recommendations for various occasions including business professional, casual daily wear, date nights, formal events, and more. Simply specify the occasion when creating your style profile.'
    },
    {
      id: '4',
      question: 'What budget ranges does PICMYFIT support?',
      answer: 'PICMYFIT works with all budget ranges from $50 to $3000+. Our AI curates products from budget-friendly brands like H&M and Uniqlo to luxury brands like Hugo Boss and premium designers.'
    },
    {
      id: '5',
      question: 'How accurate are the AI recommendations?',
      answer: 'Our AI has a 99.2% satisfaction rate. The recommendations are based on advanced computer vision, color theory, body type analysis, and fashion expertise. Each recommendation comes with a confidence score.'
    },
    {
      id: '6',
      question: 'Can I save and share my favorite looks?',
      answer: 'Yes! You can save your favorite outfit recommendations to your dashboard, like looks you love, and share them with friends. All saved looks are accessible in your personal style collection.'
    }
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead 
        title="Help Center - PICMYFIT"
        description="Get help with PICMYFIT's AI-powered fashion styling. Find answers to common questions, tutorials, and support for your personal styling journey."
        keywords="PICMYFIT help, AI styling support, fashion app help, style recommendations help, customer support"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-beige-50 to-luxury-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <Link
              to="/"
              className="inline-flex items-center text-luxury-600 hover:text-luxury-500 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-coffee-900 mb-4 sm:mb-6">
              Help
              <span className="luxury-text-gradient"> Center</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto">
              Find answers, get support, and learn how to make the most of your AI styling experience
            </p>
          </div>

          {/* Search Bar */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-12 sm:mb-16">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-coffee-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, tutorials, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent text-base"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-8 sm:mb-12 text-center">
              Browse by Category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="premium-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300 premium-hover cursor-pointer">
                    <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-coffee-900 mb-2">{category.title}</h3>
                    <p className="text-coffee-600 text-sm mb-4">{category.description}</p>
                    <div className="text-luxury-600 text-sm font-medium">
                      {category.articles} articles
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-8 sm:mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="premium-card rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 sm:px-8 py-6 text-left flex items-center justify-between hover:bg-luxury-50 transition-colors"
                  >
                    <span className="text-base sm:text-lg font-semibold text-coffee-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-luxury-600 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-luxury-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-6 sm:px-8 pb-6 border-t border-luxury-200">
                      <p className="text-coffee-700 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-4">
              Still Need Help?
            </h3>
            <p className="text-coffee-700 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions about AI styling, account issues, or technical problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Support</span>
              </Link>
              <a
                href="mailto:picmyfit@gmail.com"
                className="border border-luxury-400 text-luxury-600 px-6 py-3 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpCenterPage;