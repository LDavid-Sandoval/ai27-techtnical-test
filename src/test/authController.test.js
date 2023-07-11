const authService = require("../services/authService");
const { registerUser, loginUser } = require("../controllers/authController");

// Mock del servicio authService
jest.mock("../services/authService", () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
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
    // Arrange
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
    };
    authService.registerUser.mockResolvedValueOnce(user);

    // Act
    await registerUser(req, res);

    // Assert
    expect(authService.registerUser).toHaveBeenCalledWith(
      "testuser",
      "test@example.com",
      "password"
    );
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    authService.registerUser.mockRejectedValueOnce(error);
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await registerUser(req, res);

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
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

  it("should login the user and return the token and user data", async () => {
    // Arrange
    const token = "token";
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
    };
    authService.loginUser.mockResolvedValueOnce({ token, user });

    // Act
    await loginUser(req, res);

    // Assert
    expect(authService.loginUser).toHaveBeenCalledWith("testuser", "password");
    expect(res.json).toHaveBeenCalledWith({ token, user });
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
  });
});
