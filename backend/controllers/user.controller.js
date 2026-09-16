import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import extractResumeText from "../utils/resumeParser.js";
import ai from "../utils/gemini.js";

export const saveJob = async (req, res) => {
  try {
    const userId = req.id;
    const { jobId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (user.role !== "student") {
      return res.status(403).json({
        message: "Only students can save jobs.",
        success: false,
      });
    }

    if (!user.profile.savedJobs) {
      user.profile.savedJobs = [];
    }

    if (user.profile.savedJobs.includes(jobId)) {
      return res.status(400).json({
        message: "Job already saved.",
        success: false,
      });
    }

    user.profile.savedJobs.push(jobId);

    await user.save();

    return res.status(200).json({
      message: "Job saved successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "profile.savedJobs",
      populate: {
        path: "company",
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({
      savedJobs: user.profile.savedJobs,
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    console.log("FILE:", req.file);

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    // ==========================================
    // RESET CURRENT AI INTERVIEW ON LOGIN
    // ==========================================
    user.profile.aiInterview = {
      selectedDomain: "",
      phase: "select-domain",

      generalQuestion: 0,
      generalScore: 0,
      generalAnswers: [],

      domainQuestion: 0,
      domainScore: 0,
      domainAnswers: [],

      questions: [],
      currentQuestion: 0,
      scores: [],
      evaluations: [],

      completed: false,
      historySaved: false,
    };

    await user.save();

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(
      tokenData,
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        message: "Logged out successfully.",
        success: true,
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;

    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Updating user information
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Resume upload
    if (file) {
      // Extract text from resume
      const resumeText = await extractResumeText(file.buffer);

      console.log("RESUME TEXT:");
      console.log(resumeText);

      // Ask Gemini to analyze the resume
      const prompt = `
You are an expert technical recruiter.

Analyze the following resume.

Resume:
${resumeText}

Return ONLY valid JSON in exactly this format:

{
  "skills": [],
  "projects": [],
  "experience": [],
  "education": []
}

Rules:
1. skills must contain technical skills mentioned in the resume.
2. projects must contain only the names of technical projects.
3. experience must contain each experience as a single descriptive string.
4. education must contain each education entry as a single descriptive string.
5. Do not return objects inside experience or education.
6. Do not invent information.
7. Do not include explanations.
8. Return only valid JSON.
`;

      const result = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const aiResponse = result.text;

      console.log("AI RESUME ANALYSIS:");
      console.log(aiResponse);

      // Convert AI response into JSON
      const cleanResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const analysis = JSON.parse(cleanResponse);

      // Save AI analysis
      user.profile.aiResumeAnalysis = {
        skills: analysis.skills || [],
        projects: analysis.projects || [],
        experience: analysis.experience || [],
        education: analysis.education || [],
      };

      // Upload resume to Cloudinary
      const fileUri = getDataUri(file);

      const cloudResponse =
        await cloudinary.uploader.upload(fileUri.content);

      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log("UPDATE PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};