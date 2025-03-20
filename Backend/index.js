import foodPostRoutes from "./src/routes/foodPost.route.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import client from "./src/database/connectDB.js";
import createUserTable from "./src/models/user.model.js";
import {createFoodPostTable} from "./src/models/foodPost.model.js";



// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;




// connect to PostgreSQL
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL!"))
  .catch((err) => console.error("Connection error", err.stack))

// create tables
const initDB = async () => {
  try {
      await Promise.all([
          client.query(createUserTable),
          client.query(createFoodPostTable)
      ])
        console.log("✅ Tables created successfully!");
  } catch (err) {
      console.error("❌ Error creating tables:", err);
  }
};

// call on tables to create
initDB();

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
// image upload/retrieval routes
// app.use('/api/image', imageRoute)

app.listen(PORT, () => {
  console.log("Server Running on Port: ", PORT);
});

// email handling done using mailtrap







