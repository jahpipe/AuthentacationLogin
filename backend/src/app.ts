import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import AccountRouter from "../src/routes/AccountRoutes"

dotenv.config()

const app = express()

//MiDDLE WARE//
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cors())

//Router//
app.use('/api', AccountRouter)

//MONGO CONNECTION//

mongoose.connect(process.env.MONGO_URI as string)
.then(() => console.log("connected to mongoDB"))
.catch((err) =>console.log("error to connec Db", err))

export default app;