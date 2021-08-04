const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: Number,
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    img: String,
    description: String,
    price: Number,
    quantity: Number,
    numReviews: Number,
    avRating: Number,
    reviews: [ReviewSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
