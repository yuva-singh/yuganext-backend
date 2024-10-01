const express = require("express");
const {
  loginAdmin,
  registerAdmin,
  getTotalCounts,
} = require("../../controllers/Admin/adminController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/register", registerAdmin);
router.get("/count", getTotalCounts);

module.exports = router;
