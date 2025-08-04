"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// ✅ Correct
const AccountRoutes_1 = __importDefault(require("./routes/AccountRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//MiDDLE WARE//
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "http://localhost:5173", // dev
    "http://localhost:5174", // dev alt
    "https://authentacation-login.vercel.app" // ✅ production frontend
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("❌ Not allowed by CORS"));
        }
    },
    credentials: true,
}));
//Router//
app.use('/api', AccountRoutes_1.default);
//MONGO CONNECTION//
mongoose_1.default.connect(process.env.MDB_CONNECTION_STRING)
    .then(() => console.log("connected to mongoDB"))
    .catch((err) => console.log("error to connec Db", err));
exports.default = app;
