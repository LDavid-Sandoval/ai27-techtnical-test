const authService = require("../services/authService");
const { registerUser, loginUser } = require("../controllers/authController");
const logger = require("../middlewares/logger");

jest.mock("../services/authService", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
}));

jest.mock("../middlewares/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe("registerUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should register the user and return the user data", async () => {
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
    };
    authService.registerUser.mockResolvedValueOnce(user);

    await registerUser(req, res);

    expect(authService.registerUser).toHaveBeenCalledWith(
      "testuser",
      "test@example.com",
      "password"
    );
    expect(res.json).toHaveBeenCalledWith(user);
    expect(logger.info).toHaveBeenCalledWith("data register:", {
      username: "testuser",
      email: "test@example.com",
    });
  });

  it("should handle errors and return an error message", async () => {
    const error = new Error("Internal server error");
    authService.registerUser.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    await registerUser(req, res);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(logger.error).toHaveBeenCalledWith("Failed to register user:", {
      error,
    });
  });
});

describe("loginUser", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        usernameOrEmail: "testuser",
        password: "password",
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    authService.loginUser.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await loginUser(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(logger.error).toHaveBeenCalledWith("Failed to login user:", {
      error,
    });
  });
});
