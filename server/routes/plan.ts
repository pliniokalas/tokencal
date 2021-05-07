import express from "express";
import { createPlan, updatePlan, deletePlan } from "../controllers/plan";
import { auth } from "../middleware/auth";

// ================================================== 

const router = express.Router();

router.post("/", auth, createPlan);
router.patch("/", auth, updatePlan);
router.delete("/", auth, deletePlan);

export default router;
