const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
}

function createJWT(user) {
  const payload = {
    user,
  };

  const options = {
    expiresIn: "24h",
  };
  return jwt.sign(
    payload, // data payload
    SECRET,
    options
  );
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        console.log(token);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function addToCart(req, res) {
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    console.log(req.body);
    const item = req.body;
    user.shoppingCart.push(item);
    await user.save();
    res.status(200).json(user.shoppingCart);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function removeFromCart(req, res) {
  try {
    // console.log(req.params.itemId);
    // const user = await User.findOne({ "shoppingCart._id": req.params.itemId });
    const user = await User.findById(req.params.id);
    console.log(user);
    const itemIndex = user.shoppingCart.findIndex((el) =>
      el._id.equals(req.params.itemId)
    );
    console.log(itemIndex);
    user.shoppingCart.splice(itemIndex, 1);
    user.save();
    return res.status(200).json(user.shoppingCart);
  } catch (err) {
    return res.status(400).json(err);
  }
}

module.exports = {
  signup,
  login,
  addToCart,
  removeFromCart,
};
