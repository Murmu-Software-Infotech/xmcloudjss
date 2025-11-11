/**
 * Products API Endpoint
 * Mock external API for product data
 * In production, this would integrate with a real external service
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getProducts,
  getProductById,
  getCategories,
  getRecommendations,
  Product,
  ProductFilter
} from 'lib/services/productService';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: string;
    version: string;
  };
}

/**
 * API Handler for product endpoints
 * GET /api/products - Get all products with optional filters
 * GET /api/products?id=<id> - Get a specific product
 * GET /api/products?action=categories - Get all categories
 * GET /api/products?action=recommendations - Get recommendations
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { action, id, category, minPrice, maxPrice, inStock } = req.query;

    // Get a specific product by ID
    if (id && typeof id === 'string') {
      const product = await getProductById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: `Product with ID ${id} not found`
        });
      }
      return res.status(200).json({
        success: true,
        data: product,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      });
    }

    // Get product categories
    if (action === 'categories') {
      const categories = await getCategories();
      return res.status(200).json({
        success: true,
        data: categories,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      });
    }

    // Get personalized recommendations
    if (action === 'recommendations') {
      const recommendations = await getRecommendations(
        {
          category: category as string,
          previousPurchases: []
        },
        4
      );
      return res.status(200).json({
        success: true,
        data: recommendations,
        meta: {
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      });
    }

    // Get all products with filters
    const filters: ProductFilter = {
      category: category as string,
      minPrice: minPrice ? parseInt(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      inStock: inStock === 'true' ? true : undefined
    };

    // Remove undefined values
    Object.keys(filters).forEach(
      key => filters[key as keyof ProductFilter] === undefined && 
      delete filters[key as keyof ProductFilter]
    );

    const products = await getProducts(filters);

    return res.status(200).json({
      success: true,
      data: {
        items: products,
        count: products.length,
        filters: Object.keys(filters).length > 0 ? filters : undefined
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

