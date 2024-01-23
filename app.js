const express = require("express");
const morgan = require("morgan");
const courseRoute = require("./routes/courseRoute");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/courses", courseRoute);
app.get("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "hi",
  });
});

module.exports = app;
