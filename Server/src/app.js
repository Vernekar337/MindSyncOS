import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "../config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "../routers/auth.js";
import profileRouter from "../routers/profile.js";
import triageRouter from "../routers/triage.js"

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", triageRouter);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log("server started at http://localhost:3001");
    });
  })
  .catch((err) => {
    console.error("DB did not connect", err);
  });
