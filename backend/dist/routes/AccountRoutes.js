"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AccountController_1 = require("../controller/AccountController");
const router = express_1.default.Router();
// Public routes
router.post('/register', AccountController_1.registerController);
router.post('/login', AccountController_1.loginController);
router.post('/refresh', AccountController_1.refreshController); // ✅ Add this line
exports.default = router;
