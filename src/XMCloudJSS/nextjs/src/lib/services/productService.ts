/**
 * External Product Service
 * Integrates with a mock external REST API to fetch product data
 * This service handles all product-related API calls and caching
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  inStock: boolean;
  sku: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

// Mock external API base URL (can be replaced with real endpoint)
const EXTERNAL_API_BASE = process.env.NEXT_PUBLIC_EXTERNAL_API_URL || 'http://localhost:3001/api';

/**
 * Mock product database - In production, this would come from the external API
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    image: '/products/headphones.jpg',
    rating: 4.5,
    inStock: true,
    sku: 'HP-001'
  },
  {
    id: 'prod-002',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 49.99,
    category: 'Electronics',
    image: '/products/mouse.jpg',
    rating: 4.2,
    inStock: true,
    sku: 'WM-001'
  },
  {
    id: 'prod-003',
    name: 'USB-C Cable',
    description: 'Fast charging USB-C cable, 6ft length',
    price: 19.99,
    category: 'Accessories',
    image: '/products/usb-c.jpg',
    rating: 4.8,
    inStock: true,
    sku: 'UC-001'
  },
  {
    id: 'prod-004',
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for ergonomic workspace',
    price: 79.99,
    category: 'Accessories',
    image: '/products/laptop-stand.jpg',
    rating: 4.6,
    inStock: true,
    sku: 'LS-001'
  },
  {
    id: 'prod-005',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with customizable switches',
    price: 149.99,
    category: 'Electronics',
    image: '/products/keyboard.jpg',
    rating: 4.7,
    inStock: false,
    sku: 'MK-001'
  }
];

/**
 * Fetch all products with optional filtering
 */
export async function getProducts(filters?: ProductFilter): Promise<Product[]> {
  try {
    // In production, this would make a real API call:
    // const response = await fetch(`${EXTERNAL_API_BASE}/products`, {
    //   params: filters
    // });
    // return response.json();

    // Mock API simulation with delay
    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered = [...MOCK_PRODUCTS];

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters.inStock !== undefined) {
        filtered = filtered.filter(p => p.inStock === filters.inStock);
      }
    }

    return filtered;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Mock API simulation
    await new Promise(resolve => setTimeout(resolve, 200));

    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Get available product categories
 */
export async function getCategories(): Promise<string[]> {
  const categories = new Set(MOCK_PRODUCTS.map(p => p.category));
  return Array.from(categories).sort();
}

/**
 * Get personalized product recommendations based on user context
 */
export async function getRecommendations(
  userContext?: { category?: string; previousPurchases?: string[] },
  limit: number = 4
): Promise<Product[]> {
  try {
    let recommendations = [...MOCK_PRODUCTS];

    if (userContext?.category) {
      recommendations = recommendations.filter(p => p.category === userContext.category);
    }

    if (userContext?.previousPurchases && userContext.previousPurchases.length > 0) {
      // Filter out previously purchased items
      recommendations = recommendations.filter(
        p => !userContext.previousPurchases?.includes(p.id)
      );
    }

    return recommendations.slice(0, limit);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

