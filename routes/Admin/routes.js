const express = require("express");

const router = express.Router();

router.use("/auth", require("./adminRoute"));

module.exports = router;
