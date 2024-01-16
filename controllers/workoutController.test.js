const {
  addWorkoutToTrainingProgram,
  removeWorkoutFromTrainingProgram,
  getWorkoutsForTrainingProgram,
} = require("./workoutController");
const { TrainingProgram } = require("../models/trainingProgram");
const { Workout } = require("../models/workout");

jest.mock("../models/trainingProgram");
jest.mock("../models/workout");

describe("Training Program Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("addWorkoutToTrainingProgram - success", async () => {
    const req = {
      body: {
        trainingProgramId: "mockTrainingProgramId",
        workoutDetails: {
        },
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockTrainingProgram = {
      _id: "mockTrainingProgramId",
      workouts: [],
      save: jest.fn(),
    };

    TrainingProgram.findById.mockResolvedValue(mockTrainingProgram);

    const mockSavedWorkout = {
      _id: "mockWorkoutId",
    };

    Workout.mockReturnValue({
      save: jest.fn().mockResolvedValue(mockSavedWorkout),
    });

    await addWorkoutToTrainingProgram(req, res);

    expect(TrainingProgram.findById).toHaveBeenCalledWith(
      "mockTrainingProgramId"
    );
    expect(Workout).toHaveBeenCalledWith(req.body.workoutDetails);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTrainingProgram);
  });
});
