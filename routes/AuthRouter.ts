import express, { Router } from "express";
import signUp from "../controller/AuthController";

const authRoute = express.Router();

authRoute.post("/register",signUp);

export default authRoute;