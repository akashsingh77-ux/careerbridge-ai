import express from "express";

import {
    generateInterviewQuestions,
    evaluateInterviewAnswer,
    getInterviewProgress,
    saveInterviewProgress,
    startNewInterview,
    getInterviewHistory
} from "../controllers/aiInterview.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/generate").get(
    isAuthenticated,
    generateInterviewQuestions
);

router.route("/evaluate").post(
    isAuthenticated,
    evaluateInterviewAnswer
);

router.route("/progress").get(
    isAuthenticated,
    getInterviewProgress
);

router.route("/progress").post(
    isAuthenticated,
    saveInterviewProgress
);

router.route("/new").post(
    isAuthenticated,
    startNewInterview
);

router.route("/history").get(
    isAuthenticated,
    getInterviewHistory
);

export default router;