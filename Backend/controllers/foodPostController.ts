import { Request, Response } from 'express';

const createFoodPost = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Food post created successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const getFoodPosts = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Food posts fetched successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const getFoodPost = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Food post fetched successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const updateFoodPost = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Food post updated successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

const deleteFoodPost = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'Food post deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error ' });
    }
}

export { createFoodPost, getFoodPosts, getFoodPost, updateFoodPost, deleteFoodPost };