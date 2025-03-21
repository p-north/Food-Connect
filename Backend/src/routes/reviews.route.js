import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {handleCreateReview, handleDeleteReviewByID, handleGetAllReviews, handleGetReviewByID} from "../controllers/reviews.controller.js"

const router = express.Router();


// create a new review, pass in the donor id in params
router.post("/:id", handleCreateReview);
// get review by id 
router.get("/:id", verifyToken, handleGetReviewByID);
// get all reviews (userID passed as in token)
router.get("/", verifyToken, handleGetAllReviews);
// delete a review
router.delete("/:id", verifyToken, handleDeleteReviewByID);

export default router;