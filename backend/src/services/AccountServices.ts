import AccountModel from "../models/AccountModel";
import { AccountType } from "../types/AccountType";
import  Jwt  from "jsonwebtoken";

const ACCESS_TOKEN_SECRET= process.env.ACCESS_TOKEN_SECRET || "fall back";

export const register = async (data:{
    username: string,
    password: string,
    role: 'admin' | 'users'
}): Promise<AccountType> =>{
    const existingAccount = await AccountModel.findOne({username: data.username});
    if(existingAccount){
        throw new Error("account already Exsit!")
    }
    
    const newAccount = new AccountModel(data)
    await newAccount.save()
    return newAccount;
}

export const login = async (data:{
    username: string,
    password: string,
    role: 'admin' | 'users'
}): Promise<{ account: AccountType, token: string}> =>{
    const account = await AccountModel.findOne({username: data.username})
    if(!account){
        throw new Error("username or password is incorrect")
    }
    const passwordValid = await account.passwordvalidator(data.password)
    if(!passwordValid){
        throw new Error("username or password is incorrect")
    }
    const token = Jwt.sign(
        {id: account._id, role: account.role},
        ACCESS_TOKEN_SECRET,
        {expiresIn: "1h"}
    )

    return {account, token}
}