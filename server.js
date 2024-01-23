import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv({ path: "./config.env" });

const { env } = process;
const DB = env.DATABASE.replace("<USERNAME>", env.DATABASE_USERNAME).replace(
  "<PASSWORD>",
  env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log("DB Connected..."));
