import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_EXPIRE,
  REFRESH_EXPIRE,
} from "../config/jwt";

export const signAccessToken = (payload: object) =>
  jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_EXPIRE });

export const signRefreshToken = (payload: object) =>
  jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_EXPIRE });
