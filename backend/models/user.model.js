import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },

    profile: {
      bio: {
        type: String,
      },

      skills: [{ type: String }],

      resume: {
        type: String,
      },

      resumeOriginalName: {
        type: String,
      },

      aiResumeAnalysis: {
        skills: [{ type: String }],
        projects: [{ type: String }],
        experience: [{ type: String }],
        education: [{ type: String }],
      },

      aiInterview: {
        selectedDomain: {
          type: String,
          default: "",
        },

        phase: {
          type: String,
          default: "select-domain",
        },

        generalQuestion: {
          type: Number,
          default: 0,
        },

        generalScore: {
          type: Number,
          default: 0,
        },

        generalAnswers: [
          {
            type: Number,
          },
        ],

        generalQuestionIndices: [
          {
            type: Number,
          },
        ],

        domainQuestion: {
          type: Number,
          default: 0,
        },

        domainScore: {
          type: Number,
          default: 0,
        },

        domainAnswers: [
          {
            type: Number,
          },
        ],

        questions: [{ type: String }],

        currentQuestion: {
          type: Number,
          default: 0,
        },

        scores: [{ type: Number }],

        evaluations: [
          {
            score: Number,
            feedback: String,
            strengths: String,
            improvement: String,
          },
        ],

        completed: {
          type: Boolean,
          default: false,
        },

        historySaved: {
          type: Boolean,
          default: false,
        },
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      profilePhoto: {
        type: String,
        default: "",
      },

      savedJobs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
      ],

      interviewHistory: [
        {
          selectedDomain: {
            type: String,
            default: "",
          },

          generalScore: {
            type: Number,
            default: 0,
          },

          domainScore: {
            type: Number,
            default: 0,
          },

          aiScores: [
            {
              type: Number,
            },
          ],

          aiQuestions: [
            {
              type: String,
            },
          ],

          aiEvaluations: [
            {
              score: Number,
              feedback: String,
              strengths: String,
              improvement: String,
            },
          ],

          overallPercentage: {
            type: Number,
            default: 0,
          },

          performanceLabel: {
            type: String,
            default: "",
          },

          completedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);