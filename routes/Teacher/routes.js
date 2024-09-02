const express = require("express");

const router = express.Router();

router.use("/auth", require("./teacherRoute"));
router.use("/healthCategory", require("./healthCategoryRoute"));

module.exports = router;
