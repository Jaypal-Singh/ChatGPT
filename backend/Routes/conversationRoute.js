import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"

import { getConversation,  } from "../Controllers/ConversationController.js";
router.get("/getConversation",  verifyToken, getConversation);
// router.post("/create", verifyToken, createConversation);

export default router;