const express = require("express");
const {
  getBooking,
  createBooking,
  deleteBooking,
} = require("./bookings.controller");

const bookingRouter = express.Router();

bookingRouter.route("/").get(getBooking).post(createBooking);

bookingRouter.route("/:id").delete(deleteBooking);

module.exports = bookingRouter;
