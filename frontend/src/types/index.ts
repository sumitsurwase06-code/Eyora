export type EyewearCategory = 'all' | 'eyeglasses' | 'sunglasses' | 'atelier';
export type EyewearShape = 'all' | 'geometric' | 'round' | 'square' | 'cat-eye' | 'aviator';
export type EyewearMaterial = 'all' | 'titanium' | 'acetate' | 'mixed' | 'horn';

export interface FrameDimensions {
  lensWidth: number; // in mm e.g. 48
  bridgeWidth: number; // in mm e.g. 21
  templeLength: number; // in mm e.g. 145
}

export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
  image: string;
}

export interface LensOption {
  id: string;
  name: string;
  description: string;
  additionalPrice: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'eyeglasses' | 'sunglasses' | 'atelier';
  shape: 'geometric' | 'round' | 'square' | 'cat-eye' | 'aviator';
  materialType: 'titanium' | 'acetate' | 'mixed' | 'horn';
  materialDescription: string;
  price: number; // In INR
  originalPrice?: number;
  badge?: string; // e.g. 'NEW IN', 'BESTSELLER', 'ATELIER EDITION', 'SIGNATURE'
  isBestseller?: boolean;
  isNew?: boolean;
  isSignature?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  story: string;
  craftsmanshipHighlights: string[];
  dimensions: FrameDimensions;
  weight: string; // e.g. '18g (Ultralight)'
  fit: string; // e.g. 'Medium / Universal Fit'
  colors: ColorVariant[];
  defaultImage: string;
  galleryImages: string[];
}

export interface CartItem {
  id: string; // cart item unique key (productId + colorId + lensOptionId)
  product: Product;
  selectedColor: ColorVariant;
  selectedLens?: LensOption;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface FilterOptions {
  category: EyewearCategory;
  shape: EyewearShape;
  material: EyewearMaterial;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
  searchQuery?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
}
