import express from "express";
import {
  checkAuthenticated,
  getAllUsers,
  logout,
  sendOtp,
  updateProfile,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { multerMiddleware } from "../config/cloudinary.config.js";

export const authRouter = express.Router();

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.get("/logout", logout);

// protected route
authRouter.put("/update-profile", authMiddleware, multerMiddleware, updateProfile);
authRouter.get("/check-auth", authMiddleware, checkAuthenticated);
authRouter.get("/users", authMiddleware, getAllUsers);
