import express, { Router } from "express";
import signUp from "../controller/SignUpController";
import signIn from "../controller/SignInController";

const authRoute = express.Router();

authRoute.post("/register",signUp);
authRoute.post("/login",signIn);

export default authRoute;