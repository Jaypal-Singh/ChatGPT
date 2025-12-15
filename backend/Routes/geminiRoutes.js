import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"
import { getGeminiResponse } from "../Controllers/geminiController.js";
router.post("/geminiInput",  verifyToken,   getGeminiResponse);
export default router;