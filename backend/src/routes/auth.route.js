import e from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


export default router;