import { auth } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";
import express from "express";

const router = express.Router();

router.get("/user",auth, getUsersForSidebar);
router.get("/:id",auth, getMessages);

router.post("/send",auth,sendMessages); 

export default router;