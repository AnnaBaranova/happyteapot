const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');


// public

router.post('/signup', usersCtrl.signup);

// protected


module.exports = router;