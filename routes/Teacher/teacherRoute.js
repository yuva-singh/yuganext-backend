const express = require("express");
const {
  registerTeacher,
  loginTeacher,
  getAllTeachers,
  getSingleTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../../controllers/Teacher/teacherController");
const uploadToCloudinary = require("../../middleware/uploadToCloudnary");

const router = express.Router();

router.post(
  "/register",
  uploadToCloudinary("teacher", ["aadharImg"], [2]),
  registerTeacher
);
router.post("/login", loginTeacher);
router.put("/update/:id", updateTeacher);
router.get("/all", getAllTeachers);
router.get("/single/:id", getSingleTeacher);
router.delete("/delete/:id", deleteTeacher);

module.exports = router;
