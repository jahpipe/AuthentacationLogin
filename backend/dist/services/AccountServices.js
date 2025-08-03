"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const AccountModel_1 = __importDefault(require("../models/AccountModel"));
const token_1 = require("../utils/token");
const register = async (data) => {
    const existingAccount = await AccountModel_1.default.findOne({ username: data.username });
    if (existingAccount)
        throw new Error("Account already exists!");
    const newAccount = new AccountModel_1.default(data);
    await newAccount.save();
    return newAccount;
};
exports.register = register;
const login = async (data) => {
    const account = await AccountModel_1.default.findOne({ username: data.username });
    if (!account || !(await account.passwordvalidator(data.password)))
        throw new Error("Username or password is incorrect");
    if (account.role !== data.role)
        throw new Error("Invalid role selected");
    const accessToken = (0, token_1.signAccessToken)({ id: account._id, role: account.role });
    const refreshToken = (0, token_1.signRefreshToken)({ id: account._id, role: account.role });
    return { account, accessToken, refreshToken };
};
exports.login = login;
