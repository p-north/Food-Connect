import client from "../database/connectDB.js";
const createFoodPostTable = `
CREATE TABLE IF NOT EXISTS food_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    dietary_restrictions TEXT,
    location TEXT NOT NULL,
    availability_status VARCHAR(50) NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;


const FoodPost = {

    /**
     * Create food post
     * @param userId
     * @param title
     * @param quantity
     * @param description
     * @param imageurl
     * @param dietaryRestrictions
     * @param location
     * @param availabilityStatus
     * @param expirationDate
     * @returns {Promise<*|{success: boolean, message: string}>}
     */
    async create({
        userId,
        title,
        quantity,
        description,
        imageUrl,
        dietaryRestrictions,
        location,
        availabilityStatus,
        expirationDate,
                 }) {
        try {
            const createdAt = new Date();
            const { rows } = await client.query(`
                INSERT INTO food_posts (
                    user_id,
                    title,
                    quantity,
                    description,
                    image_url,
                    dietary_restrictions,
                    location,
                    availability_status,
                    expiration_date,
                    created_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *;
            `, [
                userId,
                title,
                quantity,
                description,
                imageUrl,
                dietaryRestrictions,
                location,
                availabilityStatus,
                expirationDate,
                createdAt
            ]);
            return rows[0];
        }
        catch (error) {
            console.log("Error in create food post", error);
            throw error;
        }
    },

    /**
     * Find food post by foodPostId
     * @param foodPostId
     * @returns {Promise<*|{success: boolean, message: string}>}
     */
    async findById(foodPostId) {
        try {
            const { rows } = await client.query('SELECT * FROM food_posts WHERE id = $1', [foodPostId]);
            return rows[0];
        }
        catch (error) {
            console.log("Error in find food post by id", error);
            throw error;
        }
    },

    /**
     * Find all food posts
     * @returns {Promise<*>}
     */
    async findAll() {
        try {
            const { rows } = await client.query('SELECT * FROM food_posts');
            return rows;
        }
        catch (error) {
            console.log("Error in find all food posts", error);
            throw error;
        }
    },

    /**
     * Find food posts by userId
     * @param id
     * @param title
     * @param quantity
     * @param description
     * @param imageUrl
     * @param dietaryRestrictions
     * @param location
     * @param availabilityStatus
     * @param expirationDate
     * @returns {Promise<*>}
     */
    async updateById(id, {
        title,
        quantity,
        description,
        imageUrl,
        dietaryRestrictions,
        location,
        availabilityStatus,
        expirationDate,
    }) {
        try {
            const { rows } = await client.query(`
                UPDATE food_posts SET
                    title = $1,
                    quantity = $2,
                    description = $3,
                    image_url = $4,
                    dietary_restrictions = $5,
                    location = $6,
                    availability_status = $7,
                    expiration_date = $8
                WHERE id = $9
                RETURNING *;
            `, [title, quantity, description, imageUrl, dietaryRestrictions, location, availabilityStatus, expirationDate, id]);
            return rows[0];
        }
        catch (error) {
            console.log("Error in update food post by id", error);
            throw error;
        }
    },

    /**
     * Delete food post by id
     * @param id
     * @returns {Promise<*>}
     */
    async deleteById(id) {
        try {
            const { rows } = await client.query('DELETE FROM food_posts WHERE id = $1', [id]);
            return rows[0];
        }
        catch (error) {
            console.log("Error in delete food post by id", error);
            throw error;
        }
    },
}

export { createFoodPostTable, FoodPost };
