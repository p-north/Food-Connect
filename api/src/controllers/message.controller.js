import {Message} from "../models/messages.model.js";

const createMessage = async (req, res) => {
    try {
        const senderId = req.userID;
        const receiverId = req.params.receiverId;
        const {message} = req.body;
        const newMessage = await Message.create({senderId, receiverId, message});
        res.status(201).json({
            success: true,
            message: "Message created successfully",
            data: newMessage
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const getMessagesByUserId = async (req, res) => {
    try {
        const senderId = req.userID;
        const receiverId = req.params.receiverId;
        const messages = await Message.findMessagesByUserId(senderId, receiverId);
        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            data: messages
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

// get messages from since login
const getMessagesSinceLogin = async (req, res) => {
    try {
        const senderId = req.userID;

        const messages = await Message.findMessagesSinceLogin(senderId);

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            data: messages
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const getUnreadMessages = async (req, res) => {
    try {
        const receiverId = req.userID;
        const messages = await Message.findUnreadMessages(receiverId);
        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully",
            data: messages
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export {
    createMessage,
    getMessagesByUserId,
    getMessagesSinceLogin,
    getUnreadMessages
}