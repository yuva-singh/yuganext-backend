const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../../controllers/Admin/contactController");

const router = express.Router();

router.post("/create", createContact);
router.get("/all", getAllContacts);
router.delete("/delete/:id", deleteContact);

module.exports = router;
