import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"

import { getMessage, getMessageLength, getMessagesByTime, getAverageResponseTime, getAllMessages } from "../Controllers/MessageController.js";
router.get("/getMessage/:conversationId",  verifyToken, getMessage);
router.get("/getMessageLength",  verifyToken, getMessageLength);
router.get("/getMessagesByTime",  verifyToken,  getMessagesByTime);
router.get("/getAverageResponseTime", verifyToken, getAverageResponseTime);
router.get("/getAllMessages", verifyToken, getAllMessages);



export default router;
