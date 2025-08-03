"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_EXPIRE = exports.ACCESS_EXPIRE = exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "fallback";
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-fallback";
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-fallback";
exports.ACCESS_EXPIRE = "5m";
exports.REFRESH_EXPIRE = "7d";
