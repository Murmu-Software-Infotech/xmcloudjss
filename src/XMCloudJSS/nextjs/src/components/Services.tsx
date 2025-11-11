import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ServiceItem = {
  fields: {
    icon: Field<string>;
    title: Field<string>;
    link: {
      value: {
        href: string;
        text: string;
      };
    };
  };
};

type ServicesProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    subheading: Field<string>;
    services: ServiceItem[];
  };
};

const ServiceCard = ({ fields }: ServiceItem) => (
  <div className="col-lg-3 col-md-6 mb-4">
    <div className="service-card p-4 bg-white rounded-4 shadow-sm h-100">
      <div className="service-icon mb-4">
        <i className={`text-primary fs-1 ${fields.icon?.value}`}></i>
      </div>
      <h3 className="h4 mb-3">
        <Text field={fields.title} />
      </h3>
      <a href={fields.link?.value?.href} className="service-link d-flex align-items-center">
        <span className="me-2">{fields.link?.value?.text || 'Learn More'}</span>
        <span className="arrow">→</span>
      </a>
    </div>
  </div>
);

const Services = ({ fields }: ServicesProps): JSX.Element => (
  <section className="services-section py-5">
    <div className="container">
      <div className="text-center mb-5">
        <span className="text-primary text-uppercase fw-semibold">
          <Text field={fields.subheading} />
        </span>
        <h2 className="display-5 fw-bold mt-2">
          <Text field={fields.heading} />
        </h2>
      </div>
      
      <div className="row">
        {fields.services?.map((service, index) => (
          <ServiceCard key={index} fields={service.fields} />
        ))}
      </div>
    </div>

    <style jsx>{`
      .services-section {
        background-color: #f8f9fa;
        padding: 80px 0;
      }
      .text-primary {
        color: #ff4500 !important;
      }
      .service-card {
        transition: transform 0.3s ease;
      }
      .service-card:hover {
        transform: translateY(-10px);
      }
      .service-icon {
        color: #ff4500;
      }
      .service-link {
        color: #333;
        text-decoration: none;
        font-weight: 500;
      }
      .service-link:hover {
        color: #ff4500;
      }
      .service-link .arrow {
        transition: transform 0.3s ease;
      }
      .service-link:hover .arrow {
        transform: translateX(5px);
      }
    `}</style>
  </section>
);

export default withDatasourceCheck()<ServicesProps>(Services);