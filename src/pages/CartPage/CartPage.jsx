import React from "react";
import { Link } from "react-router-dom";
// import product from "../../../models/product";
import "./CartPage.css";
import userService from "../../utils/userService";
import orderService from "../../utils/orderService";


class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingAddress: '',
      paymentMethod: 'cash'
    };
  }

  handleRemoveFromCart = async (id) => {
    console.log(id);
    const newCart = await userService.removeFromCart(this.props.user._id, id);
    this.props.setCart(newCart);
  };

  incrementItem = async (idx) => {
    const newCart = await userService.updateCart(
      this.props.user._id,
      this.props.cart[idx]._id,
      this.props.cart[idx].quantity + 1
    );
    this.props.setCart(newCart);
  };

  decreaseItem = async (idx) => {
    if (this.props.cart[idx].quantity > 0) {
      const newCart = await userService.updateCart(
        this.props.user._id,
        this.props.cart[idx]._id,
        this.props.cart[idx].quantity - 1
      );
      this.props.setCart(newCart);
    }
  };

  handleAddToOrder = async (e) => {
    console.log("click");
    console.log(this.props.user._id);
    const productsMap = this.getProductMap();
    const cartWithPrice = this.props.cart.map((item) => {
      item.price = productsMap[item.product].price;
      return item;
    });
    const newOrder = await orderService.addToOrder(
      this.props.user._id,
      this.state.shippingAddress,
      this.state.paymentMethod,
      cartWithPrice
    );
    console.log("newOrder", newOrder);
    // await this.props.setOrders(newOrder);
    await this.props.getOrders();
    this.props.setCart([]);
    this.props.history.push(`users/${this.props.user._id}/orders`);
  };

  getProductMap() {
    const productsMap = {};
    this.props.products.forEach((el) => (productsMap[el._id] = el));
    console.log(productsMap);
    return productsMap;
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  isFormInvalid() {
    return !(
      this.state.shippingAddress &&
      this.state.paymentMethod
    );
  }

  render() {
    const productsMap = this.getProductMap();

    if (this.props.cart.length) {
      return (
        <div className="container-fluid col-6">
          <h1> Shopping Cart</h1>
          <table className="container-fluid table table-hover">
            <thead>
              <tr>
                <th scope="col">Name of Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.map((item, idx) => (
                <tr key={idx} className="table-active">
                  <th scope="row">
                    {" "}
                    <Link to={`/products/${item.product}`}>
                      {productsMap[item.product].name}
                    </Link>{" "}
                  </th>
                  <td>{productsMap[item.product].price}</td>
                  <td>
                    {" "}
                    <div className="btn-toolbar">
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.decreaseItem(idx)}
                        disabled={item.quantity <= 0}
                      >
                        -
                      </button>
                      <input
                        className=""
                        readOnly
                        value={item.quantity}
                      ></input>
                      <button
                        type="button"
                        class="btn btn-info"
                        onClick={() => this.incrementItem(idx)}
                        disabled={
                          item.quantity >= productsMap[item.product].quantity
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>{productsMap[item.product].price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-danger mb-3"
                      onClick={() => this.handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row justify-content-end">
            <div className="col-2">
              <h5>
                {" "}
                Total:{" "}
                {this.props.cart.reduce(
                  (total, item) =>
                    (total =
                      total + productsMap[item.product].price * item.quantity),
                  0
                )}
              </h5>
            </div>
          </div>
          <div className="container-fluid login-form col-12">
            <h3>Order Info </h3>
            <form className="form" onSubmit={this.handleAddToOrder}>
              <div className="form-group">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="ShippingAddress"
                    name="shippingAddress"
                    value={this.state.shippingAddress}
                    onChange={this.handleChange}
                  />
                  <label for="floatingInput">ShippingAddress</label>
                </div>
                </div>
                <div class="form-group">
                  <label for="payment-method" class="form-label mt-4">
                    Payment method
                  </label>
                  <select multiple="" class="form-select" id="payment-method" name="paymentMethod" value={this.state.paymentMethod} onChange={this.handleChange}>
                    <option>cash</option>
                    <option>credit/debit card</option>
                  </select>
                </div>
                <div class="form-group">
              <button
                className="buy btn btn-lg btn-success mb-6"
                // onClick={this.handleAddToOrder}
                disabled={this.isFormInvalid()}
              >
                BUY
              </button>
              </div>
            </form>
            </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid col-6">
          <h1> Shopping Cart</h1>
          <p>Your cart is empty</p>
        </div>
      );
    }
  }
}

export default CartPage;
