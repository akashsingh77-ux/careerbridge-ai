import express from "express";
import { analyzeResume } from "../controllers/ai.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.post(
    "/analyze-resume",
    singleUpload,
    analyzeResume
);

export default router;