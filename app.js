import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {authRouter} from "./routes/auth.routes.js";
import {advertRouter} from "./routes/advert.routes.js";
import {paymentRouter} from "./routes/payment.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { ratingRouter } from "./routes/rating.routes.js";

// Load .env variables
dotenv.config();

export const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/adverts", advertRouter);
app.use("/api/v1/payment", paymentRouter);
app.use('/api/v1/dashboard', dashboardRouter)
app.use("/api/v1/ratings", ratingRouter);

// Test Route (optional for now)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });


