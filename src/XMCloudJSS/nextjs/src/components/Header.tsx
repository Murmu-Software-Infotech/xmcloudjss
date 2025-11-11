
import { Image, Link, LinkField, Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface HeaderProps extends ComponentProps {
  fields: {
    logo: {
      src: string;
      alt: string;
    };
    title: Field<string>;
    links: {
      fields: {
        link: LinkField;
      };
    }[];
  };
}

const defaultLinks = [
  { fields: { link: { href: '/', text: 'Home' } } },
  { fields: { link: { href: '/about', text: 'About' } } },
  { fields: { link: { href: '/services', text: 'Services' } } },
{ fields: { link: { href: '/blog', text: 'Blog' } } },
  { fields: { link: { href: '/contact', text: 'Contact' } } },
];

const Header = (props: HeaderProps): JSX.Element => {
  const links = props.fields?.links || defaultLinks;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger shadow-sm sticky-top">
  <div className="container py-3">
    <Link field={{ href: '/' }} className="navbar-brand fw-bold fs-3 text-primary d-flex align-items-center">
      {props.fields?.logo ? (
        <Image field={props.fields.logo} alt="Logo" className="me-2" style={{ maxHeight: '40px' }} />
      ) : (
        <Text field={props.fields?.title || { value: 'TheProperty' }} />
      )}
    </Link>
    
    <button
      className="navbar-toggler border-0 shadow-none"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul className="navbar-nav align-items-lg-center gap-1">
        {links.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              field={item.fields.link}
              className="nav-link px-3 py-2 rounded-3 fw-medium text-dark hover-bg-light transition"
              data-testid={`nav-link-${index}`}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
</nav>
  );
};

export default withDatasourceCheck()<HeaderProps>(Header);