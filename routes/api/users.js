const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// public

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);
router.post("/:id/cart", usersCtrl.addToCart);
router.delete("/:id/cart/:itemId", usersCtrl.removeFromCart);
router.put("/:id/cart/:itemId", usersCtrl.updateCart);

// protected
router.use(require('../../config/auth'));



function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }


module.exports = router;
