import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../utils/productService";
import Rating from "../../components/Rating/Rating";
import userService from "../../utils/userService";

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      item: 1,
    };
  }

  async componentDidMount() {
    const product = await productService.getOne(this.props.match.params.id);
    this.setState({ product });
    console.log(product);
  }

  IncrementItem = () => {
    const item = this.state.item + 1;
    this.setState({ item });
  };

  DecreaseItem = () => {
    if (this.state.item > 0) {
      const item = this.state.item - 1;
      this.setState({ item });
    }
  };

  handleDelete = async (e) => {
    await productService.delete(this.state.product._id);
    this.props.handleUpdateProducts();
    this.props.history.push("/");
  };

  handleAddToCart = async (e) => {
    e.preventDefault();
    const newCart = await userService.addToCart(
      this.props.user._id,
      this.state.product._id,
      this.state.item
    );
    this.props.setCart(newCart)
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <Link to="/">Go Back </Link>
        <h1> {product.name}</h1>
        <div className="row md-6">
          <div className="col md-3">
            <img src={product.img} alt={product.name} fluid />
          </div>
          <div className="col md-3">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <Rating
                  value={product.avRating}
                  text={`${product.numReviews > 0 ? product.numReviews : 0} reviews`}
                  color="#f8e825"
                />
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                Price: {product.price} CAD
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                In Stock: {product.quantity}
              </li>
            </ul>
            {/* <div class="btn-group mr-2" role="group" aria-label="First group"> */}
            <div className="btn-toolbar">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.DecreaseItem}
                disabled={!this.state.item}
              >
                -
              </button>
              <input className="" readOnly value={this.state.item}></input>
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.IncrementItem}
                disabled={this.state.item >= product.quantity}
              >
                +
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                disabled={!this.state.item}
                onClick={this.handleAddToCart}
              >
                Add to <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <div className="row md-6">
            <p>Description: {product.name}</p>
          </div>
          <div className="btn-group">
            <div className="btn-toolbar">
              <Link to={`/product/${product._id}`}>
                <button type="button" class="btn btn-secondary">
                  Update
                </button>
              </Link>
            </div>
            <div className="btn-toolbar">
              <button
                type="button"
                class="btn btn-secondary"
                onClick={this.handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
