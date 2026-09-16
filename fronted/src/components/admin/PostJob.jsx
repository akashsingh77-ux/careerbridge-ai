import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    BriefcaseBusiness,
    Building2,
    CheckCircle2,
    FileText,
    Loader2,
    MapPin,
    Plus,
    Users,
} from "lucide-react";

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );

        setInput({
            ...input,
            companyId: selectedCompany._id,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                            <BriefcaseBusiness className="h-6 w-6 text-teal-400" />
                        </div>

                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                            Recruiter Workspace
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Post a New Job
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Create a professional job posting and connect your
                        company with the right candidates.
                    </p>
                </div>

                <form onSubmit={submitHandler}>
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7">
                        {/* Intro */}
                        <div className="mb-7 flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
                                <FileText className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <h2 className="font-semibold text-white">
                                    Job Information
                                </h2>

                                <p className="mt-1 text-sm leading-5 text-slate-500">
                                    Fill in the details below to publish your
                                    job opportunity.
                                </p>
                            </div>
                        </div>

                        {/* Main fields */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Title */}
                            <div>
                                <Label
                                    htmlFor="job-title"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Job Title
                                </Label>

                                <Input
                                    id="job-title"
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Software Engineer"
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <Label
                                    htmlFor="job-salary"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Salary
                                </Label>

                                <div className="relative mt-2">
                                    <Input
                                        id="job-salary"
                                        type="number"
                                        name="salary"
                                        value={input.salary}
                                        onChange={changeEventHandler}
                                        min="0"
                                        step="0.1"
                                        placeholder="e.g. 8"
                                        className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pr-16 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                    />

                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-teal-400/20 bg-teal-400/10 px-2 py-1 text-xs font-bold text-teal-400">
                                        LPA
                                    </div>
                                </div>

                                <p className="mt-2 text-xs text-slate-500">
                                    Enter the annual salary in lakhs. For
                                    example, <span className="text-slate-400">8</span>{" "}
                                    means <span className="text-teal-400">8 LPA</span>.
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <Label
                                    htmlFor="job-description"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Description
                                </Label>

                                <Input
                                    id="job-description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Describe the role and responsibilities"
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                />
                            </div>

                            {/* Requirements */}
                            <div>
                                <Label
                                    htmlFor="job-requirements"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Requirements
                                </Label>

                                <Input
                                    id="job-requirements"
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="Skills, qualifications, experience..."
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <Label
                                    htmlFor="job-location"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Location
                                </Label>

                                <div className="relative mt-2">
                                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                                    <Input
                                        id="job-location"
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        placeholder="e.g. Bengaluru, India"
                                        className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                    />
                                </div>
                            </div>

                            {/* Job Type */}
                            <div>
                                <Label
                                    htmlFor="job-type"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Job Type
                                </Label>

                                <Input
                                    id="job-type"
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Full-time"
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <Label
                                    htmlFor="job-experience"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Experience Level
                                </Label>

                                <Input
                                    id="job-experience"
                                    type="number"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    min="0"
                                    step="1"
                                    placeholder="e.g. 2"
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                />
                            </div>

                            {/* Positions */}
                            <div>
                                <Label
                                    htmlFor="job-position"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    No. of Positions
                                </Label>

                                <div className="relative mt-2">
                                    <Users className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                                    <Input
                                        id="job-position"
                                        type="number"
                                        name="position"
                                        value={input.position}
                                        onChange={changeEventHandler}
                                        min="0"
                                        step="1"
                                        className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company */}
                        {companies.length > 0 ? (
                            <div className="mt-6">
                                <Label className="mb-2 block text-sm font-medium text-slate-300">
                                    Company
                                </Label>

                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
                                        <Building2 className="h-5 w-5 text-teal-400" />
                                    </div>

                                    <select
                                        defaultValue=""
                                        onChange={(e) => selectChangeHandler(e.target.value)}
                                        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 pr-10 text-sm font-medium text-slate-100 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 sm:max-w-sm"
                                        style={{ colorScheme: "dark" }}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            className="bg-slate-900 text-slate-500"
                                        >
                                            Select a company
                                        </option>

                                        {companies.map((company) => (
                                            <option
                                                key={company?._id}
                                                value={company?.name?.toLowerCase()}
                                                className="bg-slate-900 text-slate-100"
                                            >
                                                {company?.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/5 p-4">
                                <div className="flex items-start gap-3">
                                    <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                                    <div>
                                        <p className="font-semibold text-red-300">
                                            Company required
                                        </p>

                                        <p className="mt-1 text-sm text-red-300/70">
                                            Please register a company first
                                            before posting a job.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="mt-8 flex flex-col gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                                <span>
                                    Review all details before publishing.
                                </span>
                            </div>

                            {loading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="h-11 w-full rounded-xl bg-teal-400 px-6 font-semibold text-slate-950 opacity-80 sm:w-auto"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-xl bg-teal-400 px-6 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Post New Job
                                </Button>
                            )}
                        </div>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default PostJob;
