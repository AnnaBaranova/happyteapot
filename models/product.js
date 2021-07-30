const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema (
    {
        name: String,
        img: String,
        description: String,
        price: Number,
        quantity: Number,
        numReviews: Number,
        avRating: Number
    },
    {
        timestamps: true,
      }
);


module.exports = mongoose.model('Product', ProductSchema)