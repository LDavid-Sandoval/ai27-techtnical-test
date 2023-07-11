const authService = require("../services/authService");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.json(user);
  } catch (error) {
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
    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
