import express, { Request, Response } from "express";
import {
  registerController,
  loginController,
  refreshController, // ✅ Import this
} from "../controller/AccountController";

import {
  authenticateToken,
  AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router = express.Router();

// Public routes
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController); // ✅ Add this line

// Protected route example
router.get('/profile', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: "Welcome!", user: req.user });
});

// Admin-only route example
router.get('/admin', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only." });
  }
  res.json({ message: "Hello Admin!" });
});

export default router;
