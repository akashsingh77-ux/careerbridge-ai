import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import {
    generalQuestions,
    domainQuestions
} from "../data/interviewQuestions";

const domains = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Java Developer",
    "Python Developer",
    "JavaScript Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Engineer",
    "Database Administrator",
    "Mobile App Developer",
    "Android Developer",
    "iOS Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA / Test Engineer"
];

const AIInterview = () => {
    const navigate = useNavigate();
    // Main interview phase
    // const [phase, setPhase] = useState("domain");
    const [phase, setPhase] = useState("select-domain");

    // Domain selection
    const [selectedDomain, setSelectedDomain] = useState("");

    // General MCQ round
    const [generalQuestion, setGeneralQuestion] = useState(0);
    const [generalScore, setGeneralScore] = useState(0);
    const [selectedGeneralAnswer, setSelectedGeneralAnswer] = useState(null);

    // Domain MCQ round
    const [domainQuestion, setDomainQuestion] = useState(0);
    const [domainScore, setDomainScore] = useState(0);
    const [selectedDomainAnswer, setSelectedDomainAnswer] = useState(null);

    // Saved MCQ answers
    const [generalAnswers, setGeneralAnswers] = useState([]);
    const [selectedGeneralQuestionIndices, setSelectedGeneralQuestionIndices] = useState([]);
    const [domainAnswers, setDomainAnswers] = useState([]);

    // AI interview
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [evaluating, setEvaluating] = useState(false);
    const [error, setError] = useState("");
    const [evaluation, setEvaluation] = useState(null);
    const [scores, setScores] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [completed, setCompleted] = useState(false);

    const selectedDomainQuestions =
        selectedDomain ? domainQuestions[selectedDomain] || [] : [];

    // Load saved interview progress from MongoDB
    useEffect(() => {
        const loadProgress = async () => {
            try {
                const res = await axios.get(
                  "https://careerbridge-ai-backend.onrender.com/api/v1/ai-interview/progress",
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setSelectedDomain(res.data.selectedDomain || "");
                    setPhase(res.data.phase || "select-domain");

                    setGeneralQuestion(res.data.generalQuestion || 0);
                    setGeneralScore(res.data.generalScore || 0);
                    setGeneralAnswers(res.data.generalAnswers || []);
                    setSelectedGeneralQuestionIndices(
    res.data.generalQuestionIndices || []
);

                    setDomainQuestion(res.data.domainQuestion || 0);
                    setDomainScore(res.data.domainScore || 0);
                    setDomainAnswers(res.data.domainAnswers || []);

                    setCurrentQuestion(res.data.currentQuestion || 0);
                    setScores(res.data.scores || []);
                    setEvaluations(res.data.evaluations || []);
                    setCompleted(res.data.completed || false);
                }
            } catch (error) {
                console.log("LOAD INTERVIEW PROGRESS ERROR:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load interview progress."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, []);

    const saveProgress = async (progress) => {
        try {
            await axios.post(
                "https://careerbridge-ai-backend.onrender.com/api/v1/ai-interview/progress",
                progress,
                {
                    withCredentials: true,
                }
            );
        } catch (error) {
            console.log("SAVE INTERVIEW PROGRESS ERROR:", error);
        }
    };

    // Continue to General Round Instructions
    const startInterview = () => {
    if (!selectedDomain) {
        setError("Please select a domain first.");
        return;
    }

    const randomIndices = [...Array(generalQuestions.length).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

    setError("");
    setSelectedGeneralQuestionIndices(randomIndices);
    setPhase("general-instructions");
    setGeneralQuestion(0);
    setGeneralScore(0);
    setGeneralAnswers([]);
    setSelectedGeneralAnswer(null);

    saveProgress({
        selectedDomain,
        phase: "general-instructions",
        generalQuestion: 0,
        generalScore: 0,
        generalAnswers: [],
        generalQuestionIndices: randomIndices,
        domainQuestion: 0,
        domainScore: 0,
        domainAnswers: [],
    });
};

    // Start General MCQ Round after instructions
    const startGeneralRound = () => {
        setError("");
        setPhase("general");

        saveProgress({
            selectedDomain,
            phase: "general",
            generalQuestion: 0,
            generalScore,
            generalQuestionIndices: selectedGeneralQuestionIndices,
            generalAnswers,
            domainQuestion: 0,
            domainScore: 0,
            domainAnswers,
        });
    };

    // Handle General MCQ answer
    const submitGeneralAnswer = () => {
        if (selectedGeneralAnswer === null) {
            setError("Please select an option.");
            return;
        }

        const current =
    generalQuestions[selectedGeneralQuestionIndices[generalQuestion]];

        const newScore =
            generalScore +
            (selectedGeneralAnswer === current.answer ? 1 : 0);

        const newAnswers = [
            ...generalAnswers,
            selectedGeneralAnswer,
        ];

        const isLastQuestion =
    generalQuestion === selectedGeneralQuestionIndices.length - 1;

        const newQuestion = isLastQuestion
            ? 0
            : generalQuestion + 1;

        const newPhase = isLastQuestion
            ? "general-result"
            : "general";

        setGeneralScore(newScore);
        setGeneralAnswers(newAnswers);
        setError("");
        setSelectedGeneralAnswer(null);

        if (!isLastQuestion) {
            setGeneralQuestion(newQuestion);
        } else {
            setPhase("general-result");
            setDomainQuestion(0);
            setDomainScore(0);
            setDomainAnswers([]);
        }

        saveProgress({
            selectedDomain,
            phase: newPhase,
            generalQuestion: newQuestion,
            generalScore: newScore,
            generalAnswers: newAnswers,
            generalQuestionIndices: selectedGeneralQuestionIndices,
            domainQuestion: 0,
            domainScore: 0,
            domainAnswers: [],
        });
    };

    // Move from General Result to Domain Instructions
    const startDomainInstructions = () => {
        setError("");
        setPhase("domain-instructions");

        saveProgress({
            selectedDomain,
            phase: "domain-instructions",
            generalQuestion: selectedGeneralQuestionIndices.length,
            generalScore,
            generalAnswers,
            generalQuestionIndices: selectedGeneralQuestionIndices,
            domainQuestion: 0,
            domainScore: 0,
            domainAnswers: [],
        });
    };

    // Start Domain MCQ Round after instructions
    const startDomainRound = () => {
        setError("");
        setPhase("domain-mcq");

        saveProgress({
            selectedDomain,
            phase: "domain-mcq",
            generalQuestion: selectedGeneralQuestionIndices.length,
            generalScore,
            generalAnswers,
            generalQuestionIndices: selectedGeneralQuestionIndices,
            domainQuestion: 0,
            domainScore: 0,
            domainAnswers,
        });
    };

    // Handle Domain MCQ answer
    const submitDomainAnswer = () => {
        if (selectedDomainAnswer === null) {
            setError("Please select an option.");
            return;
        }

        const current = selectedDomainQuestions[domainQuestion];

        const newScore =
            domainScore +
            (selectedDomainAnswer === current.answer ? 1 : 0);

        const newAnswers = [
            ...domainAnswers,
            selectedDomainAnswer,
        ];

        const isLastQuestion =
            domainQuestion === selectedDomainQuestions.length - 1;

        const newQuestion = isLastQuestion
            ? 0
            : domainQuestion + 1;

        const newPhase = isLastQuestion
            ? "domain-result"
            : "domain-mcq";

        setDomainScore(newScore);
        setDomainAnswers(newAnswers);
        setError("");
        setSelectedDomainAnswer(null);

        if (!isLastQuestion) {
            setDomainQuestion(newQuestion);
        } else {
            setPhase("domain-result");
        }

        saveProgress({
            selectedDomain,
            phase: newPhase,
            generalQuestion,
            generalScore,
            generalAnswers,
            domainQuestion: newQuestion,
            domainScore: newScore,
            domainAnswers: newAnswers,
        });
    };

    // Move from Domain Result to AI Round Instructions
    const startAIInstructions = () => {
        setError("");
        setPhase("ai-instructions");

        saveProgress({
            selectedDomain,
            phase: "ai-instructions",
            generalQuestion: selectedGeneralQuestionIndices.length,
            generalScore,
            generalAnswers,
            domainQuestion: selectedDomainQuestions.length,
            domainScore,
            domainAnswers,
        });
    };

    // Start Resume-Based AI Round after instructions
    const startAIRound = () => {
        setError("");
        setPhase("ai");

        saveProgress({
            selectedDomain,
            phase: "ai",
            generalQuestion: selectedGeneralQuestionIndices.length,
            generalScore,
            generalAnswers,
            domainQuestion: selectedDomainQuestions.length,
            domainScore,
            domainAnswers,
        });
    };

    // Download final interview report as PDF
    const downloadPDFReport = () => {
        const doc = new jsPDF();

        const addText = (text, x, y, maxWidth = 180, lineHeight = 7) => {
            const lines = doc.splitTextToSize(String(text || ""), maxWidth);

            if (y + lines.length * lineHeight > 280) {
                doc.addPage();
                y = 20;
            }

            doc.text(lines, x, y);
            return y + lines.length * lineHeight;
        };

        let y = 20;

        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("AI Interview Assessment Report", 105, y, {
            align: "center",
        });

        y += 12;

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        y = addText(`Domain: ${selectedDomain}`, 15, y);
        y += 2;
        y = addText(`Overall Performance: ${overallPercentage}%`, 15, y);
        y += 2;
        y = addText(`Performance: ${performanceLabel}`, 15, y);

        y += 10;

        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("Round Scores", 15, y);

        y += 9;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        y = addText(
            `General & Communication: ${generalScore}/${selectedGeneralQuestionIndices.length} (${generalPercentage}%)`,
            15,
            y
        );
        y = addText(
            `${selectedDomain}: ${domainScore}/${selectedDomainQuestions.length} (${domainPercentage}%)`,
            15,
            y
        );
        y = addText(
            `Resume-Based AI: ${aiAverage}/10 (${aiPercentage}%)`,
            15,
            y
        );

        y += 8;

        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("AI Question Scores", 15, y);

        y += 9;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        scores.forEach((score, index) => {
            y = addText(
                `Question ${index + 1}: ${score}/10`,
                15,
                y
            );
            y += 2;
        });

        y += 6;

        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("Strengths", 15, y);

        y += 9;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        if (allStrengths.length > 0) {
            allStrengths.forEach((strength) => {
                y = addText(`- ${strength}`, 15, y);
                y += 2;
            });
        } else {
            y = addText(
                "No AI strength feedback is available.",
                15,
                y
            );
        }

        y += 6;

        doc.setFontSize(15);
        doc.setFont("helvetica", "bold");
        doc.text("Areas to Improve", 15, y);

        y += 9;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        if (allImprovements.length > 0) {
            allImprovements.forEach((improvement) => {
                y = addText(`- ${improvement}`, 15, y);
                y += 2;
            });
        } else {
            y = addText(
                "No AI improvement feedback is available.",
                15,
                y
            );
        }

        y += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        addText(
            "Generated by the AI Interview system.",
            15,
            y
        );

        doc.save("AI-Interview-Report.pdf");
    };

    // Load AI interview
    useEffect(() => {
        if (phase !== "ai") {
            return;
        }

        const generateQuestions = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await axios.get(
                   "https://careerbridge-ai-backend.onrender.com/api/v1/ai-interview/generate",
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setQuestions(res.data.questions);
                    setCurrentQuestion(res.data.currentQuestion || 0);
                    setScores(res.data.scores || []);
                    setEvaluations(res.data.evaluations || []);
                    setCompleted(res.data.completed || false);
                } else {
                    setError(
                        res.data.message ||
                        "Failed to generate questions."
                    );
                }
            } catch (error) {
                console.log(error);

                setError(
                    error.response?.data?.message ||
                    "Something went wrong while generating the interview."
                );
            } finally {
                setLoading(false);
            }
        };

        generateQuestions();
    }, [phase]);

    const submitAnswer = async () => {
        if (!answer.trim()) {
            setError("Please write an answer before submitting.");
            return;
        }

        try {
            setError("");
            setEvaluating(true);

            const res = await axios.post(
              "https://careerbridge-ai-backend.onrender.com/api/v1/ai-interview/evaluate",
                {
                    question: questions[currentQuestion],
                    answer: answer,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setEvaluation(res.data.evaluation);

                setScores(res.data.scores || []);

                setEvaluations(res.data.evaluations || []);

                setCompleted(res.data.completed || false);
            } else {
                setError(
                    res.data.message ||
                    "Failed to evaluate your answer."
                );
            }
        } catch (error) {
            console.log(error);

            setError(
                error.response?.data?.message ||
                "Something went wrong while evaluating your answer."
            );
        } finally {
            setEvaluating(false);
        }
    };

    const nextQuestion = () => {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer("");
        setEvaluation(null);
        setError("");
    };

    // Start a completely fresh interview without deleting interview history
    const startNewInterview = async () => {
        try {
            setError("");

            const res = await axios.post(
              "https://careerbridge-ai-backend.onrender.com/api/v1/ai-interview/new",
                {},
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                setSelectedDomain("");
                setPhase("select-domain");

                setGeneralQuestion(0);
                setGeneralScore(0);
                setSelectedGeneralAnswer(null);
                setGeneralAnswers([]);
                setSelectedGeneralQuestionIndices([]);

                setDomainQuestion(0);
                setDomainScore(0);
                setSelectedDomainAnswer(null);
                setDomainAnswers([]);

                setQuestions([]);
                setCurrentQuestion(0);
                setAnswer("");
                setEvaluation(null);
                setScores([]);
                setEvaluations([]);
                setCompleted(false);
                setLoading(false);

                navigate("/ai-interview");
            } else {
                setError(
                    res.data.message ||
                    "Failed to start a new interview."
                );
            }
        } catch (error) {
            console.log("START NEW INTERVIEW ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to start a new interview."
            );
        }
    };

    // Loading AI interview
    if (phase === "ai" && loading) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-4">
                    <p className="text-slate-400">
                        Preparing your AI interview...
                    </p>
                </div>
            </>
        );
    }

    // =========================
    // DOMAIN SELECTION
    // =========================

    if (phase === "select-domain"){
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-4xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">

                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold">
                                AI Technical Interview
                            </h1>

                            <p className="text-slate-500 mt-3">
                                Select the domain you want to be interviewed for.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {domains.map((domain) => (
                                <button
                                    key={domain}
                                    onClick={() => {
                                        setSelectedDomain(domain);
                                        setError("");
                                    }}
                                    className={`border rounded-xl p-4 text-left transition ${
                                        selectedDomain === domain
                                            ? "border-teal-500 bg-teal-500/10 text-teal-300"
                                            : "border-slate-800 hover:border-teal-500/50 hover:bg-slate-950"
                                    }`}
                                >
                                    <p className="font-semibold">
                                        {domain}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-400 text-center mt-5">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={startInterview}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Start Interview
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // GENERAL ROUND INSTRUCTIONS
    // =========================

    if (phase === "general-instructions") {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
                        <div className="text-center mb-8">
                            <p className="text-teal-400 font-semibold">
                                Round 1 of 3
                            </p>
                            <h1 className="text-3xl font-bold mt-2">
                                General & Communication Round
                            </h1>
                            <p className="text-slate-500 mt-3">
                                Welcome to the general communication assessment.
                            </p>
                        </div>

                        <div className="space-y-4 text-slate-300">
                            <p><strong>Instructions</strong></p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You will answer 5 multiple-choice questions.</li>
                                <li>This round checks general communication, reasoning, and workplace understanding.</li>
                                <li>Select one answer for each question.</li>
                                <li>Each correct answer carries 1 mark.</li>
                                <li>There is no negative marking.</li>
                                <li>Answer each question carefully before moving forward.</li>
                            </ul>
                        </div>

                        <div className="mt-8 border rounded-xl p-4 bg-slate-950">
                            <p className="font-semibold">Interview Environment</p>
                            <p className="text-slate-400 mt-1">
                                Treat this like a real interview assessment and answer independently.
                            </p>
                        </div>

                        <button
                            onClick={startGeneralRound}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Next — Start General Round
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // GENERAL ROUND RESULT
    // =========================

    if (phase === "general-result") {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8 text-center">
                        <p className="text-teal-400 font-semibold">
                            General Round Completed
                        </p>
                        <h1 className="text-3xl font-bold mt-2">
                            Your General Round Result
                        </h1>

                        <div className="border rounded-xl p-6 mt-8">
                            <p className="text-slate-500">Score</p>
                            <p className="text-5xl font-black text-teal-400 mt-2">
                                {generalScore}/5
                            </p>
                        </div>

                        <p className="text-slate-400 mt-6">
                            Great! Now you will move to the domain-specific technical assessment for <strong>{selectedDomain}</strong>.
                        </p>

                        <button
                            onClick={startDomainInstructions}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Next — Domain Round Instructions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // DOMAIN ROUND INSTRUCTIONS
    // =========================

    if (phase === "domain-instructions") {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
                        <div className="text-center mb-8">
                            <p className="text-teal-400 font-semibold">
                                Round 2 of 3
                            </p>
                            <h1 className="text-3xl font-bold mt-2">
                                {selectedDomain} Round
                            </h1>
                            <p className="text-slate-500 mt-3">
                                Technical multiple-choice assessment
                            </p>
                        </div>

                        <div className="space-y-4 text-slate-300">
                            <p><strong>Instructions</strong></p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You will answer 7 domain-specific technical questions.</li>
                                <li>Questions are based on the selected domain: <strong>{selectedDomain}</strong>.</li>
                                <li>Select one answer for each question.</li>
                                <li>Each correct answer carries 1 mark.</li>
                                <li>There is no negative marking.</li>
                                <li>Read every question carefully before selecting your answer.</li>
                                <li>Your score will be displayed after completing the round.</li>
                            </ul>
                        </div>

                        <div className="mt-8 border rounded-xl p-4 bg-slate-950">
                            <p className="font-semibold">Important</p>
                            <p className="text-slate-400 mt-1">
                                This round evaluates your technical knowledge of the selected role.
                            </p>
                        </div>

                        <button
                            onClick={startDomainRound}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Next — Start Domain Round
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // DOMAIN ROUND RESULT
    // =========================

    if (phase === "domain-result") {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8 text-center">
                        <p className="text-teal-400 font-semibold">
                            Domain Round Completed
                        </p>
                        <h1 className="text-3xl font-bold mt-2">
                            Your {selectedDomain} Result
                        </h1>

                        <div className="border rounded-xl p-6 mt-8">
                            <p className="text-slate-500">Score</p>
                            <p className="text-5xl font-black text-teal-400 mt-2">
                                {domainScore}/7
                            </p>
                        </div>

                        <p className="text-slate-400 mt-6">
                            The domain assessment is complete. Next is your final resume-based AI technical round.
                        </p>

                        <button
                            onClick={startAIInstructions}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Next — AI Round Instructions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // GENERAL ROUND
    // =========================

    if (phase === "general") {
const current =
    generalQuestions[selectedGeneralQuestionIndices[generalQuestion]];

        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">

                        <div className="mb-8">
                            <p className="text-teal-400 font-semibold">
                                General Round
                            </p>

                            <h1 className="text-2xl font-bold mt-2">
                                General & Communication Assessment
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Question {generalQuestion + 1} of{" "}
{selectedGeneralQuestionIndices.length}
                            </p>
                        </div>

                        <h2 className="text-lg font-semibold leading-relaxed mb-6">
                            {current.question}
                        </h2>

                        <div className="space-y-3">
                            {current.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedGeneralAnswer(index)
                                    }
                                    className={`w-full text-left border rounded-md p-4 transition ${
                                        selectedGeneralAnswer === index
                                            ? "border-teal-500 bg-teal-500/10"
                                            : "border-slate-800 hover:border-teal-500/50"
                                    }`}
                                >
                                    <span className="font-medium mr-3">
                                        {String.fromCharCode(65 + index)}.
                                    </span>

                                    {option}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-400 mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={submitGeneralAnswer}
                            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                           {generalQuestion === selectedGeneralQuestionIndices.length - 1
                                ? "Finish General Round"
                                : "Next Question"}
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // DOMAIN ROUND
    // =========================

    if (phase === "domain-mcq") {
        const current = selectedDomainQuestions[domainQuestion];

        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">

                        <div className="mb-8">
                            <p className="text-teal-400 font-semibold">
                                Domain Round
                            </p>

                            <h1 className="text-2xl font-bold mt-2">
                                {selectedDomain}
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Question {domainQuestion + 1} of{" "}
                                {selectedDomainQuestions.length}
                            </p>
                        </div>

                        <h2 className="text-lg font-semibold leading-relaxed mb-6">
                            {current.question}
                        </h2>

                        <div className="space-y-3">
                            {current.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() =>
                                        setSelectedDomainAnswer(index)
                                    }
                                    className={`w-full text-left border rounded-md p-4 transition ${
                                        selectedDomainAnswer === index
                                            ? "border-teal-500 bg-teal-500/10"
                                            : "border-slate-800 hover:border-teal-500/50"
                                    }`}
                                >
                                    <span className="font-medium mr-3">
                                        {String.fromCharCode(65 + index)}.
                                    </span>

                                    {option}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-400 mt-4">
                                {error}
                            </p>
                        )}

                        <button
                            onClick={submitDomainAnswer}
                            className="mt-6 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            {domainQuestion ===
                            selectedDomainQuestions.length - 1
                                ? "Start AI Interview"
                                : "Next Question"}
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // AI ROUND INSTRUCTIONS
    // =========================

    if (phase === "ai-instructions") {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-3xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 sm:p-8">
                        <div className="text-center mb-8">
                            <p className="text-teal-400 font-semibold">
                                Round 3 of 3
                            </p>
                            <h1 className="text-3xl font-bold mt-2">
                                Resume-Based AI Technical Round
                            </h1>
                            <p className="text-slate-500 mt-3">
                                Personalized technical interview based on your resume
                            </p>
                        </div>

                        <div className="space-y-4 text-slate-300">
                            <p><strong>Instructions</strong></p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You will be asked exactly 3 technical questions.</li>
                                <li>Questions are generated from the skills, projects, and experience present in your resume.</li>
                                <li>Answer each question in your own words and explain your reasoning where appropriate.</li>
                                <li>The AI interviewer evaluates technical correctness, understanding, completeness, and clarity.</li>
                                <li>Each answer is scored from 0 to 10.</li>
                                <li>After submitting an answer, you will receive feedback before continuing.</li>
                                <li>Do not refresh or close the interview unnecessarily while an answer is being evaluated.</li>
                            </ul>
                        </div>

                        <div className="mt-8 border rounded-xl p-4 bg-slate-950">
                            <p className="font-semibold">Final Round</p>
                            <p className="text-slate-400 mt-1">
                                After completing these 3 questions, your complete interview results will be displayed.
                            </p>
                        </div>

                        <button
                            onClick={startAIRound}
                            className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                        >
                            Next — Start AI Interview
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // AI INTERVIEW ERROR
    // =========================

    if (phase === "ai" && error && questions.length === 0) {
        return (
            <>
                <Navbar />

                <div className="flex justify-center items-center min-h-[70vh] px-4">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-red-400">
                            {error}
                        </h2>
                    </div>
                </div>
            </>
        );
    }

    // =========================
    // FINAL INTERVIEW REPORT
    // =========================

    if ((phase === "ai" || phase === "completed") && completed) {
        const aiTotalScore = scores.reduce(
            (sum, score) => sum + score,
            0
        );

        const aiMaxScore = questions.length * 10;


        const aiAverage = scores.length
            ? (aiTotalScore / scores.length).toFixed(1)
            : "0.0";

        const generalPercentage = Math.round(
            (generalScore / selectedGeneralQuestionIndices.length) * 100
        );

        const domainPercentage = Math.round(
            (domainScore / selectedDomainQuestions.length) * 100
        );

        const aiPercentage = aiMaxScore
            ? Math.round((aiTotalScore / aiMaxScore) * 100)
            : 0;

        const overallScore =
            (
                generalPercentage +
                domainPercentage +
                aiPercentage
            ) / 3;

        const overallPercentage = overallScore.toFixed(1);

        const getPerformanceLabel = (percentage) => {
            if (percentage >= 85) return "Excellent";
            if (percentage >= 70) return "Strong";
            if (percentage >= 50) return "Good";
            return "Needs Improvement";
        };

        const performanceLabel = getPerformanceLabel(
            Number(overallPercentage)
        );

        const allStrengths = evaluations
            .map((item) => item.strengths)
            .filter(Boolean);

        const allImprovements = evaluations
            .map((item) => item.improvement)
            .filter(Boolean);

        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Navbar />

                <div className="max-w-5xl mx-auto px-4 py-10">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20 md:p-8">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <p className="text-teal-400 font-semibold">
                                Interview Assessment Report
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold mt-2">
                                Interview Completed 🎉
                            </h1>

                            <p className="text-slate-500 mt-3">
                                {selectedDomain}
                            </p>

                            <p className="text-slate-500 mt-1">
                                Complete assessment across 15 questions
                            </p>
                        </div>

                        {/* Overall Performance */}
                        <div className="border rounded-xl p-6 text-center mb-8">
                            <p className="text-slate-500 text-lg">
                                Overall Performance
                            </p>

                            <p className="text-5xl font-black text-teal-400 mt-2">
                                {overallPercentage}%
                            </p>

                            <p className="text-lg font-semibold mt-2">
                                {performanceLabel}
                            </p>

                            <p className="text-slate-500 mt-2">
                                Your score combines the General, Domain, and
                                Resume-Based AI rounds.
                            </p>
                        </div>

                        {/* Round Scores */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                            <div className="border rounded-xl p-5">
                                <p className="text-slate-500">
                                    General & Communication
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {generalScore}/5
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    {generalPercentage}% performance
                                </p>
                            </div>

                            <div className="border rounded-xl p-5">
                                <p className="text-slate-500">
                                    {selectedDomain}
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {domainScore}/7
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    {domainPercentage}% performance
                                </p>
                            </div>

                            <div className="border rounded-xl p-5">
                                <p className="text-slate-500">
                                    Resume-Based AI
                                </p>

                                <p className="text-2xl font-bold mt-2">
                                    {aiAverage}/10
                                </p>

                                <p className="text-sm text-slate-500 mt-1">
                                    {aiPercentage}% performance
                                </p>
                            </div>
                        </div>

                        {/* Performance Chart */}
                        <div className="border rounded-xl p-6 mb-8">
                            <h2 className="text-2xl font-bold mb-5">
                                Performance Chart
                            </h2>

                            <div className="space-y-5">
                                {[
                                    {
                                        label: "General & Communication",
                                        value: generalPercentage,
                                    },
                                    {
                                        label: selectedDomain,
                                        value: domainPercentage,
                                    },
                                    {
                                        label: "Resume-Based AI",
                                        value: aiPercentage,
                                    },
                                    {
                                        label: "Overall Performance",
                                        value: Number(overallPercentage),
                                    },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium text-slate-300">
                                                {item.label}
                                            </span>

                                            <span className="font-semibold text-teal-400">
                                                {item.value}%
                                            </span>
                                        </div>

                                        <div className="w-full bg-slate-800 rounded-full h-3">
                                            <div
                                                className="bg-teal-600 h-3 rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min(
                                                        100,
                                                        Math.max(0, item.value)
                                                    )}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Summary */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                Performance Summary
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="border rounded-xl p-5">
                                    <p className="font-semibold">
                                        Communication
                                    </p>
                                    <p className="text-slate-500 mt-2">
                                        {getPerformanceLabel(generalPercentage)}
                                    </p>
                                </div>

                                <div className="border rounded-xl p-5">
                                    <p className="font-semibold">
                                        Technical Knowledge
                                    </p>
                                    <p className="text-slate-500 mt-2">
                                        {getPerformanceLabel(domainPercentage)}
                                    </p>
                                </div>

                                <div className="border rounded-xl p-5">
                                    <p className="font-semibold">
                                        Resume Knowledge
                                    </p>
                                    <p className="text-slate-500 mt-2">
                                        {getPerformanceLabel(aiPercentage)}
                                    </p>
                                </div>

                                <div className="border rounded-xl p-5">
                                    <p className="font-semibold">
                                        Overall Readiness
                                    </p>
                                    <p className="text-slate-500 mt-2">
                                        {performanceLabel}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* AI Question Scores */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                Resume-Based AI Question Scores
                            </h2>

                            <div className="space-y-3">
                                {scores.map((score, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border rounded-xl p-4"
                                    >
                                        <span className="font-medium">
                                            AI Question {index + 1}
                                        </span>

                                        <span className="font-bold text-teal-400">
                                            {score}/10
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Feedback */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                            <div className="border rounded-xl p-5">
                                <h2 className="text-xl font-bold mb-3">
                                    Your Strengths
                                </h2>

                                {allStrengths.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                        {allStrengths.map((strength, index) => (
                                            <li key={index}>{strength}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-500">
                                        No AI strength feedback is available.
                                    </p>
                                )}
                            </div>

                            <div className="border rounded-xl p-5">
                                <h2 className="text-xl font-bold mb-3">
                                    Areas to Improve
                                </h2>

                                {allImprovements.length > 0 ? (
                                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                                        {allImprovements.map((improvement, index) => (
                                            <li key={index}>{improvement}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-slate-500">
                                        No AI improvement feedback is available.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Final Message */}
                        <div className="border rounded-xl p-5 bg-slate-950 mb-8">
                            <h2 className="text-xl font-bold mb-2">
                                Assessment Summary
                            </h2>

                            <p className="text-slate-400 leading-relaxed">
                                You completed all 15 interview questions across
                                the three assessment rounds. Use this report to
                                understand your current strengths and identify
                                the areas you should improve before your next
                                technical interview.
                            </p>
                        </div>

                        {error && (
                            <p className="text-red-400 text-center mb-4">
                                {error}
                            </p>
                        )}

                        <div className="flex flex-col md:flex-row justify-center gap-3">
                            <button
                                onClick={downloadPDFReport}
                                className="w-full md:w-auto border border-teal-500 text-teal-400 px-8 py-3 rounded-md hover:bg-teal-500/10"
                            >
                                Download PDF Report
                            </button>

                            <button
                                onClick={startNewInterview}
                                className="w-full md:w-auto bg-teal-600 text-white px-8 py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                            >
                                Start New Interview
                            </button>

                            <a
                                href="/interview-history"
                                className="w-full md:w-auto text-center border border-teal-500 text-teal-400 px-8 py-3 rounded-md hover:bg-teal-500/10"
                            >
                                View Interview History
                            </a>

                            <a
                                href="/"
                                className="w-full md:w-auto text-center border border-teal-500 text-teal-400 px-8 py-3 rounded-md hover:bg-teal-500/10"
                            >
                                Back to Home
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // =========================
    // AI TECHNICAL ROUND
    // =========================

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-8">
                <div className="bg-slate-900 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/20">

                    <div className="mb-6">
                        <p className="text-teal-400 font-semibold">
                            Resume-Based AI Round
                        </p>

                        <h1 className="text-2xl font-bold mt-2">
                            AI Technical Interview
                        </h1>

                        <p className="text-slate-500 mt-2">
                            {selectedDomain}
                        </p>

                        <p className="text-slate-500 mt-1">
                            Question {currentQuestion + 1} of{" "}
                            {questions.length}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold leading-relaxed">
                            {questions[currentQuestion]}
                        </h2>
                    </div>

                    {!evaluation ? (
                        <>
                            <textarea
                                value={answer}
                                onChange={(e) =>
                                    setAnswer(e.target.value)
                                }
                                placeholder="Write your answer here..."
                                disabled={evaluating}
                                className="min-h-48 w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 p-5 text-white outline-none placeholder:text-slate-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                            />

                            {error && (
                                <p className="text-red-400 mt-3">
                                    {error}
                                </p>
                            )}

                            <button
                                onClick={submitAnswer}
                                disabled={evaluating}
                                className="mt-5 w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200 disabled:opacity-50"
                            >
                                {evaluating
                                    ? "AI is evaluating..."
                                    : "Submit Answer"}
                            </button>
                        </>
                    ) : (
                        <div className="border rounded-md p-5">

                            <h3 className="text-xl font-bold mb-4">
                                AI Evaluation
                            </h3>

                            <p className="text-lg font-semibold mb-3">
                                Score: {evaluation.score}/10
                            </p>

                            <p className="mb-3">
                                <strong>Feedback:</strong>{" "}
                                {evaluation.feedback}
                            </p>

                            <p className="mb-3">
                                <strong>Strengths:</strong>{" "}
                                {evaluation.strengths}
                            </p>

                            <p className="mb-5">
                                <strong>Improvement:</strong>{" "}
                                {evaluation.improvement}
                            </p>

                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={nextQuestion}
                                    className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-500 transition-all duration-200"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <div className="text-center">
                                    <p className="text-lg font-semibold">
                                        Interview Completed 🎉
                                    </p>
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AIInterview;