const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const AppError = require("./utils/AppError");
const courseRoute = require("./routes/courseRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use("/api/v1/courses", courseRoute);

app.use("*", (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl}`, 404);
  next(err);
});
app.use(globalErrorHandler);

module.exports = app;
