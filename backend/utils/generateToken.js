const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { email: user.email, userId: user._id },
    process.env.secret_key,
    {
      expiresIn: "90d",
    }
  );
};

module.exports = generateToken;
