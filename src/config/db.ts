
//db.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error('MongoDB URI is not defined in the environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected...');
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error connecting to MongoDB: ${error.message}`);
        } else {
            console.error('Unknown error occurred while connecting to MongoDB.');
        }
        process.exit(1);
    }
};

export default connectDB;



