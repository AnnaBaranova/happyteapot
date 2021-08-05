const Product = require('../models/product')

  async function create(req, res) {
    const product= await Product.findById(req.params.id);
    let review = req.body;
    product.reviews.push(review)
    const avRating = (product.reviews.reduce((acc, review) => acc + review.rating, 0)) / product.reviews.length
    product.avRating = avRating
    product.save()
    res.status(201).json(product);
  }





module.exports = {
    create

}