import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { FormEvent, useState } from 'react';

type ContactFormProps = ComponentProps & {
  fields: {
    title: Field<string>;
    subtitle: Field<string>;
    buttonText: Field<string>;
    namePlaceholder: Field<string>;
    emailPlaceholder: Field<string>;
    subjectPlaceholder: Field<string>;
    messagePlaceholder: Field<string>;
    mapLocation: Field<string>;
  };
};

const ContactForm = ({ fields }: ContactFormProps): JSX.Element => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="contact-form-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="contact-form p-4 bg-white rounded-4 shadow-sm">
              <div className="mb-4">
                <span className="text-primary fw-semibold mb-2 d-block">
                  <Text field={fields.subtitle} />
                </span>
                <h2 className="display-6 fw-bold">
                  <Text field={fields.title} />
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={fields.namePlaceholder?.value || 'Name'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <label htmlFor="name">
                        <Text field={fields.namePlaceholder} />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder={fields.emailPlaceholder?.value || 'Email Address'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <label htmlFor="email">
                        <Text field={fields.emailPlaceholder} />
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder={fields.subjectPlaceholder?.value || 'Subject'}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                      <label htmlFor="subject">
                        <Text field={fields.subjectPlaceholder} />
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="message"
                        placeholder={fields.messagePlaceholder?.value || 'Message'}
                        style={{ height: '150px' }}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                      <label htmlFor="message">
                        <Text field={fields.messagePlaceholder} />
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5">
                      <Text field={fields.buttonText} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="map-container h-100 rounded-4 overflow-hidden">
              <iframe
                src={fields.mapLocation?.value}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-form-section {
          background-color: #f8f9fa;
        }
        .contact-form {
          border: 1px solid rgba(0, 0, 0, 0.1);
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
        .form-control:focus {
          border-color: #ff4500;
          box-shadow: 0 0 0 0.25rem rgba(255, 69, 0, 0.25);
        }
        .form-floating > .form-control:focus ~ label,
        .form-floating > .form-control:not(:placeholder-shown) ~ label {
          color: #ff4500;
        }
        .map-container {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
};

export default withDatasourceCheck()<ContactFormProps>(ContactForm);