import express, { Request, Response } from "express";
import {
  registerController,
  loginController,
  refreshController, // ✅ Import this
} from "../controller/AccountController";


const router = express.Router();

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController); // ✅ Add this line



export default router;
