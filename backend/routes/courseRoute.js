const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router.route("/:courseCode").get(courseController.getCourse);
module.exports = router;
