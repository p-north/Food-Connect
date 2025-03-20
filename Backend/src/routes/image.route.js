// import express from "express";
// import { handleImageUpload, handleImageRetrieval } from "../utils/amazonS3.utils.js";
// import { verifyToken } from "../middlewares/verifyToken.js";
// import multer from "multer"



// const router = express.Router();

// // Setup multer
// const storage = multer.memoryStorage();
// const upload = multer({storage: storage});



// // POST route
// // Verify token for each request -> array of images -> handle upload to s3
// router.post("/upload", verifyToken, upload.array('images'), handleImageUpload);
// // router.post("/upload", upload.array('images'), handleImageUpload);
// // GET route to retirive all image links for a user
// // Verify token -> handle the links retrieval
// router.get("/get", verifyToken, handleImageRetrieval);


// export default router;