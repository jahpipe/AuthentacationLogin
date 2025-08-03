"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const signAccessToken = (payload) => jsonwebtoken_1.default.sign(payload, jwt_1.ACCESS_TOKEN_SECRET, { expiresIn: jwt_1.ACCESS_EXPIRE });
exports.signAccessToken = signAccessToken;
const signRefreshToken = (payload) => jsonwebtoken_1.default.sign(payload, jwt_1.REFRESH_TOKEN_SECRET, { expiresIn: jwt_1.REFRESH_EXPIRE });
exports.signRefreshToken = signRefreshToken;
