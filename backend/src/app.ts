import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import AccountRouter from "@routes/AccountRoutes";

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use('/api', AccountRouter);

// MONGODB CONNECTION
mongoose.connect(process.env.MDB_CONNECTION_STRING as string)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

export default app;
