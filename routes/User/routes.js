const express = require("express");

const router = express.Router();

router.use("/auth", require("./userRoute"));
router.use("/booking", require("./bookingRoute"));

module.exports = router;
