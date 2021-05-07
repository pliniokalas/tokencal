import express from "express";
import { getLanding, register, login } from "../controllers/user";

// ================================================== 

const router = express.Router();

router.get("/", getLanding);
router.post("/register", register);
router.post("/login", login);

export default router;
