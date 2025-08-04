import { Request, Response } from "express";
import * as AccountServices from "../services/AccountServices";
import Jwt from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/jwt";
import { signAccessToken, signRefreshToken } from "../utils/token";

export const registerController = async (req: Request, res: Response) => {
  try {
    const account = await AccountServices.register(req.body);
    res.status(200).json({ message: "account register succesfull", account });
  } catch (error: any) {
    res.status(400).json({ err: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { account, accessToken, refreshToken } = await AccountServices.login(req.body);

    if (!accessToken || !refreshToken) {
      return res.status(500).json({ message: "failed to generate token" });
    }

res.cookie("refresher_token", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "none", // ✅ lowercase
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


    res.status(200).json({ message: "login succesfully", accessToken });
  } catch (error: any) {
    res.status(400).json({ err: error.message || "Login failed" });
  }
};

export const refreshController = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refresher_token;

    if (!token) {
      return res.status(401).json({ message: "Missing refresh token" });
    }

    const decoded = Jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      id: string;
      role: "admin" | "users";
    };

    const newAccessToken = signAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error: any) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
