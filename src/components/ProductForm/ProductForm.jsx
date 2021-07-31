import React, { Component } from "react";
import { Link } from "react-router-dom";
import productService from "../../utils/productService";
import "./ProductForm.css";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      img: "",
      description: "",
      price: 0,
      quantity: 0,
    };
    this.updatePage = props.match && props.match.params.id;
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  async updateProduct() {
    let product;
    if (this.updatePage) {
      product = await productService.update({ ...this.state });
    } else {
      product = await productService.create({ ...this.state });
    }
    return product;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const product = await this.updateProduct();
    if (product) {
      this.props.handleUpdateProducts();
      this.props.history.push("/");
    } else {
      window.confirm("productUpdate failed");
    }
  };

  async componentDidMount() {
    if (this.props.match && this.props.match.params.id) {
      const product = await productService.getOne(this.props.match.params.id);
      this.setState(product);
      console.log(product);
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid login-form col-12">
          <h1>{this.updatePage ? "Update Product" : "Add Product"}</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label for="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Img"
                  name="img"
                  value={this.state.img}
                  onChange={this.handleChange}
                />
                <label for="floatingInput">Img</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  rows="3"
                />
                <label for="floatingInput">Description</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Price"
                  name="price"
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                <label for="floatingInput">Price</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <label for="floatingInput">Quantity</label>
              </div>
            </div>
            <div className="form-group">
              <div className="form-floating">
                <button className="btn btn-dark">
                  {this.updatePage ? "UPDATE" : "ADD"}
                </button>
                &nbsp;&nbsp;
                <Link to="/">Cancel</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ProductForm;
