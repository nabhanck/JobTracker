const jwt = require("jsonwebtoken");
const customResponse = require("../utils/customResponse");

const authMiddleware = (req, res, next) => {
  const authToken = req?.cookies?.auth_token;

  if (!authToken) return customResponse(res, 401, "Authentication required");

  try {
    const decode = jwt.verify(authToken, process.env.secret_key);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return customResponse(res, 401, "Invalid token or expired");
  }
};
module.exports = authMiddleware;
