import express, { Request, Response } from "express";
import { registerController, loginController } from "../controller/AccountController";
import { authentecationtoken, authentecationRequest } from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);

// Protected route example
router.get('/profile', authentecationtoken, (req: authentecationRequest, res: Response) => {
  res.json({ message: "Welcome!", user: req.user });
});

// Admin-only route example
router.get('/admin', authentecationtoken, (req: authentecationRequest, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  res.json({ message: "Hello Admin!" });
});

export default router;
