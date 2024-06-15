import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.DB_URL || '';

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        } as mongoose.ConnectOptions);

        console.log(`Database Connected Successfully with ${mongoose.connection.host}`);
    } catch (error: any) {
        console.error("Error connecting to MongoDB:", error.message);
        setTimeout(connectDB, 5000); // try again after 5 seconds
    }
};

export default connectDB;
