const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/User/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, gender, age, weight, address, email, password } =
    req.body;

  if ((!name, !phone, !gender, !age, !weight, !address, !email, !password)) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

  if (existingUser) {
    res.status(400);
    throw new Error("User with this email or phone already exists!");
  }

  const bcryptedPassword = await bcrypt.hash(password, 10);

  const userEntry = await User.create({
    name,
    phone,
    gender,
    age,
    weight,
    address,
    email,
    password: bcryptedPassword,
  });

  res.status(201).json({
    message: "User registered successfully!",
    userEntry: {
      id: userEntry._id,
      name: userEntry.name,
      phone: userEntry.phone,
      gender: userEntry.gender,
      age: userEntry.age,
      weight: userEntry.weight,
      address: userEntry.address,
      email: userEntry.email,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(400);
    throw new Error("email and password is required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: user._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );

  res.status(200).json({ message: "Loggedin successfully!", accessToken });
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  const {
    name = user.name,
    phone = user.phone,
    gender = user.gender,
    age = user.age,
    weight = user.weight,
    address = user.weight,
  } = req.body;

  const updatedUserEntry = await User.findByIdAndUpdate(
    userId,
    {
      name,
      phone,
      gender,
      age,
      weight,
      address,
    },
    { new: true }
  );

  if (!updatedUserEntry) {
    res.status(500);
    throw new Error("server error!");
  }

  res.status(200).json({
    message: "User updated successfully!",
    updatedUserEntry,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const userEntrys = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  if (!userEntrys) {
    res.status(404);
    throw new Error("User not found!");
  }

  res.status(200).json(userEntrys);
});

const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const userEntry = await User.findById(userId).select("-password");

  if (!userEntry) {
    res.status(404);
    throw new Error("User not found!");
  }

  res.status(200).json(userEntry);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const userEntry = await User.findByIdAndDelete(userId);

  if (!userEntry) {
    res.status(404);
    throw new Error("User not found!");
  }

  res.status(200).json({ message: "User deleted successfully!" });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
