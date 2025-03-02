import jwt from 'jsonwebtoken';

// middleware to verify token from user

export const verifyToken = (req, res, next) =>{
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({ success: false, message: "Unauthorized! no token provided"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            if(!token) return res.status(401).json({ success: false, message: "Unauthorized! invalid token"});
        }
        req.userID = decoded.userId;
        // pass to next onve validated
        next();
    } catch (error) {
        console.log("Error in verify token", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }

}