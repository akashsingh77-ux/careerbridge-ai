import { User } from "../models/user.model.js";
import { generateAIContent } from "../utils/aiProvider.js";

// Prevent duplicate simultaneous evaluation requests
const evaluatingUsers = new Set();

const TOTAL_AI_QUESTIONS = 3;

const getPerformanceLabel = (percentage) => {
    if (percentage >= 90) return "Excellent";
    if (percentage >= 75) return "Very Good";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Needs Improvement";
    return "Needs More Practice";
};

const calculateOverallPercentage = (
    generalScore,
    domainScore,
    aiScores
) => {
    const generalPercentage = (generalScore / 5) * 100;
    const domainPercentage = (domainScore / 7) * 100;

    const aiTotal = aiScores.reduce(
        (sum, score) => sum + score,
        0
    );

    const aiPercentage =
        aiScores.length > 0
            ? (aiTotal / (TOTAL_AI_QUESTIONS * 10)) * 100
            : 0;

    return (
        generalPercentage +
        domainPercentage +
        aiPercentage
    ) / 3;
};

// ==========================================
// GENERATE AI INTERVIEW QUESTIONS
// ==========================================

export const generateInterviewQuestions = async (req, res) => {
    try {
        const userId = req.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const interview = user.profile?.aiInterview;

        // Resume existing AI interview after refresh
        if (
            interview &&
            interview.questions &&
            interview.questions.length === TOTAL_AI_QUESTIONS
        ) {
            console.log("Returning existing AI interview.");

            return res.status(200).json({
                questions: interview.questions,
                currentQuestion:
                    interview.currentQuestion || 0,
                scores: interview.scores || [],
                evaluations:
                    interview.evaluations || [],
                completed:
                    interview.completed || false,
                success: true,
            });
        }

        const resumeAnalysis =
            user.profile?.aiResumeAnalysis;

        if (
            !resumeAnalysis ||
            !resumeAnalysis.skills ||
            resumeAnalysis.skills.length === 0
        ) {
            return res.status(400).json({
                message: "Please upload your resume first.",
                success: false,
            });
        }

        const skills = resumeAnalysis.skills;

        const projects =
            resumeAnalysis.projects || [];

        const experience =
            resumeAnalysis.experience || [];

        const prompt = `
You are an expert technical interviewer.

Generate a technical interview based ONLY on the candidate's resume information provided below.

Candidate Skills:
${skills.join(", ")}

Candidate Projects:
${projects.join(", ")}

Candidate Experience:
${experience.join(", ")}

Generate EXACTLY 3 interview questions.

Rules:
1. Every question must be related to the candidate's skills, projects, or experience.
2. Do not ask about technologies or concepts that are not present in the resume.
3. Questions should test actual technical understanding.
4. Mix questions between fundamentals, practical implementation, and project-based understanding.
5. Questions should become gradually more challenging.
6. Do not provide answers.
7. Do not provide explanations.
8. Return ONLY valid JSON.

Return exactly this format:

{
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3"
    ]
}
`;

        // Gemini first -> Groq fallback
        const aiResponse = await generateAIContent(prompt);

        console.log(
            "AI INTERVIEW QUESTIONS GENERATED."
        );

        console.log("AI INTERVIEW QUESTIONS:");
        console.log(aiResponse);

        const cleanResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const analysis = JSON.parse(cleanResponse);

        if (
            !analysis.questions ||
            !Array.isArray(analysis.questions) ||
            analysis.questions.length !==
                TOTAL_AI_QUESTIONS
        ) {
            return res.status(500).json({
                message:
                    "AI did not generate exactly 3 questions.",
                success: false,
            });
        }

        // Save AI interview questions
        user.profile.aiInterview.questions =
            analysis.questions;

        user.profile.aiInterview.currentQuestion = 0;

        user.profile.aiInterview.scores = [];

        user.profile.aiInterview.evaluations = [];

        user.profile.aiInterview.completed = false;

        user.profile.aiInterview.historySaved = false;

        user.profile.aiInterview.phase = "ai";

        await user.save();

        return res.status(200).json({
            questions:
                user.profile.aiInterview.questions,

            currentQuestion:
                user.profile.aiInterview.currentQuestion,

            scores:
                user.profile.aiInterview.scores,

            evaluations:
                user.profile.aiInterview.evaluations,

            completed:
                user.profile.aiInterview.completed,

            success: true,
        });
    } catch (error) {
        console.log(
            "GENERATE INTERVIEW QUESTIONS ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to generate interview questions.",
            success: false,
        });
    }
};

