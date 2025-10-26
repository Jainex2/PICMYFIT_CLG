import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, Clock, CreditCard, Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const ReturnsPage: React.FC = () => {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact our support team or use our return portal to start the process',
      icon: Package
    },
    {
      step: 2,
      title: 'Package Items',
      description: 'Pack items in original packaging with tags attached',
      icon: Shield
    },
    {
      step: 3,
      title: 'Ship Back',
      description: 'Use our prepaid return label to send items back',
      icon: RefreshCw
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Receive your refund within 5-7 business days',
      icon: CreditCard
    }
  ];

  const returnPolicies = [
    {
      title: '30-Day Return Window',
      description: 'Items can be returned within 30 days of purchase for a full refund',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Original Condition',
      description: 'Items must be unworn, unwashed, and have all original tags attached',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      title: 'Free Return Shipping',
      description: 'We provide prepaid return labels for all eligible returns',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Quick Processing',
      description: 'Refunds are processed within 5-7 business days of receiving items',
      icon: CreditCard,
      color: 'text-luxury-600'
    }
  ];

  const nonReturnableItems = [
    'Underwear and intimate apparel',
    'Swimwear',
    'Items marked as final sale',
    'Personalized or customized items',
    'Items damaged by normal wear'
  ];

  return (
    <>
      <SEOHead 
        title="Returns & Exchanges - PICMYFIT"
        description="Easy returns and exchanges at PICMYFIT. Learn about our 30-day return policy, free return shipping, and how to return items for a full refund."
        keywords="returns, exchanges, refund policy, return shipping, PICMYFIT returns, fashion returns"
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
              Returns &
              <span className="luxury-text-gradient"> Exchanges</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto">
              Hassle-free returns with free shipping. We want you to love your style choices.
            </p>
          </div>

          {/* Return Policy Overview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {returnPolicies.map((policy, index) => {
              const Icon = policy.icon;
              return (
                <div key={index} className="premium-card rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 premium-hover">
                  <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-coffee-900 mb-2">{policy.title}</h3>
                  <p className="text-coffee-600 text-sm leading-relaxed">{policy.description}</p>
                </div>
              );
            })}
          </div>

          {/* Return Process */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-8 text-center">
              How to Return Items
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="premium-card rounded-2xl p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mx-auto">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-luxury-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-coffee-900 mb-3">{step.title}</h3>
                    <p className="text-coffee-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Return Policy */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Return Conditions */}
            <div className="premium-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-coffee-900">Return Conditions</h3>
              </div>
              <ul className="space-y-4 text-coffee-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-luxury-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Items must be returned within 30 days of purchase</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-luxury-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>All original tags must be attached</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-luxury-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Items must be unworn and in original condition</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-luxury-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Original packaging preferred but not required</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-luxury-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Proof of purchase required (order confirmation email)</span>
                </li>
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div className="premium-card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                <h3 className="text-xl font-semibold text-coffee-900">Non-Returnable Items</h3>
              </div>
              <ul className="space-y-4 text-coffee-700">
                {nonReturnableItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-700 text-sm">
                  <strong>Note:</strong> These items cannot be returned for hygiene and safety reasons.
                </p>
              </div>
            </div>
          </div>

          {/* Refund Information */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-16">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-6 text-center">
              Refund Information
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-coffee-900 mb-2">Processing Time</h4>
                <p className="text-coffee-600 text-sm">5-7 business days after we receive your return</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-coffee-900 mb-2">Refund Method</h4>
                <p className="text-coffee-600 text-sm">Refunded to original payment method</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-coffee-900 mb-2">Return Shipping</h4>
                <p className="text-coffee-600 text-sm">Free prepaid return labels provided</p>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-4">
              Need to Start a Return?
            </h3>
            <p className="text-coffee-700 mb-8 max-w-2xl mx-auto">
              Contact our support team to initiate your return. We'll guide you through the process and provide a prepaid return label.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Return Process
              </Link>
              <a
                href="mailto:picmyfit@gmail.com"
                className="border border-luxury-400 text-luxury-600 px-6 py-3 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold"
              >
                Email Returns Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsPage;