const mongoose = require("mongoose");
const { createExerciseAndAddToWorkout } = require("./exerciseController");
const { Exercise } = require("../models/exercise");
const { Workout } = require("../models/workout");

jest.mock("../models/exercise");
jest.mock("../models/workout");

describe("Exercise Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createExerciseAndAddToWorkout", () => {
    it("should create and save a new exercise, add it to the workout, and return the exercise", async () => {
      const req = {
        body: {
          workoutId: "fakeWorkoutId",
          exerciseDetails: {
            name: "Test Exercise",
          },
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Exercise.prototype.save.mockResolvedValueOnce({
        _id: "fakeExerciseId",
        name: "Test Exercise",
      });

      Workout.findById.mockResolvedValueOnce({
        exercises: [],
        save: jest.fn(),
      });

      await createExerciseAndAddToWorkout(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        _id: "fakeExerciseId",
        name: "Test Exercise",
      });
    });

    it("should handle errors and return a 500 status code", async () => {
      const req = {
        body: {
          workoutId: "fakeWorkoutId",
          exerciseDetails: {
            name: "Test Exercise",
          },
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Exercise.prototype.save.mockRejectedValueOnce(new Error("Save error"));

      await createExerciseAndAddToWorkout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
