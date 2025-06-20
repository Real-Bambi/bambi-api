import express from "express";
import { rateAdvert, getAdvertRatings } from "../controllers/rating.controller.js";
import { protectRoute } from "../middlewares/auth.js";

export const ratingRouter = express.Router();

// post ratings
ratingRouter.post("/", protectRoute, rateAdvert);
ratingRouter.get("/:id", getAdvertRatings);


