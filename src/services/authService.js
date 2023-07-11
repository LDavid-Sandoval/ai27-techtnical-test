const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");

async function registerUser(username, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    return { message: "User created successfully" };
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(usernameOrEmail, password) {
  const user = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    throw new Error("Invalid username or email");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or email");
  }

  const token = jwt.sign({ userId: user._id }, `${process.env.HASH_PASSWORD}`, {
    expiresIn: "1h",
  });

  return { token, user };
}

module.exports = { registerUser, loginUser };
