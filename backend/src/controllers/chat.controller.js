import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(req.user.id);

        res.status(200).json({
            success: true,
            token
        });
    } catch (error) {
        console.log("Error in getStreamToken controller:", error.message);
        res.status(500).json({message: "Internal server error"});
        
    }
};