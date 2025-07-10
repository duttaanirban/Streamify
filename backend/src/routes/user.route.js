import e from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendRequests} from "../controllers/user.controller.js";
const router = e.Router();

// apply auth middleware to all routes in this router
router.use(protectRoute)

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);

router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;