const authService = require("../services/authService");
const logger = require("../middlewares/logger");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    logger.info("data register:", { username, email });
    const user = await authService.registerUser(username, email, password);
    res.json(user);
  } catch (error) {
    logger.error("Failed to register user:", { error });
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { usernameOrEmail, password } = req.body;
    const { token, user } = await authService.loginUser(
      usernameOrEmail,
      password
    );
    logger.info("login user:", { username, email });
    res.json({ token, user });
  } catch (error) {
    logger.error("Failed to login user:", { error });
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
