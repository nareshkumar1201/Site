const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(404).json({ errors: [{ msg: "Unauthorised access" }] });
  }

  try {
    const payload = jwt.verify(token, config.get("jwtSecret"));
    // console.log(payload);
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
};
