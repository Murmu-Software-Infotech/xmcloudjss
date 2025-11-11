import { useState, useEffect } from 'react';
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Product, getRecommendations } from 'lib/services/productService';

type ProductDetailProps = ComponentProps & {
  fields: {
    title: Field<string>;
    showRecommendations: Field<string>;
  };
  product?: Product;
  userContext?: {
    category?: string;
    previousPurchases?: string[];
  };
};

interface RecommendationCardProps {
  product: Product;
}

const RecommendationCard = ({ product }: RecommendationCardProps) => (
  <div className="col-md-6 mb-3">
    <div className="recommendation-card p-3 bg-light rounded-2 d-flex">
      <img
        src={product.image}
        alt={product.name}
        className="rounded"
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '1rem' }}
      />
      <div className="flex-grow-1">
        <h6 className="fw-semibold mb-1">{product.name}</h6>
        <p className="text-muted small mb-2">{product.description}</p>
        <p className="h6 text-primary fw-bold mb-0">${product.price.toFixed(2)}</p>
      </div>
    </div>
  </div>
);

const ProductDetail = ({
  fields,
  product,
  userContext
}: ProductDetailProps): JSX.Element => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const showRecommendations = fields.showRecommendations?.value?.toLowerCase() !== 'false';

  useEffect(() => {
    if (showRecommendations && product) {
      loadRecommendations();
    }
  }, [product, showRecommendations, userContext]);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const recs = await getRecommendations(
        {
          category: userContext?.category || product?.category,
          previousPurchases: userContext?.previousPurchases
        },
        4
      );
      // Filter out the current product from recommendations
      setRecommendations(recs.filter(p => p.id !== product?.id));
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="alert alert-warning">Product information not available</div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail-section py-5">
      <div className="container">
        <div className="row gap-4">
          {/* Product Image */}
          <div className="col-lg-5">
            <div className="product-detail-image-container bg-light rounded-4 overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-100 h-auto"
                style={{ minHeight: '400px', objectFit: 'cover' }}
              />
            </div>

            {/* Product Meta */}
            <div className="bg-light p-4 rounded-3">
              <h6 className="fw-bold mb-3">Product Details</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <span className="text-muted">SKU:</span> <strong>{product.sku}</strong>
                </li>
                <li className="mb-2">
                  <span className="text-muted">Category:</span> <strong>{product.category}</strong>
                </li>
                <li className="mb-2">
                  <span className="text-muted">Availability:</span>{' '}
                  <span className={product.inStock ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                    {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-7">
            <span className="badge bg-primary mb-3">{product.category}</span>

            <h1 className="h2 fw-bold mb-3">
              <Text field={fields.title} />
              {!product.title && product.name}
            </h1>

            {/* Rating */}
            <div className="mb-4">
              <div className="rating">
                <span className="stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="ms-2 text-muted">({product.rating} out of 5)</span>
              </div>
            </div>

            {/* Price */}
            <div className="price-section mb-5 pb-4 border-bottom">
              <p className="h3 text-primary fw-bold">${product.price.toFixed(2)}</p>
            </div>

            {/* Description */}
            <div className="description-section mb-5">
              <h5 className="fw-bold mb-3">Description</h5>
              <p className="lead text-muted">{product.description}</p>
            </div>

            {/* Add to Cart Section */}
            <div className="action-section mb-5 p-4 bg-light rounded-3">
              <div className="mb-3">
                <label className="form-label fw-semibold">Quantity</label>
                <div className="input-group" style={{ maxWidth: '150px' }}>
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-primary"
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary btn-lg w-100 fw-bold"
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="additional-info p-4 bg-light rounded-3">
              <h5 className="fw-bold mb-3">Why Choose This Product?</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-light">✓ Premium quality guaranteed</li>
                <li className="list-group-item bg-light">✓ Fast & free shipping on orders over $50</li>
                <li className="list-group-item bg-light">✓ 30-day money-back guarantee</li>
                <li className="list-group-item bg-light">✓ 24/7 customer support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {showRecommendations && recommendations.length > 0 && (
          <div className="mt-5 pt-5 border-top">
            <h3 className="fw-bold mb-4">You Might Also Like</h3>
            {loading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row">
                {recommendations.slice(0, 4).map(rec => (
                  <RecommendationCard key={rec.id} product={rec} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .product-detail-section {
          background-color: #ffffff;
          padding: 60px 0;
        }
        .product-detail-image-container {
          transition: transform 0.3s ease;
        }
        .product-detail-image-container:hover {
          transform: scale(1.02);
        }
        .rating .stars {
          color: #ffc107;
          font-size: 1.5rem;
          letter-spacing: 3px;
        }
        .price-section {
          border-color: #e0e0e0;
        }
        .btn-primary {
          background-color: #ff4500;
          border-color: #ff4500;
        }
        .btn-primary:hover {
          background-color: #e63e00;
          border-color: #e63e00;
        }
        .btn-outline-primary {
          color: #ff4500;
          border-color: #ff4500;
        }
        .btn-outline-primary:hover {
          background-color: #ff4500;
          border-color: #ff4500;
        }
        .input-group input {
          border-color: #ff4500;
        }
        .recommendation-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .recommendation-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default ProductDetail;

