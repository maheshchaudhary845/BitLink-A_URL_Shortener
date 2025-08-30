import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(error){
        console.error(error.message)
        process.exit(1);
    }
}

export default connectDB;