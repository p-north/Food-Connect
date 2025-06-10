import client from "../database/connectDB.js";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
// Configure S3

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function handleImageUpload(req) {
  const files = req?.files;
  // return error if no files are available
  if (!files) {
    return { success: false, message: "No files have been sent" };
  }
  // UserID
  const userID = req.userID;

  try {
    // array to store all image links
    const imageKeys = [];
    // loop through each file
    for (const file of files) {
      // add unique name for each
      const fileName = uuidv4() + "." + file.mimetype.split("/")[1];

      // Compress the image here (for efficient storage)

      // setup upload params
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        // user folder for each user
        Key: `user-uploads/${userID}/${fileName}`,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      // upload to s3
      const s3Response = await s3.upload(params).promise();
      // save to url array
      console.log("S3 Response:", s3Response.Key);

      // Store the S3 key 
      imageKeys.push(s3Response.Key);

    
    }
    return {
      success: true,
      message: "Images uploaded sucessfully",
      keys: imageKeys,
    };
  } catch (error) {
    console.error("Error uploading images:", error);
    return { success: false, message: "Image uploading error" };
  }
}

// New function to generate signed URLs on-demand
async function generateSignedUrls(imageKeys, expiresIn = 3600) {
  try {
    const signedUrls = [];
    
    for (const key of imageKeys) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Expires: expiresIn, // Default 1 hour
      };
      
      const signedURL = await s3.getSignedUrlPromise("getObject", params);
      signedUrls.push(signedURL);
    }
    
    return { success: true, urls: signedUrls };
  } catch (error) {
    console.error("Error generating signed URLs:", error);
    return { success: false, message: "Error generating signed URLs" };
  }
}

async function handleImageDeletion(imageKeys) {
  try {
     // function to delete all image objects using keys directly
    for (const imageKey of imageKeys) {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey, // Use key directly, no URL parsing needed
      };

      // delete the object from s3
      await s3.deleteObject(params).promise();
    }
    console.log("All objects deleted for user in S3");
    return { status: "true", message: "All images deleted from S3" };
  } catch (error) {
    console.error("Error while generating image", error);
    return { "Error while generating image": error };
  }
}
// optional
async function handleImageUpdate(req) {}

export { handleImageUpload, generateSignedUrls, handleImageDeletion };
