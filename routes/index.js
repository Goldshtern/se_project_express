const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { NONEXISTENT_ERROR_CODE } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);

router.post("/signup", createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/items", likesRouter);

router.use((req, res) => {
  res
    .status(NONEXISTENT_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
