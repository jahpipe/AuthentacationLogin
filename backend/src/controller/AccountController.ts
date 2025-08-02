import { Request, Response } from "express";
import * as AccountServices from "../services/AccountServices"


export const registerController = async (req: Request, res: Response) =>{
    try{
    const account = await AccountServices.register(req.body);
    res.status(200).json({message: "account register succesfull", account})
    }catch(error: any){
    res.status(400).json({err: error.message})
    }
}

export const loginController = async (req: Request, res: Response) =>{  
    try{
        const {account, token} = await AccountServices.login(req.body);
        res.status(200).json({message: "login succes", account, token})
    }catch(error: any){
        res.status(400).json({message: "login faild check you username or password", error})
    }
}