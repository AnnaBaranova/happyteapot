import react from "react";

const Order = (props) => {
  return (
    <>
      <div className="container-fluid col-6">
        <h1>Order #</h1>
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
            <th>Order_id </th>
            <td>Time</td>
            <td>4</td>
            <td>1235 CAD</td>
            <td>Paid</td>
            <td>
              <button className="btn btn-danger mb-3"> Cancel</button>
            </td>
          </tbody>
        </table>
        <h1>Details</h1>
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
            <th>Product</th>
            <td>20</td>
            <td>4</td>
            <td>1235 CAD</td>
            <td>
              <button className="btn btn-danger mb-3"> Cancel</button>
            </td>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
