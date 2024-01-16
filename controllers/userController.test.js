const { createUser, loginUser } = require("./userController");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mock dependencies
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/user");

describe("User Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createUser - success", async () => {
    const req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "testpassword",
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    bcrypt.hash.mockResolvedValue("hashedPassword");

    const saveMock = jest.fn().mockResolvedValue({ _id: "mockUserId" });
    User.prototype.save = saveMock;

    jwt.sign.mockReturnValue("mockToken");

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      savedUser: { _id: "mockUserId" },
      token: "mockToken",
    });
  });
});
