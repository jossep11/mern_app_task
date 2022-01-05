const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : "mongodb://localhost:27017/database-test";

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is connected");
});
