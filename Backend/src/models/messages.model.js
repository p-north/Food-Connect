import toCamelCase from "../utils/toCamelCase.js";
import client from "../database/connectDB.js";

const createMessageTable = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const Message = {
    async create({senderId, receiverId, message}) {
        try {
            const date = new Date();
            const {rows} = await client.query(`
                INSERT INTO messages (
                    sender_id,
                    receiver_id,
                    message,
                    created_at
                )
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `, [senderId, receiverId, message, date]);
            return toCamelCase(rows[0]);
        } catch (err) {
            throw err;
        }
    },

    // async findMessagesByUserId(senderId, receiverId) {
    //     try {
    //         const {rows} = await client.query(`
    //             SELECT * FROM messages
    //             WHERE (sender_id = $1 AND receiver_id = $2)
    //             OR (sender_id = $2 AND receiver_id = $1)
    //             ORDER BY created_at;
    //         `, [senderId, receiverId]);
    //         return rows.map(toCamelCase);
    //     } catch (err) {
    //         throw err;
    //     }
    // }
    async findMessagesByUserId(senderId, receiverId) {
        try {
            const { rows } = await client.query(`
                SELECT 
                    messages.*,
                    sender.name AS sender_name,
                    receiver.name AS receiver_name
                FROM messages
                JOIN users AS sender ON messages.sender_id = sender.id
                JOIN users AS receiver ON messages.receiver_id = receiver.id
                WHERE (messages.sender_id = $1 AND messages.receiver_id = $2)
                OR (messages.sender_id = $2 AND messages.receiver_id = $1)
                ORDER BY messages.created_at;
            `, [senderId, receiverId]);

            return rows.map(toCamelCase);
        } catch (err) {
            throw err;
        }
    },
    async findMessagesSinceLogin(senderId) {
        try {
            // get last login time from users table
            const {userRows} = await client.query(`
                SELECT last_login FROM users
                WHERE id = $1;
            `, [senderId]);

            const lastLogin = userRows[0].last_login;
            const { rows } = await client.query(`
                SELECT 
                    messages.*,
                    sender.name AS sender_name,
                    receiver.name AS receiver_name
                FROM messages
                JOIN users AS sender ON messages.sender_id = sender.id
                JOIN users AS receiver ON messages.receiver_id = receiver.id
                WHERE messages.created_at >= $1
                ORDER BY messages.created_at;
            `, [lastLogin]);
            return rows.map(toCamelCase);
        } catch (err) {
            throw err;
        }
    }
}

export {createMessageTable, Message};