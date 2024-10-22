import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load the '.env' file content into default variable 'process.env'

export const connectDB = async () => {
    try{
        // Try to establish connection with the database using the connection string obtained from the '.env' file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`); // Success message
    }
    catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // Process code 1 means failure, process code 0 means success
    }
};
