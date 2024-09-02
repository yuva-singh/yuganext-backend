const express = require("express");
const {
  createHealthCategory,
  updateHealthCategory,
  getAllHealthCategory,
} = require("../../controllers/Teacher/healthCategoryController");

const router = express.Router();

router.post("/create", createHealthCategory);
router.put("/update/:id", updateHealthCategory);
router.get("/all", getAllHealthCategory);

module.exports = router;
