const asyncHandler = require("express-async-handler");
const { Booking, BookingHistory } = require("../../models/User/bookingModel");

const bookService = asyncHandler(async (req, res) => {
  const userId = req.user;

  const { slot, specialization } = req.body;

  if ((!slot, !specialization)) {
    res.status(400);
    throw new Error("Slot and Specialization is required!");
  }

  const bookingEntry = await Booking.create({
    slot,
    specialization,
    userData: userId,
  });

  if (!bookingEntry) {
    res.status(500);
    throw new Error("server error!");
  }

  res
    .status(201)
    .json({ message: "service booked successfully!", bookingEntry });
});

const assignTeacher = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;
  const teacherId = req.params.teacherId;

  const teacherAssigned = await Booking.findByIdAndUpdate(
    bookingId,
    {
      teacherData: teacherId,
      isAssigned: true,
    },
    { new: true }
  );

  if (!teacherAssigned) {
    res.status(404);
    throw new Error("Booking not found!");
  }

  res
    .status(200)
    .json({ message: "Teacher assigned successfully!", teacherAssigned });
});

const completeBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.id;

  const complete = await Booking.findByIdAndUpdate(
    bookingId,
    { isCompleted: true },
    { new: true }
  ).populate("specialization userData teacherData");

  if (!complete) {
    res.status(404);
    throw new Error("Booking not found!");
  }

  await BookingHistory.create({
    specialization: complete.specialization._id,
    userData: {
      _id: complete.userData._id,
      name: complete.userData.name,
      gender: complete.userData.gender,
      age: complete.userData.age,
    },
    teacherData: {
      _id: complete.teacherData._id,
      name: complete.teacherData.name,
      age: complete.teacherData.age,
    },
  });

  res.status(200).json({
    message: "Booking Completed successfully!",
  });
});

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate("specialization", "name")
    .populate("userData", "name phone gender age address")
    .populate("teacherData", "name phone age address");

  res.status(200).json(bookings);
});

const getBookingsByTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.params.id;

  const bookings = await Booking.find({ teacherData: teacherId })
    .populate("specialization", "name")
    .populate("userData", "name phone gender age address")
    .populate("teacherData", "name phone age address");

  res.status(200).json(bookings);
});

////////// Booking History Controllers //////////
const getBookingHistoryForAdmin = asyncHandler(async (req, res) => {
  const history = await BookingHistory.find().populate(
    "specialization",
    "name"
  );

  res.status(200).json(history);
});

const getBookingHistoryForUser = asyncHandler(async (req, res) => {
  const userId = req.user;

  const history = await BookingHistory.find({
    "userData._id": userId,
  }).populate("specialization", "name");

  res.status(200).json(history);
});

const getBookingHistoryForTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.user;

  const history = await BookingHistory.find({
    "teacherData._id": teacherId,
  }).populate("specialization", "name");

  res.status(200).json(history);
});

module.exports = {
  bookService,
  assignTeacher,
  completeBooking,
  getBookings,
  getBookingHistoryForAdmin,
  getBookingHistoryForUser,
  getBookingHistoryForTeacher,
  getBookingsByTeacher,
};
