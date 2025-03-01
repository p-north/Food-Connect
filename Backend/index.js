import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes  from './routes/auth.route.js';

// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

// middlewares
app.use(express.json());
app.use(cookieParser());

// auth routes
app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    console.log("Server Running on Port: ", PORT)
})

// email handling done using mailtrap