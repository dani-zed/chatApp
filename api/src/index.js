import express from 'express';
import dotenv from 'dotenv';
const app=express();
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
dotenv.config();

const PORT=process.env.PORT;

app.use(express.json());

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});