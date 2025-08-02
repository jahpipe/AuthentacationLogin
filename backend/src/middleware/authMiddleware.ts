import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "fall back";

export interface authentecationRequest extends Request{
    user?: {
        id: string;
        role: string
    }
}

export const authentecationtoken = (req: authentecationRequest, res: Response, next: NextFunction) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token){
        return res.status(401).json({message: "missing Access token!"})
    }

    try{
        const decoded = Jwt.verify(token, ACCESS_TOKEN_SECRET) as {
            id: string;
            role: string
        }  
        (req as authentecationRequest).user = decoded;
        next()
    }catch(error: any){
        return res.status(401).json({message: "invalid acces token!"})
    }
}