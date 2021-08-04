const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/products");

//public
router.get('/', productsCtrl.index);
router.get('/:id', productsCtrl.show);

// protected
router.use(require('../../config/auth'));
router.post('/', checkAuth, productsCtrl.create);
router.delete('/:id', checkAuth, productsCtrl.delete);
router.put('/:id', checkAuth, productsCtrl.update);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }


module.exports = router;
