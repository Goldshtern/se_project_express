const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const likesRouter = require("./likes");
const NotFoundError = require("../errors/not-found-err");
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
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
