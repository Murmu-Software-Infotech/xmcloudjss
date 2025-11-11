import { useMemo, useState } from 'react';
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Product, ProductFilter } from 'lib/services/productService';

type ProductCatalogProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    description: Field<string>;
    itemsPerPage: Field<string>;
    showFilters: Field<string>;
    showRatings: Field<string>;
  };
  products?: Product[];
};

interface ProductCardProps {
  product: Product;
  showRatings?: boolean;
}

const ProductCard = ({ product, showRatings }: ProductCardProps) => (
  <div className="col-lg-4 col-md-6 mb-4">
    <div className="product-card bg-white rounded-3 shadow-sm overflow-hidden h-100 d-flex flex-column">
      <div className="product-image-container bg-light position-relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-auto"
          style={{ minHeight: '200px', objectFit: 'cover' }}
        />
        {!product.inStock && (
          <div className="position-absolute top-0 end-0 badge bg-danger m-2">Out of Stock</div>
        )}
        <div className="badge bg-primary position-absolute bottom-0 start-0 m-2">
          {product.category}
        </div>
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1">
        <h3 className="h5 mb-2 fw-bold">{product.name}</h3>
        <p className="text-muted small flex-grow-1">{product.description}</p>

        {showRatings && (
          <div className="mb-3">
            <div className="rating">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
              <span className="ms-2 text-muted small">({product.rating})</span>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <p className="h4 mb-0 text-primary fw-bold">${product.price.toFixed(2)}</p>
            <p className="text-muted small">SKU: {product.sku}</p>
          </div>
          <button
            className="btn btn-primary btn-sm"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ProductCatalog = ({ fields, products = [] }: ProductCatalogProps): JSX.Element => {
  const [filters, setFilters] = useState<ProductFilter>({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = parseInt(fields.itemsPerPage?.value || '6') || 6;
  const showFilters = fields.showFilters?.value?.toLowerCase() !== 'false';
  const showRatings = fields.showRatings?.value?.toLowerCase() !== 'false';

  // Apply filters to products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice !== undefined && product.price < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) return false;
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
      return true;
    });
  }, [products, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Get unique categories from products
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, [products]);

  // Get price range from products
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map(p => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [products]);

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
    setCurrentPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max
    }));
    setCurrentPage(1);
  };

  const handleStockFilterChange = () => {
    setFilters(prev => ({
      ...prev,
      inStock: prev.inStock === true ? undefined : true
    }));
    setCurrentPage(1);
  };

  return (
    <section className="product-catalog-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">
            <Text field={fields.heading} />
          </h2>
          <p className="lead text-muted">
            <Text field={fields.description} />
          </p>
        </div>

        <div className="row">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="col-lg-3 mb-4">
              <div className="bg-light p-4 rounded-3">
                <h5 className="fw-bold mb-4">Filters</h5>

                {/* Category Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Category</h6>
                  {categories.map(category => (
                    <div key={category} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`category-${category}`}
                        checked={filters.category === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <label className="form-check-label" htmlFor={`category-${category}`}>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Price Filter */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">Price Range</h6>
                  <div className="mb-2">
                    <label className="form-label small">
                      Min: ${filters.minPrice ?? priceRange.min}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.minPrice ?? priceRange.min}
                      onChange={(e) => handlePriceChange(
                        parseInt(e.target.value),
                        filters.maxPrice ?? priceRange.max
                      )}
                    />
                  </div>
                  <div>
                    <label className="form-label small">
                      Max: ${filters.maxPrice ?? priceRange.max}
                    </label>
                    <input
                      type="range"
                      className="form-range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={filters.maxPrice ?? priceRange.max}
                      onChange={(e) => handlePriceChange(
                        filters.minPrice ?? priceRange.min,
                        parseInt(e.target.value)
                      )}
                    />
                  </div>
                </div>

                {/* In Stock Filter */}
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inStock"
                      checked={filters.inStock === true}
                      onChange={handleStockFilterChange}
                    />
                    <label className="form-check-label" htmlFor="inStock">
                      In Stock Only
                    </label>
                  </div>
                </div>

                {/* Reset Filters */}
                {Object.keys(filters).length > 0 && (
                  <button
                    className="btn btn-outline-primary btn-sm w-100 mt-4"
                    onClick={() => {
                      setFilters({});
                      setCurrentPage(1);
                    }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className={showFilters ? 'col-lg-9' : 'col-12'}>
            {paginatedProducts.length > 0 ? (
              <>
                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <p className="text-muted mb-0">
                    Showing {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </div>

                <div className="row">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showRatings={showRatings}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Product pagination" className="mt-5">
                    <ul className="pagination justify-content-center">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            ) : (
              <div className="alert alert-info text-center">
                No products found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-catalog-section {
          background-color: #ffffff;
          padding: 80px 0;
        }
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
        }
        .product-image-container {
          overflow: hidden;
          height: 250px;
        }
        .product-image-container img {
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image-container img {
          transform: scale(1.05);
        }
        .rating {
          color: #ffc107;
          font-size: 1.1rem;
          letter-spacing: 2px;
        }
        .btn-primary {
          background-color: #ff4500;
          border-color: #ff4500;
        }
        .btn-primary:hover,
        .btn-primary:focus {
          background-color: #e63e00;
          border-color: #e63e00;
        }
        .form-check-input:checked {
          background-color: #ff4500;
          border-color: #ff4500;
        }
        .page-link {
          color: #ff4500;
        }
        .page-link:hover {
          color: #e63e00;
        }
        .page-item.active .page-link {
          background-color: #ff4500;
          border-color: #ff4500;
        }
      `}</style>
    </section>
  );
};

export default ProductCatalog;

