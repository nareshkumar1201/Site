const express = require("express");
const router = express.Router();
const RegUser = require("../model/registeredUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

// method POST -- AS WE GET REGISTERED USER INFO as POST REQ
// ROUTE SAFTY --PUBLIC
router.post(
  "/",
  [
    body("username", "username is required").not().isEmpty(),
    body("email", "please enter valid email").isEmail(),
    body("password", "password must be min 8 char length").isLength({ min: 8 }),
  ],
  async (req, res, next) => {
    console.log("came request to register user");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body;

    try {
      const user = await RegUser.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "email already register",
            },
          ],
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      console.log(hashPassword);

      newUser = new RegUser({
        username: username,
        email: email,
        password: hashPassword,
      });

      newUser.save();
      const payload = {
        user: {
          id: newUser._id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 350000 },
        (err, token) => {
          if (err) {
            return res
              .status(404)
              .json({ errors: [{ msg: "unauthorised access denied" }] });
          }
          return res.json({
            msg: "successfully registed",
            token: token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
