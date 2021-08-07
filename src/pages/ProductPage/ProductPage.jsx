import { render } from "@testing-library/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../utils/productService";
import Rating from "../../components/Rating/Rating";
import userService from "../../utils/userService";
import ReviewForm from "../../components/ReviewForm/ReviewForm";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    const product = this.props.products.find(
      (el) => el._id == this.props.match.params.id
    );
    this.state = {
      product: product,
      item: 1,
    };
  }

  async componentDidMount() {
    const product = this.props.products.find(
      (el) => el._id == this.props.match.params.id
    );
    this.setState({ product });
  }

  async componentDidUpdate(prevProps, prevState) {
    const product = this.props.products.find(
      (el) => el._id == this.props.match.params.id
    );
    if (prevState.product.reviews.length !== product.reviews.length) {
      this.setState({ product });
    }
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
    if (this.props.user) {
      const newCart = await userService.addToCart(
        this.props.user._id,
        this.state.product._id,
        this.state.item
      );
      this.props.setCart(newCart);
    } else {
      this.props.history.push("/login");
    }
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
            <p>Description: {product.description}</p>
          </div>
          <div className="col md-3">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <Rating
                  value={product.avRating}
                  text={`${
                    product.reviews && product.reviews.length > 0
                      ? product.reviews.length
                      : 0
                  } reviews`}
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
            <hr />
            <h3>Reviews</h3>
            <div>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <div key={idx} className="col-12">
                    <Rating
                      value={review.rating}
                      text={review.rating}
                      color="#f8e825"
                    />
                    <p>{review.text}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
            <ReviewForm
              product={product}
              user={this.props.user}
              getProducts={this.props.handleUpdateProducts}
            />
          </div>
          {this.props.user && this.props.user.isAdmin && (
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
          )}
        </div>
      </div>
    );
  }
}

export default ProductPage;
