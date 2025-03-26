import express from 'express';
import {verifyToken} from "../middlewares/verifyToken.js";
import {createMessage, getMessagesByUserId} from "../controllers/message.controller.js";
const router = express.Router();


router.post("/:receiverId", verifyToken, createMessage);
router.get("/:receiverId", verifyToken, getMessagesByUserId);

export default router;
