
/*
    FoodPost model
    - id
    - userId
    - title
    - quantity
    - description
    - image url
    - dietaryRestrictions
    - location
    - availability status
    - expiration date
    - created date
*/

import client from "../database/connectDB.js";

const FoodPost = {

    /**
     * Create food post
     * @param userId
     * @param title
     * @param quantity
     * @param description
     * @param image
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
        image,
        dietaryRestrictions,
        location,
        availabilityStatus,
        expirationDate,
                 }) {
        try {
            const createdAt = Date.now();
            const { rows } = await client.query(`
                INSERT INTO food_posts (userId, title, quantity, description, image, dietaryRestrictions, location, availabilityStatus, expirationDate, createdAt)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *;
            `, [userId, title, quantity, description, image, dietaryRestrictions, location, availabilityStatus, expirationDate, createdAt]);
            return rows[0];
        }
        catch (error) {
            console.log("Error in create food post", error);
            throw error;
        }
    },

    /**
     * Find food post by id
     * @param id
     * @returns {Promise<*|{success: boolean, message: string}>}
     */
    async findById(id) {
        try {
            const { rows } = await client.query('SELECT * FROM food_posts WHERE id = $1', [id]);
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
     * Update food post by id
     * @param id
     * @param title
     * @param quantity
     * @param description
     * @param image
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
        image,
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
                    image = $4,
                    dietaryRestrictions = $5,
                    location = $6,
                    availabilityStatus = $7,
                    expirationDate = $8
                WHERE id = $9
                RETURNING *;
            `, [title, quantity, description, image, dietaryRestrictions, location, availabilityStatus, expirationDate, id]);
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

export default FoodPost;