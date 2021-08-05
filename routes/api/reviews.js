const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const reviewsCtrl = require("../../controllers/reviews");

// protected
router.use(require('../../config/auth'));
router.post('/:id/reviews', checkAuth, reviewsCtrl.create);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }



module.exports = router;