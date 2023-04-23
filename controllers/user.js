import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        urls: user.urls,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

//@description     Register new user
//@route           POST /api/users/register
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(404).json({ msg: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    await user.save();

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        urls: user.urls,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export { authUser, registerUser };
