const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      unique: [true, "Phone Number already exists!"],
      match: [/^\d{10}$/, "Please fill a valid phone number"],
    },
    specialization: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HealthCategory",
      },
    ],
    age: {
      type: Number,
    },
    experience: {
      type: Number,
    },
    address: {
      type: String,
      trim: true,
    },
    aadharImg: {
      type: String,
    },
    slot: {
      type: [String],
      default: [],
    },
    youtube: {
      type: String,
    },
    instagram: {
      type: String,
    },
    x: {
      type: String,
    },
    facebook: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email already exists!"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
};
