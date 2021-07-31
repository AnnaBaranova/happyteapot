const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

router.post('/', productsCtrl.create);
router.get('/', productsCtrl.index);
router.get('/:id', productsCtrl.show);


module.exports = router;
