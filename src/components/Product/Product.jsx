import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";
import "./Product.css";


const Product = ({ product }) => {
  const [show, setShow] = useState(false);
  const shortDescription = (""+product.description).slice(0, 50)

  return (
    <div key={product._id} className="card mb-3 card-size">
      <Link to={`/products/${product._id}`} className="card-header">
        <h1>{product.name}</h1>
      </Link>
      <img className="card-img-top" src={product.img} alt={product.name}></img>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {show ? (
            <>
              <button
                className="btn btn-default"
                onClick={() => setShow(false)}
              >
                Show less
              </button>
              <div>
              {product.description}
              </div>
            </>
          ) : (
            <>
              <button className="btn btn-default" onClick={() => setShow(true)}>
                Show more
              </button>
              <div>
                {shortDescription}
              </div>
            </>
          )}
        </li>
        <li className="list-group-item">{product.price} CAD</li>
      </ul>
      <Rating
        value={product.avRating}
        text={`${
          product.reviews.length > 0 ? product.reviews.length : 0
        } reviews`}
        color="#f8e825"
      />
      <div className="card-footer text-muted">
        {product.quantity > 0 ? "In stock" : "Out of Stock"}
      </div>
    </div>
  );
};

export default Product;
