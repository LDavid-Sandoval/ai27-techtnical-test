const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../database/models/User");
const { registerUser, loginUser } = require("../services/authService");

// Mock de la función bcrypt.hash
jest.mock("bcrypt", () => ({
  hash: jest.fn((password, saltRounds) =>
    Promise.resolve(`hashed-${password}`)
  ),
  compare: jest.fn((password, hashedPassword) =>
    Promise.resolve(password === hashedPassword)
  ),
}));

// Mock de la función User.findOne y User.save
jest.mock("../database/models/User", () => ({
  findOne: jest.fn(() => Promise.resolve({})),
  save: jest.fn(() => Promise.resolve({})),
}));

// Mock de la función jwt.sign
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked-token"),
}));

describe("loginUser", () => {
  it("should return a token and user if the credentials are valid", async () => {
    // Arrange
    const usernameOrEmail = "testuser";
    const password = "password";
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
      password: "hashed-password",
    };
    User.findOne.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(true);

    // Act
    const result = await loginUser(usernameOrEmail, password);

    // Assert
    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashed-password");
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: user._id },
      `${process.env.HASH_PASSWORD}`,
      {
        expiresIn: "1h",
      }
    );
    expect(result).toEqual({ token: "mocked-token", user });
  });

  it("should throw an error if the username or email is invalid", async () => {
    // Arrange
    const usernameOrEmail = "invaliduser";
    const password = "password";
    User.findOne.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(loginUser(usernameOrEmail, password)).rejects.toThrow(
      "Invalid username or email"
    );
    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  });

  it("should throw an error if the password is invalid", async () => {
    // Arrange
    const usernameOrEmail = "testuser";
    const password = "invalidpassword";
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
      password: "hashed-password",
    };
    User.findOne.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(false);

    // Act & Assert
    await expect(loginUser(usernameOrEmail, password)).rejects.toThrow(
      "Invalid username or email"
    );
    expect(User.findOne).toHaveBeenCalledWith({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, "hashed-password");
  });
});
