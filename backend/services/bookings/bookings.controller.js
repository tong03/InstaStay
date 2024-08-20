const Booking = require("./bookings.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/util");

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

const createBooking = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

const getBooking = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Booking.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return res.status(404).json({ message: "Booking not found!" });
    }
    res.status(200).json({ message: "Booking cancelled successfully." });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while cancelling." });
  }
};

module.exports = {
  getBooking,
  createBooking,
  deleteBooking,
};
