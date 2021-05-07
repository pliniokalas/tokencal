import express from "express";

import { createPlan, updatePlan, deletePlan } from "../controllers/plan";

const router = express.Router();

router.post("/", createPlan);
router.patch("/", updatePlan);
router.delete("/", deletePlan);

export default router;
