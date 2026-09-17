export type ProductCategory = 'essential' | 'skincare' | 'culinary' | 'aromatherapy';

export interface ScentNotes {
  top: string;
  heart: string;
  base: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface VolumeOption {
  size: string; // e.g. "15ml", "30ml", "100ml", "500ml"
  price: number;
}

export interface Product {
  id: string;
  name: string;
  latinName?: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  benefits: string[];
  extractionMethod: string; // e.g. "Cold-Pressed Steam Distilled", "Single-Estate First Cold Press"
  origin: string;
  volumes: VolumeOption[];
  rating: number;
  reviewCount: number;
  image: string;
  isOrganic: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  scentNotes?: ScentNotes;
  pairings?: string[];
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedVolume: VolumeOption;
  quantity: number;
}

export interface QuizAnswers {
  primaryGoal?: 'sleep' | 'glow' | 'focus' | 'gourmet';
  aromaPreference?: 'floral' | 'earthy' | 'citrus' | 'rich';
  experienceLevel?: 'beginner' | 'connoisseur';
}

export type AuthMode = 'login' | 'signup' | 'forgot';

export interface UserOrder {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Delivered' | 'Shipped';
  itemsCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: 'Aura VIP Gold' | 'Botanical Enthusiast' | 'Master Distiller';
  memberSince: string;
  loyaltyPoints: number;
  defaultAddress?: string;
  orders: UserOrder[];
}

