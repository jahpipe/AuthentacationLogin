"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountController_1 = require("../controller/AccountController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes
router.post('/register', AccountController_1.registerController);
router.post('/login', AccountController_1.loginController);
// Protected route example
router.get('/profile', authMiddleware_1.authentecationtoken, (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
});
// Admin-only route example
router.get('/admin', authMiddleware_1.authentecationtoken, (req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied: Admins only." });
    }
    res.json({ message: "Hello Admin!" });
});
exports.default = router;
