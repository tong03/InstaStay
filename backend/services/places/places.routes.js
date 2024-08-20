const express = require("express");
const {
  createUserPlace,
  getUserPlaces,
  updateUserPlace,
  getPlaceByID,
  getAllPlaces,
} = require("./places.controller");

const publicPlaceRouter = express.Router();
const verifiedPlaceRouter = express.Router();

// Verified Place Router
verifiedPlaceRouter
  .route("/")
  .post(createUserPlace)
  .get(getUserPlaces)
  .put(updateUserPlace);

// Public Place Router
publicPlaceRouter.get("/:id", getPlaceByID);
publicPlaceRouter.get("/", getAllPlaces);

module.exports = {
  publicPlaceRouter,
  verifiedPlaceRouter,
};
