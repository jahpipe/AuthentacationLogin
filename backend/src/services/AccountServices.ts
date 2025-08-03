import AccountModel from "../models/AccountModel";
import { AccountType } from "../types/AccountType";
import { signAccessToken, signRefreshToken } from "../utils/token";

export const register = async (data: {
  username: string;
  password: string;
  role: 'admin' | 'users';
}): Promise<AccountType> => {
  const existingAccount = await AccountModel.findOne({ username: data.username });
  if (existingAccount) throw new Error("Account already exists!");

  const newAccount = new AccountModel(data);
  await newAccount.save();
  return newAccount;
};

export const login = async (data: {
  username: string;
  password: string;
  role: 'admin' | 'users';
}): Promise<{ account: AccountType; accessToken: string; refreshToken: string }> => {
  const account = await AccountModel.findOne({ username: data.username });
  if (!account || !(await account.passwordvalidator(data.password)))
    throw new Error("Username or password is incorrect");

  if (account.role !== data.role)
    throw new Error("Invalid role selected");

  const accessToken = signAccessToken({ id: account._id, role: account.role });
  const refreshToken = signRefreshToken({ id: account._id, role: account.role });

  return { account, accessToken, refreshToken };
};
