import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// ✅ Correct
import accountRoutes from './routes/AccountRoutes';


dotenv.config()

const app = express()

//MiDDLE WARE//
app.use(express.json());
app.use(express.urlencoded({ extended: true}))



const allowedOrigins = [
  "http://localhost:5173", // dev
  "http://localhost:5174", // dev alt
  "https://authentacation-login.vercel.app" // ✅ production frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
}));




//Router//
app.use('/api', accountRoutes)



//MONGO CONNECTION//

mongoose.connect(process.env.MDB_CONNECTION_STRING as string) 
.then(() => console.log("connected to mongoDB"))
.catch((err) =>console.log("error to connec Db", err))

export default app;