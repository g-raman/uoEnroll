/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const { env } = process;
const DB = env.DATABASE.replace("<USERNAME>", env.DATABASE_USERNAME).replace(
  "<PASSWORD>",
  env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB Connected..."));

const server = app.listen(8080, () => {
  console.log("App listening on port 8080...");
});

process.on("unhandledRejection", (err) => {
  console.error("Error source: ", err.name);
  console.error(err.message);

  server.close(() => {
    process.exit(1);
  });
});
