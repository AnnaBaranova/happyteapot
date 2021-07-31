const { Schema, model } = require("mongoose");

const ShoppingCartSchema = new Schema(
  {
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
      items: Number


  },
  {
    timestamps: true,
  }
);

module.exports = model("ShoppingCart", ShoppingCartSchema);
