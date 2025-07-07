import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectRoute = async (req, res, next) => {
    try {
        // Check if the JWT token is present in cookies
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ message: "Unauthorized- No token provided" });
        }
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized- No token provided" });
        }

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         if(!decoded) {
            return res.status(401).json({ message: "Unauthorized- Invalid token" });
         }

         const user = await User.findById(decoded.userId).select("-password")  ;

         if(!user) {
            return res.status(401).json({ message: "Unauthorized- User not found" });
         }

        req.user = user; // Attach user to request object

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};