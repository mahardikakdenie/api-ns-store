import express, { Application } from 'express';
import connectDB from './database';
import userRoutes from './routes/user';
import dotEnv from 'dotenv'
import router from './routes/user';
dotEnv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/v1/users', userRoutes);

// Koneksi MongoDB dan start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
