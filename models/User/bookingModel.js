const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    slot: {
      type: String,
    },
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthCategory",
    },
    userData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teacherData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    bookingStatus: {
      status: {
        type: String,
        enum: ["Pending", "Confirm", "Cancel", "Completed"],
        default: "Pending",
      },
      reason: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const bookingHistorySchema = mongoose.Schema(
  {
    specialization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthCategory",
    },
    status: {
      type: String,
    },
    userData: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      name: {
        type: String,
      },
      gender: {
        type: String,
      },
      age: {
        type: String,
      },
    },
    teacherData: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
      name: {
        type: String,
      },
      age: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
const BookingHistory = mongoose.model("BookingHistory", bookingHistorySchema);

module.exports = {
  Booking,
  BookingHistory,
};
