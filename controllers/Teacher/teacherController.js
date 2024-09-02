const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Teacher } = require("../../models/Teacher/teacherModel");

const registerTeacher = asyncHandler(async (req, res) => {
  const {
    name,
    phone,
    specialization,
    age,
    experience,
    address,
    email,
    password,
  } = req.body;

  if (
    (!name,
    !phone,
    !specialization,
    !age,
    !experience,
    !address,
    !email,
    !password)
  ) {
    res.status(400);
    throw new Error("All fields required!");
  }

  const existingTeacher = await Teacher.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingTeacher) {
    res.status(400);
    throw new Error("Teacher with this email or phone already exists!");
  }

  if (!req.files || !req.files["aadharImg"]) {
    res.status(400);
    throw new Error("Aadhar Card is required!");
  }

  const aadharImg = req.files["aadharImg"][0].path;

  const specializationIds = specialization.map((id) =>
    mongoose.Types.ObjectId(id)
  );

  const bcryptedPassword = await bcrypt.hash(password, 10);

  const teacherEntry = await Teacher.create({
    name,
    phone,
    specialization: specializationIds,
    age,
    experience,
    address,
    aadharImg,
    email,
    password: bcryptedPassword,
  });

  if (!teacherEntry) {
    res.status(500);
    throw new Error({ message: "server error!" });
  }

  res.status(201).json({
    message: "Teacher registered successfully!",
    teacherEntry: {
      id: teacherEntry._id,
      name: teacherEntry.name,
      phone: teacherEntry.phone,
      specialization: teacherEntry.specialization,
      age: teacherEntry.age,
      experience: teacherEntry.experience,
      address: teacherEntry.address,
      aadharImg: teacherEntry.aadharImg,
      email: teacherEntry.email,
    },
  });
});

const loginTeacher = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(400);
    throw new Error("email and password is required!");
  }

  const teacher = await Teacher.findOne({ email });

  if (!teacher) {
    res.status(401);
    throw new Error({ message: "Invalid email or password!" });
  }

  const isPasswordMatch = await bcrypt.compare(password, teacher.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error({ message: "Invalid email or password!" });
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: teacher._id,
      },
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "90d" }
  );

  res.status(200).json({ message: "Loggedin successfully!", accessToken });
});

const updateTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  const {
    name = teacher.name,
    phone = teacher.phone,
    specialization = teacher.specialization,
    age = teacher.age,
    experience = teacher.experience,
    address = teacher.address,
    slot = teacher.slot,
    socialHandle = teacher.socialHandle,
    description = teacher.description,
  } = req.body;

  const specializationIds = specialization.map((id) =>
    mongoose.Types.ObjectId(id)
  );

  const updatedTeacherEntry = await Teacher.findByIdAndUpdate(
    teacherId,
    {
      name,
      phone,
      specialization: specializationIds,
      age,
      experience,
      address,
      slot,
      socialHandle,
      description,
    },
    { new: true }
  );

  if (!updatedTeacherEntry) {
    res.status(500);
    throw new Error({ message: "server error!" });
  }

  res.status(200).json({
    message: "Teacher updated successfully!",
    updatedTeacherEntry,
  });
});

const getAllTeachers = asyncHandler(async (req, res) => {
  const teacherEntrys = await Teacher.find()
    .select("-password")
    .sort({ createdAt: -1 });

  if (!teacherEntrys) {
    res.status(404);
    throw new Error("Teacher not found!");
  }

  res.status(200).json(teacherEntrys);
});

const getSingleTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacherEntry = await Teacher.findById(teacherId).select("-password");

  if (!teacherEntry) {
    res.status(404);
    throw new Error("Teacher not found!");
  }

  res.status(200).json(teacherEntry);
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const teacherEntry = await Teacher.findByIdAndDelete(teacherId);

  if (!teacherEntry) {
    res.status(404);
    throw new Error("Teacher not found!");
  }

  res.status(200).json({ message: "Teacher deleted successfully!" });
});

module.exports = {
  registerTeacher,
  loginTeacher,
  updateTeacher,
  getAllTeachers,
  getSingleTeacher,
  deleteTeacher,
};
