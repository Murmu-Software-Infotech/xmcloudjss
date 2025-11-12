import { Text, Field, RichText, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import Image from 'next/image';

type Feature = {
  id: string;
  fields: {
    title: Field<string>;
    description: Field<string>;
    icon: Field<string>;
  };
};

type AboutUsProps = ComponentProps & {
  fields: {
    heading: Field<string>;
    subheading: Field<string>;
    content: Field<string>;
    image: {
      value: {
        src: string;
        alt: string;
      };
    };
    features: Feature[];
  };
  rendering: ComponentRendering;
};

const AboutUs = (props: AboutUsProps): JSX.Element => {
//   console.log('Full AboutUs props:', JSON.stringify(props, null, 2));
  console.log("This is AboutUs Props", props);
  // Get fields either from datasource or direct fields
  const fields = props.fields || {};
  
  // Add debug logging
  console.log('Fields from props AboutUs:', fields);
  console.log('Component rendering of AboutUs:', props.rendering);
  
//   if (!fields.heading && !fields.subheading && !fields.content) {
//     console.warn('AboutUs component is missing required fields');
//     return <div>AboutUs component is missing required field data</div>;
//   }
  
  return (
  <section className="about-section py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 ps-lg-5">
          <div className="about-content">
            <span className="text-primary fw-semibold mb-3 d-block">
              <Text field={fields.subheading} />
            </span>
            <h2 className="display-5 fw-bold text-white mb-4">
              <Text field={fields.heading} />
            </h2>
            <div className="description text-white-50 mb-4">
              <RichText field={fields.content} />
            </div>
            <div className="features mb-5">
              {fields.features?.map((feature, index) => (
                <div key={feature.id || index} className="feature-item mb-3 text-white">
                  <i className={`fa ${feature.fields.icon} text-primary me-2`}></i>
                  <div className="feature-content">
                    <h4 className="mb-2"><Text field={feature.fields.title} /></h4>
                    <p className="text-white-50 mb-0"><Text field={feature.fields.description} /></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-6 pe-lg-5">
          <div className="about-image position-relative">
            <Image
              src={fields.image?.value?.src || '/aboutus.jpg'}
              alt={fields.image?.value?.alt || 'About Us'}
              width={600}
              height={400}
              className="rounded-4 img-fluid"
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="shape-bg position-absolute"></div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .about-section {
        background-color: #0c1b2b;
        position: relative;
        overflow: hidden;
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
      .about-image {
        z-index: 2;
      }
      .shape-bg {
        background-color: #ff4500;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        bottom: -100px;
        right: -100px;
        z-index: 1;
        opacity: 0.1;
      }
      .feature-item {
        font-size: 1.1rem;
      }
      :global(.feature-item i) {
        color: #ff4500;
      }
    `}</style>
  </section>
  );
};

export default AboutUs;