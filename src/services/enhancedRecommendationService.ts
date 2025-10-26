import { Product, ProductCategory, ProductType, Color, Season, Occasion, BodyType, SkinTone } from '../types/product';
import { productDatabase, getBudgetTier } from './productDatabase';
import { OutfitRecommendation } from './outfitRecommendationService';

interface AnalysisResult {
  bodyMeasurements: {
    shoulders: number;
    chest: number;
    waist: number;
    hips: number;
    height: number;
  };
  bodyType: BodyType;
  skinTone: SkinTone;
  detectedGender: string;
  estimatedAge: number;
  confidence: number;
}

interface UserPreferences {
  gender: string;
  ageGroup: string;
  skinTone: string;
  bodyType: string;
  stylePersonality: string[];
  occasion: string;
  season: string;
  budget: number;
  weather?: string;
  location?: string;
  lifestyle?: string;
  formality?: string;
}

/**
 * Enhanced recommendation service that combines image analysis with user preferences
 */
class EnhancedRecommendationService {
  /**
   * Get recommendations based on image analysis and user preferences
   * @param imageData Base64 encoded image data
   * @param preferences User preferences
   * @returns Object containing analysis results and outfit recommendations
   */
  async getRecommendations(
    imageData: string,
    preferences: UserPreferences
  ): Promise<{ analysis: AnalysisResult; recommendations: OutfitRecommendation[] }> {
    try {
      console.log('Starting recommendation generation with preferences:', preferences);
      
      // Simulate image analysis
      const analysis = await this.analyzeImage(imageData, preferences);
      console.log('Image analysis completed:', analysis);
      
      // Generate outfit recommendations with budget-aware filtering
      const recommendations = this.generateBudgetAwareRecommendations(preferences, 3);
      console.log('Generated recommendations:', recommendations.length);
      
      return { analysis, recommendations };
    } catch (error) {
      console.error('Error in recommendation service:', error);
      
      // Provide fallback recommendations
      return this.getFallbackRecommendations(preferences);
    }
  }
  
  /**
   * Generate budget-aware recommendations with diverse outfit images
   */
  private generateBudgetAwareRecommendations(preferences: UserPreferences, count: number): OutfitRecommendation[] {
    const budgetTier = getBudgetTier(preferences.budget);
    console.log('Budget tier:', budgetTier, 'for budget:', preferences.budget);
    
    // Filter products by budget tier to ensure appropriate matching
    const budgetFilteredProducts = this.filterProductsByBudgetTier(preferences.budget);
    console.log('Budget filtered products:', budgetFilteredProducts.length);
    
    // Group products by type
    const productsByType = this.groupProductsByType(budgetFilteredProducts);
    
    // Generate outfit combinations with different styles
    const outfits: OutfitRecommendation[] = [];
    
    // Create different outfit types based on occasion and style variety
    const occasionLower = preferences.occasion.toLowerCase();
    
    if (occasionLower.includes('business') || occasionLower.includes('professional')) {
      outfits.push(...this.createBusinessOutfits(productsByType, preferences));
      outfits.push(...this.createBusinessCasualOutfits(productsByType, preferences));
    } else if (occasionLower.includes('casual')) {
      outfits.push(...this.createCasualOutfits(productsByType, preferences));
      outfits.push(...this.createSmartCasualOutfits(productsByType, preferences));
    } else if (occasionLower.includes('formal')) {
      outfits.push(...this.createFormalOutfits(productsByType, preferences));
      outfits.push(...this.createBusinessOutfits(productsByType, preferences));
    } else {
      // Default: create a diverse mix of outfits
      outfits.push(...this.createCasualOutfits(productsByType, preferences));
      outfits.push(...this.createBusinessCasualOutfits(productsByType, preferences));
      outfits.push(...this.createSmartCasualOutfits(productsByType, preferences));
    }
    
    // Ensure we have at least some recommendations
    if (outfits.length === 0) {
      console.log('No specific outfits created, generating basic recommendations');
      outfits.push(...this.createBasicOutfits(productsByType, preferences));
    }
    
    // Ensure each outfit has different images by using different product combinations
    const diverseOutfits = this.ensureOutfitDiversity(outfits, productsByType, preferences);
    
    // Sort by confidence and limit count
    return diverseOutfits
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .slice(0, count)
      .map((outfit, index) => ({
        ...outfit,
        id: `outfit-${Date.now()}-${index}`
      }));
  }
  
