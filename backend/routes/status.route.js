import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { multerMiddleware } from "../config/cloudinary.config.js";
import {
  createStatus,
  deleteStatus,
  getStatus,
  viewStatus,
} from "../controllers/status.controller.js";

export const statusRouter = express.Router();

statusRouter.post("/", authMiddleware, multerMiddleware, createStatus);
statusRouter.get("/", authMiddleware, getStatus);
statusRouter.put("/:statusId/view", authMiddleware, viewStatus);
statusRouter.delete("/:statusId", authMiddleware, deleteStatus);
