import express from 'express';
import {verifyToken} from "../middlewares/verifyToken.js";
import {
    createMessage,
    getMessagesByUserId,
    getMessagesSinceLogin,
    getUnreadMessages, getConversations
} from "../controllers/message.controller.js";
const router = express.Router();


router.get("/", verifyToken, getMessagesSinceLogin);
router.get("/conversations", verifyToken, getConversations);
router.get("/unread-messages", verifyToken, getUnreadMessages);
router.post("/:receiverId", verifyToken, createMessage);
router.get("/:receiverId", verifyToken, getMessagesByUserId);

export default router;
