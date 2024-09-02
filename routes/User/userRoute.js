const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
} = require("../../controllers/User/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", updateUser);
router.get("/all", getAllUsers);
router.get("/single/:id", getSingleUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
