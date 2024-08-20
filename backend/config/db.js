const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const db = async () => {
  try {
    const con = await mongoose.connect(MONGO_URL);
    console.log("mongodb connected: ", con.connection.host);
  } catch (error) {
    console.error(error);
  }
};

module.exports = db;
