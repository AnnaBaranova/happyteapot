import React from "react";
import { Link } from "react-router-dom";
// import product from "../../../models/product";
import "./CartPage.css";
import userService from "../../utils/userService";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    // const productsMap = props.products.map((el) => {
    //   return { el._id : el };
    // });
    this.state = {};
  }

  handleRemoveFromCart = async (id) => {
    // e.preventDefault();
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

  render() {
    const productsMap = {};
    this.props.products.forEach((el) => (productsMap[el._id] = el));
    console.log(productsMap);

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
                    <input className="" readOnly value={item.quantity}></input>
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
              Total: {" "}
              {this.props.cart.reduce(
                (total, item) =>
                  (total =
                    total + productsMap[item.product].price * item.quantity),
                0
              )}
            </h5>
          </div>
          <div className="col-2">
            <button className="buy btn btn-lg btn-success mb-3">BUY</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
