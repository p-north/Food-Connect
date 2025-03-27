import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {
    // make it expire in 7days for continous sessions
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // set the cookie
    res.cookie("token", token, {
        // cannot be accesed by javascript
        httpOnly: true,
        // make it secure once in production
        secure: true,
        // secure: process.env.NODE_ENV === "production",           ---CHANGE THIS IN PRODUCTION
        // secure: process.env.NODE_ENV === "production",

        sameSite: "None", //prevents CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return token
    return token;
}