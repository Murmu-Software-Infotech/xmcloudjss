/**
 * Product Detail Page
 * Displays detailed information about a single product
 * Includes personalized recommendations and add-to-cart functionality
 */

import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ProductDetail from 'src/components/ProductDetail';
import { Product, getProductById } from 'lib/services/productService';
import { usePersonalization } from 'src/context/PersonalizationContext';

interface ProductDetailPageProps {
  product: Product | null;
  notFound?: boolean;
}

const ProductDetailPage = ({ product, notFound }: ProductDetailPageProps) => {
  const { data: personalizationData, addPurchase } = usePersonalization();

  // Track product view for personalization
  useEffect(() => {
    if (product) {
      // Could track view as separate metric, or mark as potential purchase
      // For demo, we'll just track it in logs
      console.log(`Viewed product: ${product.id} in category: ${product.category}`);
    }
  }, [product]);

  if (notFound || !product) {
    return (
      <>
        <Head>
          <title>Product Not Found - XM Cloud JSS</title>
        </Head>

        <div className="container py-5">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">Product Not Found</h4>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <hr />
            <Link href="/products" className="btn btn-primary">
              ← Back to Products
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} - XM Cloud JSS</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
      </Head>

      <div className="product-detail-page">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="bg-light py-3">
          <div className="container">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/products">Products</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/products?category=${product.category}`}>
                  {product.category}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </div>
        </nav>

        {/* Product Detail Component */}
        <ProductDetail
          fields={{
            title: {
              value: product.name
            },
            showRecommendations: {
              value: 'true'
            }
          }}
          product={product}
          userContext={{
            category: personalizationData.category,
            previousPurchases: personalizationData.previousPurchases
          }}
        />

        {/* Related Actions */}
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <button
                  className="btn btn-outline-primary btn-lg w-100"
                  onClick={() => addPurchase(product.id)}
                >
                  ✓ Mark as Purchased (for personalization demo)
                </button>
              </div>
              <div className="col-md-6">
                <Link href="/products" className="btn btn-primary btn-lg w-100">
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Product Schema (SEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.image,
            brand: {
              '@type': 'Brand',
              name: 'XM Cloud JSS'
            },
            offers: {
              '@type': 'Offer',
              url: typeof window !== 'undefined' ? window.location.href : '',
              priceCurrency: 'USD',
              price: product.price.toString(),
              availability: product.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating.toString(),
              bestRating: '5',
              worstRating: '1'
            },
            sku: product.sku
          })}
        </script>
      </div>

      <style jsx>{`
        .breadcrumb-item a {
          color: #ff4500;
          text-decoration: none;
        }
        .breadcrumb-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductDetailPageProps> = async (context) => {
  try {
    const { id } = context.params || {};

    if (!id || typeof id !== 'string') {
      return {
        notFound: true
      };
    }

    // Fetch the product
    const product = await getProductById(id);

    if (!product) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        product,
        notFound: false
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true
    };
  }
};

export default ProductDetailPage;

