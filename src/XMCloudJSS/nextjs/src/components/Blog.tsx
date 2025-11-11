import { Text, RichText, Field, ImageField, Image, withDatasourceCheck, Link, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type BlogItem = {
  id?: string;
  name?: string;
  fields: {
    image: ImageField;
    category: Field<string>;
    date: Field<string>;
    title: Field<string>;
    excerpt: Field<string>;
    link: {
      value: {
        href: string;
        text: string;
      };
    };
  };
};

type BlogProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    subheading: Field<string>;
    blogs: BlogItem[] | { targetItems?: BlogItem[] };
  };
};

const BlogCard = ({ fields }: BlogItem) => (



  <div className="col-12 mb-4">
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 blog-card">
      <div className="position-relative overflow-hidden blog-img-wrapper">
        <Image field={fields.image} className="card-img-top blog-img" />
      </div>
      <div className="card-body p-4">
        <div className="d-flex align-items-center mb-3 text-muted small">
          <span className="me-3 d-flex align-items-center">
            <i className="bi bi-folder me-2"></i>
            <Text field={fields.category} />
          </span>
          <span className="d-flex align-items-center">
            <i className="bi bi-calendar me-2"></i>
            <Text field={fields.date} />
          </span>
        </div>
        <h3 className="card-title h5 fw-bold mb-3 text-dark">
          <Text field={fields.title} />
        </h3>
        <div className="card-text text-muted mb-4">
          <RichText field={fields.excerpt} />
        </div>
        <Link
          field={fields.link}
          className="btn btn-primary rounded-pill px-4 py-2 fw-semibold"
        >
          {fields.link?.value?.text || 'Learn More'}
        </Link>
      </div>
    </div>
  </div>
);

const SearchSidebar = () => (
  <div className="position-sticky sticky-sidebar">
    <div className="card border-0 shadow-sm rounded-3 mb-4">
      <div className="card-body p-2">
        <div className="input-group">
          <input
            type="text"
            className="form-control border-0 py-3 px-3"
            placeholder="Search your keyword..."
            aria-label="Search"
          />
          <button className="btn btn-search px-4" type="button">
            <i className="bi bi-search fs-5"></i>
          </button>
        </div>
      </div>
    </div>

    <div className="card border-0 shadow-sm rounded-3">
      <div className="card-body p-4">
        <h3 className="h4 fw-bold mb-4">Categories</h3>
        <ul className="list-unstyled mb-0">
          <li className="d-flex justify-content-between align-items-center py-3 border-bottom category-item">
            <span className="fw-medium">All</span>
            <span className="text-muted">(6)</span>
          </li>
          <li className="d-flex justify-content-between align-items-center py-3 border-bottom category-item">
            <span className="fw-medium">Tech</span>
            <span className="text-muted">(2)</span>
          </li>
          <li className="d-flex justify-content-between align-items-center py-3 border-bottom category-item">
            <span className="fw-medium">Entertainment</span>
            <span className="text-muted">(2)</span>
          </li>
          <li className="d-flex justify-content-between align-items-center py-3 category-item">
            <span className="fw-medium">Corporate</span>
            <span className="text-muted">(2)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Blog = ({ fields }: BlogProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const currentLanguage = sitecoreContext?.language || 'en';

console.log(currentLanguage);


 console.log("This is ................", fields);
  const blogItems = Array.isArray(fields.blogs) 
    ? fields.blogs 
    : fields.blogs?.targetItems || [];
  
  console.log('Mode check - blogs structure:', fields.blogs);
  console.log('Blog items resolved:', blogItems);
  console.log('Is Array?', Array.isArray(fields.blogs));

  return (
    <section className="py-5 bg-light blog-section">
      <div className="container py-5">
        <div className="text-center mb-5 pb-4">
          {fields.subheading && (
            <p className="text-uppercase fw-semibold mb-3 letter-spacing text-primary-custom">
              <Text field={fields.subheading} />
            </p>
          )}
          <h2 className="display-4 fw-bold text-dark mb-0">
            <Text field={fields.heading} />
          </h2>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="row g-4">
              {blogItems.length > 0 ? (
                blogItems.map((blog, index) => (
                  <div key={blog.id || index} className="col-md-6">
                    <BlogCard {...blog} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <p className="text-center text-muted">No blogs available</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <SearchSidebar />
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-section {
          min-height: 100vh;
          background-color: #f8f9fa !important;
        }

        .text-primary-custom {
          color: #ff5722 !important;
          font-size: 0.875rem;
          letter-spacing: 2px;
        }

        .display-4 {
          font-size: 3rem;
          line-height: 1.2;
        }

        .blog-card {
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .blog-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
        }

        .blog-img-wrapper {
          height: 260px;
          background-color: #e9ecef;
        }

        .blog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .blog-img {
          transform: scale(1.1);
        }

        .card-title {
          font-size: 1.25rem;
          line-height: 1.5;
          min-height: 60px;
        }

        .card-text {
          font-size: 0.95rem;
          line-height: 1.7;
          min-height: 80px;
        }

        .card-text p {
          margin: 0;
        }

        .btn-primary {
          background-color: #0d6efd;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #0b5ed7;
          transform: translateX(5px);
        }

        .sticky-sidebar {
          top: 30px;
        }

        .btn-search {
          background-color: #ff5722;
          border: none;
          color: white;
          transition: all 0.3s ease;
        }

        .btn-search:hover {
          background-color: #e64a19;
          color: white;
        }

        .form-control:focus {
          box-shadow: none;
          border-color: transparent;
        }

        .form-control::placeholder {
          color: #adb5bd;
        }

        .category-item {
          cursor: pointer;
          transition: all 0.3s ease;
          padding-left: 0 !important;
        }

        .category-item:hover {
          padding-left: 0.75rem !important;
          color: #ff5722;
        }

        .category-item:hover span {
          color: #ff5722;
        }

        @media (max-width: 991.98px) {
          .sticky-sidebar {
            position: relative !important;
            top: 0 !important;
          }

          .display-4 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 767.98px) {
          .blog-img-wrapper {
            height: 220px;
          }

          .display-4 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default withDatasourceCheck()<BlogProps>(Blog);