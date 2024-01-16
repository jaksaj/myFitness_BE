const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Exercise } = require("./exercise");

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
  await Exercise.deleteMany({});
});

describe("Exercise Model Tests", () => {
  test("should create an exercise with default values", async () => {
    const exerciseData = { name: "Push-up" };
    const createdExercise = await Exercise.create(exerciseData);

    expect(createdExercise.name).toBe("Push-up");
    expect(createdExercise.reps).toBe(0);
    expect(createdExercise.sets).toBe(0);
  });

  test("should create an exercise with specified values", async () => {
    const exerciseData = { name: "Squats", reps: 15, sets: 3 };
    const createdExercise = await Exercise.create(exerciseData);

    expect(createdExercise.name).toBe("Squats");
    expect(createdExercise.reps).toBe(15);
    expect(createdExercise.sets).toBe(3);
  });

  test('should require "name" field', async () => {
    const exerciseData = { reps: 10, sets: 2 };
    try {
      await Exercise.create(exerciseData);
    } catch (error) {
      expect(error.message).toContain(
        "Exercise validation failed: name: Path `name` is required."
      );
    }
  });
});
