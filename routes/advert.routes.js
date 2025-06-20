import express from "express";
import { createAdvert, getAllAdverts, getAdvertById, updateAdvert, deleteAdvert } from "../controllers/advert.controller.js";
import { protectRoute, restrictTo } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

export const advertRouter = express.Router();


advertRouter.post(
    "/",
    protectRoute,
    restrictTo("vendor"),
    upload.single("image"),      // Handles single image file
    createAdvert
);

advertRouter.get("/", getAllAdverts);
advertRouter.get("/:id", getAdvertById);

advertRouter.put(
  "/:id",
  protectRoute,
  restrictTo("vendor"),
  upload.single("image"), 
  updateAdvert
);

advertRouter.delete(
  "/:id",
  protectRoute,
  restrictTo("vendor"),
  deleteAdvert
);


