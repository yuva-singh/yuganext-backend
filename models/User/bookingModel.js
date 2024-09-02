const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
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

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
  Booking,
};
