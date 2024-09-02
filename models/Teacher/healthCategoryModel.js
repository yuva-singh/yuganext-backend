const mongoose = require("mongoose");

const healthCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const HealthCategory = mongoose.model("HealthCategory", healthCategorySchema);

module.exports = {
  HealthCategory,
};
