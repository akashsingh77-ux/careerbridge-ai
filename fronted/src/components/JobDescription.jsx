import React, { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    APPLICATION_API_END_POINT,
    JOB_API_END_POINT,
} from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    Clock3,
    FileText,
    MapPin,
    Users,
    WalletCards,
    Sparkles,
} from "lucide-react";

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);

    const isRecruiter =
        user?.role?.toLowerCase?.() === "recruiter";

    const isInitiallyApplied =
        !isRecruiter &&
        singleJob?.applications?.some(
            (application) => application.applicant === user?._id
        ) || false;

    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

  const applyJobHandler = async () => {
    if (!user) {
        toast.error("Please login first to apply for this job.");
        return;
    }

    try {
        const res = await axios.get(
            `${APPLICATION_API_END_POINT}/apply/${jobId}`,
            { withCredentials: true }
        );

        if (res.data.success) {
            setIsApplied(true);

            const updatedSingleJob = {
                ...singleJob,
                applications: [
                    ...(singleJob?.applications || []),
                    { applicant: user?._id },
                ],
            };

            dispatch(setSingleJob(updatedSingleJob));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message || "Unable to apply for this job."
        );
    }
};

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    const job = res.data.job;

                    dispatch(setSingleJob(job));

                    setIsApplied(
                        job?.applications?.some(
                            (application) =>
                                application.applicant === user?._id
                        ) || false
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const requirementItems = useMemo(() => {
        const requirements = singleJob?.requirements;

        if (!requirements) {
            return [];
        }

        // Requirements may come from the backend as either:
        // 1. an array of strings, or
        // 2. a single string.
        // Handle both formats so the UI never calls .trim()
        // on an array or another non-string value.
        if (Array.isArray(requirements)) {
            return requirements
                .flatMap((item) => {
                    if (typeof item !== "string") {
                        return [];
                    }

                    return item
                        .split(/\r?\n|•/)
                        .map((part) => part.trim())
                        .filter(Boolean);
                });
        }

        if (typeof requirements !== "string") {
            return [];
        }

        const rawRequirements = requirements.trim();

        if (!rawRequirements) {
            return [];
        }

        let items = rawRequirements
            .split(/\r?\n|•/)
            .map((item) => item.trim())
            .filter(Boolean);

        if (items.length === 1 && rawRequirements.includes(",")) {
            items = rawRequirements
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
        }

        return items;
    }, [singleJob?.requirements]);

    const smartMatch = useMemo(() => {
        const profileSkills = Array.isArray(user?.profile?.skills)
            ? user.profile.skills.filter(
                  (skill) => typeof skill === "string" && skill.trim()
              )
            : [];

        // The resume analyzer already stores extracted skills in the user
        // profile. Smart Match reads those saved skills directly, so it does
        // NOT make another Gemini/API request.
        const resumeSkills = Array.isArray(user?.profile?.aiResumeAnalysis?.skills)
            ? user.profile.aiResumeAnalysis.skills.filter(
                  (skill) => typeof skill === "string" && skill.trim()
              )
            : [];

        const normalizeSkill = (skill) =>
            String(skill || "")
                .toLowerCase()
                .trim()
                .replace(/[.]/g, "")
                .replace(/\s+/g, " ")
                .replace(/\s*\+\s*/g, "plus")
                .replace(/\s*#\s*/g, "sharp");

        // Each canonical skill has common variations. This keeps the
        // matching deterministic while handling real-world skill naming.
        const skillAliases = {
            javascript: ["javascript", "js"],
            typescript: ["typescript", "ts"],
            react: ["react", "reactjs", "react js"],
            nodejs: ["node", "nodejs", "node js"],
            expressjs: ["express", "expressjs", "express js"],
            nextjs: ["next", "nextjs", "next js"],
            vuejs: ["vue", "vuejs", "vue js"],
            angular: ["angular", "angularjs", "angular js"],
            html: ["html", "html5"],
            css: ["css", "css3"],
            tailwindcss: ["tailwind", "tailwindcss", "tailwind css"],
            bootstrap: ["bootstrap"],
            "c++": ["c++", "cpp", "cplusplus"],
            c: ["c", "c language"],
            "c#": ["c#", "csharp", "c sharp"],
            java: ["java"],
            python: ["python", "python3"],
            php: ["php"],
            go: ["go", "golang"],
            rust: ["rust"],
            sql: ["sql"],
            mysql: ["mysql"],
            mongodb: ["mongodb", "mongo db", "mongo"],
            postgresql: ["postgresql", "postgres", "postgres db"],
            redis: ["redis"],
            firebase: ["firebase"],
            aws: ["aws", "amazon web services"],
            azure: ["azure", "microsoft azure"],
            docker: ["docker", "docker container"],
            kubernetes: ["kubernetes", "k8s"],
            git: ["git"],
            github: ["github", "github actions"],
            "rest api": ["rest api", "restful api", "restful"],
            graphql: ["graphql", "graph ql"],
            redux: ["redux", "redux toolkit", "rtk"],
            "machine learning": ["machine learning", "ml"],
            "artificial intelligence": ["artificial intelligence", "ai"],
            "data science": ["data science", "data scientist"],
            "data analysis": ["data analysis", "data analytics", "data analyst"],
            tensorflow: ["tensorflow", "tensor flow"],
            pytorch: ["pytorch", "py torch"],
            pandas: ["pandas"],
            numpy: ["numpy", "num py"],
            figma: ["figma"],
            "ui ux": ["ui ux", "ui/ux", "ui design", "ux design"],
            linux: ["linux"],
            devops: ["devops", "dev ops"],
            cybersecurity: ["cybersecurity", "cyber security", "information security"],
            dsa: ["dsa", "data structures and algorithms"],
            "data structures": ["data structures", "data structure"],
            algorithms: ["algorithms", "algorithm"],
            oop: ["oop", "object oriented programming"],
            dbms: ["dbms", "database management system"],
        };

        const commonSkills = [
            "JavaScript",
            "TypeScript",
            "React",
            "Node.js",
            "Express.js",
            "Next.js",
            "Vue.js",
            "Angular",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Bootstrap",
            "C++",
            "C",
            "C#",
            "Java",
            "Python",
            "PHP",
            "Go",
            "Rust",
            "SQL",
            "MySQL",
            "MongoDB",
            "PostgreSQL",
            "Redis",
            "Firebase",
            "AWS",
            "Azure",
            "Docker",
            "Kubernetes",
            "Git",
            "GitHub",
            "REST API",
            "GraphQL",
            "Redux",
            "Machine Learning",
            "Artificial Intelligence",
            "Data Science",
            "Data Analysis",
            "TensorFlow",
            "PyTorch",
            "Pandas",
            "NumPy",
            "Figma",
            "UI/UX",
            "Linux",
            "DevOps",
            "Cybersecurity",
            "DSA",
            "Data Structures",
            "Algorithms",
            "OOP",
            "DBMS",
        ];

        const canonicalSkill = (skill) => {
            const normalized = normalizeSkill(skill);

            for (const [canonical, aliases] of Object.entries(skillAliases)) {
                if (
                    aliases.some(
                        (alias) => normalizeSkill(alias) === normalized
                    )
                ) {
                    return canonical;
                }
            }

            return normalized;
        };

        // Merge Edit Profile skills + saved resume-extracted skills.
        // Canonicalization removes duplicates such as React + React.js.
        const combinedSkillMap = new Map();

        [...profileSkills, ...resumeSkills].forEach((skill) => {
            const canonical = canonicalSkill(skill);

            if (!canonical || combinedSkillMap.has(canonical)) {
                return;
            }

            combinedSkillMap.set(canonical, skill.trim());
        });

        const candidateSkills = Array.from(combinedSkillMap.values());

        const containsSkill = (text, skill) => {
            const normalizedSkill = canonicalSkill(skill);
            const aliases = skillAliases[normalizedSkill] || [normalizedSkill];
            const sourceText = String(text || "").toLowerCase();

            return aliases.some((alias) => {
                const normalizedAlias = normalizeSkill(alias);
                const escaped = normalizedAlias
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                    .replace(/\s+/g, "\\s*");

                return new RegExp(
                    `(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`,
                    "i"
                ).test(sourceText);
            });
        };

        const requirementText = requirementItems.join(" ");
        const descriptionText = [
            singleJob?.title || "",
            singleJob?.description || "",
        ].join(" ");

        // Requirements are treated as the most important signal.
        // Skills appearing only in the title/description are treated as
        // additional skills and receive a lower weight.
        const requiredSkills = commonSkills.filter((skill) =>
            containsSkill(requirementText, skill)
        );

        const genericSkills = new Set(["c", "go"]);

        const additionalSkills = commonSkills.filter(
            (skill) =>
                !genericSkills.has(canonicalSkill(skill)) &&
                !requiredSkills.some(
                    (requiredSkill) =>
                        canonicalSkill(requiredSkill) === canonicalSkill(skill)
                ) &&
                containsSkill(descriptionText, skill)
        );

        const candidateCanonicalSkills = new Set(
            candidateSkills.map(canonicalSkill)
        );

        const matchedRequiredSkills = requiredSkills.filter((skill) =>
            candidateCanonicalSkills.has(canonicalSkill(skill))
        );

        const missingRequiredSkills = requiredSkills.filter(
            (skill) => !candidateCanonicalSkills.has(canonicalSkill(skill))
        );

        const matchedAdditionalSkills = additionalSkills.filter((skill) =>
            candidateCanonicalSkills.has(canonicalSkill(skill))
        );

        const missingAdditionalSkills = additionalSkills.filter(
            (skill) => !candidateCanonicalSkills.has(canonicalSkill(skill))
        );

        const requiredScore =
            requiredSkills.length > 0
                ? (matchedRequiredSkills.length / requiredSkills.length) * 100
                : null;

        const additionalScore =
            additionalSkills.length > 0
                ? (matchedAdditionalSkills.length / additionalSkills.length) * 100
                : null;

        // Required skills carry 75% of the score. Additional skills carry
        // 25% when they exist. If the job has no additional skills, the
        // required-skill score is used directly.
        let score = 0;

        if (requiredScore !== null && additionalScore !== null) {
            score = requiredScore * 0.75 + additionalScore * 0.25;
        } else if (requiredScore !== null) {
            score = requiredScore;
        } else if (additionalScore !== null) {
            score = additionalScore;
        }

        score = Math.round(score);

        let label = "Build Your Match";
        if (score >= 90) label = "Excellent Match";
        else if (score >= 75) label = "Strong Match";
        else if (score >= 60) label = "Good Match";
        else if (score >= 40) label = "Partial Match";
        else if (score > 0) label = "Low Match";

        const matchedSkills = [
            ...matchedRequiredSkills,
            ...matchedAdditionalSkills,
        ];

        const missingSkills = [
            ...missingRequiredSkills,
            ...missingAdditionalSkills,
        ];

        return {
            score,
            label,
            matchedSkills,
            missingSkills,
            matchedRequiredSkills,
            matchedAdditionalSkills,
            missingRequiredSkills,
            missingAdditionalSkills,
            requiredSkills,
            additionalSkills,
            requiredScore,
            additionalScore,
            detectedJobSkills: [...requiredSkills, ...additionalSkills],
            hasProfileSkills: profileSkills.length > 0,
            hasResumeSkills: resumeSkills.length > 0,
            hasCandidateSkills: candidateSkills.length > 0,
            profileSkillCount: profileSkills.length,
            resumeSkillCount: resumeSkills.length,
            combinedSkillCount: candidateSkills.length,
        };
    }, [
        user?.profile?.skills,
        user?.profile?.aiResumeAnalysis?.skills,
        singleJob?.title,
        singleJob?.description,
        requirementItems,
    ]);

    const postedDate = singleJob?.createdAt
        ? new Date(singleJob.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "—";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Hero */}
                <section className="relative overflow-hidden rounded-[26px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-[#0b2938] px-6 py-8 shadow-2xl shadow-black/20 sm:px-8 lg:px-10 lg:py-9">
                    <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl" />

                    <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10">
                                    <BriefcaseBusiness className="h-6 w-6 text-teal-400" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-400">
                                        Career Opportunity
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Find your next move
                                    </p>
                                </div>
                            </div>

                            <h1 className="break-words text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {singleJob?.title || "Job Opportunity"}
                            </h1>

                            <div className="mt-6 flex flex-wrap items-center gap-2.5">
                                <Badge
                                    variant="ghost"
                                    className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1.5 font-bold text-teal-300"
                                >
                                    <Users className="mr-1.5 h-3.5 w-3.5" />
                                    {singleJob?.position || 0} Positions
                                </Badge>

                                <Badge
                                    variant="ghost"
                                    className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1.5 font-bold text-blue-300"
                                >
                                    {singleJob?.jobType || "Job Type"}
                                </Badge>

                                <Badge
                                    variant="ghost"
                                    className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3.5 py-1.5 font-bold text-amber-300"
                                >
                                    {singleJob?.salary || "—"} LPA
                                </Badge>
                            </div>
                        </div>

                        {!isRecruiter && (
                            <button
                                type="button"
                                onClick={isApplied ? undefined : applyJobHandler}
                                disabled={isApplied}
                                className={`inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border px-6 text-sm font-bold transition-all ${
                                    isApplied
                                        ? "cursor-not-allowed border-slate-700 bg-slate-800/80 text-slate-500"
                                        : "border-teal-400/20 bg-teal-400/10 text-teal-300 hover:border-teal-400/40 hover:bg-teal-400/15"
                                }`}
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {isApplied ? "Already Applied" : "Apply Now"}
                            </button>
                        )}
                    </div>
                </section>

                {/* Quick stats */}
                <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <MapPin className="h-5 w-5 text-teal-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Location
                                </p>
                                <p className="mt-1 font-bold text-white">
                                    {singleJob?.location || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <Clock3 className="h-5 w-5 text-teal-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Experience
                                </p>
                                <p className="mt-1 font-bold text-white">
                                    {singleJob?.experienceLevel || "—"} yrs
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <WalletCards className="h-5 w-5 text-teal-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Salary
                                </p>
                                <p className="mt-1 font-bold text-white">
                                    {singleJob?.salary || "—"} LPA
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <Users className="h-5 w-5 text-teal-400" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Applicants
                                </p>
                                <p className="mt-1 font-bold text-white">
                                    {singleJob?.applications?.length || 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    {/* Left */}
                    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/10 sm:p-8">
                        {/* Description */}
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                    <FileText className="h-5 w-5 text-teal-400" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-extrabold text-white">
                                        Job Description
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        What you'll be working on
                                    </p>
                                </div>
                            </div>

                            <div className="my-6 h-px bg-slate-800" />

                            <p className="whitespace-pre-line text-[15px] leading-8 text-slate-300">
                                {singleJob?.description ||
                                    "No job description has been provided."}
                            </p>
                        </div>

                        {/* Requirements */}
                        <div className="mt-10 border-t border-slate-800 pt-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                    <CheckCircle2 className="h-5 w-5 text-teal-400" />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-extrabold text-white">
                                        Requirements
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Skills, qualifications, and experience
                                        we're looking for
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                {requirementItems.length > 0 ? (
                                    requirementItems.map((requirement, index) => (
                                        <div
                                            key={`${requirement}-${index}`}
                                            className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/30 px-4 py-3.5"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-400" />
                                            <p className="text-[15px] leading-7 text-slate-300">
                                                {requirement}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/30 px-4 py-5 text-sm text-slate-500">
                                        No specific requirements were provided
                                        for this position.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <aside className="h-fit rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-black/10">
                        {!isRecruiter && (
                            <div className="mb-6 rounded-2xl border border-teal-400/20 bg-gradient-to-br from-teal-400/10 via-slate-900 to-slate-950 p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                            <Sparkles className="h-5 w-5 text-teal-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-teal-400">
                                                CareerBridge
                                            </p>
                                            <h2 className="text-lg font-extrabold text-white">
                                                Smart Match
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-3xl font-black text-teal-300">
                                            {smartMatch.score}%
                                        </p>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            Match
                                        </p>
                                    </div>
                                </div>

                                {!smartMatch.hasCandidateSkills ? (
                                    <p className="mt-4 text-sm leading-6 text-slate-400">
                                        Add skills in Edit Profile or upload a resume
                                        with detectable technical skills to see your match.
                                    </p>
                                ) : smartMatch.detectedJobSkills.length === 0 ? (
                                    <p className="mt-4 text-sm leading-6 text-slate-400">
                                        Add specific technical skills to the job
                                        requirements to calculate a match.
                                    </p>
                                ) : (
                                    <>
                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-teal-400 transition-all duration-500"
                                                style={{
                                                    width: `${smartMatch.score}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-3 text-sm font-semibold text-white">
                                            {smartMatch.label}
                                        </p>

                                        {smartMatch.matchedRequiredSkills.length > 0 && (
                                            <div className="mt-4">
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                        Matching Required Skills
                                                    </p>
                                                    <span className="text-[10px] font-semibold text-slate-600">
                                                        75% weight
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {smartMatch.matchedRequiredSkills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={`required-match-${skill}-${index}`}
                                                                className="rounded-lg border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 text-xs font-semibold text-teal-300"
                                                            >
                                                                ✓ {skill}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {smartMatch.matchedAdditionalSkills.length > 0 && (
                                            <div className="mt-4">
                                                <div className="mb-2 flex items-center justify-between gap-3">
                                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                        Additional Skills
                                                    </p>
                                                    <span className="text-[10px] font-semibold text-slate-600">
                                                        25% weight
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {smartMatch.matchedAdditionalSkills.map(
                                                        (skill, index) => (
                                                            <span
                                                                key={`additional-match-${skill}-${index}`}
                                                                className="rounded-lg border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-xs font-semibold text-blue-300"
                                                            >
                                                                ✓ {skill}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {smartMatch.missingRequiredSkills.length > 0 && (
                                            <div className="mt-4">
                                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                    Required Skills To Improve
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {smartMatch.missingRequiredSkills
                                                        .slice(0, 6)
                                                        .map((skill, index) => (
                                                            <span
                                                                key={`required-missing-${skill}-${index}`}
                                                                className="rounded-lg border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300"
                                                            >
                                                                + {skill}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        {smartMatch.missingAdditionalSkills.length > 0 && (
                                            <div className="mt-4">
                                                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                                                    Additional Skills To Improve
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {smartMatch.missingAdditionalSkills
                                                        .slice(0, 4)
                                                        .map((skill, index) => (
                                                            <span
                                                                key={`additional-missing-${skill}-${index}`}
                                                                className="rounded-lg border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-xs font-semibold text-slate-400"
                                                            >
                                                                + {skill}
                                                            </span>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 border-t border-slate-800 pt-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    {smartMatch.hasProfileSkills && smartMatch.hasResumeSkills
                                                        ? "Profile + Resume"
                                                        : smartMatch.hasResumeSkills
                                                          ? "Resume Skills"
                                                          : "Profile Skills"}
                                                </span>
                                                <span className="text-[10px] font-semibold text-slate-600">
                                                    {smartMatch.combinedSkillCount} combined skills
                                                </span>
                                            </div>
                                            <p className="mt-2 text-[11px] leading-5 text-slate-500">
                                                Your Edit Profile skills and saved resume-extracted skills are combined and deduplicated. No new AI API call is used for Smart Match.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <Building2 className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <h2 className="text-xl font-extrabold text-white">
                                    Job Snapshot
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Position details
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 divide-y divide-slate-800">
                            <div className="py-4 first:pt-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Role
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {singleJob?.title || "—"}
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Location
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {singleJob?.location || "—"}
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Experience
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {singleJob?.experienceLevel || "—"} years
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Salary
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {singleJob?.salary || "—"} LPA
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Job Type
                                </p>
                                <p className="mt-1.5 font-bold capitalize text-white">
                                    {singleJob?.jobType || "—"}
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Positions Available
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {singleJob?.position || 0}
                                </p>
                            </div>

                            <div className="py-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Posted On
                                </p>
                                <p className="mt-1.5 font-bold text-white">
                                    {postedDate}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-teal-400/10 bg-teal-400/5 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                    <Building2 className="h-5 w-5 text-teal-400" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Company
                                    </p>
                                    <p className="mt-1 truncate font-bold text-white">
                                        {singleJob?.company?.name ||
                                            "Company information"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        </div>
    );
};

export default JobDescription;
