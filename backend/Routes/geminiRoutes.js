import express from "express";
const router = express.Router();

import { getGeminiResponse } from "../Controllers/geminiController.js";
router.post("/geminiInput", getGeminiResponse);

export default router;