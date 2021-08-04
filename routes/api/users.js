const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/users");

// public

router.post("/signup", usersCtrl.signup);
router.post("/login", usersCtrl.login);

// protected
router.use(require('../../config/auth'));
router.post("/:id/cart", checkAuth, usersCtrl.addToCart);
router.delete("/:id/cart", checkAuth, usersCtrl.cleanCart);
router.delete("/:id/cart/:itemId", checkAuth, usersCtrl.removeFromCart);
router.put("/:id/cart/:itemId", checkAuth, usersCtrl.updateCart);




function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }


module.exports = router;
