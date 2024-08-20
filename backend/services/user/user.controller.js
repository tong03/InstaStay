const User = require("./user.model");
const { jwtSecret } = require("../../config/util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Create a new user in the MongoDB
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt), // encrypt before sending to server
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("pass not ok");
    }
  } else {
    res.json("not found");
  }
};

const getUserProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = {
  registerUser,
  getUserProfile,
  loginUser,
  logoutUser,
};
