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
    // Mock request and response objects
    const req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "testpassword",
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    // Mock bcrypt.hash
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock User.save
    const saveMock = jest.fn().mockResolvedValue({ _id: "mockUserId" });
    User.prototype.save = saveMock;

    // Mock jwt.sign
    jwt.sign.mockReturnValue("mockToken");

    // Execute the createUser function
    await createUser(req, res);

    // Check if the response is as expected
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      savedUser: { _id: "mockUserId" },
      token: "mockToken",
    });
  });

  // Add more test cases for createUser function (e.g., error cases)

  // ...

  // test('loginUser - success', async () => {
  //     // Mock request and response objects
  //     const req = { body: { userData: { email: 'test@example.com', password: 'testpassword' } } };
  //     const res = { status: jest.fn(), json: jest.fn() };

  //     // Mock User.findOne
  //     const findOneMock = jest.fn().mockResolvedValue({ _id: 'mockUserId', password: 'hashedPassword' });
  //     User.findOne = findOneMock;

  //     // Mock bcrypt.compare
  //     bcrypt.compare.mockResolvedValue(true);

  //     // Mock jwt.sign
  //     jwt.sign.mockReturnValue('mockToken');

  //     // Execute the loginUser function
  //     await loginUser(req, res);

  //     // Check if the response is as expected
  //     expect(res.status).toHaveBeenCalledWith(200);

  //     // Check if res.json is defined and is a function before using it
  //     if (res.json && typeof res.json === 'function') {
  //       expect(res.json).toHaveBeenCalledWith({
  //         message: 'Login successful',
  //         user: { _id: 'mockUserId' },
  //         token: 'mockToken',
  //       });
  //     } else {
  //       // Handle case where res.json is not defined or not a function
  //       throw new Error("res.json is not defined or not a function");
  //     }
  //   });

  // Add more test cases for loginUser function (e.g., error cases)
});
