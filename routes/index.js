const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { NONEXISTENT_ERROR_CODE } = require("../utils/errors");
const { createUser, login } = require("../controllers/users");
const {
  validateUserInfo,
  validateUserLogin,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);

router.post("/signup", validateUserInfo, createUser);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.use("/items", likesRouter);

router.use((req, res, next) => {
  const error = new Error("Requested resource not found");
  error.statusCode = NONEXISTENT_ERROR_CODE;
  next(error);
});

module.exports = router;
