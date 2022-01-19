const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: false },
    // email: { type: String, required: false },
    // password: { type: String, required: false },
  },
  { timestamps: true },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
