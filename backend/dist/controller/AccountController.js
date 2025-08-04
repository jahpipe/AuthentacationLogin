"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshController = exports.loginController = exports.registerController = void 0;
const AccountServices = __importStar(require("../services/AccountServices"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const token_1 = require("../utils/token");
const registerController = async (req, res) => {
    try {
        const account = await AccountServices.register(req.body);
        res.status(200).json({ message: "account register succesfull", account });
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    try {
        const { account, accessToken, refreshToken } = await AccountServices.login(req.body);
        if (!accessToken || !refreshToken) {
            return res.status(500).json({ message: "failed to generate token" });
        }
        res.cookie("refresher_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ only secure in production
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "login succesfully",
            accessToken,
            account, // ✅ this fixes your frontend
        });
    }
    catch (error) {
        res.status(400).json({ err: error.message || "Login failed" });
    }
};
exports.loginController = loginController;
const refreshController = async (req, res) => {
    try {
        const token = req.cookies.refresher_token;
        if (!token) {
            return res.status(401).json({ message: "Missing refresh token" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwt_1.REFRESH_TOKEN_SECRET);
        const newAccessToken = (0, token_1.signAccessToken)({
            id: decoded.id,
            role: decoded.role,
        });
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
};
exports.refreshController = refreshController;
