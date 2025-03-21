import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {handleCreateReview, handleDeleteReviewByID, handleGetAllReviews} from "../controllers/reviews.controller.js"

const router = express.Router();


// create a new review, pass in the donor id in params
router.post("/:id", verifyToken, handleCreateReview);
// get all reviews for a donor (userID passed as in token)
router.get("/", verifyToken, handleGetAllReviews);
// delete a review with review id
router.delete("/:id", verifyToken, handleDeleteReviewByID);

// Optional for future: Be able to update a review

export default router;