// ==========================================
// EVALUATE AI INTERVIEW ANSWER
// ==========================================

export const evaluateInterviewAnswer = async (
    req,
    res
) => {
    const userId = req.id;

    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                message:
                    "Question and answer are required.",
                success: false,
            });
        }

        // Prevent duplicate simultaneous requests
        if (evaluatingUsers.has(userId)) {
            return res.status(429).json({
                message:
                    "Your previous answer is still being evaluated. Please wait.",
                success: false,
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const interview =
            user.profile?.aiInterview;

        if (
            !interview ||
            !interview.questions ||
            interview.questions.length !==
                TOTAL_AI_QUESTIONS
        ) {
            return res.status(400).json({
                message:
                    "Please start an interview first.",
                success: false,
            });
        }

        if (interview.completed) {
            return res.status(400).json({
                message:
                    "Interview already completed.",
                success: false,
            });
        }

        if (!interview.questions.includes(question)) {
            return res.status(400).json({
                message:
                    "Invalid interview question.",
                success: false,
            });
        }

        const currentQuestion =
            interview.currentQuestion || 0;

        if (currentQuestion >= TOTAL_AI_QUESTIONS) {
            return res.status(400).json({
                message:
                    "Interview questions are already completed.",
                success: false,
            });
        }

        // Make sure the candidate answers the correct question
        if (
            question !==
            interview.questions[currentQuestion]
        ) {
            return res.status(400).json({
                message:
                    "Please answer the current interview question.",
                success: false,
            });
        }

        // Prevent answering the same question twice
        if (
            interview.evaluations.length >
            currentQuestion
        ) {
            return res.status(400).json({
                message:
                    "This question has already been evaluated.",
                success: false,
            });
        }

        evaluatingUsers.add(userId);

        const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer to the interview question below.

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer based on:
1. Technical correctness
2. Understanding of the concept
3. Completeness
4. Clarity

Give a score from 0 to 10.

Return ONLY valid JSON in exactly this format:

{
    "score": 0,
    "feedback": "",
    "strengths": "",
    "improvement": ""
}

Rules:
1. score must be a number between 0 and 10.
2. Be fair and realistic.
3. Do not give a high score just because the answer is long.
4. Do not invent information.
5. Return only valid JSON.
`;

        // Gemini first -> Groq fallback
        const aiResponse =
            await generateAIContent(prompt);

        console.log(
            "AI ANSWER EVALUATION GENERATED."
        );

        console.log("AI ANSWER EVALUATION:");
        console.log(aiResponse);

        const cleanResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const evaluation =
            JSON.parse(cleanResponse);

        const score = Math.max(
            0,
            Math.min(10, Number(evaluation.score))
        );

        // Save evaluation
        interview.evaluations.push({
            score,
            feedback: evaluation.feedback,
            strengths: evaluation.strengths,
            improvement: evaluation.improvement,
        });

        // Save score
        interview.scores.push(score);

        // Move to next question
        interview.currentQuestion += 1;

        // ==========================================
        // INTERVIEW COMPLETED
        // ==========================================

        if (
            interview.currentQuestion ===
            TOTAL_AI_QUESTIONS
        ) {
            interview.completed = true;

            interview.phase = "completed";

            // Save history only once
            if (!interview.historySaved) {
                const generalScore =
                    interview.generalScore || 0;

                const domainScore =
                    interview.domainScore || 0;

                const aiScores = [
                    ...interview.scores,
                ];

                const overallPercentage =
                    calculateOverallPercentage(
                        generalScore,
                        domainScore,
                        aiScores
                    );

                user.profile.interviewHistory.push({
                    selectedDomain:
                        interview.selectedDomain || "",

                    generalScore,

                    domainScore,

                    aiScores,

                    aiQuestions: [
                        ...interview.questions,
                    ],

                    aiEvaluations:
                        interview.evaluations.map(
                            (item) => ({
                                score: item.score,
                                feedback:
                                    item.feedback,
                                strengths:
                                    item.strengths,
                                improvement:
                                    item.improvement,
                            })
                        ),

                    overallPercentage: Number(
                        overallPercentage.toFixed(2)
                    ),

                    performanceLabel:
                        getPerformanceLabel(
                            overallPercentage
                        ),

                    completedAt: new Date(),
                });

                interview.historySaved = true;
            }
        }

        await user.save();

        return res.status(200).json({
            evaluation,

            questions:
                interview.questions,

            currentQuestion:
                interview.currentQuestion,

            scores:
                interview.scores,

            evaluations:
                interview.evaluations,

            completed:
                interview.completed,

            success: true,
        });
    } catch (error) {
        console.log(
            "EVALUATE INTERVIEW ANSWER ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to evaluate answer.",
            success: false,
        });
    } finally {
        evaluatingUsers.delete(userId);
    }
};

// ==========================================
// GET INTERVIEW PROGRESS
// ==========================================

export const getInterviewProgress = async (
    req,
    res
) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const interview =
            user.profile?.aiInterview;

        return res.status(200).json({
            selectedDomain:
                interview?.selectedDomain || "",

            phase:
                interview?.phase ||
                "select-domain",

            generalQuestion:
                interview?.generalQuestion || 0,

            generalScore:
                interview?.generalScore || 0,

            generalAnswers:
                interview?.generalAnswers || [],

            // Store the randomly selected 5 questions
            // so refresh continues with the same questions
            generalQuestionIndices:
                interview?.generalQuestionIndices || [],

            domainQuestion:
                interview?.domainQuestion || 0,

            domainScore:
                interview?.domainScore || 0,

            domainAnswers:
                interview?.domainAnswers || [],

            questions:
                interview?.questions || [],

            currentQuestion:
                interview?.currentQuestion || 0,

            scores:
                interview?.scores || [],

            evaluations:
                interview?.evaluations || [],

            completed:
                interview?.completed || false,

            success: true,
        });
    } catch (error) {
        console.log(
            "GET INTERVIEW PROGRESS ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to get interview progress.",
            success: false,
        });
    }
};

// ==========================================
// SAVE INTERVIEW PROGRESS
// ==========================================

export const saveInterviewProgress = async (
    req,
    res
) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const {
            selectedDomain,
            phase,
            generalQuestion,
            generalScore,
            generalAnswers,
            generalQuestionIndices,
            domainQuestion,
            domainScore,
            domainAnswers,
        } = req.body;

        if (!user.profile.aiInterview) {
            user.profile.aiInterview = {};
        }

        user.profile.aiInterview.selectedDomain =
            selectedDomain || "";

        user.profile.aiInterview.phase =
            phase || "select-domain";

        user.profile.aiInterview.generalQuestion =
            generalQuestion ?? 0;

        user.profile.aiInterview.generalScore =
            generalScore ?? 0;

        user.profile.aiInterview.generalAnswers =
            generalAnswers || [];

        user.profile.aiInterview.generalQuestionIndices =
            Array.isArray(generalQuestionIndices)
                ? generalQuestionIndices
                : [];

        user.profile.aiInterview.domainQuestion =
            domainQuestion ?? 0;

        user.profile.aiInterview.domainScore =
            domainScore ?? 0;

        user.profile.aiInterview.domainAnswers =
            domainAnswers || [];

        await user.save();

        return res.status(200).json({
            message:
                "Interview progress saved.",
            success: true,
        });
    } catch (error) {
        console.log(
            "SAVE INTERVIEW PROGRESS ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to save interview progress.",
            success: false,
        });
    }
};

// ==========================================
// START NEW INTERVIEW
// ==========================================

export const startNewInterview = async (
    req,
    res
) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        user.profile.aiInterview = {
            selectedDomain: "",

            phase: "select-domain",

            generalQuestion: 0,

            generalScore: 0,

            generalAnswers: [],

            // Reset random question selection
            generalQuestionIndices: [],

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

        return res.status(200).json({
            message:
                "New interview started.",
            success: true,
        });
    } catch (error) {
        console.log(
            "START NEW INTERVIEW ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to start a new interview.",
            success: false,
        });
    }
};

// ==========================================
// GET INTERVIEW HISTORY
// ==========================================

export const getInterviewHistory = async (
    req,
    res
) => {
    try {
        const user = await User.findById(req.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const history = [
            ...(user.profile?.interviewHistory || []),
        ].sort(
            (a, b) =>
                new Date(b.completedAt) -
                new Date(a.completedAt)
        );

        return res.status(200).json({
            history,
            success: true,
        });
    } catch (error) {
        console.log(
            "GET INTERVIEW HISTORY ERROR:",
            error
        );

        return res.status(500).json({
            message:
                "Failed to get interview history.",
            success: false,
        });
    }
};