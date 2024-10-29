const express = require("express");
const {
  bookService,
  assignTeacher,
  getBookings,
  getBookingHistoryForAdmin,
  getBookingHistoryForUser,
  getBookingHistoryForTeacher,
  getBookingsByTeacher,
  getBookingsByUser,
  updateBookingStatus,
} = require("../../controllers/User/bookingController");
const validateToken = require("../../middleware/validateToken");

const router = express.Router();

router.post("/book", validateToken, bookService);
router.patch("/assign/:bookingId/:teacherId", assignTeacher);
router.patch("/update/:id", updateBookingStatus);
router.get("/bookings", getBookings);
router.get("/teacher/:id", getBookingsByTeacher);
router.get("/user/:id", getBookingsByUser);
router.get("/adminHistory", getBookingHistoryForAdmin);
router.get("/userHistory", validateToken, getBookingHistoryForUser);
router.get("/teacherHistory", validateToken, getBookingHistoryForTeacher);

module.exports = router;
