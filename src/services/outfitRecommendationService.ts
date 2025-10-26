import { Product, ProductCategory, ProductType, Color, Season, Occasion, BodyType, SkinTone } from '../types/product';
import { productDatabase, getProductsByBodyType, getProductsBySkinTone, getProductsByOccasion } from './productDatabase';

export interface OutfitRecommendation {
  id: string;
  lookName: string;
  items: Product[];
  totalPrice: number;
  confidenceScore: number;
  styleNote: string;
  occasion: string;
  weather: string;
  season: string;
  ageGroup: string;
  gender: string;
  bodyType: string;
  budget: number;
  tags: string[];
  aiAnalysis: {
    bodyFitReason: string;
    colorHarmony: string;
    styleCoherence: string;
    occasionMatch: string;
  };
  outfitImage?: string;
}

export interface UserPreferences {
  gender: string;
  ageGroup: string;
  skinTone: string;
  bodyType: string;
  stylePersonality: string[];
  occasion: string;
  season: string;
  budget: number;
  favoriteColors?: Color[];
  weather?: string;
  location?: string;
  lifestyle?: string;
  formality?: string;
}

/**
 * Service for generating outfit recommendations based on user preferences
 */
class OutfitRecommendationService {
  /**
   * Generate outfit recommendations based on user preferences
   * @param preferences User preferences
   * @param count Number of recommendations to generate
   * @returns Array of outfit recommendations
   */
  generateRecommendations(preferences: UserPreferences, count: number = 3): OutfitRecommendation[] {
    console.log('Generating recommendations with preferences:', preferences);
    
    // Convert string values to enum values for filtering
    const mappedPreferences = this.mapPreferencesToEnums(preferences);
    
    // Filter products based on user preferences
    const suitableProducts = this.filterProductsByPreferences(mappedPreferences);
    console.log('Suitable products found:', suitableProducts.length);
    
    if (suitableProducts.length === 0) {
      // If no products match exactly, use all products as fallback
      console.log('No exact matches, using all products as fallback');
      return this.generateFallbackRecommendations(preferences, count);
    }
    
    // Group products by type
    const productsByType = this.groupProductsByType(suitableProducts);
    
    // Generate outfit combinations
    const outfits: OutfitRecommendation[] = [];
    
    // Create different outfit combinations based on occasion
    const occasionEnum = this.mapOccasionToEnum(preferences.occasion);
    
    switch (occasionEnum) {
      case Occasion.BUSINESS:
      case Occasion.FORMAL:
        outfits.push(...this.createBusinessOutfits(productsByType, preferences, count));
        break;
      case Occasion.BUSINESS_CASUAL:
        outfits.push(...this.createBusinessCasualOutfits(productsByType, preferences, count));
        break;
      case Occasion.CASUAL:
        outfits.push(...this.createCasualOutfits(productsByType, preferences, count));
        break;
      case Occasion.NIGHT_OUT:
        outfits.push(...this.createNightOutOutfits(productsByType, preferences, count));
        break;
      case Occasion.ETHNIC:
        outfits.push(...this.createEthnicOutfits(productsByType, preferences, count));
        break;
      default:
        outfits.push(...this.createCasualOutfits(productsByType, preferences, count));
        outfits.push(...this.createBusinessCasualOutfits(productsByType, preferences, count));
    }
    
    // If no outfits were created, generate fallback recommendations
    if (outfits.length === 0) {
      console.log('No outfits created, generating fallback recommendations');
      return this.generateFallbackRecommendations(preferences, count);
    }
    
    // Sort by confidence score and limit to requested count
    const finalOutfits = outfits
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .slice(0, count)
      .map((outfit, index) => ({
        ...outfit,
        id: `outfit-${Date.now()}-${index}`,
        totalPrice: this.calculateTotalPrice(outfit.items)
      }));
    
    console.log('Generated outfits:', finalOutfits.length);
    return finalOutfits;
  }
  
