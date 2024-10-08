const asyncHandler = require("express-async-handler");
const Admin = require("../../models/Admin/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Booking, BookingHistory } = require("../../models/User/bookingModel");
const { User } = require("../../models/User/userModel");
const { Teacher } = require("../../models/Teacher/teacherModel");
const { Blog } = require("../../models/Admin/blogModel");
const Contact = require("../../models/Admin/contactModel");
const { HealthCategory } = require("../../models/Teacher/healthCategoryModel");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    res.status(403);
    throw new Error("Admin already exist with this email!");
  }

  const adminCount = await Admin.countDocuments();

  if (adminCount >= 2) {
    return res
      .status(403)
      .json({ message: "Cannot create more than 1 admin!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Admin registered successfully!", admin });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid email or password!" });
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: admin._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );

  return res.status(200).json({
    message: "Admin logged in successfully!",
    _id: admin._id,
    token: accessToken,
  });
});

const getTotalCounts = asyncHandler(async (req, res) => {
  const teachers = await Teacher.countDocuments();
  const users = await User.countDocuments();
  const bookings = await Booking.countDocuments();
  const blogs = await Blog.countDocuments();
  const contacts = await Contact.countDocuments();
  const services = await HealthCategory.countDocuments();
  const bookingHistory = await BookingHistory.countDocuments();

  res.status(200).json({
    totalUsers: users,
    totalTeachers: teachers,
    totalBookings: bookings,
    totalBlogs: blogs,
    totalContacts: contacts,
    totalServices: services,
    totalBookingHistorys: bookingHistory,
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getTotalCounts,
};
