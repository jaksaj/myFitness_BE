const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/myFitness");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Greška pri spajanju:", error);
});
db.once("open", function () {
  console.log("Spojeni smo na MongoDB bazu");
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
