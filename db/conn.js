const mongoose = require("mongoose");

// process.env.DATABASE is mongoose URI, passed from process.env object which is stored into .env file
const DB = process.env.DATABASE;

// this return promise
mongoose
  .connect(DB)
  .then(() => console.log("connection successful"))
  .catch((error) => console.log(error));
