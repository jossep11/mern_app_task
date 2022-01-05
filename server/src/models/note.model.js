const mongoose = require("mongoose");

const Notes = new mongoose.Schema(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true },
  { collection: "Note" }
);

const model = mongoose.model("Note", Notes);

module.exports = model;