  /**
   * Generate fallback recommendations when no specific matches are found
   */
  private generateFallbackRecommendations(preferences: UserPreferences, count: number): OutfitRecommendation[] {
    const fallbackOutfits: OutfitRecommendation[] = [];
    
    // Get some basic products for fallback recommendations
    const shirts = productDatabase.filter(p => p.type === ProductType.SHIRT).slice(0, 3);
    const pants = productDatabase.filter(p => p.type === ProductType.PANTS).slice(0, 3);
    const shoes = productDatabase.filter(p => p.type === ProductType.SHOES).slice(0, 3);
    const tshirts = productDatabase.filter(p => p.type === ProductType.TSHIRT).slice(0, 3);
    const jeans = productDatabase.filter(p => p.type === ProductType.JEANS).slice(0, 3);
    
    // Create basic outfit combinations
    for (let i = 0; i < Math.min(count, 3); i++) {
      if (i === 0 && shirts.length > 0 && pants.length > 0 && shoes.length > 0) {
        // Business casual outfit
        const items = [shirts[0], pants[0], shoes[0]];
        fallbackOutfits.push({
          id: `fallback-${i}`,
          lookName: 'Classic Business Casual',
          items,
          totalPrice: this.calculateTotalPrice(items),
          confidenceScore: 0.8,
          styleNote: 'A timeless business casual look that works for most professional settings.',
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['business casual', 'classic', 'versatile'],
          aiAnalysis: {
            bodyFitReason: 'Classic fit suitable for most body types',
            colorHarmony: 'Neutral colors that complement various skin tones',
            styleCoherence: 'Professional and polished appearance',
            occasionMatch: 'Perfect for business casual environments'
          }
        });
      } else if (i === 1 && tshirts.length > 0 && jeans.length > 0 && shoes.length > 1) {
        // Casual outfit
        const items = [tshirts[0], jeans[0], shoes[1]];
        fallbackOutfits.push({
          id: `fallback-${i}`,
          lookName: 'Everyday Casual',
          items,
          totalPrice: this.calculateTotalPrice(items),
          confidenceScore: 0.85,
          styleNote: 'A comfortable and stylish casual look perfect for everyday activities.',
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['casual', 'comfortable', 'everyday'],
          aiAnalysis: {
            bodyFitReason: 'Relaxed fit for comfort and movement',
            colorHarmony: 'Versatile colors that work well together',
            styleCoherence: 'Casual and approachable style',
            occasionMatch: 'Great for casual outings and daily wear'
          }
        });
      } else if (i === 2 && shirts.length > 1 && jeans.length > 0 && shoes.length > 0) {
        // Smart casual outfit
        const items = [shirts[1], jeans[0], shoes[0]];
        fallbackOutfits.push({
          id: `fallback-${i}`,
          lookName: 'Smart Casual',
          items,
          totalPrice: this.calculateTotalPrice(items),
          confidenceScore: 0.82,
          styleNote: 'A smart casual look that bridges the gap between formal and casual wear.',
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['smart casual', 'versatile', 'polished'],
          aiAnalysis: {
            bodyFitReason: 'Tailored fit that flatters most body types',
            colorHarmony: 'Coordinated colors for a polished appearance',
            styleCoherence: 'Balanced between formal and casual elements',
            occasionMatch: 'Suitable for various social and professional settings'
          }
        });
      }
    }
    
    return fallbackOutfits;
  }
  
  /**
   * Map string preferences to enum values
   */
  private mapPreferencesToEnums(preferences: UserPreferences): any {
    return {
      ...preferences,
      bodyType: this.mapBodyTypeToEnum(preferences.bodyType),
      skinTone: this.mapSkinToneToEnum(preferences.skinTone),
      occasion: this.mapOccasionToEnum(preferences.occasion),
      season: this.mapSeasonToEnum(preferences.season)
    };
  }
  
  /**
   * Map body type string to enum
   */
  private mapBodyTypeToEnum(bodyType: string): BodyType {
    if (!bodyType || typeof bodyType !== 'string') {
      return BodyType.AVERAGE;
    }
    
    const mapping: { [key: string]: BodyType } = {
      'pear': BodyType.AVERAGE,
      'apple': BodyType.AVERAGE,
      'hourglass': BodyType.ATHLETIC,
      'rectangle': BodyType.SLIM,
      'inverted-triangle': BodyType.ATHLETIC,
      'athletic': BodyType.ATHLETIC,
      'slim': BodyType.SLIM,
      'average': BodyType.AVERAGE,
      'large': BodyType.LARGE
    };
    return mapping[String(bodyType).toLowerCase()] || BodyType.AVERAGE;
  }
  
