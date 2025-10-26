import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ruler, User, Users, Info, Calculator } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const SizeGuidePage: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'men' | 'women'>('men');
  const [selectedCategory, setSelectedCategory] = useState<'tops' | 'bottoms' | 'shoes'>('tops');

  const menSizes = {
    tops: {
      title: 'Men\'s Tops (Shirts, T-Shirts, Sweaters)',
      headers: ['Size', 'Chest (inches)', 'Waist (inches)', 'Neck (inches)'],
      rows: [
        ['XS', '32-34', '26-28', '13.5-14'],
        ['S', '34-36', '28-30', '14-14.5'],
        ['M', '38-40', '32-34', '15-15.5'],
        ['L', '42-44', '36-38', '16-16.5'],
        ['XL', '46-48', '40-42', '17-17.5'],
        ['XXL', '50-52', '44-46', '18-18.5']
      ]
    },
    bottoms: {
      title: 'Men\'s Bottoms (Pants, Jeans)',
      headers: ['Size', 'Waist (inches)', 'Inseam (inches)', 'Hip (inches)'],
      rows: [
        ['28', '28', '30-34', '36'],
        ['30', '30', '30-34', '38'],
        ['32', '32', '30-34', '40'],
        ['34', '34', '30-34', '42'],
        ['36', '36', '30-34', '44'],
        ['38', '38', '30-34', '46']
      ]
    },
    shoes: {
      title: 'Men\'s Shoes',
      headers: ['US Size', 'UK Size', 'EU Size', 'Length (inches)'],
      rows: [
        ['7', '6', '40', '9.25'],
        ['8', '7', '41', '9.5'],
        ['9', '8', '42', '9.75'],
        ['10', '9', '43', '10'],
        ['11', '10', '44', '10.25'],
        ['12', '11', '45', '10.5']
      ]
    }
  };

  const womenSizes = {
    tops: {
      title: 'Women\'s Tops (Shirts, Blouses, Sweaters)',
      headers: ['Size', 'Bust (inches)', 'Waist (inches)', 'Hip (inches)'],
      rows: [
        ['XS', '30-32', '24-26', '34-36'],
        ['S', '32-34', '26-28', '36-38'],
        ['M', '34-36', '28-30', '38-40'],
        ['L', '36-38', '30-32', '40-42'],
        ['XL', '38-40', '32-34', '42-44'],
        ['XXL', '40-42', '34-36', '44-46']
      ]
    },
    bottoms: {
      title: 'Women\'s Bottoms (Pants, Jeans, Skirts)',
      headers: ['Size', 'Waist (inches)', 'Hip (inches)', 'Inseam (inches)'],
      rows: [
        ['0', '24', '34', '30-32'],
        ['2', '25', '35', '30-32'],
        ['4', '26', '36', '30-32'],
        ['6', '27', '37', '30-32'],
        ['8', '28', '38', '30-32'],
        ['10', '29', '39', '30-32']
      ]
    },
    shoes: {
      title: 'Women\'s Shoes',
      headers: ['US Size', 'UK Size', 'EU Size', 'Length (inches)'],
      rows: [
        ['6', '3.5', '36', '8.5'],
        ['7', '4.5', '37', '8.75'],
        ['8', '5.5', '38', '9'],
        ['9', '6.5', '39', '9.25'],
        ['10', '7.5', '40', '9.5'],
        ['11', '8.5', '41', '9.75']
      ]
    }
  };

  const currentSizes = selectedGender === 'men' ? menSizes : womenSizes;
  const currentTable = currentSizes[selectedCategory];

  const measurementTips = [
    {
      title: 'Chest/Bust Measurement',
      description: 'Measure around the fullest part of your chest/bust, keeping the tape measure level and snug but not tight.'
    },
    {
      title: 'Waist Measurement',
      description: 'Measure around your natural waistline, which is typically the narrowest part of your torso.'
    },
    {
      title: 'Hip Measurement',
      description: 'Measure around the fullest part of your hips, typically 7-9 inches below your waistline.'
    },
    {
      title: 'Inseam Measurement',
      description: 'Measure from the crotch seam to the bottom of the leg opening on a well-fitting pair of pants.'
    }
  ];

  return (
    <>
      <SEOHead 
        title="Size Guide - PICMYFIT"
        description="Complete size guide for men's and women's clothing. Find the perfect fit with our detailed measurement charts for tops, bottoms, and shoes."
        keywords="size guide, clothing sizes, measurement chart, men's sizes, women's sizes, fit guide, PICMYFIT sizing"
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
              Size
              <span className="luxury-text-gradient"> Guide</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-coffee-700 max-w-4xl mx-auto">
              Find your perfect fit with our comprehensive sizing charts and measurement guide
            </p>
          </div>

          {/* Gender Selection */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedGender('men')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedGender === 'men'
                    ? 'luxury-button text-white'
                    : 'border border-luxury-300 text-coffee-700 hover:bg-luxury-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Men's Sizes</span>
              </button>
              <button
                onClick={() => setSelectedGender('women')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedGender === 'women'
                    ? 'luxury-button text-white'
                    : 'border border-luxury-300 text-coffee-700 hover:bg-luxury-50'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Women's Sizes</span>
              </button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {(['tops', 'bottoms', 'shoes'] as const).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                    selectedCategory === category
                      ? 'bg-luxury-100 text-luxury-700 border-2 border-luxury-400'
                      : 'border border-luxury-200 text-coffee-700 hover:bg-luxury-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Size Chart */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-6 text-center">
              {currentTable.title}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-luxury-200">
                    {currentTable.headers.map((header, index) => (
                      <th key={index} className="text-left py-4 px-4 font-semibold text-coffee-900">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentTable.rows.map((row, index) => (
                    <tr key={index} className="border-b border-luxury-100 hover:bg-luxury-50 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="py-3 px-4 text-coffee-700">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measurement Tips */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-coffee-900 mb-8 text-center">
              How to Measure
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {measurementTips.map((tip, index) => (
                <div key={index} className="premium-card rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center flex-shrink-0">
                      <Ruler className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-coffee-700 text-sm leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="premium-card rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-16 h-16 premium-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-coffee-900 mb-4">
              Need Help with Sizing?
            </h3>
            <p className="text-coffee-700 mb-8 max-w-2xl mx-auto">
              Our AI styling service automatically analyzes your body measurements from your photo to recommend the best sizes. 
              For additional help, contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/upload"
                className="luxury-button text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Try AI Sizing</span>
              </Link>
              <Link
                to="/contact"
                className="border border-luxury-400 text-luxury-600 px-6 py-3 rounded-xl hover:bg-luxury-50 transition-all duration-300 font-semibold"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SizeGuidePage;