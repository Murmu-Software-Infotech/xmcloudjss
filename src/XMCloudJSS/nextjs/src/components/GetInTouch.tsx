import { Text, Field, withDatasourceCheck  } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';

type GetInTouchProps = ComponentProps & {
  fields: {
    title: Field<string>;
    subtitle: Field<string>;
    phone: Field<string>;
    email: Field<string>;
    address1: Field<string>;
    address2: Field<string>;
    image: {
      value: {
        src: string;
        alt: string;
        width: number;
        height: number;
      };
    };
  };
};

const GetInTouch = ({ fields }: GetInTouchProps): JSX.Element => (
  <section className="get-in-touch-section py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <div className="contact-image position-relative">
            {fields.image?.value && (
              <Image
                src={fields.image.value.src}
                alt={fields.image.value.alt || 'Contact Image'}
                width={600}
                height={700}
                className="img-fluid rounded-4"
                style={{ objectFit: 'cover' }}
                priority
              />
            )}
            <div className="phone-badge">
              <a href={`tel:${fields.phone?.value}`} className="phone-number">
                <Text field={fields.phone} />
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 ps-lg-5">
          <div className="contact-content">
            <span className="text-primary fw-semibold mb-3 d-block">Get In Touch</span>
            <h2 className="display-5 fw-bold mb-4">
              <Text field={fields.title} />
            </h2>
            <h3 className="h5 text-secondary mb-4">
              <Text field={fields.subtitle} />
            </h3>
            <div className="contact-info">
              <div className="info-item mb-4">
                <div className="d-flex align-items-center">
                  <i className="fa fa-phone text-primary me-3 fs-4"></i>
                  <div>
                    <p className="mb-0">Phone Number</p>
                    <a href={`tel:${fields.phone?.value}`} className="text-dark text-decoration-none fs-5">
                      <Text field={fields.phone} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="info-item mb-4">
                <div className="d-flex align-items-center">
                  <i className="fa fa-envelope text-primary me-3 fs-4"></i>
                  <div>
                    <p className="mb-0">Email Address</p>
                    <a href={`mailto:${fields.email?.value}`} className="text-dark text-decoration-none fs-5">
                      <Text field={fields.email} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <div className="d-flex align-items-center">
                  <i className="fa fa-map-marker-alt text-primary me-3 fs-4"></i>
                  <div>
                    <p className="mb-0">Office Location</p>
                    <p className="text-dark mb-0 fs-5">
                      <Text field={fields.address1} />
                    </p>
                    <p className="text-dark mb-0 fs-5">
                      <Text field={fields.address2} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .get-in-touch-section {
        background-color: #fff;
        position: relative;
      }
      .contact-image {
        position: relative;
      }
      .phone-badge {
        position: absolute;
        bottom: 40px;
        right: -20px;
        background: #ff4500;
        padding: 15px 30px;
        border-radius: 50px;
        box-shadow: 0 5px 15px rgba(255, 69, 0, 0.3);
      }
      .phone-number {
        color: white;
        text-decoration: none;
        font-size: 1.2rem;
        font-weight: 600;
      }
      .text-primary {
        color: #ff4500 !important;
      }
      .info-item i {
        width: 40px;
      }
      :global(.info-item i) {
        color: #ff4500;
      }
      .contact-content {
        padding-left: 2rem;
      }
      @media (max-width: 991px) {
        .contact-content {
          padding-left: 0;
          margin-top: 3rem;
        }
        .phone-badge {
          right: 20px;
        }
      }
    `}</style>
  </section>
);

export default withDatasourceCheck()<GetInTouchProps>(GetInTouch);