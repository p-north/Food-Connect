import {FoodPost} from "../models/foodPost.model.js";
import { handleImageUpload, handleImageRetrieval } from "../utils/amazonS3.utils.js";

const createFoodPost = async (req, res) => {
    try {
        // add userId to req.body (change this)
        req.body.userId = 2;
        // generate signed image urls from s3 
        const {urls} = await handleImageUpload(req, res);
        console.log(urls);
        
        
        // add the signed urls to body
        req.body.imageUrl = urls;
        const data = await FoodPost.create(req.body);
        res.status(201).json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: food post not created',
        });
    }
}

const getFoodPosts = async (req, res) => {
    try {
        const data = await FoodPost.findAll();
        res.status(200).json({
            success: true,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: food posts not fetched',
        });
    }
}

const getFoodPost = async (req, res) => {
    try {
        const data = await FoodPost.findById(req.params.id);
        res.status(200).json({
            data: data,
            message: 'Food post fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: food post not fetched',
        });
    }
}

const updateFoodPost = async (req, res) => {
    try {
        // check if user is the owner of the food post
        const foodPost = await FoodPost.findById(req.params.id);
        if (foodPost.userId !== req.userID) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized to update food post',
            });
        }
        const data = await FoodPost.updateById(req.params.id, req.body);
        res.status(200).json({
            data: data,
            message: 'Food post updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error: food post not updated',
            success: false,
        });
    }
}

const deleteFoodPost = async (req, res) => {
    try {
        // check if user is the owner of the food post
        const foodPost = await FoodPost.findById(req.params.id);
        if (foodPost.userId !== req.userID) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized to delete food post',
            });
        }
        await FoodPost.deleteById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Food post deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

export { createFoodPost, getFoodPosts, getFoodPost, updateFoodPost, deleteFoodPost };