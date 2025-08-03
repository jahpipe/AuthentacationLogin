"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const AccountModel_1 = __importDefault(require("../models/AccountModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "fall back";
const register = async (data) => {
    const existingAccount = await AccountModel_1.default.findOne({ username: data.username });
    if (existingAccount) {
        throw new Error("account already Exsit!");
    }
    const newAccount = new AccountModel_1.default(data);
    await newAccount.save();
    return newAccount;
};
exports.register = register;
const login = async (data) => {
    const account = await AccountModel_1.default.findOne({ username: data.username });
    if (!account) {
        throw new Error("username or password is incorrect");
    }
    if (account.role !== data.role) {
        throw new Error("Invalid role selected");
    }
    const passwordValid = await account.passwordvalidator(data.password);
    if (!passwordValid) {
        throw new Error("username or password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({ id: account._id, role: account.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    return { account, token };
};
exports.login = login;
