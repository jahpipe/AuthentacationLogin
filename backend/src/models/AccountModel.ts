import mongoose, {Schema, Model} from "mongoose";
import { AccountType } from "../types/AccountType";
import bcrypt from "bcrypt"


export const AccountSchema: Schema <AccountType> = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['admin', 'users']}
},{
    toJSON: {
        transform: (_doc, ret:any) =>{
            delete ret.password
            return ret;
        }
    }
})

AccountSchema.pre<AccountType>('save', async function (next) {
        if(!this.isModified('password')) return next();
        const Salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, Salt)
        return next()
})

AccountSchema.methods.passwordvalidator = async function (passwordvalidatorIsValid: string): Promise<boolean> {
        return bcrypt.compare(passwordvalidatorIsValid, this.password)
}

export const AccountModel: Model<AccountType> = mongoose.model<AccountType>(
    "Account",
    AccountSchema
)

export default AccountModel;