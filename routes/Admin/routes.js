const express = require("express");

const router = express.Router();

router.use("/auth", require("./adminRoute"));
router.use("/contact", require("./contactRoute"));
router.use("/blog", require("./blogRoute"));

module.exports = router;
