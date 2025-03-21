import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {handleCreateReview, handleDeleteReviewByID, handleGetAllReviews, handleRecipientReviews} from "../controllers/reviews.controller.js"


const router = express.Router();


// functions to get all the reviews for a specific recipient
router.get("/recReviews", verifyToken, handleRecipientReviews);
// create a new review, pass in the donor id in params
router.post("/:donorID", verifyToken, handleCreateReview);
// get all reviews for a specific donor
router.get("/:donorID", verifyToken, handleGetAllReviews);
// delete a review with review id
router.delete("/:reviewID", verifyToken, handleDeleteReviewByID);

// Optional for future: Be able to update a review

export default router;