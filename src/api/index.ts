import express, { Application } from 'express';
import connectDB from './database';
import userRoutes from './routes/user';
import loginRoutes from './routes/auth';
import dotEnv from 'dotenv'
import { authenticateToken } from '../middleware/auth';
dotEnv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/v1/users',authenticateToken ,userRoutes);
app.use('/v1/login', loginRoutes);

// Koneksi MongoDB dan start server
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
