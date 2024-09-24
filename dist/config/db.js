"use strict";
//db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
        console.error('MongoDB URI is not defined in the environment variables.');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(mongoURI);
        console.log('MongoDB Connected...');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error connecting to MongoDB: ${error.message}`);
        }
        else {
            console.error('Unknown error occurred while connecting to MongoDB.');
        }
        process.exit(1);
    }
};
exports.default = connectDB;
