import {Message} from "../models/messages.model.js";
import client from "../database/connectDB.js";
import toCamelCase from "../utils/toCamelCase.js";
import receiver from "pg/lib/query.js";

const users = {};

/**
 * handle messaging between 2 users
 * @param socket
 */
const handleSocketConnection = (socket) => {
    const userId = socket.userId;

    // add user to users object
    users[userId] = socket.id;
    //
    // socket.on("private-message", async ({receiverId, message}) => {
    //     const receiverSocketId = users[receiverId];
    //
    //     if (receiverSocketId) {
    //         socket.to(receiverSocketId).emit("private-message", {senderId: userId, message});
    //     }
    //     try {
    //         await Message.create({senderId: userId, receiverId, message});
    //     }
    //     catch (err) {
    //         console.error(err.message);
    //     }
    // })

    socket.on("private-message", async ({ receiverId, message }) => {
        try {
            // 1. Get sender's information
            const senderQuery = await client.query(
                'SELECT id, name FROM users WHERE id = $1',
                [userId]
            );
            const sender = toCamelCase(senderQuery.rows[0]);

            // 2. Get receiver's information
            const receiverQuery = await client.query(
                'SELECT id, name FROM users WHERE id = $1',
                [receiverId]
            );
            const receiver = toCamelCase(receiverQuery.rows[0]);

            // 2. Create message with full details
            const newMessage = await Message.create({
                senderId: userId,
                receiverId,
                message
            });

            // 3. Prepare data for emission
            const messageData = {
                ...newMessage,
                senderName: sender.name,
                // Add receiverName if needed
                receiverName: receiver.name,
            };

            // 4. Send to receiver (if online)
            const receiverSocketId = users[receiverId];
            if (receiverSocketId) {
                socket.to(receiverSocketId).emit("private-message", messageData);
            }

            // 5. Also send confirmation to sender
            socket.emit("private-message-sent", messageData);

        } catch (err) {
            console.error('Message error:', err.message);
            socket.emit("message-error", {
                error: "Failed to send message"
            });
        }
    });

    socket.on("disconnect", () => {
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                break;
            }
        }
    });
}

export default handleSocketConnection;