import express from "express";
import { signup, login } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

//    api/v1/auth/signup
authRouter.post("/signup", signup);

//      api/v1/auth/login
authRouter.post("/login", login);


