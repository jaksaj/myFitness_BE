const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const app = require("./authMiddleware");
const authenticateToken = require("./authMiddleware");

jest.mock("jsonwebtoken");

describe("authenticateToken middleware tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should pass authentication with valid token", async () => {
    const validToken = "valid-token";
    const req = {
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    };
    const res = {};
    const next = jest.fn();

    jwt.verify.mockReturnValue({ userId: "user123" });

    await authenticateToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(validToken, "your-secret-key");
    expect(req.userId).toBe("user123");
    expect(next).toHaveBeenCalled();
  });

  test("should return 401 with missing token", async () => {
    const req = {
      headers: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized - Missing or invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 with invalid token", async () => {
    const invalidToken = "invalid-token";
    const req = {
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await authenticateToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(invalidToken, "your-secret-key");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized - Invalid token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
