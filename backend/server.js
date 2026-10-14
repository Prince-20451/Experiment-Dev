
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB error:", error.message));

app.get("/", (req, res) => {
  res.send("MERN backend is running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
