const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

const mainRouter = require("./routes/index");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.use(cors());

app.use("/", mainRouter);

console.log("Aleksandr");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
