const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

//const auth = (req, res, next) => {
//const { authorization } = req.headers;
//if (!authorization || !authorization.startsWith("Bearer ")) {
//return res
//.status(UNAUTHORIZED_ERROR_CODE)
//.send({ message: "Authorization required" });
//}
//const token = authorization.replace("Bearer ", "");
//let payload;
//try {
//payload = jwt.verify(token, JWT_SECRET);
//} catch (err) {
//return res
//.status(UNAUTHORIZED_ERROR_CODE)
//.send({ message: "Authorization required" });
//}
//req.user = payload;
//return next();
//};
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new Error("Authorization required");
    error.statusCode = UNAUTHORIZED_ERROR_CODE;
    throw error;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    const error = new Error("Authorization required");
    error.statusCode = UNAUTHORIZED_ERROR_CODE;
    throw error;
  }

  next();
};

module.exports = auth;
