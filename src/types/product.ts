/**
 * Product types and enums for the fashion recommendation app
 */

export enum ProductCategory {
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  ACTIVEWEAR = 'Activewear',
  ETHNIC = 'Ethnic'
}

export enum ProductType {
  SHIRT = 'Shirt',
  TSHIRT = 'T-Shirt',
  POLO = 'Polo',
  SWEATER = 'Sweater',
  HOODIE = 'Hoodie',
  BLAZER = 'Blazer',
  SUIT = 'Suit',
  JACKET = 'Jacket',
  COAT = 'Coat',
  PANTS = 'Pants',
  JEANS = 'Jeans',
  SHORTS = 'Shorts',
  CARGO = 'Cargo',
  JOGGERS = 'Joggers',
  SHOES = 'Shoes',
  ACCESSORY = 'Accessory',
  KURTA = 'Kurta',
  KURTA_SET = 'Kurta Set',
  NEHRU_JACKET = 'Nehru Jacket',
  SHERWANI = 'Sherwani'
}

export enum Brand {
  ZARA = 'Zara',
  H_AND_M = 'H&M',
  UNIQLO = 'Uniqlo',
  GAP = 'Gap',
  LEVIS = 'Levi\'s',
  ADIDAS = 'Adidas',
  NIKE = 'Nike',
  CALVIN_KLEIN = 'Calvin Klein',
  HUGO_BOSS = 'Hugo Boss',
  BROOKS_BROTHERS = 'Brooks Brothers',
  LACOSTE = 'Lacoste',
  MANGO = 'Mango',
  DOCKERS = 'Dockers',
  COLE_HAAN = 'Cole Haan',
  CLARKS = 'Clarks',
  FABINDIA = 'FabIndia',
  MANYAVAR = 'Manyavar'
}

export enum Color {
  BLACK = 'Black',
  WHITE = 'White',
  GRAY = 'Gray',
  CHARCOAL = 'Charcoal',
  NAVY = 'Navy',
  BLUE = 'Blue',
  LIGHT_BLUE = 'Light Blue',
  BROWN = 'Brown',
  TAN = 'Tan',
  BEIGE = 'Beige',
  CREAM = 'Cream',
  CAMEL = 'Camel',
  OLIVE = 'Olive',
  GREEN = 'Green',
  RED = 'Red',
  BURGUNDY = 'Burgundy',
  ORANGE = 'Orange',
  YELLOW = 'Yellow',
  PURPLE = 'Purple',
  PINK = 'Pink'
}

export enum Material {
  COTTON = 'Cotton',
  WOOL = 'Wool',
  POLYESTER = 'Polyester',
  LINEN = 'Linen',
  DENIM = 'Denim',
  LEATHER = 'Leather',
  SUEDE = 'Suede',
  SILK = 'Silk',
  CASHMERE = 'Cashmere',
  VISCOSE = 'Viscose',
  ACRYLIC = 'Acrylic'
}

export enum Season {
  SPRING = 'Spring',
  SUMMER = 'Summer',
  FALL = 'Fall',
  WINTER = 'Winter',
  ALL = 'All Seasons'
}

export enum Occasion {
  CASUAL = 'Casual',
  BUSINESS = 'Business',
  BUSINESS_CASUAL = 'Business Casual',
  FORMAL = 'Formal',
  SEMI_FORMAL = 'Semi-Formal',
  WEEKEND = 'Weekend',
  NIGHT_OUT = 'Night Out',
  BEACH = 'Beach',
  SPORT = 'Sport',
  OUTDOOR = 'Outdoor',
  WEDDING = 'Wedding',
  ETHNIC = 'Ethnic',
  FESTIVAL = 'Festival',
  VACATION = 'Vacation'
}

export enum BodyType {
  SLIM = 'Slim',
  ATHLETIC = 'Athletic',
  AVERAGE = 'Average',
  LARGE = 'Large',
  ALL = 'All Body Types'
}

export enum SkinTone {
  FAIR = 'Fair',
  MEDIUM = 'Medium',
  OLIVE = 'Olive',
  DEEP = 'Deep',
  ALL = 'All Skin Tones'
}

export enum FitType {
  SLIM = 'Slim',
  REGULAR = 'Regular',
  RELAXED = 'Relaxed',
  ATHLETIC = 'Athletic'
}

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  price: number;
  originalPrice: number;
  category: ProductCategory;
  type: ProductType;
  colors: Color[];
  materials: Material[];
  seasons: Season[];
  occasions: Occasion[];
  suitableBodyTypes: BodyType[];
  suitableSkinTones: SkinTone[];
  fit: FitType;
  description: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew: boolean;
  isTrending: boolean;
  purchaseUrl: string;
  tags: string[];
}