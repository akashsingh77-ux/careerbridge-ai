import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import axios from "axios";
import jsPDF from "jspdf";
import {
    BarChart3,
    CalendarDays,
    CheckCircle2,
    CircleAlert,
    ClipboardCheck,
    Download,
    FileText,
    History,
    MessageSquareText,
    Sparkles,
    Target,
    Trophy,
} from "lucide-react";

const InterviewHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/v1/ai-interview/history",
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setHistory(res.data.history || []);
                } else {
                    setError(
                        res.data.message || "Failed to load interview history."
                    );
                }
            } catch (error) {
                console.log("INTERVIEW HISTORY ERROR:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load interview history."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const getScorePercentage = (score, total) => {
        if (!total) return 0;
        return Math.round((score / total) * 100);
    };

    const downloadPDFReport = (interview) => {
        const doc = new jsPDF();

        const generalPercentage = getScorePercentage(
            interview.generalScore || 0,
            5
        );

        const domainPercentage = getScorePercentage(
            interview.domainScore || 0,
            7
        );

        const aiScores = interview.aiScores || [];

        const aiTotal = aiScores.reduce(
            (sum, score) => sum + score,
            0
        );

        const aiMax = aiScores.length * 10;

        const aiPercentage =
            aiMax > 0
                ? Math.round((aiTotal / aiMax) * 100)
                : 0;

        const overallPercentage = Math.round(
            interview.overallPercentage || 0
        );

        const completedDate = interview.completedAt
            ? new Date(
                interview.completedAt
            ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })
            : "Unknown date";

        let y = 20;

        const addText = (
            text,
            x,
            fontSize = 11,
            options = {}
        ) => {
            doc.setFontSize(fontSize);
            doc.setFont(
                "helvetica",
                options.bold ? "bold" : "normal"
            );

            const lines = doc.splitTextToSize(
                String(text || ""),
                options.width || 170
            );

            if (y + lines.length * 6 > 280) {
                doc.addPage();
                y = 20;
            }

            doc.text(lines, x, y);
            y += lines.length * 6;
        };

        const addSectionTitle = (title) => {
            y += 4;
            addText(title, 20, 14, {
                bold: true,
            });
            y += 2;
        };

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("AI Interview Report", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text(
            `Domain: ${interview.selectedDomain || "Interview"}`,
            20,
            y
        );
        y += 6;

        doc.text(
            `Completed on: ${completedDate}`,
            20,
            y
        );
        y += 12;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(
            `Overall Performance: ${overallPercentage}%`,
            20,
            y
        );
        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(
            interview.performanceLabel || "Completed",
            20,
            y
        );
        y += 12;

        addSectionTitle("Round Scores");

        addText(
            `General Round: ${interview.generalScore || 0}/5 (${generalPercentage}%)`,
            20
        );

        addText(
            `Domain Round: ${interview.domainScore || 0}/7 (${domainPercentage}%)`,
            20
        );

        addText(
            `AI Resume Round: ${aiTotal}/${aiMax} (${aiPercentage}%)`,
            20
        );

        addSectionTitle("AI Question Scores");

        aiScores.forEach((score, index) => {
            const question =
                interview.aiQuestions?.[index] ||
                "AI Interview Question";

            addText(
                `Question ${index + 1}: ${score}/10`,
                20,
                11,
                {
                    bold: true,
                    width: 170,
                }
            );

            addText(
                question,
                25,
                10,
                {
                    width: 165,
                }
            );

            const evaluation =
                interview.aiEvaluations?.[index];

            if (evaluation) {
                if (evaluation.feedback) {
                    addText(
                        `Feedback: ${evaluation.feedback}`,
                        25,
                        10,
                        { width: 165 }
                    );
                }

                if (evaluation.strengths) {
                    addText(
                        `Strengths: ${evaluation.strengths}`,
                        25,
                        10,
                        { width: 165 }
                    );
                }

                if (evaluation.improvement) {
                    addText(
                        `Improvement: ${evaluation.improvement}`,
                        25,
                        10,
                        { width: 165 }
                    );
                }
            }

            y += 3;
        });

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(
            "Generated by AI Interview Platform",
            20,
            Math.min(y, 285)
        );

        const domainName = (
            interview.selectedDomain || "Interview"
        )
            .replace(/[^a-z0-9]+/gi, "-")
            .replace(/^-|-$/g, "");

        doc.save(
            `AI-Interview-Report-${domainName || "Interview"}.pdf`
        );
    };

    if (loading) {
        return (
            <>
                <Navbar />

                <div className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-4">
                    <p className="text-slate-400">
                        Loading interview history...
                    </p>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="mb-8 sm:mb-10">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
                            <History size={21} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">
                                CareerBridge AI
                            </p>
                            <p className="text-xs text-slate-500">
                                Performance archive
                            </p>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Interview History
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Review your previous interview results, round-wise scores,
                        and AI-evaluated technical performance.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                        <CircleAlert className="mt-0.5 shrink-0" size={19} />
                        <span>{error}</span>
                    </div>
                )}

                {!error && history.length === 0 && (
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-2xl shadow-black/20">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-300">
                            <ClipboardCheck size={25} />
                        </div>
                        <h2 className="text-xl font-semibold text-white">
                            No interviews completed yet
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                            Complete your first AI interview to see your
                            results here.
                        </p>
                    </div>
                )}

                <div className="space-y-6">
                    {history.map((interview, index) => {
                        const generalPercentage =
                            getScorePercentage(
                                interview.generalScore,
                                5
                            );

                        const domainPercentage =
                            getScorePercentage(
                                interview.domainScore,
                                7
                            );

                        const aiTotal = (interview.aiScores || []).reduce(
                            (sum, score) => sum + score,
                            0
                        );

                        const aiMax =
                            (interview.aiScores || []).length * 10;

                        const aiPercentage =
                            aiMax > 0
                                ? Math.round(
                                    (aiTotal / aiMax) * 100
                                )
                                : 0;

                        const overallPercentage = Math.round(
                            interview.overallPercentage || 0
                        );

                        const completedDate = interview.completedAt
                            ? new Date(
                                interview.completedAt
                            ).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })
                            : "Unknown date";

                        return (
                            <div
                                key={interview._id || index}
                                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-black/20 sm:p-7"
                            >
                                <div className="mb-6 flex flex-col gap-5 border-b border-slate-800 pb-6 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-teal-300">
                                                <FileText size={18} />
                                            </div>
                                            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                                {interview.selectedDomain ||
                                                    "Interview"}
                                            </h2>
                                        </div>

                                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                                            <CalendarDays size={15} />
                                            Completed on {completedDate}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-teal-400/20 bg-teal-400/5 px-5 py-3 text-left md:min-w-[190px] md:text-right">
                                        <p className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                            <Trophy size={15} className="text-teal-300" />
                                            Overall Performance
                                        </p>

                                        <p className="text-3xl font-bold tracking-tight text-teal-300">
                                            {Math.round(
                                                interview.overallPercentage ||
                                                0
                                            )}
                                            %
                                        </p>

                                        <p className="font-semibold text-slate-200">
                                            {interview.performanceLabel ||
                                                "Completed"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                                        <p className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                            <CheckCircle2 size={15} className="text-teal-300" />
                                            General Round
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-white">
                                            {interview.generalScore || 0}/5
                                        </p>

                                        <p className="mt-1 font-medium text-teal-300">
                                            {generalPercentage}%
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                                        <p className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                            <Target size={15} className="text-teal-300" />
                                            Domain Round
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-white">
                                            {interview.domainScore || 0}/7
                                        </p>

                                        <p className="mt-1 font-medium text-teal-300">
                                            {domainPercentage}%
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                                        <p className="flex items-center gap-2 text-sm font-medium text-slate-400">
                                            <Sparkles size={15} className="text-teal-300" />
                                            AI Resume Round
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-white">
                                            {aiTotal}/{aiMax}
                                        </p>

                                        <p className="mt-1 font-medium text-teal-300">
                                            {aiPercentage}%
                                        </p>
                                    </div>
                                </div>

                                {/* Performance Chart */}
                                <div className="mt-8">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                                        <BarChart3 size={19} className="text-teal-300" />
                                        Performance Chart
                                    </h3>

                                    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-950/50 p-5 sm:p-6">
                                        {[
                                            {
                                                label: "General Round",
                                                percentage: generalPercentage,
                                            },
                                            {
                                                label: "Domain Round",
                                                percentage: domainPercentage,
                                            },
                                            {
                                                label: "AI Resume Round",
                                                percentage: aiPercentage,
                                            },
                                            {
                                                label: "Overall Performance",
                                                percentage: overallPercentage,
                                            },
                                        ].map((item) => (
                                            <div key={item.label}>
                                                <div className="mb-2 flex items-center justify-between gap-4">
                                                    <span className="text-sm font-medium text-slate-300">
                                                        {item.label}
                                                    </span>

                                                    <span className="text-sm font-semibold text-teal-300">
                                                        {item.percentage}%
                                                    </span>
                                                </div>

                                                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                                                    <div
                                                        className="h-2.5 rounded-full bg-teal-400 transition-all duration-500"
                                                        style={{
                                                            width: `${Math.min(
                                                                100,
                                                                Math.max(
                                                                    0,
                                                                    item.percentage
                                                                )
                                                            )}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {interview.aiScores &&
                                    interview.aiScores.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                                                <MessageSquareText size={19} className="text-teal-300" />
                                                AI Question Scores
                                            </h3>

                                            <div className="space-y-3">
                                                {interview.aiScores.map(
                                                    (score, questionIndex) => (
                                                        <div
                                                            key={questionIndex}
                                                            className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4"
                                                        >
                                                            <div className="min-w-0 flex-1 pr-2">
                                                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                                    Question{" "}
                                                                    {questionIndex +
                                                                        1}
                                                                </p>

                                                                <p className="mt-1 font-medium leading-6 text-slate-200">
                                                                    {interview
                                                                        .aiQuestions?.[
                                                                        questionIndex
                                                                    ] ||
                                                                        "AI Interview Question"}
                                                                </p>
                                                            </div>

                                                            <div className="shrink-0 rounded-lg bg-teal-400/10 px-3 py-2 font-bold text-teal-300">
                                                                {score}/10
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}

                                <div className="mt-8 flex justify-end border-t border-slate-800 pt-6">
                                    <button
                                        onClick={() =>
                                            downloadPDFReport(interview)
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                                    >
                                        <Download size={17} />
                                        Download PDF Report
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InterviewHistory;