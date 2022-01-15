const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
// console.log(cookieParser())
router.use(cookieParser());

// database
require("../db/conn");

// userschema
const User = require("../model/userSchema");

///////////////////////////////////////////////////// USINg Promises ////////////////////////////////////////////////////////////////////////////
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   // validation
//   if (!name || !email || !phone || !work | !password || !cpassword) {
//     return res.status(422).json({ error: "Empty field are not allowed" });
//   }

//   // { email defined in userschema/database : email in request body}
//   // it return promise
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exist" });
//       }

//       //from here we start uploading data on mongodb database
//       const user = new User({ name, email, phone, work, password, cpassword });
//       //it return promise
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "user registered successfully" });
//         })
//         .catch((error) =>
//           res.status(500).json({ error: "Failed to registered" })
//         );
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

/////////////////////////////////////////////////////// USING ASYNC/AWAIT ///////////////////////////////////////////////////////////////////////
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Empty field are not allowed" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ error: "password and cpassword are not same" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// login route
router.post("/login", async (req, res) => {
  // console.log(req);
  // console.log(req.body);
  const { email, password } = req.body;

  // Validation Check
  if (!email || !password) {
    return res.status(400).json({ error: "Empty fields are not allowed" });
  }
  try {
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      // console.log(isMatch);
      // we are getting all data in userLogin like name, number etc thats why we are using userLogin.generateAuthToken instead of jwt.generateAuthToken
      // it return promise
      // console.log(token);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credientials" });
      } else {
        const token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        return res.status(201).json({ message: "user signin successfully" });
      }
    } else {
      return res.status(400).json({ error: "Invalid credientials" });
    }
  } catch (error) {
    console.log(error);
  }
});

//  about me page
router.get("/aboutme", authenticate, (req, res) => {
  // req.rootUser from authenticate middleware
  // console.log(req.rootUser);
  res.send(req.rootUser);
});

// get user data for contactus and home page
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// contact page
router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ error: "Please filled the contact form" });
    }
    // req.userId from authenticate middleware
    const userContact = await User.findOne({ _id: req.userID });
    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userContact.save();
      res.status(201).json({ message: "user contact successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

// home page
router.get("/home", authenticate, (req, res) => {
  // console.log(req.rootUser)
  res.send(req.rootUser);
});

// lougout page
// to logout we have ro clear cookie
router.get("/logout", (req, res) => {
  // console.log(req.rootUser)
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
