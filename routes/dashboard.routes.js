import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import { protectRoute } from "../middlewares/auth.js";

export const dashboardRouter = express.Router();

dashboardRouter.get("/stats", protectRoute, getDashboardStats);