  /**
   * Map skin tone string to enum
   */
  private mapSkinToneToEnum(skinTone: string): SkinTone {
    if (!skinTone || typeof skinTone !== 'string') {
      return SkinTone.MEDIUM;
    }
    
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
    return mapping[String(skinTone).toLowerCase()] || SkinTone.MEDIUM;
  }
  
  /**
   * Map occasion string to enum
   */
  private mapOccasionToEnum(occasion: string): Occasion {
    if (!occasion || typeof occasion !== 'string') {
      return Occasion.CASUAL;
    }
    
    const mapping: { [key: string]: Occasion } = {
      'casual daily wear': Occasion.CASUAL,
      'business professional': Occasion.BUSINESS,
      'business casual': Occasion.BUSINESS_CASUAL,
      'date night': Occasion.NIGHT_OUT,
      'wedding guest': Occasion.WEDDING,
      'job interview': Occasion.BUSINESS,
      'party/event': Occasion.NIGHT_OUT,
      'travel': Occasion.CASUAL,
      'formal dinner': Occasion.FORMAL,
      'weekend brunch': Occasion.WEEKEND,
      'workout/gym': Occasion.SPORT,
      'beach/vacation': Occasion.BEACH,
      'cultural event': Occasion.ETHNIC,
      'networking': Occasion.BUSINESS_CASUAL
    };
    return mapping[String(occasion).toLowerCase()] || Occasion.CASUAL;
  }
  
  /**
   * Map season string to enum
   */
  private mapSeasonToEnum(season: string): Season {
    if (!season || typeof season !== 'string') {
      return Season.ALL;
    }
    
    const mapping: { [key: string]: Season } = {
      'spring': Season.SPRING,
      'summer': Season.SUMMER,
      'fall': Season.FALL,
      'winter': Season.WINTER
    };
    return mapping[String(season).toLowerCase()] || Season.ALL;
  }
  
  /**
   * Filter products based on user preferences
   * @param preferences User preferences
   * @returns Filtered products
   */
  private filterProductsByPreferences(preferences: any): Product[] {
    let filteredProducts = [...productDatabase];
    
    // Filter by budget (ensure no single item exceeds 70% of the budget)
    const maxItemPrice = preferences.budget * 0.7;
    filteredProducts = filteredProducts.filter(product => 
      product.price <= maxItemPrice
    );
    
    // Filter by body type (more lenient)
    if (preferences.bodyType) {
      filteredProducts = filteredProducts.filter(product => 
        product.suitableBodyTypes.includes(preferences.bodyType) || 
        product.suitableBodyTypes.includes(BodyType.ALL)
      );
    }
    
    // Filter by skin tone (more lenient)
    if (preferences.skinTone) {
      filteredProducts = filteredProducts.filter(product => 
        product.suitableSkinTones.includes(preferences.skinTone) || 
        product.suitableSkinTones.includes(SkinTone.ALL)
      );
    }
    
    // Filter by occasion (more lenient)
    if (preferences.occasion) {
      filteredProducts = filteredProducts.filter(product => 
        product.occasions.includes(preferences.occasion) ||
        product.occasions.includes(Occasion.CASUAL) // Include casual items as fallback
      );
    }
    
    // Filter by season (more lenient)
    if (preferences.season) {
      filteredProducts = filteredProducts.filter(product => 
        product.seasons.includes(preferences.season) || 
        product.seasons.includes(Season.ALL)
      );
    }
    
    return filteredProducts;
  }
  
  /**
   * Group products by type
   * @param products Products to group
   * @returns Products grouped by type
   */
  private groupProductsByType(products: Product[]): Record<ProductType, Product[]> {
    const result: Record<ProductType, Product[]> = {} as Record<ProductType, Product[]>;
    
    for (const type of Object.values(ProductType)) {
      result[type] = products.filter(product => product.type === type);
    }
    
    return result;
  }
  
