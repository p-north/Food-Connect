import foodPostRoutes from "./routes/foodPostRoutes";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import client from "./database/connectDB.js";

// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to PostgreSQL
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("Connection error", err.stack))
  .finally(() => client.end());

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
app.use('/api/foodPosts', foodPostRoutes);

app.listen(PORT, () => {
  console.log("Server Running on Port: ", PORT);
});

// email handling done using mailtrap







