const bcrypt = require("bcryptjs");
const User = require("../models/User");
const customResponse = require("../utils/customResponse");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return customResponse(res, 400, "User with this email already exists");
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
      });
      await newUser.save();

      const accessToken = generateToken(newUser);

      res.cookie("auth_token", accessToken, { httpOnly: true });

      return customResponse(res, 201, "User registered successfully");
    } else {
      return customResponse(res, 400, "Please provide a password");
    }
  } catch (error) {
    console.log("Error while registering User", error);
    return customResponse(res, 500, "Internal serve error", error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return customResponse(res, 404, "User not found with this email");
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return customResponse(res, 404, "Invalid Password");
    }
    const accessToken = generateToken(user);

    res.cookie("auth_token", accessToken, { httpOnly: true });

    return customResponse(res, 200, "Login Successfull", {
      email: user.email,
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    return customResponse(res, 500, "Internal server error", error.message);
  }
};

module.exports = { registerUser, loginUser };
