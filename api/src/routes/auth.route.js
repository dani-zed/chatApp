import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.put("/update-profile",auth,updateProfile);
router.get("/check",auth,checkAuth)

export default router;
