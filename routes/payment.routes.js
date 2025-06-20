import express from "express";
import { initiatePayment, verifyPayment } from "../controllers/payment.controller.js";
import { protectRoute, restrictTo } from "../middlewares/auth.js";

export const paymentRouter = express.Router();

paymentRouter.post("/initiate", protectRoute, restrictTo("vendor"), initiatePayment);
paymentRouter.get("/callback", verifyPayment);


