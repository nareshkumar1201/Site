const express = require("express");
const router = express.Router();
const regDb = require("../model/registeredUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const middlewareAuth = require("../privateRoute/middlewareAuth");
// login req authentication -POST req
//functinalities --  check if user email registered (check details present in db)

router.post(
  "/",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password must be 8char length").isLength({ min: 8 }),
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    try {
      const regUser = await regDb.findOne({ email: email });
      if (!regUser) {
        return res
          .status(404)
          .json({ errors: [{ msg: "please register before login" }] });
      }
      const isMatch = await bcrypt.compare(password, regUser.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Password does not match with Registered password" }],
        });
      }

      const payload = {
        user: {
          id: regUser._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 350000 },
        (err, token) => {
          if (err) {
            return res.status(404).send("Unauthorised access denied");
          }
          return res.json({
            msg: "successfully loged in...",
            token: token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server error");
    }
  }
);

// GET request after login in
//access :private

router.get("/", middlewareAuth, async (req, res, next) => {
  try {
    // console.log("requrested user id", req.user);
    const user = await regDb.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    // console.log(err.message);
    return res.status(401).send("Server error");
  }
});

module.exports = router;
