const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const reviewsCtrl = require("../../controllers/reviews");

router.post('/:id/reviews', reviewsCtrl.create);



module.exports = router;