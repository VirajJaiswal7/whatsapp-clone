import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { connectDb } from "./config/dbConnect.js";
import bodyParser from "body-parser";
import { authRouter } from "./routes/auth.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { initializeSocket } from "./services/socketService.js";
import http from "http";
import { statusRouter } from "./routes/status.route.js";

const port = process.env.PORT;
const app = express();

const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOption));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
connectDb();

// create server
const server = http.createServer(app);
const io = initializeSocket(server);

// apply socket middleware before routes
app.use((req, res, next) => {
  req.io = io;
  req.socketUserMap = io.socketUserMap;
  next();
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);
app.use("/api/status", statusRouter);

server.listen(port, () => {
  console.log(`Server is listning on http://localhost:/${port}`);
});
