import e from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends } from "../controllers/user.controller.js";


const router = e.Router();

// apply auth middleware to all routes in this router
router.use(protectRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);






export default router;