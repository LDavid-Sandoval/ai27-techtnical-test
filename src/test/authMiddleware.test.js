const jwt = require("jsonwebtoken");
const { authenticateUser } = require("../middlewares/authMiddleware");
const User = require("../database/models/User");
jest.mock("jsonwebtoken");
jest.mock("../database/models/User", () => ({
  findById: jest.fn(),
}));

describe("authenticateUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer token",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should authenticate the user and call the next middleware", async () => {
    // Arrange
    const decodedToken = { userId: "user-id" };
    jwt.verify.mockReturnValueOnce(decodedToken);
    const user = {
      _id: "user-id",
      username: "testuser",
      email: "test@example.com",
    };
    User.findById.mockResolvedValueOnce(user);

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(req.user).toEqual(user);
    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(next).toHaveBeenCalled();
  });

  it("should return an unauthorized error if the user is not found", async () => {
    // Arrange
    const decodedToken = { userId: "user-id" };
    jwt.verify.mockReturnValueOnce(decodedToken);
    User.findById.mockResolvedValueOnce(null);

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    expect(User.findById).toHaveBeenCalledWith("user-id");
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle errors and return an error message", async () => {
    // Arrange
    const error = new Error("Internal server error");
    jwt.verify.mockImplementation(() => {
      throw error;
    });
    const consoleSpy = jest.spyOn(console, "error");

    // Act
    await authenticateUser(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    expect(next).not.toHaveBeenCalled();
  });
});
