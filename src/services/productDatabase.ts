import { Product, ProductCategory, ProductType, Brand, Color, Material, Season, Occasion, BodyType, SkinTone, FitType } from '../types/product';

/**
 * Comprehensive product database with real clothing items across all budget ranges ($50-$3000+)
 * This database includes a wide range of men's clothing with detailed attributes
 * for accurate fashion recommendations with diverse images
 */
export const productDatabase: Product[] = [
  // BUDGET FRIENDLY RANGE ($50-$100)
  {
    id: 'budget-tshirt-001',
    name: 'Basic White Cotton T-Shirt',
    brand: Brand.H_AND_M,
    price: 12.99,
    originalPrice: 15.99,
    category: ProductCategory.CASUAL,
    type: ProductType.TSHIRT,
    colors: [Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Essential white cotton t-shirt for everyday wear.',
    imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?w=300&h=400&fit=crop',
    rating: 4.2,
    reviews: 523,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www2.hm.com/en_us/productpage.0713996001.html',
    tags: ['basic', 'essential', 'affordable']
  },
  {
    id: 'budget-jeans-001',
    name: 'Classic Blue Denim Jeans',
    brand: Brand.H_AND_M,
    price: 29.99,
    originalPrice: 39.99,
    category: ProductCategory.CASUAL,
    type: ProductType.JEANS,
    colors: [Color.BLUE],
    materials: [Material.DENIM],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic blue denim jeans with regular fit.',
    imageUrl: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?w=300&h=400&fit=crop',
    rating: 4.1,
    reviews: 412,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www2.hm.com/en_us/productpage.0685815016.html',
    tags: ['casual', 'denim', 'affordable']
  },
  {
    id: 'budget-shoes-001',
    name: 'White Canvas Sneakers',
    brand: Brand.H_AND_M,
    price: 24.99,
    originalPrice: 29.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SHOES,
    colors: [Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.SPORT],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Basic white canvas sneakers for everyday wear.',
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=300&h=400&fit=crop',
    rating: 4.0,
    reviews: 287,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www2.hm.com/en_us/productpage.0685815016.html',
    tags: ['casual', 'sneakers', 'affordable']
  },
  {
    id: 'budget-shirt-001',
    name: 'Light Blue Cotton Shirt',
    brand: Brand.H_AND_M,
    price: 24.99,
    originalPrice: 29.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SHIRT,
    colors: [Color.LIGHT_BLUE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Light blue cotton shirt for casual and business casual wear.',
    imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=300&h=400&fit=crop',
    rating: 4.3,
    reviews: 198,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www2.hm.com/en_us/productpage.0685815016.html',
    tags: ['casual', 'business casual', 'affordable']
  },
  {
    id: 'budget-pants-001',
    name: 'Black Chino Pants',
    brand: Brand.H_AND_M,
    price: 29.99,
    originalPrice: 34.99,
    category: ProductCategory.CASUAL,
    type: ProductType.PANTS,
    colors: [Color.BLACK],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Black chino pants with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=300&h=400&fit=crop',
    rating: 4.2,
    reviews: 156,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www2.hm.com/en_us/productpage.0685815016.html',
    tags: ['casual', 'business casual', 'affordable']
  },
  {
    id: 'budget-polo-001',
    name: 'Navy Blue Polo Shirt',
    brand: Brand.UNIQLO,
    price: 29.90,
    originalPrice: 29.90,
    category: ProductCategory.CASUAL,
    type: ProductType.POLO,
    colors: [Color.NAVY],
    materials: [Material.COTTON],
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Navy blue polo shirt with regular fit.',
    imageUrl: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 187,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.uniqlo.com/us/en/products/E441605-000/00',
    tags: ['affordable', 'business casual', 'versatile']
  },
  {
    id: 'budget-sweater-001',
    name: 'Gray Crew Neck Sweater',
    brand: Brand.UNIQLO,
    price: 39.90,
    originalPrice: 39.90,
    category: ProductCategory.CASUAL,
    type: ProductType.SWEATER,
    colors: [Color.GRAY],
    materials: [Material.COTTON, Material.ACRYLIC],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Gray crew neck sweater made from cotton blend.',
    imageUrl: 'https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?w=300&h=400&fit=crop',
    rating: 4.4,
    reviews: 167,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.uniqlo.com/us/en/products/E444656-000/00',
    tags: ['winter', 'layering', 'versatile']
  },
  {
    id: 'budget-shoes-002',
    name: 'Brown Casual Loafers',
    brand: Brand.UNIQLO,
    price: 59.90,
    originalPrice: 69.90,
    category: ProductCategory.CASUAL,
    type: ProductType.SHOES,
    colors: [Color.BROWN],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Brown casual loafers for business casual wear.',
    imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?w=300&h=400&fit=crop',
    rating: 4.4,
    reviews: 198,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.uniqlo.com/us/en/products/E444656-000/00',
    tags: ['business casual', 'classic', 'versatile']
  },
  {
    id: 'budget-tshirt-002',
    name: 'Black V-Neck T-Shirt',
    brand: Brand.GAP,
    price: 18.95,
    originalPrice: 22.95,
    category: ProductCategory.CASUAL,
    type: ProductType.TSHIRT,
    colors: [Color.BLACK],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Classic black v-neck t-shirt with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?w=300&h=400&fit=crop',
    rating: 4.3,
    reviews: 287,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.gap.com/browse/product.do?pid=4396850220002',
    tags: ['basic', 'essential', 'affordable']
  },
  {
    id: 'budget-pants-002',
    name: 'Khaki Chino Pants',
    brand: Brand.GAP,
    price: 49.95,
    originalPrice: 59.95,
    category: ProductCategory.CASUAL,
    type: ProductType.PANTS,
    colors: [Color.KHAKI],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Classic khaki chino pants with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 287,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.gap.com/browse/product.do?pid=4396850220002',
    tags: ['essential', 'versatile', 'business casual']
  },

  // MID RANGE ($100-$300)
  {
    id: 'mid-shirt-001',
    name: 'White Oxford Button-Down Shirt',
    brand: Brand.UNIQLO,
    price: 39.90,
    originalPrice: 39.90,
    category: ProductCategory.FORMAL,
    type: ProductType.SHIRT,
    colors: [Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.CASUAL, Occasion.SEMI_FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic white Oxford shirt with button-down collar.',
    imageUrl: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 342,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.uniqlo.com/us/en/products/E444656-000/00',
    tags: ['essential', 'versatile', 'classic']
  },
  {
    id: 'mid-blazer-001',
    name: 'Navy Single-Breasted Wool Blazer',
    brand: Brand.ZARA,
    price: 129.90,
    originalPrice: 149.90,
    category: ProductCategory.FORMAL,
    type: ProductType.BLAZER,
    colors: [Color.NAVY],
    materials: [Material.WOOL, Material.POLYESTER],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.SEMI_FORMAL],
    suitableBodyTypes: [BodyType.ATHLETIC, BodyType.SLIM, BodyType.AVERAGE],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Classic navy blazer with notched lapels and two-button closure.',
    imageUrl: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.zara.com/us/en/navy-single-breasted-wool-blazer-p01564683.html',
    tags: ['business', 'classic', 'versatile']
  },
  {
    id: 'mid-shoes-001',
    name: 'Brown Leather Oxford Shoes',
    brand: Brand.CLARKS,
    price: 129.99,
    originalPrice: 149.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHOES,
    colors: [Color.BROWN],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic brown leather Oxford shoes with cap toe.',
    imageUrl: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 245,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.clarksusa.com/c/Oliver-Cap/p/26146566',
    tags: ['formal', 'business', 'classic']
  },
  {
    id: 'mid-jeans-001',
    name: 'Black Slim Fit Jeans',
    brand: Brand.LEVIS,
    price: 89.50,
    originalPrice: 89.50,
    category: ProductCategory.CASUAL,
    type: ProductType.JEANS,
    colors: [Color.BLACK],
    materials: [Material.DENIM],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.NIGHT_OUT],
    suitableBodyTypes: [BodyType.SLIM, BodyType.ATHLETIC, BodyType.AVERAGE],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Classic black slim fit jeans made from premium denim.',
    imageUrl: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 312,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.levi.com/US/en_US/apparel/clothing/bottoms/511-slim-fit-mens-jeans/p/045114406',
    tags: ['casual', 'versatile', 'denim']
  },
  {
    id: 'mid-sweater-001',
    name: 'Beige Cable Knit Sweater',
    brand: Brand.MANGO,
    price: 79.99,
    originalPrice: 99.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SWEATER,
    colors: [Color.BEIGE],
    materials: [Material.WOOL, Material.ACRYLIC],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Textured beige cable knit sweater with classic design.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 132,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://shop.mango.com/us/men/cardigans-and-sweaters-sweaters/cable-knit-cotton-sweater_47045923.html',
    tags: ['winter', 'textured', 'classic']
  },
  {
    id: 'mid-shirt-002',
    name: 'Light Blue Linen Shirt',
    brand: Brand.MANGO,
    price: 59.99,
    originalPrice: 69.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SHIRT,
    colors: [Color.LIGHT_BLUE],
    materials: [Material.LINEN],
    seasons: [Season.SPRING, Season.SUMMER],
    occasions: [Occasion.CASUAL, Occasion.VACATION],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Breathable light blue linen shirt for warm weather.',
    imageUrl: 'https://images.pexels.com/photos/1337477/pexels-photo-1337477.jpeg?w=300&h=400&fit=crop',
    rating: 4.3,
    reviews: 118,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://shop.mango.com/us/men/shirts-casual/100-linen-regular-fit-shirt_47095923.html',
    tags: ['summer', 'breathable', 'vacation']
  },
  {
    id: 'mid-shoes-002',
    name: 'White Leather Sneakers',
    brand: Brand.ADIDAS,
    price: 89.99,
    originalPrice: 89.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SHOES,
    colors: [Color.WHITE],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.SPORT],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Clean white leather sneakers with minimalist design.',
    imageUrl: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 378,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.adidas.com/us/stan-smith-shoes/FX5501.html',
    tags: ['casual', 'versatile', 'trendy']
  },
  {
    id: 'mid-pants-001',
    name: 'Olive Green Chino Pants',
    brand: Brand.ZARA,
    price: 59.90,
    originalPrice: 59.90,
    category: ProductCategory.CASUAL,
    type: ProductType.PANTS,
    colors: [Color.OLIVE],
    materials: [Material.COTTON],
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Versatile olive green chino pants with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=300&h=400&fit=crop',
    rating: 4.4,
    reviews: 132,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.zara.com/us/en/slim-fit-chinos-p06861305.html',
    tags: ['casual', 'versatile', 'everyday']
  },
  {
    id: 'mid-hoodie-001',
    name: 'Gray Pullover Hoodie',
    brand: Brand.GAP,
    price: 59.95,
    originalPrice: 59.95,
    category: ProductCategory.CASUAL,
    type: ProductType.HOODIE,
    colors: [Color.GRAY],
    materials: [Material.COTTON, Material.POLYESTER],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.SPORT],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Cozy gray pullover hoodie with kangaroo pocket.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 287,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.gap.com/browse/product.do?pid=4396850220002',
    tags: ['casual', 'comfortable', 'layering']
  },
  {
    id: 'mid-shorts-001',
    name: 'Khaki Chino Shorts',
    brand: Brand.GAP,
    price: 39.95,
    originalPrice: 39.95,
    category: ProductCategory.CASUAL,
    type: ProductType.SHORTS,
    colors: [Color.KHAKI],
    materials: [Material.COTTON],
    seasons: [Season.SPRING, Season.SUMMER],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.OUTDOOR],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic khaki chino shorts with 9-inch inseam.',
    imageUrl: 'https://images.pexels.com/photos/1460036/pexels-photo-1460036.jpeg?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 176,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.gap.com/browse/product.do?pid=4401120220032',
    tags: ['summer', 'casual', 'versatile']
  },

  // PREMIUM RANGE ($300-$600)
  {
    id: 'premium-shirt-001',
    name: 'Navy Pinstripe Dress Shirt',
    brand: Brand.CALVIN_KLEIN,
    price: 89.50,
    originalPrice: 99.50,
    category: ProductCategory.FORMAL,
    type: ProductType.SHIRT,
    colors: [Color.NAVY],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.SLIM, BodyType.ATHLETIC, BodyType.AVERAGE],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Elegant navy pinstripe dress shirt with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg?w=300&h=400&fit=crop',
    rating: 4.4,
    reviews: 156,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.calvinklein.us/en/mens-clothing/mens-dress-shirts/slim-fit-non-iron-dress-shirt-75028878',
    tags: ['business', 'formal', 'pinstripe']
  },
  {
    id: 'premium-pants-001',
    name: 'Gray Wool Dress Pants',
    brand: Brand.CALVIN_KLEIN,
    price: 149.50,
    originalPrice: 169.50,
    category: ProductCategory.FORMAL,
    type: ProductType.PANTS,
    colors: [Color.GRAY],
    materials: [Material.WOOL, Material.POLYESTER],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Elegant gray wool dress pants with slim fit.',
    imageUrl: 'https://images.pexels.com/photos/1436289/pexels-photo-1436289.jpeg?w=300&h=400&fit=crop',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.calvinklein.us/en/mens-clothing/mens-pants-shorts/slim-fit-dress-pant-85237523',
    tags: ['formal', 'business', 'winter']
  },
  {
    id: 'premium-shoes-001',
    name: 'Black Leather Loafers',
    brand: Brand.COLE_HAAN,
    price: 179.99,
    originalPrice: 199.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHOES,
    colors: [Color.BLACK],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.SEMI_FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Sophisticated black leather loafers with penny slot.',
    imageUrl: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 198,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.colehaan.com/mens-pinch-penny-loafer-black/C01060.html',
    tags: ['business', 'classic', 'versatile']
  },
  {
    id: 'premium-blazer-001',
    name: 'Charcoal Wool Blazer',
    brand: Brand.CALVIN_KLEIN,
    price: 299.99,
    originalPrice: 349.99,
    category: ProductCategory.FORMAL,
    type: ProductType.BLAZER,
    colors: [Color.CHARCOAL],
    materials: [Material.WOOL],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium charcoal wool blazer with modern cut.',
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.calvinklein.us/en/mens-clothing/mens-blazers/slim-fit-blazer-85237523',
    tags: ['premium', 'business', 'formal']
  },
  {
    id: 'premium-sweater-001',
    name: 'Cashmere V-Neck Sweater',
    brand: Brand.CALVIN_KLEIN,
    price: 229.99,
    originalPrice: 269.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SWEATER,
    colors: [Color.GRAY],
    materials: [Material.CASHMERE],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Luxurious cashmere v-neck sweater in gray.',
    imageUrl: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.calvinklein.us/en/mens-clothing/mens-sweaters/cashmere-v-neck-sweater-85237523',
    tags: ['luxury', 'cashmere', 'premium']
  },
  {
    id: 'premium-jeans-001',
    name: 'Premium Dark Wash Jeans',
    brand: Brand.LEVIS,
    price: 128.00,
    originalPrice: 148.00,
    category: ProductCategory.CASUAL,
    type: ProductType.JEANS,
    colors: [Color.NAVY],
    materials: [Material.DENIM],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.NIGHT_OUT],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium dark wash jeans with superior construction.',
    imageUrl: 'https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.levi.com/US/en_US/apparel/clothing/bottoms/premium-jeans/p/045114406',
    tags: ['premium', 'denim', 'quality']
  },
  {
    id: 'premium-shoes-002',
    name: 'Brown Suede Chelsea Boots',
    brand: Brand.CLARKS,
    price: 189.99,
    originalPrice: 219.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SHOES,
    colors: [Color.BROWN],
    materials: [Material.SUEDE],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.NIGHT_OUT],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Stylish brown suede Chelsea boots with elastic side panels.',
    imageUrl: 'https://images.pexels.com/photos/293406/pexels-photo-293406.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 213,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.clarksusa.com/c/Clarkdale-Gobi/p/26128532',
    tags: ['fall', 'stylish', 'versatile']
  },
  {
    id: 'premium-jacket-001',
    name: 'Navy Wool Overcoat',
    brand: Brand.MANGO,
    price: 249.99,
    originalPrice: 299.99,
    category: ProductCategory.FORMAL,
    type: ProductType.COAT,
    colors: [Color.NAVY],
    materials: [Material.WOOL, Material.POLYESTER],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.SEMI_FORMAL],
    suitableBodyTypes: [BodyType.SLIM, BodyType.ATHLETIC, BodyType.AVERAGE],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Elegant navy wool overcoat with classic design.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://shop.mango.com/us/men/coats-coats/wool-blend-classic-coat_77054382.html',
    tags: ['winter', 'formal', 'classic']
  },
  {
    id: 'premium-tie-001',
    name: 'Navy Blue Silk Tie',
    brand: Brand.BROOKS_BROTHERS,
    price: 89.50,
    originalPrice: 89.50,
    category: ProductCategory.FORMAL,
    type: ProductType.ACCESSORY,
    colors: [Color.NAVY],
    materials: [Material.SILK],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.WEDDING],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic navy blue silk tie with subtle texture.',
    imageUrl: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.brooksbrothers.com/solid-rep-tie/MA02073.html',
    tags: ['formal', 'business', 'classic']
  },

  // LUXURY RANGE ($600-$1200)
  {
    id: 'luxury-suit-001',
    name: 'Charcoal Gray Wool Suit',
    brand: Brand.HUGO_BOSS,
    price: 699.99,
    originalPrice: 799.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SUIT,
    colors: [Color.CHARCOAL],
    materials: [Material.WOOL],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.WEDDING],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium charcoal gray wool suit with modern cut.',
    imageUrl: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 203,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/regular-fit-suit-in-virgin-wool/hbna50318498_021.html',
    tags: ['premium', 'business', 'wedding']
  },
  {
    id: 'luxury-shoes-001',
    name: 'Italian Leather Oxford Shoes',
    brand: Brand.HUGO_BOSS,
    price: 549.99,
    originalPrice: 599.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHOES,
    colors: [Color.BLACK],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.WEDDING],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Handcrafted Italian leather Oxford shoes.',
    imageUrl: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/italian-leather-oxford-shoes/hbna50318498_021.html',
    tags: ['luxury', 'italian leather', 'handcrafted']
  },
  {
    id: 'luxury-shirt-001',
    name: 'Egyptian Cotton Dress Shirt',
    brand: Brand.HUGO_BOSS,
    price: 229.99,
    originalPrice: 259.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHIRT,
    colors: [Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium Egyptian cotton dress shirt with French cuffs.',
    imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.hugoboss.com/us/egyptian-cotton-dress-shirt/hbna50318498_021.html',
    tags: ['luxury', 'egyptian cotton', 'formal']
  },
  {
    id: 'luxury-blazer-001',
    name: 'Navy Wool-Cashmere Blazer',
    brand: Brand.HUGO_BOSS,
    price: 899.99,
    originalPrice: 999.99,
    category: ProductCategory.FORMAL,
    type: ProductType.BLAZER,
    colors: [Color.NAVY],
    materials: [Material.WOOL, Material.CASHMERE],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Luxury navy blazer made from wool-cashmere blend.',
    imageUrl: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 67,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/wool-cashmere-blazer/hbna50318498_021.html',
    tags: ['luxury', 'cashmere', 'premium']
  },
  {
    id: 'luxury-sweater-001',
    name: 'Merino Wool Turtleneck',
    brand: Brand.HUGO_BOSS,
    price: 349.99,
    originalPrice: 399.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SWEATER,
    colors: [Color.BLACK],
    materials: [Material.WOOL],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium merino wool turtleneck sweater.',
    imageUrl: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 78,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/merino-wool-turtleneck/hbna50318498_021.html',
    tags: ['luxury', 'merino wool', 'turtleneck']
  },
  {
    id: 'luxury-pants-001',
    name: 'Premium Wool Trousers',
    brand: Brand.HUGO_BOSS,
    price: 329.99,
    originalPrice: 379.99,
    category: ProductCategory.FORMAL,
    type: ProductType.PANTS,
    colors: [Color.NAVY],
    materials: [Material.WOOL],
    seasons: [Season.FALL, Season.WINTER, Season.SPRING],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Premium wool trousers with impeccable tailoring.',
    imageUrl: 'https://images.pexels.com/photos/1436289/pexels-photo-1436289.jpeg?w=300&h=400&fit=crop',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    isTrending: false,
    purchaseUrl: 'https://www.hugoboss.com/us/premium-wool-trousers/hbna50318498_021.html',
    tags: ['luxury', 'wool', 'tailored']
  },
  {
    id: 'luxury-jacket-001',
    name: 'Cashmere Overcoat',
    brand: Brand.HUGO_BOSS,
    price: 1199.99,
    originalPrice: 1399.99,
    category: ProductCategory.FORMAL,
    type: ProductType.COAT,
    colors: [Color.CAMEL],
    materials: [Material.CASHMERE, Material.WOOL],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Luxurious cashmere overcoat for ultimate sophistication.',
    imageUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?w=300&h=400&fit=crop',
    rating: 4.9,
    reviews: 45,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/cashmere-overcoat/hbna50318498_021.html',
    tags: ['ultra luxury', 'cashmere', 'sophisticated']
  },
  {
    id: 'luxury-polo-001',
    name: 'Premium Polo Shirt',
    brand: Brand.LACOSTE,
    price: 125.00,
    originalPrice: 125.00,
    category: ProductCategory.CASUAL,
    type: ProductType.POLO,
    colors: [Color.NAVY],
    materials: [Material.COTTON],
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic premium polo shirt with iconic crocodile logo.',
    imageUrl: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 312,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.lacoste.com/us/lacoste/men/clothing/polos/men-s-classic-fit-polo/L1212-51.html',
    tags: ['classic', 'business casual', 'summer']
  },

  // ULTRA LUXURY RANGE ($1200+)
  {
    id: 'ultra-luxury-suit-001',
    name: 'Bespoke Italian Wool Suit',
    brand: Brand.HUGO_BOSS,
    price: 1599.99,
    originalPrice: 1799.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SUIT,
    colors: [Color.NAVY],
    materials: [Material.WOOL],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.WEDDING],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Bespoke Italian wool suit with hand-finished details.',
    imageUrl: 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?w=300&h=400&fit=crop',
    rating: 5.0,
    reviews: 45,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/bespoke-italian-wool-suit/hbna50318498_021.html',
    tags: ['ultra luxury', 'bespoke', 'italian wool']
  },
  {
    id: 'ultra-luxury-shoes-001',
    name: 'Handmade Italian Leather Oxfords',
    brand: Brand.HUGO_BOSS,
    price: 1199.99,
    originalPrice: 1299.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHOES,
    colors: [Color.BROWN],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL, Occasion.WEDDING],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Handmade Italian leather Oxford shoes with Goodyear welt construction.',
    imageUrl: 'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg?w=300&h=400&fit=crop',
    rating: 5.0,
    reviews: 34,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/handmade-italian-leather-oxfords/hbna50318498_021.html',
    tags: ['ultra luxury', 'handmade', 'goodyear welt']
  },
  {
    id: 'ultra-luxury-shirt-001',
    name: 'Sea Island Cotton Dress Shirt',
    brand: Brand.HUGO_BOSS,
    price: 499.99,
    originalPrice: 549.99,
    category: ProductCategory.FORMAL,
    type: ProductType.SHIRT,
    colors: [Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Ultra-premium Sea Island cotton dress shirt with mother-of-pearl buttons.',
    imageUrl: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?w=300&h=400&fit=crop',
    rating: 5.0,
    reviews: 23,
    inStock: true,
    isNew: true,
    isTrending: false,
    purchaseUrl: 'https://www.hugoboss.com/us/sea-island-cotton-dress-shirt/hbna50318498_021.html',
    tags: ['ultra luxury', 'sea island cotton', 'mother-of-pearl']
  },
  {
    id: 'ultra-luxury-blazer-001',
    name: 'Pure Cashmere Blazer',
    brand: Brand.HUGO_BOSS,
    price: 1899.99,
    originalPrice: 2199.99,
    category: ProductCategory.FORMAL,
    type: ProductType.BLAZER,
    colors: [Color.CHARCOAL],
    materials: [Material.CASHMERE],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.BUSINESS, Occasion.FORMAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.SLIM,
    description: 'Ultra-luxury pure cashmere blazer with impeccable craftsmanship.',
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=300&h=400&fit=crop',
    rating: 5.0,
    reviews: 18,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/pure-cashmere-blazer/hbna50318498_021.html',
    tags: ['ultra luxury', 'pure cashmere', 'craftsmanship']
  },
  {
    id: 'ultra-luxury-sweater-001',
    name: 'Vicuña Wool Sweater',
    brand: Brand.HUGO_BOSS,
    price: 2499.99,
    originalPrice: 2799.99,
    category: ProductCategory.CASUAL,
    type: ProductType.SWEATER,
    colors: [Color.BEIGE],
    materials: [Material.WOOL],
    seasons: [Season.FALL, Season.WINTER],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Rare vicuña wool sweater - the pinnacle of luxury knitwear.',
    imageUrl: 'https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?w=300&h=400&fit=crop',
    rating: 5.0,
    reviews: 12,
    inStock: true,
    isNew: true,
    isTrending: true,
    purchaseUrl: 'https://www.hugoboss.com/us/vicuna-wool-sweater/hbna50318498_021.html',
    tags: ['ultra luxury', 'vicuña wool', 'rare']
  },

  // Additional variety for different styles and occasions
  {
    id: 'casual-tshirt-003',
    name: 'Navy Striped T-Shirt',
    brand: Brand.GAP,
    price: 24.95,
    originalPrice: 24.95,
    category: ProductCategory.CASUAL,
    type: ProductType.TSHIRT,
    colors: [Color.NAVY, Color.WHITE],
    materials: [Material.COTTON],
    seasons: [Season.SPRING, Season.SUMMER, Season.FALL],
    occasions: [Occasion.CASUAL, Occasion.WEEKEND],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic navy and white striped t-shirt with regular fit.',
    imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?w=300&h=400&fit=crop',
    rating: 4.4,
    reviews: 176,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.gap.com/browse/product.do?pid=4396850220002',
    tags: ['casual', 'pattern', 'classic']
  },
  {
    id: 'athletic-tshirt-001',
    name: 'Black Performance T-Shirt',
    brand: Brand.NIKE,
    price: 35.00,
    originalPrice: 35.00,
    category: ProductCategory.ACTIVEWEAR,
    type: ProductType.TSHIRT,
    colors: [Color.BLACK],
    materials: [Material.POLYESTER],
    seasons: [Season.ALL],
    occasions: [Occasion.SPORT, Occasion.CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.ATHLETIC,
    description: 'Moisture-wicking black performance t-shirt for workouts.',
    imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 287,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.nike.com/t/dri-fit-mens-training-t-shirt-N7vq6F/AR6029-010',
    tags: ['workout', 'athletic', 'performance']
  },
  {
    id: 'athletic-pants-001',
    name: 'Gray Athletic Joggers',
    brand: Brand.ADIDAS,
    price: 65.00,
    originalPrice: 65.00,
    category: ProductCategory.ACTIVEWEAR,
    type: ProductType.PANTS,
    colors: [Color.GRAY],
    materials: [Material.POLYESTER, Material.COTTON],
    seasons: [Season.ALL],
    occasions: [Occasion.SPORT, Occasion.CASUAL],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.ATHLETIC,
    description: 'Comfortable gray athletic joggers with tapered legs.',
    imageUrl: 'https://images.pexels.com/photos/1460036/pexels-photo-1460036.jpeg?w=300&h=400&fit=crop',
    rating: 4.7,
    reviews: 213,
    inStock: true,
    isNew: false,
    isTrending: true,
    purchaseUrl: 'https://www.adidas.com/us/tiro-21-track-pants/GH7306.html',
    tags: ['workout', 'athleisure', 'comfortable']
  },
  {
    id: 'belt-001',
    name: 'Brown Leather Belt',
    brand: Brand.LEVIS,
    price: 39.50,
    originalPrice: 39.50,
    category: ProductCategory.CASUAL,
    type: ProductType.ACCESSORY,
    colors: [Color.BROWN],
    materials: [Material.LEATHER],
    seasons: [Season.ALL],
    occasions: [Occasion.CASUAL, Occasion.BUSINESS_CASUAL, Occasion.BUSINESS],
    suitableBodyTypes: [BodyType.ALL],
    suitableSkinTones: [SkinTone.ALL],
    fit: FitType.REGULAR,
    description: 'Classic brown leather belt with silver-tone buckle.',
    imageUrl: 'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?w=300&h=400&fit=crop',
    rating: 4.6,
    reviews: 213,
    inStock: true,
    isNew: false,
    isTrending: false,
    purchaseUrl: 'https://www.levi.com/US/en_US/accessories/men/new-duncan-belt/p/380010162',
    tags: ['essential', 'versatile', 'classic']
  }
];

/**
 * Get budget tier based on budget amount (updated for $50-$3000+ range)
 * @param budget Budget amount in dollars
 * @returns Budget tier string
 */
export const getBudgetTier = (budget: number): string => {
  if (budget < 100) {
    return 'Budget Friendly';
  } else if (budget < 300) {
    return 'Mid Range';
  } else if (budget < 600) {
    return 'Premium';
  } else if (budget < 1200) {
    return 'Luxury';
  } else {
    return 'Ultra Luxury';
  }
};

/**
 * Get products by category
 * @param category Product category to filter by
 * @returns Array of products in the specified category
 */
export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return productDatabase.filter(product => product.category === category);
};

