import express from "express";
import {
    createFoodPost,
    deleteFoodPost,
    getFoodPost,
    getFoodPosts,
    updateFoodPost
} from '../controllers/foodPost.controller.js';
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

router.get('/', verifyToken, getFoodPosts);
router.get('/:id', verifyToken, getFoodPost);
router.post('/', verifyToken,  createFoodPost);
router.put('/:id', verifyToken, updateFoodPost);
router.delete('/:id',verifyToken, deleteFoodPost);

export default router;