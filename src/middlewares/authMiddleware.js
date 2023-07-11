const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, `${process.env.HASH_PASSWORD}`);

    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { authenticateUser };
