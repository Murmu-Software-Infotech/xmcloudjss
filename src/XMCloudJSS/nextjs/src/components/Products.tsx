import { useEffect, useState } from 'react';
import { Text, RichText, Field } from '@sitecore-jss/sitecore-jss-nextjs';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
 category: string;
 description: string;
};

type ProductsProps = {
  fields: {
    title: Field<string>;
    description: Field<string>;
  };
};

const Products = ({ fields }: ProductsProps): JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);

  

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=12')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('API Error:', err));
  }, []);

  console.log(products);
  return (
    <section className="bg-white text-center py-5 container">
      <h2 className="mb-3 text-dark fw-bold">
        <Text field={fields.title} />
      </h2>
      <div className="text-secondary mb-5">
        <RichText field={fields.description} />
      </div>

      <div className="row">
        {products.map((p) => (
        //   <div key={p.id} className="col-md-4 mb-4">
        //     <div className="card shadow-sm border-0">
        //       <img src={p.image} alt={p.title} className="card-img-top p-3" height={220} />
        //       <div className="card-body">
        //         <h5 className="fw-semibold">{p.title}</h5>
        //         <p className="text-primary fw-bold">${p.price}</p>
        //         <p></p>
        //       </div>
        //     </div>
        //   </div>
        <div className="col-lg-4 col-md-6">
                <div className="card h-100 shadow-sm border-0 overflow-hidden">
                    <div className="position-relative">
                        <img src={p.image} className="card-img-top" height={250} alt="Headphones"/>
                        <span className="position-absolute top-0 start-0 badge bg-danger m-3">Sale</span>
                        <span className="position-absolute top-0 end-0 m-3">
                            <button className="btn btn-light btn-sm rounded-circle">
                                <i className="bi bi-heart"></i>
                            </button>
                        </span>
                    </div>
                    <div className="card-body d-flex flex-column">
                        <div className="mb-2">
                            <span className="badge bg-primary-subtle text-primary">{p.category}</span>
                        </div>
                        <h5 className="card-title fw-bold">{p.title}</h5>
                        {p.description.split(" ").slice(0, 10).join(" ") + "..."}
                        <div className="d-flex align-items-center mb-3">
                            <div className="text-warning me-2">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                            </div>
                            <small className="text-muted">(4.5) 128 reviews</small>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="h4 text-primary fw-bold mb-0">{p.price}</span>
                                <span className="text-muted text-decoration-line-through ms-2">$299</span>
                            </div>
                            <button className="btn btn-primary">
                                <i className="bi bi-cart-plus"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