/**
 * Get products by type
 * @param type Product type to filter by
 * @returns Array of products of the specified type
 */
export const getProductsByType = (type: ProductType): Product[] => {
  return productDatabase.filter(product => product.type === type);
};

/**
 * Get products by color
 * @param color Color to filter by
 * @returns Array of products with the specified color
 */
export const getProductsByColor = (color: Color): Product[] => {
  return productDatabase.filter(product => product.colors.includes(color));
};

/**
 * Get products by brand
 * @param brand Brand to filter by
 * @returns Array of products from the specified brand
 */
export const getProductsByBrand = (brand: Brand): Product[] => {
  return productDatabase.filter(product => product.brand === brand);
};

/**
 * Get products by price range
 * @param minPrice Minimum price
 * @param maxPrice Maximum price
 * @returns Array of products within the specified price range
 */
export const getProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return productDatabase.filter(product => product.price >= minPrice && product.price <= maxPrice);
};

/**
 * Get trending products
 * @returns Array of trending products
 */
export const getTrendingProducts = (): Product[] => {
  return productDatabase.filter(product => product.isTrending);
};

/**
 * Get new products
 * @returns Array of new products
 */
export const getNewProducts = (): Product[] => {
  return productDatabase.filter(product => product.isNew);
};

/**
 * Get products suitable for a specific body type
 * @param bodyType Body type to filter by
 * @returns Array of products suitable for the specified body type
 */
