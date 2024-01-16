const {
  createTrainingProgram,
  getTrainingProgramsForUser,
  deleteTrainingProgram,
} = require("./trainingProgramController");
const { TrainingProgram } = require("../models/trainingProgram");
const { Workout } = require("../models/workout");

jest.mock("../models/trainingProgram");
jest.mock("../models/workout");

describe("Training Program Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createTrainingProgram - success", async () => {
    const req = {
      body: { name: "Program 1", type: "Strength" },
      userId: "mockUserId",
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const saveMock = jest.fn().mockResolvedValue({ _id: "mockProgramId" });
    TrainingProgram.mockImplementation(() => ({ save: saveMock }));

    await createTrainingProgram(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: "mockProgramId" });
  });

  test("getTrainingProgramsForUser - success", async () => {
    const req = { userId: "mockUserId" };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const findMock = jest
      .fn()
      .mockResolvedValue([
        { _id: "mockProgramId", name: "Program 1", type: "Strength" },
      ]);
    TrainingProgram.find.mockImplementationOnce(() => ({ exec: findMock }));

    await getTrainingProgramsForUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { _id: "mockProgramId", name: "Program 1", type: "Strength" },
    ]);
  });

  test("deleteTrainingProgram - success", async () => {
    const req = { params: { trainingProgramId: "mockProgramId" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const findByIdAndDeleteMock = jest
      .fn()
      .mockResolvedValue({ _id: "mockProgramId" });
    TrainingProgram.findByIdAndDelete.mockResolvedValueOnce(
      findByIdAndDeleteMock
    );

    await deleteTrainingProgram(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Training program deleted successfully",
    });
  });
});
