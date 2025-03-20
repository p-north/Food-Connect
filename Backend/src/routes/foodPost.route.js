import { Router } from 'express';
import {
    createFoodPost,
    deleteFoodPost,
    getFoodPost,
    getFoodPosts,
    updateFoodPost
} from '../controllers/foodPost.controller.js';
import {verifyToken} from "../middlewares/verifyToken.js";
import multer from "multer"



const router = Router();


// Setup multer
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', verifyToken, getFoodPosts);
router.get('/:id', verifyToken, getFoodPost);
router.post('/', verifyToken, upload.array('images'), createFoodPost);
router.put('/:id', verifyToken, updateFoodPost);
router.delete('/:id',verifyToken, deleteFoodPost);

export default router;