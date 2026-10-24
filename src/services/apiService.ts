import { Product, FilterOptions, Article } from '../types';
import { PRODUCTS, ARTICLES } from '../data/products';

// Service abstraction designed for smooth transition to Node.js / Express / MongoDB
// When VITE_API_URL is configured, calls seamlessly route to live API endpoints.
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface NewsletterPayload {
  email: string;
  interest?: 'optical' | 'sunglasses' | 'all';
}

export interface CheckoutPayload {
  items: Array<{
    productId: string;
    colorId: string;
    lensOptionId?: string;
    quantity: number;
    price: number;
  }>;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  totalAmount: number;
  paymentMethod: 'card' | 'upi' | 'concierge-transfer';
}

export const apiService = {
  // Fetch all products with filtering & sorting
  async getProducts(filters?: Partial<FilterOptions>): Promise<Product[]> {
    if (API_BASE_URL) {
      try {
        const queryParams = new URLSearchParams();
        if (filters?.category && filters.category !== 'all') queryParams.set('category', filters.category);
        if (filters?.shape && filters.shape !== 'all') queryParams.set('shape', filters.shape);
        if (filters?.material && filters.material !== 'all') queryParams.set('material', filters.material);
        if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy);
        if (filters?.searchQuery) queryParams.set('q', filters.searchQuery);

        const response = await fetch(`${API_BASE_URL}/api/products?${queryParams.toString()}`);
        if (response.ok) {
          const json = await response.json();
          return json.data;
        }
      } catch (err) {
        console.warn('Falling back to local luxury catalog data:', err);
      }
    }

    // Local Mock Implementation with simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 80));

    let result = [...PRODUCTS];

    if (filters?.category && filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters?.shape && filters.shape !== 'all') {
      result = result.filter((p) => p.shape === filters.shape);
    }

    if (filters?.material && filters.material !== 'all') {
      result = result.filter((p) => p.materialType === filters.material);
    }

    if (filters?.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materialDescription.toLowerCase().includes(q)
      );
    }

    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isSignature ? 1 : 0) - (a.isSignature ? 1 : 0));
          break;
      }
    }

    return result;
  },

  // Fetch product by slug
  async getProductBySlug(slug: string): Promise<Product | null> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/slug/${slug}`);
        if (response.ok) {
          const json = await response.json();
          return json.data;
        }
      } catch (err) {
        console.warn('Falling back to local product lookup:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 60));
    const found = PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    return found || null;
  },

  // Fetch bestselling frames
  async getBestsellers(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return PRODUCTS.filter((p) => p.isBestseller || p.isSignature).slice(0, 4);
  },

  // Fetch articles
  async getArticles(): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return ARTICLES;
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return ARTICLES.find((a) => a.slug === slug) || null;
  },

  // Submit VIP Newsletter
  async subscribeNewsletter(payload: NewsletterPayload): Promise<ApiResponse<{ subscribed: boolean }>> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/newsletter`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Newsletter fallback active:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      data: { subscribed: true },
      message: 'Welcome to the Eyora Private Atelier. You will receive private salon invitations.',
    };
  },

  // Mock checkout order submission
  async submitOrder(payload: CheckoutPayload): Promise<ApiResponse<{ orderId: string; status: string }>> {
    if (API_BASE_URL) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Order fallback active:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      data: {
        orderId: `EYR-${randomSuffix}`,
        status: 'Confirmed — Handcrafted Allocation Reserved',
      },
      message: 'Your bespoke Eyora commission has been registered with our master lunetier.',
    };
  },
};
