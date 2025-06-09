import express from "express";
import client from "../database/connectDB.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import toCamelCase from "../utils/toCamelCase.js";


const router = express.Router();

// get basic user info
router.get("/:id", verifyToken, async (req, res) => {
    const {id} = req.params;
    console.log("id", id);

    try {
        const userQuery = await client.query(
            'SELECT id, name, type_of_account FROM users WHERE id = $1',
            [id]
        );
        
        if (userQuery.rows.length === 0) {
            return res.status(404).json({success: false, message: "User not found"});
        }
        const data = toCamelCase(userQuery.rows[0]);
       

        res.status(200).json({success: true, data});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
})


export default router;