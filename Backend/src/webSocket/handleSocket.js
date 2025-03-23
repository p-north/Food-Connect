import {Message} from "../models/messages.model.js";

const users = {};

/**
 * handle messaging between 2 users
 * @param socket
 */
const handleSocketConnection = (socket) => {
    const userId = socket.userId;

    // add user to users object
    users[userId] = socket.id;

    socket.on("private-message", async ({receiverId, message}) => {
        const receiverSocketId = users[receiverId];

        if (receiverSocketId) {
            socket.to(receiverSocketId).emit("private-message", {senderId: userId, message});
        }
        try {
            await Message.create({senderId: userId, receiverId, message});
        }
        catch (err) {
            console.error(err.message);
        }
    })

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