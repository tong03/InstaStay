const express = require("express");
const cors = require("cors");

// Service Routes
const bookingRouter = require("./services/bookings/bookings.routes");
const {
  verifiedPlaceRouter,
  publicPlaceRouter,
} = require("./services/places/places.routes");
const userRouter = require("./services/user/user.routes");
// DB Model
const mongoose = require("mongoose");

// Utils
require("dotenv").config();
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

// Starting app
const app = express();

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.use("/user", userRouter);

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.use("/user-places", verifiedPlaceRouter);

app.use("/places", publicPlaceRouter);

app.use("/bookings", bookingRouter);

app.listen(4000);

// nAbRqXVjSe9nWHNl
