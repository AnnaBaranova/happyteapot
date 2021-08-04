import React from "react";
import Order from "../../components/Order/Order";
import orderService from "../../utils/orderService";

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

    async componentDidMount() {
      const orders = await this.props.getOrders();
    //   console.log("get orders_did mount", orders);
    //   this.props.setOrders({ orders });
    }

  handleCancelOrder = async (id) => {
    console.log("OrderID", id);
    const newOrders = await orderService.cancelOrder(this.props.user._id, id);
    // this.props.setOrders(newOrders);
    const orders = await this.props.getOrders();
};

  render() {
    return (
      <div className="container-fluid">
        <h1> My Orders </h1>
        <div className="container-fluid">
          {this.props.orders.reverse().map((order, idx) => (
            <div key={idx} className="col">
              <Order handleCancelOrder={this.handleCancelOrder} order={order} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default OrderPage;
