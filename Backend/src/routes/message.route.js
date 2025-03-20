import express from 'express';
import {verifyToken} from "../middlewares/verifyToken.js";
import {createMessage, getMessagesByUserId} from "../controllers/message.controller.js";
const router = express.Router();


router.post("/:receiverID", verifyToken, createMessage);
router.get("/:receiverID", verifyToken, getMessagesByUserId);

export default router;
