const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("./user");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe("User Model Tests", () => {
  test("should create a user with valid data", async () => {
    const userData = {
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    };
    const createdUser = await User.create(userData);

    expect(createdUser.username).toBe("testuser");
    expect(createdUser.email).toBe("test@example.com");
  });

  test('should require "username", "email", and "password" fields', async () => {
    const invalidUserData = {};
    try {
      await User.create(invalidUserData);
    } catch (error) {
      expect(error.message).toContain("User validation failed:");
      expect(error.message).toContain("username: Path `username` is required.");
      expect(error.message).toContain("email: Path `email` is required.");
      expect(error.message).toContain("password: Path `password` is required.");
    }
  });
});
