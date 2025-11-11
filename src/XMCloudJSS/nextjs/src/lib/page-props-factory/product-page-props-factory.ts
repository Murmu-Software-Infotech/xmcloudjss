/**
 * Product Page Props Factory
 * Handles data loading for product catalog and detail pages
 * Integrates external product data with Sitecore layout data
 */

import { GetServerSidePropsContext } from 'next';
import { getProducts, getProductById, Product, ProductFilter } from 'lib/services/productService';

export interface ProductPageProps {
  products?: Product[];
  selectedProduct?: Product;
  filters?: ProductFilter;
  userContext?: {
    category?: string;
    previousPurchases?: string[];
  };
}

/**
 * Determine the page type from URL or route
 */
function getPageType(path?: string): 'catalog' | 'detail' {
  if (!path) return 'catalog';
  
  // Check if this is a product detail page
  // Examples: /products/[id], /shop/[productId], etc.
  if (path.includes('product-detail') || path.includes('detail')) {
    return 'detail';
  }
  
  return 'catalog';
}

/**
 * Extract product ID from URL parameters
 */
function extractProductId(context: GetServerSidePropsContext): string | null {
  const { query } = context;
  
  // Check various possible parameter names
  return (
    (query.productId as string) ||
    (query.id as string) ||
    (query.slug as string) ||
    null
  );
}

/**
 * Create props for product catalog page
 */
export async function createCatalogProps(
  context: GetServerSidePropsContext
): Promise<ProductPageProps> {
  try {
    const { query } = context;
    
    // Get filter parameters from query string
    const filters: ProductFilter = {
      category: query.category as string,
      minPrice: query.minPrice ? parseInt(query.minPrice as string) : undefined,
      maxPrice: query.maxPrice ? parseInt(query.maxPrice as string) : undefined,
      inStock: query.inStock === 'true' ? true : undefined
    };

    // Fetch products with filters
    const products = await getProducts(filters);

    // Get user context from cookies/session (mock implementation)
    const userContext = {
      category: (query.userCategory as string) || undefined,
      previousPurchases: []
    };

    return {
      products,
      filters,
      userContext
    };
  } catch (error) {
    console.error('Error creating catalog props:', error);
    return {
      products: [],
      filters: {}
    };
  }
}

/**
 * Create props for product detail page
 */
export async function createDetailProps(
  context: GetServerSidePropsContext
): Promise<ProductPageProps> {
  try {
    const productId = extractProductId(context);

    if (!productId) {
      return {
        selectedProduct: undefined
      };
    }

    // Fetch the specific product
    const product = await getProductById(productId);

    // Get related/recommended products (same category)
    const recommendedProducts = product
      ? await getProducts({ category: product.category })
      : [];

    // Get user context
    const userContext = {
      category: (context.query.userCategory as string) || undefined,
      previousPurchases: []
    };

    return {
      selectedProduct: product || undefined,
      products: recommendedProducts.filter(p => p.id !== productId),
      userContext
    };
  } catch (error) {
    console.error('Error creating detail props:', error);
    return {
      selectedProduct: undefined
    };
  }
}

/**
 * Main factory function - routes to appropriate page type handler
 */
export async function createProductPageProps(
  context: GetServerSidePropsContext
): Promise<ProductPageProps> {
  const pageType = getPageType(context.resolvedUrl);

  if (pageType === 'detail') {
    return createDetailProps(context);
  }

  return createCatalogProps(context);
}

