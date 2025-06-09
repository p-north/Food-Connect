// Socket.IO middleware to verify tokens
import jwt from "jsonwebtoken";

const extractToken = (cookieHeader) => {
    if (!cookieHeader) {
        return null;
    }
    const cookies = cookieHeader.split(";").reduce((cookies, cookie) => {
        const [name, value] = cookie.split("=").map((c) => c.trim());
        cookies[name] = value;
        return cookies;
    }, {});

    return cookies.token;
}

const verifySocketToken = (socket, next) => {
    const cookies = socket.handshake.headers.cookie;

    const token = extractToken(cookies);

    if (!token) {
        return next(new Error("Unauthorized: No token provided"));
    }

    try {
        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userId; // Attach user data to the socket
        next(); // Allow connection
    } catch (error) {
        console.log("Socket token verification error:", error);
        return next(new Error("Unauthorized: Invalid token"));
    }
};
export default verifySocketToken;