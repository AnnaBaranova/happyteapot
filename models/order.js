const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const OrderSchema = new mongoose.Schema(
  {
    items: [itemSchema],
    total: Number,
    isPaid: Boolean,
    isShipped: Boolean,
    shippingAddress: String,
    paymentMethod: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
