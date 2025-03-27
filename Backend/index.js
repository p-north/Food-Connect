import foodPostRoutes from "./src/routes/foodPost.route.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import client from "./src/database/connectDB.js";
import createUserTable from "./src/models/user.model.js";
import {createFoodPostTable} from "./src/models/foodPost.model.js";
import {createMessageTable} from "./src/models/messages.model.js";
import createReviewsTable from "./src/models/reviews.model.js"
import reviewsRoutes from "./src/routes/reviews.route.js"
import { Server } from "socket.io";
import { createServer } from "http";
import handleSocketConnection from "./src/webSocket/handleSocket.js";
import messageRoute from "./src/routes/message.route.js";
import socketVerifyToken from "./src/middlewares/socketVerifyToken.js";
import createReservationTable from "./src/models/reservations.model.js";
import reservationRoutes from "./src/routes/reservation.route.js"
import userRoute from "./src/routes/user.route.js";




// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// socket.io
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    },
});

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
          client.query(createFoodPostTable),
          client.query(createMessageTable),
          client.query(createReviewsTable),
          client.query(createReservationTable)
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
// foodPost routes
app.use("/api/food-posts", foodPostRoutes);
// messaging routes
app.use("/api/messages", messageRoute);
// reviews routes
app.use("/api/reviews", reviewsRoutes);
// reservation routes
app.use("/api/reservations", reservationRoutes)
// user route
app.use("/api/users", userRoute);


// socket.io
io.use(socketVerifyToken);
io.on("connection", handleSocketConnection);


server.listen(PORT, () => {
    console.log("Server Running on Port: ", PORT);
});

// email handling done using SendGrid







