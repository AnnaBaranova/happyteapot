const User = require('../models/user');
// const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

async function signup(req, res) {
 const user = new User(req.body);
 try{
     await user.save();
     res.json({user})
 } catch(err){
     res.status(400).json(err)
 }
}



module.exports = {
signup
}