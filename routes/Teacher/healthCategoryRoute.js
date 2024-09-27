const express = require("express");
const {
  createHealthCategory,
  updateHealthCategory,
  getAllHealthCategory,
  deleteHealthCategory,
} = require("../../controllers/Teacher/healthCategoryController");

const router = express.Router();

router.post("/create", createHealthCategory);
router.put("/update/:id", updateHealthCategory);
router.get("/all", getAllHealthCategory);
router.get("/delete/:id", deleteHealthCategory);

module.exports = router;
