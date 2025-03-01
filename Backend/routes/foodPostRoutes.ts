import { Router } from 'express';
import {
    createFoodPost,
    deleteFoodPost,
    getFoodPost,
    getFoodPosts,
    updateFoodPost
} from "../controllers/foodPostController";

const router = Router();

router.get('/', getFoodPost);
router.post('/', createFoodPost);
router.put('/:id', updateFoodPost);
router.delete('/:id',deleteFoodPost);

export default router;