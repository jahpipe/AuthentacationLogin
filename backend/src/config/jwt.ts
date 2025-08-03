export const JWT_SECRET = process.env.JWT_SECRET || "fallback";
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-fallback";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-fallback";

export const ACCESS_EXPIRE = "5m";
export const REFRESH_EXPIRE = "7d";
