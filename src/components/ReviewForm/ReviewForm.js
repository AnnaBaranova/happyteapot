import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../utils/productService";

class ReviewForm extends Component {
  state = {
    rating: 5,
    text: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  isFormInvalid() {
    return !(this.state.text.length > 5);
  }

  handleAddReview = async (e) => {
    e.preventDefault();
    await productService.addReview(
      {
        rating: this.state.rating,
        text: this.state.text,
        user: this.props.user._id,
      },
      this.props.product._id
    );
    this.props.getProducts()
    this.state.text = '';
  };

  render() {
    return (
      <div>
        <div className="container-fluid login-form col-12">
          <h1>Add Review</h1>
          <form className="form" onSubmit={this.handleAddReview}>
            <div class="form-group">
              <label for="rating" class="form-label mt-4">
                Rating
              </label>
              <select
                multiple=""
                class="form-select"
                id="payment-method"
                name="rating"
                value={this.state.rating}
                onChange={this.handleChange}
              >
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </select>
            </div>
            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="review"
                  name="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                />
                <label for="floatingInput">
                  Text review (at least 5 letters)
                </label>
              </div>
            </div>

            <div className="form-group">
              <div className="form-floating">
                <button
                  className="btn btn-dark"
                  disabled={this.isFormInvalid()}
                >
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ReviewForm;
