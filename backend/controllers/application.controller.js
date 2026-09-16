import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this jobs",
        success: false,
      });
    }

    // Check if the job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

// Admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }

    // Find the application by application id
    const application = await Application.findOne({
      _id: applicationId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong.",
      success: false,
    });
  }
};

// Recruiter Dashboard
export const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterId = req.id;

    // Get only the jobs created by the logged-in recruiter
    const jobs = await Job.find({
      created_by: recruiterId,
    })
      .select("_id title createdAt company")
      .populate({
        path: "company",
        select: "name logo",
      })
      .sort({ createdAt: -1 });

    const jobIds = jobs.map((job) => job._id);

    // Get applications belonging only to the recruiter's jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "applicant",
        select: "fullname email phoneNumber profile",
      })
      .populate({
        path: "job",
        select: "title",
      });

    const totalJobs = jobs.length;
    const totalApplicants = applications.length;

    const pending = applications.filter(
      (application) => application.status === "pending"
    ).length;

    const accepted = applications.filter(
      (application) => application.status === "accepted"
    ).length;

    const rejected = applications.filter(
      (application) => application.status === "rejected"
    ).length;

    // Count applicants for every job
    const jobPerformance = jobs.map((job) => {
      const applicantCount = applications.filter(
        (application) =>
          application.job?._id?.toString() === job._id.toString()
      ).length;

      return {
        _id: job._id,
        title: job.title,
        applicants: applicantCount,
        createdAt: job.createdAt,
        company: job.company,
      };
    });

    // Get the latest 8 applications
    const recentApplications = applications.slice(0, 8);

    return res.status(200).json({
      success: true,

      stats: {
        totalJobs,
        totalApplicants,
        pending,
        accepted,
        rejected,
      },

      jobPerformance,

      recentApplications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to load recruiter dashboard.",
      success: false,
    });
  }
};