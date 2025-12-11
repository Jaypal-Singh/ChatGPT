import express from "express";
import router from express.Router();
import { Signup, Login, getuser } from "../Controllers/AuthController";
import verifyToken from "../Middleware/AuthMiddleware"
import {signUpValidation,loginValidation,} from "../Middleware/AuthValidation";

router.post("/signup", signUpValidation, Signup);
router.post("/login", loginValidation, Login);
router.get("/getuser", verifyToken, getuser);

module.exports = router;
