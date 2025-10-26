import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, User, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    'General Inquiry',
    'AI Styling Support',
    'Account Issues',
    'Technical Problems',
    'Returns & Exchanges',
    'Size Guide Help',
    'Billing Questions',
    'Partnership Inquiry'
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'picmyfit@gmail.com',
      responseTime: 'Within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      contact: 'Available in app',
      responseTime: 'Instant response'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with an expert',
      contact: '+91 9081261090',
      responseTime: 'Mon-Fri 9AM-6PM IST'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <SEOHead 
        title="Contact Us - PICMYFIT"
        description="Get in touch with PICMYFIT support team. We're here to help with AI styling questions, technical issues, returns, and more. Contact us via email, phone, or live chat."
        keywords="contact PICMYFIT, customer support, help desk, AI styling support, technical support, fashion help"
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
              Contact
              <span className="luxury-text-gradient"> Us</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto">
              We're here to help with your AI styling journey. Reach out with any questions or feedback.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="premium-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 premium-hover">
                  <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-coffee-900 mb-2">{method.title}</h3>
                  <p className="text-coffee-600 text-sm mb-3">{method.description}</p>
                  <p className="text-luxury-600 font-semibold mb-2">{method.contact}</p>
                  <p className="text-coffee-500 text-xs">{method.responseTime}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="premium-card rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-6">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-coffee-900 mb-2">Message Sent!</h3>
                  <p className="text-coffee-600">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-coffee-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-coffee-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full p-3 bg-cream-50 border border-luxury-200 rounded-xl text-coffee-900 placeholder-coffee-500 focus:ring-2 focus:ring-luxury-400 focus:border-transparent resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full luxury-button text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information & FAQ */}
            <div className="space-y-8">
              {/* Office Information */}
              <div className="premium-card rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-coffee-900 mb-6">Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-luxury-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-coffee-900 font-medium">PICMYFIT Headquarters</p>
                      <p className="text-coffee-600 text-sm">A25 Ashish Avenue<br />Surat, Gujarat<br />India</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-luxury-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-coffee-900 font-medium">Business Hours</p>
                      <p className="text-coffee-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST<br />Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Help */}
              <div className="premium-card rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-coffee-900 mb-6">Quick Help</h3>
                <div className="space-y-4">
                  <Link
                    to="/help"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-50 transition-colors"
                  >
                    <AlertCircle className="w-5 h-5 text-luxury-600" />
                    <span className="text-coffee-700 hover:text-luxury-600">Visit Help Center</span>
                  </Link>
                  <Link
                    to="/size-guide"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-50 transition-colors"
                  >
                    <User className="w-5 h-5 text-luxury-600" />
                    <span className="text-coffee-700 hover:text-luxury-600">Size Guide</span>
                  </Link>
                  <Link
                    to="/returns"
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-luxury-50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-luxury-600" />
                    <span className="text-coffee-700 hover:text-luxury-600">Returns & Exchanges</span>
                  </Link>
                </div>
              </div>

              {/* Response Time */}
              <div className="premium-card rounded-2xl p-6 sm:p-8 bg-luxury-50 border-luxury-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-luxury-600" />
                  <h3 className="text-lg font-semibold text-coffee-900">Response Time</h3>
                </div>
                <p className="text-coffee-700 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call our support line for immediate assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;