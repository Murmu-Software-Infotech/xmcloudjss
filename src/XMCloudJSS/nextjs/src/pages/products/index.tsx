/**
 * Product Catalog Page
 * Displays all products with filtering and pagination
 * Demonstrates Helix architecture with reusable SXA components
 */

import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProductCatalog from 'src/components/ProductCatalog';
import { Product, getProducts } from 'lib/services/productService';
import { usePersonalization } from 'src/context/PersonalizationContext';

interface ProductsPageProps {
  initialProducts: Product[];
  initialFilters?: Record<string, any>;
}

const ProductsPage = ({ initialProducts, initialFilters }: ProductsPageProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const { data: personalizationData, updateUserCategory } = usePersonalization();

  // Update products when filters change
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const loaded = await getProducts(initialFilters);
        setProducts(loaded);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (initialFilters) {
      loadProducts();
    }
  }, [initialFilters]);

  // Track category preference for personalization
  useEffect(() => {
    if (products.length > 0 && personalizationData.category === undefined) {
      const primaryCategory = products[0].category;
      updateUserCategory(primaryCategory);
    }
  }, [products, personalizationData, updateUserCategory]);

  return (
    <>
      <Head>
        <title>Product Catalog - XM Cloud JSS</title>
        <meta name="description" content="Browse our complete product catalog with filtering and sorting options." />
      </Head>

      <div className="products-page">
        {/* Page Header */}
        <div className="page-header bg-light py-5 mb-5">
          <div className="container">
            <h1 className="display-4 fw-bold mb-2">Our Products</h1>
            <p className="lead text-muted">
              Discover our complete selection of premium products
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="container py-5 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Product Catalog Component */}
        {!loading && (
          <ProductCatalog
            fields={{
              heading: {
                value: 'Featured Products'
              },
              description: {
                value: 'Explore our curated selection of quality products'
              },
              itemsPerPage: {
                value: '6'
              },
              showFilters: {
                value: 'true'
              },
              showRatings: {
                value: 'true'
              }
            }}
            products={products}
          />
        )}

        {/* User Context Info (for demo purposes) */}
        <div className="container my-5">
          <div className="card bg-light">
            <div className="card-body">
              <h6 className="card-title fw-bold">📊 Your Personalization Profile</h6>
              <div className="row">
                <div className="col-md-4">
                  <small className="text-muted">User ID</small>
                  <p className="mb-0 font-monospace small">{personalizationData.userId}</p>
                </div>
                <div className="col-md-4">
                  <small className="text-muted">Category Interest</small>
                  <p className="mb-0">{personalizationData.category || 'Not set'}</p>
                </div>
                <div className="col-md-4">
                  <small className="text-muted">Visit Count</small>
                  <p className="mb-0">{personalizationData.visitCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        .page-header h1,
        .page-header p {
          color: white;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (context) => {
  try {
    // Extract query parameters for filtering
    const filters: Record<string, any> = {};
    
    if (context.query.category) {
      filters.category = context.query.category;
    }
    if (context.query.minPrice) {
      filters.minPrice = parseInt(context.query.minPrice as string);
    }
    if (context.query.maxPrice) {
      filters.maxPrice = parseInt(context.query.maxPrice as string);
    }
    if (context.query.inStock) {
      filters.inStock = context.query.inStock === 'true';
    }

    // Fetch products
    const products = await getProducts(filters);

    return {
      props: {
        initialProducts: products,
        initialFilters: filters
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialProducts: [],
        initialFilters: {}
      }
    };
  }
};

export default ProductsPage;

