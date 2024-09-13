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
    isAssigned: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
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
