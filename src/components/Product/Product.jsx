import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const Product = ({ product }) => {
  return (
    <div>
      <div className="card mb-3">
        <Link to={`/product/${product._id}`} className="card-header">
          <h1>{product.name}</h1>
        </Link>
        <img
          className="card-img-top"
          src={product.img}
          alt={product.name}
        ></img>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="d-block user-select-none"
          width="100%"
          height="200"
          aria-label="Placeholder: Image cap"
          focusable="false"
          role="img"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 318 180"
          //   style="font-size:1.125rem;text-anchor:middle"
        >
          <img src={product.img} alt={product.name}></img>
        </svg> */}
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{product.description}</li>
          <li className="list-group-item">{product.price} CAD</li>
        </ul>
        <Rating
          value={product.avRating}
          text={`${product.numReviews} reviews`}
          color = "#f8e825"
        />
        {/* <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div> */}
        <div className="card-footer text-muted">
          {product.quantity > 0 ? "In stock" : "Out of Stock"}
        </div>
      </div>
    </div>
  );
};

export default Product;