  /**
   * Helper method to safely get color string
   */
  private getColorString(colors: Color[] | undefined, index: number = 0): string {
    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return 'neutral';
    }
    const color = colors[index];
    if (!color || typeof color !== 'string') {
      return 'neutral';
    }
    return color.toLowerCase();
  }
  
  /**
   * Create business outfit recommendations
   */
  private createBusinessOutfits(
    productsByType: Record<ProductType, Product[]>, 
    preferences: UserPreferences,
    count: number
  ): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Business outfit: Shirt + Pants + Shoes
    if (productsByType[ProductType.SHIRT].length > 0 && 
        productsByType[ProductType.PANTS].length > 0 && 
        productsByType[ProductType.SHOES].length > 0) {
      
      const shirt = productsByType[ProductType.SHIRT][0];
      const pants = productsByType[ProductType.PANTS][0];
      const shoes = productsByType[ProductType.SHOES][0];
      
      const items = [shirt, pants, shoes];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const shirtColor = this.getColorString(shirt.colors);
        const pantsColor = this.getColorString(pants.colors);
        
        outfits.push({
          id: '',
          lookName: 'Professional Business Look',
          items,
          totalPrice: 0,
          confidenceScore: 0.92,
          styleNote: `A professional business ensemble featuring a ${shirtColor} shirt paired with ${pantsColor} pants and formal shoes.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['business', 'professional', 'formal'],
          aiAnalysis: {
            bodyFitReason: 'Tailored fit enhances your body proportions',
            colorHarmony: 'Professional color palette suitable for business settings',
            styleCoherence: 'Cohesive formal business appearance',
            occasionMatch: 'Perfect for professional business environments'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create business casual outfit recommendations
   */
  private createBusinessCasualOutfits(
    productsByType: Record<ProductType, Product[]>, 
    preferences: UserPreferences,
    count: number
  ): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Business casual outfit: Shirt + Pants + Shoes
    if (productsByType[ProductType.SHIRT].length > 0 && 
        productsByType[ProductType.PANTS].length > 0 && 
        productsByType[ProductType.SHOES].length > 0) {
      
      const shirt = productsByType[ProductType.SHIRT][0];
      const pants = productsByType[ProductType.PANTS][0];
      const shoes = productsByType[ProductType.SHOES][0];
      
      const items = [shirt, pants, shoes];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const shirtColor = this.getColorString(shirt.colors);
        const pantsColor = this.getColorString(pants.colors);
        
        outfits.push({
          id: '',
          lookName: 'Smart Business Casual',
          items,
          totalPrice: 0,
          confidenceScore: 0.88,
          styleNote: `A smart business casual look with a ${shirtColor} shirt, ${pantsColor} pants, and complementary shoes.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['business casual', 'smart', 'versatile'],
          aiAnalysis: {
            bodyFitReason: 'Comfortable fit suitable for all-day wear',
            colorHarmony: 'Balanced colors that work well in professional settings',
            styleCoherence: 'Professional yet approachable appearance',
            occasionMatch: 'Ideal for business casual environments'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create casual outfit recommendations
   */
  private createCasualOutfits(
    productsByType: Record<ProductType, Product[]>, 
    preferences: UserPreferences,
    count: number
  ): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Casual outfit 1: T-Shirt + Jeans + Shoes
    if (productsByType[ProductType.TSHIRT].length > 0 && 
        productsByType[ProductType.JEANS].length > 0 && 
        productsByType[ProductType.SHOES].length > 0) {
      
      const tshirt = productsByType[ProductType.TSHIRT][0];
      const jeans = productsByType[ProductType.JEANS][0];
      const shoes = productsByType[ProductType.SHOES][0];
      
      const items = [tshirt, jeans, shoes];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const tshirtColor = this.getColorString(tshirt.colors);
        const jeansColor = this.getColorString(jeans.colors);
        
        outfits.push({
          id: '',
          lookName: 'Everyday Casual',
          items,
          totalPrice: 0,
          confidenceScore: 0.85,
          styleNote: `A comfortable everyday look with a ${tshirtColor} t-shirt, ${jeansColor} jeans, and casual shoes.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['casual', 'comfortable', 'everyday'],
          aiAnalysis: {
            bodyFitReason: 'Relaxed fit for maximum comfort and movement',
            colorHarmony: 'Casual color combination that works well together',
            styleCoherence: 'Laid-back and approachable style',
            occasionMatch: 'Perfect for casual daily activities'
          }
        });
      }
    }
    
    // Casual outfit 2: Shirt + Pants + Shoes (if no t-shirt/jeans available)
    if (outfits.length === 0 && 
        productsByType[ProductType.SHIRT].length > 0 && 
        productsByType[ProductType.PANTS].length > 0 && 
        productsByType[ProductType.SHOES].length > 0) {
      
      const shirt = productsByType[ProductType.SHIRT][0];
      const pants = productsByType[ProductType.PANTS][0];
      const shoes = productsByType[ProductType.SHOES][0];
      
      const items = [shirt, pants, shoes];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const shirtColor = this.getColorString(shirt.colors);
        const pantsColor = this.getColorString(pants.colors);
        
        outfits.push({
          id: '',
          lookName: 'Smart Casual',
          items,
          totalPrice: 0,
          confidenceScore: 0.82,
          styleNote: `A smart casual ensemble with a ${shirtColor} shirt, ${pantsColor} pants, and coordinating shoes.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['smart casual', 'versatile', 'polished'],
          aiAnalysis: {
            bodyFitReason: 'Well-fitted pieces that enhance your silhouette',
            colorHarmony: 'Coordinated colors for a polished appearance',
            styleCoherence: 'Balanced between casual and formal elements',
            occasionMatch: 'Suitable for various casual and semi-formal occasions'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create night out outfit recommendations
   */
  private createNightOutOutfits(
    productsByType: Record<ProductType, Product[]>, 
    preferences: UserPreferences,
    count: number
  ): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Night out outfit: Shirt + Jeans + Shoes
    if (productsByType[ProductType.SHIRT].length > 0 && 
        productsByType[ProductType.JEANS].length > 0 && 
        productsByType[ProductType.SHOES].length > 0) {
      
      const shirt = productsByType[ProductType.SHIRT][0];
      const jeans = productsByType[ProductType.JEANS][0];
      const shoes = productsByType[ProductType.SHOES][0];
      
      const items = [shirt, jeans, shoes];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const shirtColor = this.getColorString(shirt.colors);
        const jeansColor = this.getColorString(jeans.colors);
        
        outfits.push({
          id: '',
          lookName: 'Night Out Style',
          items,
          totalPrice: 0,
          confidenceScore: 0.87,
          styleNote: `A stylish night out look featuring a ${shirtColor} shirt with ${jeansColor} jeans and statement shoes.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['night out', 'stylish', 'trendy'],
          aiAnalysis: {
            bodyFitReason: 'Fitted pieces that create a flattering silhouette',
            colorHarmony: 'Bold colors that make a statement',
            styleCoherence: 'Trendy and confident appearance',
            occasionMatch: 'Perfect for evening social events'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Create ethnic outfit recommendations
   */
  private createEthnicOutfits(
    productsByType: Record<ProductType, Product[]>, 
    preferences: UserPreferences,
    count: number
  ): OutfitRecommendation[] {
    const outfits: OutfitRecommendation[] = [];
    
    // Ethnic outfit: Kurta + Pants
    if (productsByType[ProductType.KURTA].length > 0 && 
        productsByType[ProductType.PANTS].length > 0) {
      
      const kurta = productsByType[ProductType.KURTA][0];
      const pants = productsByType[ProductType.PANTS][0];
      
      const items = [kurta, pants];
      
      if (this.calculateTotalPrice(items) <= preferences.budget) {
        const kurtaColor = this.getColorString(kurta.colors);
        const pantsColor = this.getColorString(pants.colors);
        
        outfits.push({
          id: '',
          lookName: 'Traditional Ethnic',
          items,
          totalPrice: 0,
          confidenceScore: 0.90,
          styleNote: `A traditional ethnic ensemble with a ${kurtaColor} kurta and ${pantsColor} pants.`,
          occasion: preferences.occasion,
          weather: preferences.weather || 'Mild',
          season: preferences.season,
          ageGroup: preferences.ageGroup,
          gender: preferences.gender,
          bodyType: preferences.bodyType,
          budget: preferences.budget,
          tags: ['ethnic', 'traditional', 'cultural'],
          aiAnalysis: {
            bodyFitReason: 'Traditional fit that is comfortable and culturally appropriate',
            colorHarmony: 'Traditional color combinations',
            styleCoherence: 'Authentic ethnic appearance',
            occasionMatch: 'Perfect for cultural and ethnic occasions'
          }
        });
      }
    }
    
    return outfits;
  }
  
  /**
   * Calculate total price of items
   * @param items Array of products
   * @returns Total price
   */
  private calculateTotalPrice(items: Product[]): number {
    return items.reduce((total, item) => total + item.price, 0);
  }
}

export const outfitRecommendationService = new OutfitRecommendationService();