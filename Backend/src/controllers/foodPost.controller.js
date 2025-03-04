import FoodPost from "../models/foodPost.model.js";

/**
 * Create a new food post
 * @param req {Request}
 * @param res {Response}
 * @returns {Promise<void>}
 */
const createFoodPost = async (req, res) => {
    try {
        // TODO: USER ID FROM TOKEN
        const data = await FoodPost.create(req.body);
        res.status(201).json({
            data: data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating food post', error });
    }
}

const getFoodPosts = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Food posts fetched successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const getFoodPost = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Food post fetched successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const updateFoodPost = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Food post updated successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const deleteFoodPost = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Food post deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

export { createFoodPost, getFoodPosts, getFoodPost, updateFoodPost, deleteFoodPost };