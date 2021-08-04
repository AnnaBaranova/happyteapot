import react from "react";
import { Link } from "react-router-dom";

const Order = ({ order, handleCancelOrder }) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  const dateString = order.createdAt;
  return (
    <>
      <div className="container-fluid col-10">
        <h3>Order {order._id}</h3>
        <div>
          <table className="container-fluid table table-hover">
            <thead>
              <tr>
                <th scope="col"># of Order</th>
                <th scope="col">Created</th>
                <th scope="col">Quantity of items</th>
                <th scope="col">Total</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
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
        </div>

        <h5>Details</h5>
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
                  <Link to={`/products/${item.product}`}>{item.product}</Link>
                </td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
