const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Workout } = require("./workout");

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
  await Workout.deleteMany({});
});

describe("Workout Model Tests", () => {
  test("should create a workout with valid data", async () => {
    const workoutData = {
      name: "Cardio Workout",
      exercises: [],
      type: "PUSH",
    };
    const createdWorkout = await Workout.create(workoutData);

    expect(createdWorkout.name).toBe("Cardio Workout");
    expect(createdWorkout.type).toBe("PUSH");
  });

  test('should require "name" and "type" fields', async () => {
    const invalidWorkoutData = {};
    try {
      await Workout.create(invalidWorkoutData);
    } catch (error) {
      expect(error.message).toContain("Workout validation failed:");
      expect(error.message).toContain("name: Path `name` is required.");
      expect(error.message).toContain("type: Path `type` is required.");
    }
  });

  test('should validate "type" against enum values', async () => {
    const invalidWorkoutData = {
      name: "Strength Workout",
      type: "INVALID_TYPE",
    };
    try {
      await Workout.create(invalidWorkoutData);
    } catch (error) {
      expect(error.message).toContain("Workout validation failed:");
      expect(error.message).toContain(
        "type: `INVALID_TYPE` is not a valid enum value for path `type`."
      );
    }
  });
});
