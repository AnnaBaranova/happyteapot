const express = require("express");
const router = express.Router();
const ordersCtrl = require("../../controllers/orders");

router.post("/:id/orders", ordersCtrl.create);
router.get("/:id/orders", ordersCtrl.index);
router.delete("/:id/orders/:orderId", ordersCtrl.cancelOrder);

module.exports = router;
