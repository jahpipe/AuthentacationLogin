import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Missing access token!" });
  }

  try {
    const decoded = Jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      id: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Invalid access token!" });
  }
};
