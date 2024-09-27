import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.DB_URI ?? '';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
