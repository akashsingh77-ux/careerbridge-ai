import express from "express";
import { testGroq } from "../controllers/groqTest.controller.js";

const router = express.Router();

router.route("/test").get(testGroq);

export default router;