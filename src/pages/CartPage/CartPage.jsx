import React from "react";
import { Link } from "react-router-dom";
// import product from "../../../models/product";
import "./CartPage.css";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    // const productsMap = props.products.map((el) => {
    //   return { el._id : el };
    // });
    this.state = {};
  }
  render() {
      const productsMap = {}
      this.props.products.forEach(el => productsMap[el._id] = el)
      console.log(productsMap)

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
              <tr className="table-active">
                <th scope="row">
                  {" "}
                  <Link to="/">{productsMap[item.product].name}</Link>{" "}
                </th>
                <td>{productsMap[item.product].price}</td>
                <td>
                  {" "}
                  <div className="btn-toolbar">
                    <button type="button" class="btn btn-info">
                      -
                    </button>
                    <input className="" readOnly value={item.quantity}></input>
                    <button type="button" class="btn btn-info">
                      +
                    </button>
                  </div>
                </td>
                <td>{productsMap[item.product].price * item.quantity}</td>
                <td>
                  <button className="btn btn-danger mb-3">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CartPage;
