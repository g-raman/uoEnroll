const express = require("express");

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "hi",
  });
  next();
});

module.exports = router;
