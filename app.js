const dotenv = require("dotenv");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

// dotenv
dotenv.config({ path: "./config.env" });
// console.log(process.env);

//database
require("./db/conn");

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

// PORT using dotenv
const PORT = process.env.PORT || 3006;

// Middleware

// Syntax: app.get(path, callback)
// app.get("/", function (request, response) {
//   //sending response whenever user in on path '/'..
//   response.send("Hello world from the server");
// });

// app.get("/aboutme", Middleware, function (request, response) {
//   response.send("Hello About ME");
// });

// app.get("/contact", function (request, response) {
//   response.send("Hello Contact");
// });

// app.get("/signon", function (request, response) {
//   response.send("Hello Sign In");
// });

// app.get("/signup", function (request, response) {
//   response.send("Hello Sign Up");
// });

// heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("server is running at port number 3006");
});
