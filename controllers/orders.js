const User = require("../models/user");
const Order = require("../models/order");

async function create(req, res) {
  console.log(req.params);
  //   const user = await User.findById(req.params.id);
  let order = req.body;
  order.user = req.params.id;
  console.log(order);
  order = await Order.create(order);
  res.status(201).json(order);
}

async function index(req, res) {
  const orders = await Order.find({user: req.params.id});
  res.status(200).json(orders);
}


async function cancelOrder(req, res) {
    console.log("orderId", req.params.orderId)
    const canceledOrder = await Order.findByIdAndRemove(req.params.orderId);
    res.status(200).json(canceledOrder);
}

module.exports = {
  create,
  index,
  cancelOrder
};