  /**
   * Ensure outfit diversity by using different product combinations
   */
  private ensureOutfitDiversity(outfits: OutfitRecommendation[], productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const diverseOutfits: OutfitRecommendation[] = [];
    const usedProductCombinations = new Set<string>();
    
    for (const outfit of outfits) {
      const productIds = outfit.items.map(item => item.id).sort().join('-');
      
      if (!usedProductCombinations.has(productIds)) {
        diverseOutfits.push(outfit);
        usedProductCombinations.add(productIds);
      }
    }
    
    // If we don't have enough diverse outfits, create more with different product combinations
    while (diverseOutfits.length < 3) {
      const newOutfit = this.createAlternativeOutfit(productsByType, preferences, usedProductCombinations);
      if (newOutfit) {
        const productIds = newOutfit.items.map(item => item.id).sort().join('-');
        if (!usedProductCombinations.has(productIds)) {
          diverseOutfits.push(newOutfit);
          usedProductCombinations.add(productIds);
        }
      } else {
        break; // No more unique combinations possible
      }
    }
    
    return diverseOutfits;
  }
  
  /**
   * Create alternative outfit with different product combinations
   */
  private createAlternativeOutfit(productsByType: Record<string, Product[]>, preferences: UserPreferences, usedCombinations: Set<string>): OutfitRecommendation | null {
    const tops = productsByType.tops || [];
    const bottoms = productsByType.bottoms || [];
    const shoes = productsByType.shoes || [];
    
    // Try different combinations
    for (let topIndex = 0; topIndex < tops.length; topIndex++) {
      for (let bottomIndex = 0; bottomIndex < bottoms.length; bottomIndex++) {
        for (let shoeIndex = 0; shoeIndex < shoes.length; shoeIndex++) {
          const items = [tops[topIndex], bottoms[bottomIndex], shoes[shoeIndex]];
          const productIds = items.map(item => item.id).sort().join('-');
          
          if (!usedCombinations.has(productIds) && this.calculateTotalPrice(items) <= preferences.budget) {
            return {
              id: '',
              lookName: `Alternative Style ${Math.floor(Math.random() * 100)}`,
              items,
              totalPrice: this.calculateTotalPrice(items),
              confidenceScore: 0.80 + Math.random() * 0.1,
              styleNote: `A unique style combination featuring a ${this.getColorString(tops[topIndex].colors)} ${tops[topIndex].type.toLowerCase()}, ${this.getColorString(bottoms[bottomIndex].colors)} ${bottoms[bottomIndex].type.toLowerCase()}, and ${this.getColorString(shoes[shoeIndex].colors)} shoes.`,
              occasion: preferences.occasion,
              weather: preferences.weather || 'Mild',
              season: preferences.season,
              ageGroup: preferences.ageGroup,
              gender: preferences.gender,
              bodyType: preferences.bodyType,
              budget: preferences.budget,
              tags: ['alternative', 'unique', 'stylish'],
              aiAnalysis: {
                bodyFitReason: 'Carefully selected fit for your body type',
                colorHarmony: 'Coordinated color palette',
                styleCoherence: 'Well-balanced style elements',
                occasionMatch: 'Appropriate for the specified occasion'
              }
            };
          }
        }
      }
    }
    
    return null;
  }
  
  /**
   * Filter products by budget tier for better matching
   */
  private filterProductsByBudgetTier(budget: number): Product[] {
    const budgetTier = getBudgetTier(budget);
    
    // Define price ranges for each budget tier
    let minPrice = 0;
    let maxPrice = budget * 0.6; // Max 60% of budget for single item
    
    switch (budgetTier) {
      case 'Ultra Budget':
        maxPrice = Math.min(budget * 0.6, 30);
        break;
      case 'Budget Friendly':
        maxPrice = Math.min(budget * 0.6, 60);
        break;
      case 'Mid Range':
        minPrice = 20;
        maxPrice = Math.min(budget * 0.6, 120);
        break;
      case 'Premium':
        minPrice = 40;
        maxPrice = Math.min(budget * 0.6, 250);
        break;
      case 'Luxury':
        minPrice = 80;
        maxPrice = Math.min(budget * 0.6, 500);
        break;
      case 'Ultra Luxury':
        minPrice = 150;
        break;
    }
    
    return productDatabase.filter(product => 
      product.price >= minPrice && product.price <= maxPrice
    );
  }
  
