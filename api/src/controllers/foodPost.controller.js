import {FoodPost} from "../models/foodPost.model.js";
import { handleImageUpload, handleImageDeletion, generateSignedUrls } from "../utils/amazonS3.utils.js";

const createFoodPost = async (req, res) => {
    try {
        // add userId to req.body (change this)
        req.body.userId = req.userID;
        // generateimage keys from s3 
        const {keys} = await handleImageUpload(req, res);
        console.log("AWS keys", keys);
        
        // add the keys to body
        req.body.imageUrl = keys;
        const data = await FoodPost.create(req.body);

      
        // Generate signed URLs for this post's images, and send data back
        const signedUrlsResult = await generateSignedUrls(keys);
        data.imageUrl = signedUrlsResult;
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

        // for each post, convert keys into signed urls
        const postsWithSignedUrls = await Promise.all(
            data.map(async (post)=>{
                if(post.imageUrl && post.imageUrl.length > 0){
                    // Generate signed URLs for this post's images
                    const signedUrlsResult = await generateSignedUrls(post.imageUrl);
                    
                    if (signedUrlsResult.success) {
                        // Return post with signed URLs instead of keys
                        return {
                            ...post,
                            imageUrl: signedUrlsResult.urls // Replace keys with signed URLs
                        };
                    }

                }
            })
        );
        
    
        res.status(200).json({
            success: true,
            data: postsWithSignedUrls,
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

        const images = foodPost.imageUrl;
        console.log(typeof images)

        // delete from S3
        await handleImageDeletion(images);

        await FoodPost.deleteById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Food post deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error '
        });
    }
}

export { createFoodPost, getFoodPosts, getFoodPost, updateFoodPost, deleteFoodPost };