import react, { useState } from "react";
import { Link } from "react-router-dom";

const Order = ({ order, products, handleCancelOrder }) => {
  function checkStatus() {
    let status = "";
    if (!order.isPaid && !order.isShipped) {
      return (status = "received");
    } else if (order.isPaid && !order.isShipped) {
      return (status = "paid");
    } else {
      return (status = "shipped");
    }
  }

  const [show, setShow] = useState(false);
  console.log("products", products);

  // function buildProductMap(products) {
    let productsMap = {};
    products.forEach((el) => (productsMap[el._id] = el));
    console.log(productsMap);
  // }
  // const [productMap, setProductMap] = useState(buildProductMap(products));

  let details = show ? (
    <>
      <button className="btn btn-default" onClick={() => setShow(false)}>
        <h5> Show less </h5>
      </button>
      <h5>Details</h5>
      <p>ShippingAdress: {order.shippingAddress}</p>
      <p>Payment method: {order.paymentMethod}</p>
      <p>Status: {checkStatus()}</p>
      <table className="container-fluid table table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => (
            <tr key={idx} className="col-6">
              <td>
                <Link to={`/products/${item.product}`}>{productsMap[item.product].name}</Link>
              </td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <button className="btn btn-default" onClick={() => setShow(true)}>
      <h5>Show more</h5>
    </button>
  );

  return (
    <>
      <div className="container-fluid col-10">
        <h3>Order {order._id}</h3>
        <div>
          <table className="container-fluid table table-hover">
            <thead>
              <tr>
                <th scope="col">Created</th>
                <th scope="col">Quantity of items</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-success">
                <td>{order.createdAt.toString().slice(0, 10)}</td>
                <td>{order.items.length}</td>
                <td>{order.total} CAD</td>
                <td>Status</td>
                <td>
                  <button
                    className="btn btn-danger mb-3"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    {" "}
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {details}
        </div>
      </div>
    </>
  );
};

export default Order;
