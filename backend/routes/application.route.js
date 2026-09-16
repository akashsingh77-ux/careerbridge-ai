import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
  getRecruiterDashboard,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);

router.route("/get").get(isAuthenticated, getAppliedJobs);

router
  .route("/recruiter/dashboard")
  .get(isAuthenticated, getRecruiterDashboard);

router.route("/:id/applicants").get(isAuthenticated, getApplicants);

router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;