  /**
   * Group products by type
   */
  private groupProductsByType(products: Product[]): Record<string, Product[]> {
    const groups: Record<string, Product[]> = {
      tops: [],
      bottoms: [],
      shoes: [],
      outerwear: []
    };
    
    products.forEach(product => {
      switch (product.type) {
        case ProductType.SHIRT:
        case ProductType.TSHIRT:
        case ProductType.POLO:
        case ProductType.SWEATER:
        case ProductType.HOODIE:
          groups.tops.push(product);
          break;
        case ProductType.PANTS:
        case ProductType.JEANS:
        case ProductType.SHORTS:
        case ProductType.CARGO:
        case ProductType.JOGGERS:
          groups.bottoms.push(product);
          break;
        case ProductType.SHOES:
          groups.shoes.push(product);
          break;
        case ProductType.BLAZER:
        case ProductType.JACKET:
        case ProductType.COAT:
          groups.outerwear.push(product);
          break;
      }
    });
    
    return groups;
  }
  
  /**
   * Create business outfit recommendations
   */
  private createBusinessOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    if (productsByType.tops.length > 0 && productsByType.bottoms.length > 0 && productsByType.shoes.length > 0) {
      // Business outfit 1: Formal shirt + Dress pants + Formal shoes
      const formalShirt = productsByType.tops.find(p => p.type === ProductType.SHIRT && p.occasions.includes(Occasion.BUSINESS)) || productsByType.tops[0];
      const dressPants = productsByType.bottoms.find(p => p.type === ProductType.PANTS && p.occasions.includes(Occasion.BUSINESS)) || productsByType.bottoms[0];
      const formalShoes = productsByType.shoes.find(p => p.occasions.includes(Occasion.BUSINESS)) || productsByType.shoes[0];
      
      const items = [formalShirt, dressPants, formalShoes];
      const totalPrice = this.calculateTotalPrice(items);
      
      if (totalPrice <= preferences.budget) {
        outfits.push({
          id: '',
          lookName: 'Executive Professional',
          items,
          totalPrice,
          confidenceScore: 0.95,
          styleNote: `A commanding executive look featuring a crisp ${this.getColorString(formalShirt.colors)} ${formalShirt.type.toLowerCase()} paired with ${this.getColorString(dressPants.colors)} dress ${dressPants.type.toLowerCase()} and polished formal shoes. Perfect for board meetings and high-stakes business interactions.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['executive', 'professional', 'formal', 'business'],
          aiAnalysis: {
            bodyFitReason: 'Tailored fit projects authority and confidence',
            colorHarmony: 'Professional color scheme conveys competence',
            styleCoherence: 'Complete executive business ensemble',
            occasionMatch: 'Ideal for high-level business environments'
          }
        });
      }
      
      // Business outfit 2: Add blazer if available
      if (productsByType.outerwear.length > 0 && outfits.length < 2) {
        const blazer = productsByType.outerwear.find(p => p.type === ProductType.BLAZER) || productsByType.outerwear[0];
        const businessItems = [formalShirt, dressPants, formalShoes, blazer];
        const businessTotalPrice = this.calculateTotalPrice(businessItems);
        
        if (businessTotalPrice <= preferences.budget) {
          outfits.push({
            id: '',
            lookName: 'Power Business Suite',
            items: businessItems,
            totalPrice: businessTotalPrice,
            confidenceScore: 0.98,
            styleNote: `An authoritative power look with a structured ${this.getColorString(blazer.colors)} blazer over a ${this.getColorString(formalShirt.colors)} shirt, ${this.getColorString(dressPants.colors)} pants, and executive shoes. Commands respect in any boardroom.`,
            occasion: preferences.occasion,
            weather: preferences.weather || 'Mild',
            season: preferences.season,
            ageGroup: preferences.ageGroup,
            gender: preferences.gender,
            bodyType: preferences.bodyType,
            budget: preferences.budget,
            tags: ['power dressing', 'executive', 'blazer', 'authority'],
            aiAnalysis: {
              bodyFitReason: 'Structured blazer creates a powerful, commanding silhouette',
              colorHarmony: 'Sophisticated color coordination for maximum impact',
              styleCoherence: 'Complete power dressing ensemble',
              occasionMatch: 'Perfect for leadership roles and important presentations'
            }
          });
        }
      }
    }
    
    return outfits;
  }
  
  /**
   * Create business casual outfit recommendations
   */
  private createBusinessCasualOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    if (productsByType.tops.length > 0 && productsByType.bottoms.length > 0 && productsByType.shoes.length > 0) {
      // Business casual outfit: Polo/casual shirt + Chinos + Loafers
      const casualShirt = productsByType.tops.find(p => (p.type === ProductType.POLO || p.type === ProductType.SHIRT) && p.occasions.includes(Occasion.BUSINESS_CASUAL)) || productsByType.tops[1] || productsByType.tops[0];
      const chinos = productsByType.bottoms.find(p => p.type === ProductType.PANTS && p.occasions.includes(Occasion.BUSINESS_CASUAL)) || productsByType.bottoms[1] || productsByType.bottoms[0];
      const casualShoes = productsByType.shoes.find(p => p.occasions.includes(Occasion.BUSINESS_CASUAL)) || productsByType.shoes[1] || productsByType.shoes[0];
      
      const items = [casualShirt, chinos, casualShoes];
      const totalPrice = this.calculateTotalPrice(items);
      
      if (totalPrice <= preferences.budget) {
        outfits.push({
          id: '',
          lookName: 'Modern Business Casual',
          items,
          totalPrice,
          confidenceScore: 0.90,
          styleNote: `A contemporary business casual ensemble with a ${this.getColorString(casualShirt.colors)} ${casualShirt.type.toLowerCase()}, ${this.getColorString(chinos.colors)} chinos, and sophisticated casual shoes. Strikes the perfect balance between professional and approachable.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['business casual', 'modern', 'approachable', 'professional'],
          aiAnalysis: {
            bodyFitReason: 'Comfortable fit that maintains professional appearance',
            colorHarmony: 'Balanced colors suitable for business casual settings',
            styleCoherence: 'Professional yet relaxed aesthetic',
            occasionMatch: 'Perfect for modern workplace environments'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create casual outfit recommendations
   */
  private createCasualOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    if (productsByType.tops.length > 0 && productsByType.bottoms.length > 0 && productsByType.shoes.length > 0) {
      // Casual outfit: T-shirt + Jeans + Sneakers
      const tshirt = productsByType.tops.find(p => p.type === ProductType.TSHIRT) || productsByType.tops[0];
      const jeans = productsByType.bottoms.find(p => p.type === ProductType.JEANS) || productsByType.bottoms[0];
      const sneakers = productsByType.shoes.find(p => p.occasions.includes(Occasion.CASUAL)) || productsByType.shoes[0];
      
      const items = [tshirt, jeans, sneakers];
      const totalPrice = this.calculateTotalPrice(items);
      
      if (totalPrice <= preferences.budget) {
        outfits.push({
          id: '',
          lookName: 'Effortless Weekend',
          items,
          totalPrice,
          confidenceScore: 0.88,
          styleNote: `A relaxed weekend look featuring a comfortable ${this.getColorString(tshirt.colors)} ${tshirt.type.toLowerCase()}, ${this.getColorString(jeans.colors)} ${jeans.type.toLowerCase()}, and versatile sneakers. Perfect for casual outings and relaxed social gatherings.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['casual', 'weekend', 'comfortable', 'relaxed'],
          aiAnalysis: {
            bodyFitReason: 'Relaxed fit for maximum comfort and freedom of movement',
            colorHarmony: 'Easy-going color combination that works effortlessly',
            styleCoherence: 'Laid-back and approachable weekend style',
            occasionMatch: 'Ideal for casual social activities and leisure time'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create smart casual outfit recommendations
   */
  private createSmartCasualOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    if (productsByType.tops.length > 0 && productsByType.bottoms.length > 0 && productsByType.shoes.length > 0) {
      // Smart casual outfit: Sweater/polo + Chinos + Casual shoes
      const smartTop = productsByType.tops.find(p => p.type === ProductType.SWEATER || p.type === ProductType.POLO) || productsByType.tops[2] || productsByType.tops[0];
      const smartBottoms = productsByType.bottoms.find(p => p.type === ProductType.PANTS) || productsByType.bottoms[2] || productsByType.bottoms[0];
      const smartShoes = productsByType.shoes[2] || productsByType.shoes[0];
      
      const items = [smartTop, smartBottoms, smartShoes];
      const totalPrice = this.calculateTotalPrice(items);
      
      if (totalPrice <= preferences.budget) {
        outfits.push({
          id: '',
          lookName: 'Sophisticated Casual',
          items,
          totalPrice,
          confidenceScore: 0.85,
          styleNote: `A refined smart casual look with a ${this.getColorString(smartTop.colors)} ${smartTop.type.toLowerCase()}, ${this.getColorString(smartBottoms.colors)} ${smartBottoms.type.toLowerCase()}, and polished casual shoes. Elevates your everyday style with sophisticated touches.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['smart casual', 'sophisticated', 'elevated', 'versatile'],
          aiAnalysis: {
            bodyFitReason: 'Well-fitted pieces that enhance your natural proportions',
            colorHarmony: 'Sophisticated color palette for elevated casual wear',
            styleCoherence: 'Perfect balance of casual comfort and refined style',
            occasionMatch: 'Versatile for various social and semi-professional settings'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create formal outfit recommendations
   */
  private createFormalOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    if (productsByType.tops.length > 0 && productsByType.bottoms.length > 0 && productsByType.shoes.length > 0) {
      const formalShirt = productsByType.tops.find(p => p.type === ProductType.SHIRT && p.occasions.includes(Occasion.FORMAL)) || productsByType.tops[0];
      const formalPants = productsByType.bottoms.find(p => p.type === ProductType.PANTS && p.occasions.includes(Occasion.FORMAL)) || productsByType.bottoms[0];
      const formalShoes = productsByType.shoes.find(p => p.occasions.includes(Occasion.FORMAL)) || productsByType.shoes[0];
      
      const items = [formalShirt, formalPants, formalShoes];
      const totalPrice = this.calculateTotalPrice(items);
      
      if (totalPrice <= preferences.budget) {
        outfits.push({
          id: '',
          lookName: 'Black Tie Elegance',
          items,
          totalPrice,
          confidenceScore: 0.93,
          styleNote: `An elegant formal ensemble featuring a pristine ${this.getColorString(formalShirt.colors)} ${formalShirt.type.toLowerCase()}, ${this.getColorString(formalPants.colors)} formal ${formalPants.type.toLowerCase()}, and classic dress shoes. Embodies timeless sophistication for special occasions.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['formal', 'elegant', 'sophisticated', 'special occasion'],
          aiAnalysis: {
            bodyFitReason: 'Impeccably tailored for a distinguished appearance',
            colorHarmony: 'Classic formal color palette for maximum elegance',
            styleCoherence: 'Timeless formal sophistication',
            occasionMatch: 'Perfect for formal events and special celebrations'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create basic outfit recommendations as fallback
   */
  private createBasicOutfits(productsByType: Record<string, Product[]>, preferences: UserPreferences): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Get any available products
    const availableTops = productsByType.tops;
    const availableBottoms = productsByType.bottoms;
    const availableShoes = productsByType.shoes;
    
    // Create multiple basic outfits with different combinations
    for (let i = 0; i < Math.min(3, availableTops.length); i++) {
      if (availableBottoms.length > i && availableShoes.length > 0) {
        const top = availableTops[i];
        const bottom = availableBottoms[i % availableBottoms.length];
        const shoes = availableShoes[i % availableShoes.length];
        
        const items = [top, bottom, shoes];
        const totalPrice = this.calculateTotalPrice(items);
        
        if (totalPrice <= preferences.budget) {
          outfits.push({
            id: '',
            lookName: `Classic Style ${i + 1}`,
            items,
            totalPrice,
            confidenceScore: 0.80 + (i * 0.02),
            styleNote: `A timeless classic combination featuring a ${this.getColorString(top.colors)} ${top.type.toLowerCase()}, ${this.getColorString(bottom.colors)} ${bottom.type.toLowerCase()}, and coordinating shoes. A versatile foundation for any wardrobe.`,
            occasion: preferences.occasion,
            weather: preferences.weather || 'Mild',
            season: preferences.season,
            ageGroup: preferences.ageGroup,
            gender: preferences.gender,
            bodyType: preferences.bodyType,
            budget: preferences.budget,
            tags: ['classic', 'versatile', 'timeless', 'foundation'],
            aiAnalysis: {
              bodyFitReason: 'Classic fit suitable for most body types and occasions',
              colorHarmony: 'Timeless color combination that never goes out of style',
              styleCoherence: 'Well-coordinated classic look with universal appeal',
              occasionMatch: 'Versatile enough for various occasions and settings'
            }
          });
        }
      }
    }
    
    return outfits;
  }
  
  /**
   * Helper method to safely get color string
   */
  private getColorString(colors: Color[] | undefined): string {
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return 'neutral';
    }
    const color = colors[0];
    if (!color || typeof color !== 'string') {
      return 'neutral';
    }
    return color.toLowerCase();
  }
  
  /**
   * Calculate total price of items
   */
  private calculateTotalPrice(items: Product[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }
  
  /**
   * Simulate image analysis
   * @param imageData Base64 encoded image data
   * @param preferences User preferences
   * @returns Analysis results
   */
  private async analyzeImage(imageData: string, preferences: UserPreferences): Promise<AnalysisResult> {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate realistic mock analysis based on preferences
    const mockAnalysis: AnalysisResult = {
      bodyMeasurements: this.generateBodyMeasurements(preferences.bodyType),
      bodyType: this.mapBodyTypeToEnum(preferences.bodyType),
      skinTone: this.mapSkinToneToEnum(preferences.skinTone),
      detectedGender: preferences.gender,
      estimatedAge: this.getAgeFromGroup(preferences.ageGroup),
      confidence: 0.88 + Math.random() * 0.1
    };
    
    return mockAnalysis;
  }
  
  /**
   * Map body type string to enum
   */
  private mapBodyTypeToEnum(bodyType: string): BodyType {
    const mapping: { [key: string]: BodyType } = {
      'pear': BodyType.AVERAGE,
      'apple': BodyType.AVERAGE,
      'hourglass': BodyType.ATHLETIC,
      'rectangle': BodyType.SLIM,
      'inverted-triangle': BodyType.ATHLETIC,
      'athletic': BodyType.ATHLETIC
    };
    return mapping[bodyType?.toLowerCase()] || BodyType.AVERAGE;
  }
  
  /**
   * Map skin tone string to enum
   */
  private mapSkinToneToEnum(skinTone: string): SkinTone {
    const mapping: { [key: string]: SkinTone } = {
      'very-fair': SkinTone.FAIR,
      'fair': SkinTone.FAIR,
      'light': SkinTone.FAIR,
      'medium': SkinTone.MEDIUM,
      'tan': SkinTone.MEDIUM,
      'deep': SkinTone.DEEP,
      'dark': SkinTone.DEEP,
      'very-dark': SkinTone.DEEP,
      'olive': SkinTone.OLIVE
    };
    return mapping[skinTone?.toLowerCase()] || SkinTone.MEDIUM;
  }
  
  /**
   * Generate realistic body measurements based on body type
   */
  private generateBodyMeasurements(bodyType: string): { shoulders: number; chest: number; waist: number; hips: number; height: number } {
    const baseHeight = 175 + Math.random() * 10;
    
    switch (bodyType?.toLowerCase()) {
      case 'athletic':
        return {
          shoulders: 44 + Math.random() * 3,
          chest: 42 + Math.random() * 2,
          waist: 32 + Math.random() * 2,
          hips: 38 + Math.random() * 2,
          height: baseHeight
        };
      case 'slim':
        return {
          shoulders: 40 + Math.random() * 3,
          chest: 36 + Math.random() * 2,
          waist: 30 + Math.random() * 2,
          hips: 35 + Math.random() * 2,
          height: baseHeight
        };
      default:
        return {
          shoulders: 42 + Math.random() * 3,
          chest: 40 + Math.random() * 3,
          waist: 34 + Math.random() * 3,
          hips: 38 + Math.random() * 3,
          height: baseHeight
        };
    }
  }
  
  /**
   * Convert age group to numeric age
   */
  private getAgeFromGroup(ageGroup: string): number {
    const ageMap: { [key: string]: number } = {
      'teen': 17,
      'young-adult': 25,
      'adult': 35,
      'mature': 45,
      'senior': 60
    };
    return ageMap[ageGroup] || 30;
  }
  
  /**
   * Get fallback recommendations in case of error
   */
  private getFallbackRecommendations(
    preferences: UserPreferences
  ): { analysis: AnalysisResult; recommendations: OutfitRecommendation[] } {
    console.log('Providing fallback recommendations...');
    
    const fallbackAnalysis: AnalysisResult = {
      bodyMeasurements: {
        shoulders: 42,
        chest: 40,
        waist: 34,
        hips: 38,
        height: 175
      },
      bodyType: BodyType.AVERAGE,
      skinTone: SkinTone.MEDIUM,
      detectedGender: preferences.gender,
      estimatedAge: 30,
      confidence: 0.7
    };
    
    // Generate basic recommendations
    const recommendations = this.generateBudgetAwareRecommendations(preferences, 3);
    
    return { analysis: fallbackAnalysis, recommendations };
  }
}

export const enhancedRecommendationService = new EnhancedRecommendationService();