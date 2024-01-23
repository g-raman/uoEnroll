import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import app from "./app.js";

configDotenv({ path: "./config.env" });

const { env } = process;
const DB = env.DATABASE.replace("<USERNAME>", env.DATABASE_USERNAME).replace(
  "<PASSWORD>",
  env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB Connected..."));

const server = app.listen(8080, () => {
  console.log("App listening on port 8080...");
});
