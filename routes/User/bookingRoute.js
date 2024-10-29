const express = require("express");
const {
  bookService,
  assignTeacher,
  completeBooking,
  getBookings,
  getBookingHistoryForAdmin,
  getBookingHistoryForUser,
  getBookingHistoryForTeacher,
  getBookingsByTeacher,
} = require("../../controllers/User/bookingController");
const validateToken = require("../../middleware/validateToken");

const router = express.Router();

router.post("/book", validateToken, bookService);
router.patch("/assign/:bookingId/:teacherId", assignTeacher);
router.patch("/complete/:id", completeBooking);
router.get("/bookings", getBookings);
router.get("/teacher/:id", getBookingsByTeacher);
router.get("/adminHistory", getBookingHistoryForAdmin);
router.get("/userHistory", validateToken, getBookingHistoryForUser);
router.get("/teacherHistory", validateToken, getBookingHistoryForTeacher);

module.exports = router;
