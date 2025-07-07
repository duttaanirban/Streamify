import e from "express";
import { login, logout, signup, onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = e.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectRoute, onboard);


export default router;