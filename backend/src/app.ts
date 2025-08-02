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
app.use(cors())

//Router//
app.use('/api', accountRoutes)

//MONGO CONNECTION//

mongoose.connect(process.env.MDB_CONNECTION_STRING as string) 
.then(() => console.log("connected to mongoDB"))
.catch((err) =>console.log("error to connec Db", err))

export default app;