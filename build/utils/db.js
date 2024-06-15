"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbUrl = process.env.DB_URL || '';
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log(`Database Connected Successfully with ${mongoose_1.default.connection.host}`);
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        setTimeout(connectDB, 5000); // try again after 5 seconds
    }
};
exports.default = connectDB;
