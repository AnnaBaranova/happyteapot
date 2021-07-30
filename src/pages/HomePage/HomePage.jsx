import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import "./HomePage.css";
import Product from "../../components/Product/Product";

const HomePage = ({ products }) => {
  return (
    <div className="container-fluid">
      <h1> Our products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col" key={product._id}>
              {/* {product.name} -
              <img src={product.img}></img> */}
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
