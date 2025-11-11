import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';

type HeroProps = ComponentProps & {
  fields: {
    title: Field<string>;
    subtitle: Field<string>;
    businessType: Field<string>;
    ctaText: Field<string>;
    ctaLink: Field<string>;
  };
};

const Hero = ({ fields }: HeroProps): JSX.Element => (
  <section className="hero-section py-5">
    <div className="mx-4">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <span className="text-primary fw-semibold mb-3 d-block">
            <Text field={fields.businessType} />
          </span>
          <h1 className="display-4 fw-bold mb-4">
            <Text field={fields.title} />
          </h1>
          <h2 className="h3 mb-4 text-muted">
            <Text field={fields.subtitle} />
          </h2>
          <a 
            href={fields.ctaLink?.value} 
            className="btn btn-primary btn-lg rounded-pill px-4"
          >
            <Text field={fields.ctaText} />
          </a>
        </div>
        <div className="col-lg-6">
          <div className="hero-illustration">
            <Image 
              src="/herobanner.png"
              alt="Hero Banner"
              width={600}
              height={500}
              style={{
                width: '100%',
                height: 'auto',
                maxWidth: '600px',
                objectFit: 'contain'
              }}
              priority
            />

          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .hero-section {
        background-color: #fff1ed;
        min-height: 600px;
        display: flex;
        align-items: center;
      }
      .text-primary {
        color: #ff4500 !important;
      }
      .btn-primary {
        background-color: #ff4500;
        border-color: #ff4500;
      }
      .btn-primary:hover {
        background-color: #cc3700;
        border-color: #cc3700;
      }
      .hero-illustration {
        height: 500px;
        background-image: url('/illustration.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    `}</style>
  </section>
);

export default withDatasourceCheck()<HeroProps>(Hero);