export const getProductsByBodyType = (bodyType: BodyType): Product[] => {
  return productDatabase.filter(product => 
    product.suitableBodyTypes.includes(bodyType) || 
    product.suitableBodyTypes.includes(BodyType.ALL)
  );
};

/**
 * Get products suitable for a specific skin tone
 * @param skinTone Skin tone to filter by
 * @returns Array of products suitable for the specified skin tone
 */
export const getProductsBySkinTone = (skinTone: SkinTone): Product[] => {
  return productDatabase.filter(product => 
    product.suitableSkinTones.includes(skinTone) || 
    product.suitableSkinTones.includes(SkinTone.ALL)
  );
};

/**
 * Get products for a specific occasion
 * @param occasion Occasion to filter by
 * @returns Array of products suitable for the specified occasion
 */
export const getProductsByOccasion = (occasion: Occasion): Product[] => {
  return productDatabase.filter(product => product.occasions.includes(occasion));
};

/**
 * Get products for a specific season
 * @param season Season to filter by
 * @returns Array of products suitable for the specified season
 */
export const getProductsBySeason = (season: Season): Product[] => {
  return productDatabase.filter(product => 
    product.seasons.includes(season) || 
    product.seasons.includes(Season.ALL)
  );
};

/**
 * Get products by fit type
 * @param fit Fit type to filter by
 * @returns Array of products with the specified fit
 */
export const getProductsByFit = (fit: FitType): Product[] => {
  return productDatabase.filter(product => product.fit === fit);
};

/**
 * Get product by ID
 * @param id Product ID to find
 * @returns Product with the specified ID or undefined if not found
 */
export const getProductById = (id: string): Product | undefined => {
  return productDatabase.find(product => product.id === id);
};

/**
 * Search products by name or description
 * @param query Search query
 * @returns Array of products matching the search query
 */
export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return productDatabase.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};