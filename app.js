const express = require("express");
const mongoose = require("mongoose");

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
app.use((req, res, next) => {
  req.user = {
    _id: "66e4150288479f39fbda19b0",
  };
  next();
});

app.use("/", mainRouter);

console.log("Aleksandr");

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
