import React from 'react';
import {
  Field,
  Text,
  ImageField,
  Image,
  LinkField,
  Link
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface QuickLink {
  id: string;
  fields: {
    linkText: Field<string>;
    linkUrl: LinkField;
  };
}

interface BlogPost {
  id: string;
  fields: {
    title: Field<string>;
    date: Field<string>;
    image: ImageField;
    excerpt: Field<string>;
  };
}

interface FooterFields {
  quickLinksTitle: Field<string>;
  quickLinks: QuickLink[];
  contactTitle: Field<string>;
  phone: Field<string>;
  email: Field<string>;
  address1: Field<string>;
  address2: Field<string>;
  latestBlogTitle: Field<string>;
  blogPosts: BlogPost[];
}

type FooterProps = ComponentProps & {
  fields: FooterFields;
};

const Footer = ({ fields }: FooterProps): JSX.Element => {

   
  // Format date to match the design
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
 
  return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row g-4">
          {/* Quick Links Section */}
          <div className="col-12 col-md-4">
            <h3 className="h4 fw-bold text-dark mb-4">
              <Text field={fields.quickLinksTitle} />
            </h3>
            <ul className="list-unstyled">
              {fields.quickLinks?.map((link) => (
                <li key={link.id} className="mb-3">
                  <Link
                    field={link.fields.linkUrl}
                    className="text-secondary text-decoration-none"
                  >
                    <Text field={link.fields.linkText} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-12 col-md-4">
            <h3 className="h4 fw-bold text-dark mb-4">
              <Text field={fields.contactTitle} />
            </h3>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start mb-3">
                <svg
                  className="text-danger flex-shrink-0 me-3 mt-1"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-secondary">
                  <Text field={fields.phone} />
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <svg
                  className="text-danger flex-shrink-0 me-3 mt-1"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-secondary">
                  <Text field={fields.email} />
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <svg
                  className="text-danger flex-shrink-0 me-3 mt-1"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-secondary">
                  <Text field={fields.address1} />
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <svg
                  className="text-danger flex-shrink-0 me-3 mt-1"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-secondary">
                  <Text field={fields.address2} />
                </span>
              </li>
            </ul>
          </div>

          {/* Latest Blog Section */}
          <div className="col-12 col-md-4">
            <h3 className="h4 fw-bold text-dark mb-4">
              <Text field={fields.latestBlogTitle} />
            </h3>
            <ul className="list-unstyled">
              {fields.blogPosts?.map((post) => (
                <li key={post.id} className="d-flex align-items-start mb-4">
                  <div className="flex-shrink-0 me-3">
                    <Image
                      field={post.fields.image}
                      className="rounded"
                      style={{ width: '100px', height: '65px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center text-muted small mb-1">
                      <svg
                        className="me-1"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {formatDate(post.fields.date?.value as string)}
                    </div>
                    <p className="text-dark small mb-0 text-truncate" style={{ maxWidth: '200px' }}>
                      <Text field={post.fields.excerpt} />
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;