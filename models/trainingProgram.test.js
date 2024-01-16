const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { TrainingProgram } = require("./trainingProgram");
const { TrainingProgramType } = require("../constants");

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
  await TrainingProgram.deleteMany({});
});

describe("TrainingProgram Model Tests", () => {
  test("should create a training program with default values", async () => {
    const programData = {
      userId: "user123",
      name: "Beginner Program",
      type: TrainingProgramType.PPL,
    };
    const createdProgram = await TrainingProgram.create(programData);

    expect(createdProgram.userId).toBe("user123");
    expect(createdProgram.name).toBe("Beginner Program");
    expect(createdProgram.type).toBe(TrainingProgramType.PPL);
    expect(createdProgram.workouts).toHaveLength(0);
  });

  test("should create a training program with specified values", async () => {
    const programData = {
      userId: "user456",
      name: "Advanced Program",
      type: TrainingProgramType.PPL,
      workouts: [],
    };
    const createdProgram = await TrainingProgram.create(programData);

    expect(createdProgram.userId).toBe("user456");
    expect(createdProgram.name).toBe("Advanced Program");
    expect(createdProgram.type).toBe(TrainingProgramType.PPL);
    expect(createdProgram.workouts).toHaveLength(0);
  });

  test('should require "userId", "name", and "type" fields', async () => {
    const programData = { workouts: [] };
    try {
      await TrainingProgram.create(programData);
    } catch (error) {
      expect(error.message).toContain("TrainingProgram validation failed:");
      expect(error.message).toContain("userId: Path `userId` is required.");
      expect(error.message).toContain("name: Path `name` is required.");
      expect(error.message).toContain("type: Path `type` is required.");
    }
  });

  test('should reject invalid "type" values', async () => {
    const programData = {
      userId: "user789",
      name: "Invalid Type Program",
      type: "InvalidType",
      workouts: [],
    };
    try {
      await TrainingProgram.create(programData);
    } catch (error) {
      expect(error.message).toContain("TrainingProgram validation failed:");
      expect(error.message).toContain(
        "type: `InvalidType` is not a valid enum value for path `type`."
      );
    }
  });
});
