const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myFitness");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error while connecting to DB:", error);
});
db.once("open", function () {
  console.log("Connected to DB");
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
