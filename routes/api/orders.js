const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/orders");

// protected
router.use(require('../../config/auth'));
router.post("/:id/orders", checkAuth, ordersCtrl.create);
router.get("/:id/orders", checkAuth, ordersCtrl.index);
router.delete("/:id/orders/:orderId", checkAuth, ordersCtrl.cancelOrder);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }


module.exports = router;
