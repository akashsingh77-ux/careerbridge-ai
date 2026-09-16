import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { BriefcaseBusiness, Plus, Search } from "lucide-react";

const AdminJobs = () => {
    useGetAllAdminJobs();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <BriefcaseBusiness className="h-5 w-5 text-teal-400" />
                            </div>

                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                                Recruiter Workspace
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Manage Jobs
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                            Create, manage, and monitor the job opportunities
                            published by your company.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="h-11 w-full rounded-xl bg-teal-400 px-5 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Job
                    </Button>
                </div>

                {/* Search / Filter */}
                <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/10 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative w-full">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                            <Input
                                value={input}
                                className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-11 text-slate-100 placeholder:text-slate-500 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                placeholder="Search by job title or role..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        {input && (
                            <button
                                type="button"
                                onClick={() => setInput("")}
                                className="h-11 rounded-xl border border-slate-700 px-4 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </section>

                {/* Jobs Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
                    <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
                        <h2 className="text-base font-semibold text-white">
                            Published Jobs
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your current job postings and their details.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <AdminJobsTable />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminJobs;
