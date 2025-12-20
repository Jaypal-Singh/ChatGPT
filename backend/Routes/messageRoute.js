import express from "express";
const router = express.Router();
import verifyToken from "../Middleware/AuthMiddleware.js"

import { getMessage, getMessageLength, getMessagesByTime} from "../Controllers/MessageController.js";
router.get("/getMessage/:conversationId",  verifyToken, getMessage);
router.get("/getMessageLength",  verifyToken, getMessageLength);
router.get("/getMessagesByTime",  verifyToken,  getMessagesByTime);


// router.post("/create", verifyToken, createConversation);

export default router;