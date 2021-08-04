import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import ProductPage from "../../pages/ProductPage/ProductPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import "./HomePage.css";
import Product from "../../components/Product/Product";

const HomePage = ({ user, products }) => {
  const splitRows = (products) =>
    products.reduce((acc, product, idx) => {
      const row = Math.floor(idx / 4);
      if (!acc[row]) acc.push([]);
      acc[row].push(product);
      return acc;
    }, []);
  return (
    <div className="container-fluid">
      <h1> Our products</h1>
      {/* <div className="card-deck ow-cols-4">
        {splitRows(products).map((row) => (
          <div>
            {row.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        ))}
      </div> */}

      <div className="row">
        {products.map((product, idx) => (
          <div key={idx} className="col-md-3 col-sm-2">
            <Product product={product} />
          </div>
        ))}
      </div> {user && user.isAdmin &&
      <Link to="/product">Add New Product</Link> }
    </div>
  );
};

export default HomePage;
