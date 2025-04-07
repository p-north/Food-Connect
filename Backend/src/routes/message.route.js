import express from 'express';
import {verifyToken} from "../middlewares/verifyToken.js";
import {createMessage, getMessagesByUserId, getMessagesSinceLogin} from "../controllers/message.controller.js";
const router = express.Router();


router.get("/", verifyToken, getMessagesSinceLogin);
router.post("/:receiverId", verifyToken, createMessage);
router.get("/:receiverId", verifyToken, getMessagesByUserId);

export default router;
