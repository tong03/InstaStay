const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", getUserProfile);

module.exports = userRouter;
