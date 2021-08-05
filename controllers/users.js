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
    const item = req.body;
    const itemIndex = user.shoppingCart.findIndex((el) =>
      el.product.equals(item.product)
    );
    console.log("itemIndex", itemIndex);
    if (itemIndex === -1) {
      user.shoppingCart.push(item);
    } else {
      user.shoppingCart[itemIndex].quantity =
        user.shoppingCart[itemIndex].quantity + item.quantity;
    }
    await user.save();
    console.log("user after save", user);
    res.status(200).json(user.shoppingCart);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function removeFromCart(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const itemIndex = user.shoppingCart.findIndex((el) =>
      el._id.equals(req.params.itemId)
    );
    user.shoppingCart.splice(itemIndex, 1);
    user.save();
    return res.status(200).json(user.shoppingCart);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function updateCart(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const itemIndex = user.shoppingCart.findIndex((el) =>
      el._id.equals(req.params.itemId)
    );
    const newQuantity = req.body.quantity;
    user.shoppingCart[itemIndex].quantity = newQuantity;
    user.save();
    return res.status(200).json(user.shoppingCart);
  } catch (err) {
    return res.status(400).json(err);
  }
}

async function cleanCart(req, res) {
  try {
    const user = await User.findById(req.params.id);
    user.shoppingCart = []
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
  updateCart,
  cleanCart
};
