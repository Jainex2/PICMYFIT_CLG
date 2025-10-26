import React from 'react';
import { Brain, Target, Palette, User, TrendingUp, Award } from 'lucide-react';

interface AIAnalysisDisplayProps {
  analysis: {
    bodyMeasurements: {
      shoulders: number;
      chest: number;
      waist: number;
      hips: number;
      height: number;
    };
    bodyType: string;
    skinTone: string;
    detectedGender: string;
    estimatedAge: number;
    confidence: number;
  };
}

const AIAnalysisDisplay: React.FC<AIAnalysisDisplayProps> = ({ analysis }) => {
  const confidencePercentage = Math.round(analysis.confidence * 100);
  
  const getBodyTypeDescription = (bodyType: string): string => {
    const descriptions = {
      'athletic': 'Well-defined muscle tone with balanced proportions',
      'hourglass': 'Balanced shoulders and hips with defined waist',
      'pear': 'Hips wider than shoulders with defined waist',
      'apple': 'Fuller midsection with broader shoulders',
      'rectangle': 'Similar shoulder, waist, and hip measurements',
      'inverted-triangle': 'Broader shoulders than hips'
    };
    return descriptions[bodyType as keyof typeof descriptions] || 'Unique body proportions';
  };

  const getSkinToneDescription = (skinTone: string): string => {
    const descriptions = {
      'very-fair': 'Very Fair - Cool undertones',
      'fair': 'Fair - Neutral to cool undertones',
      'light': 'Light - Warm undertones',
      'medium': 'Medium - Balanced undertones',
      'tan': 'Tan - Warm undertones',
      'deep': 'Deep - Rich warm undertones',
      'dark': 'Dark - Deep warm undertones',
      'very-dark': 'Very Dark - Rich deep undertones'
    };
    return descriptions[skinTone as keyof typeof descriptions] || 'Unique skin tone';
  };

  return (
    <div className="premium-card rounded-2xl p-8 mb-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 premium-gradient rounded-xl flex items-center justify-center mr-4">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-bold text-white">AI Analysis Results</h3>
          <p className="text-gray-400">Advanced computer vision analysis of your unique features</p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold luxury-text-gradient">{confidencePercentage}%</div>
          <div className="text-sm text-gray-400">Confidence Score</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Body Type Analysis */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-luxury-400 mr-3" />
            <h4 className="text-lg font-semibold text-white">Body Type</h4>
          </div>
          <div className="text-2xl font-bold text-luxury-400 mb-2 capitalize">
            {analysis.bodyType}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {getBodyTypeDescription(analysis.bodyType)}
          </p>
        </div>

        {/* Skin Tone Analysis */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-luxury-400 mr-3" />
            <h4 className="text-lg font-semibold text-white">Skin Tone</h4>
          </div>
          <div className="text-2xl font-bold text-luxury-400 mb-2 capitalize">
            {analysis.skinTone.replace('-', ' ')}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {getSkinToneDescription(analysis.skinTone)}
          </p>
        </div>

        {/* Demographics */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-luxury-400 mr-3" />
            <h4 className="text-lg font-semibold text-white">Demographics</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Gender:</span>
              <span className="text-white font-medium capitalize">{analysis.detectedGender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Est. Age:</span>
              <span className="text-white font-medium">{analysis.estimatedAge} years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Measurements */}
      <div className="mt-8 glass-effect rounded-xl p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-6 h-6 text-luxury-400 mr-3" />
          <h4 className="text-lg font-semibold text-white">Body Measurements</h4>
          <div className="ml-auto">
            <Award className="w-5 h-5 text-luxury-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-400 mb-1">
              {analysis.bodyMeasurements.shoulders}"
            </div>
            <div className="text-gray-400 text-sm">Shoulders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-400 mb-1">
              {analysis.bodyMeasurements.chest}"
            </div>
            <div className="text-gray-400 text-sm">Chest</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-400 mb-1">
              {analysis.bodyMeasurements.waist}"
            </div>
            <div className="text-gray-400 text-sm">Waist</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-400 mb-1">
              {analysis.bodyMeasurements.hips}"
            </div>
            <div className="text-gray-400 text-sm">Hips</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-400 mb-1">
              {analysis.bodyMeasurements.height}cm
            </div>
            <div className="text-gray-400 text-sm">Height</div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-luxury-500/10 border border-luxury-500/20 rounded-xl">
        <p className="text-luxury-300 text-sm leading-relaxed">
          <strong>AI Insight:</strong> Based on your {analysis.bodyType} body type and {analysis.skinTone.replace('-', ' ')} skin tone, 
          our AI will recommend styles that enhance your natural proportions and complement your unique features. 
          The analysis shows {confidencePercentage}% confidence in these measurements.
        </p>
      </div>
    </div>
  );
};

export default AIAnalysisDisplay;