import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { Bookmark, BriefcaseBusiness } from "lucide-react";

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(
                    `${USER_API_END_POINT}/jobs/saved`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchSavedJobs();
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* Header */}
                <div className="mb-8 sm:mb-10">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5">

                                <Bookmark className="h-3.5 w-3.5 text-teal-400" />

                                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                                    Your Shortlist
                                </span>

                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                Saved Jobs
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                                Keep track of the opportunities you want to
                                explore later.
                            </p>

                        </div>

                        {/* Saved jobs count */}
                        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 shadow-lg">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-lg font-extrabold leading-none text-white">
                                    {savedJobs.length}
                                </p>

                                <p className="mt-1 text-xs font-medium text-slate-500">
                                    {savedJobs.length === 1
                                        ? "Saved opportunity"
                                        : "Saved opportunities"}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-7 h-px w-full bg-slate-800" />

                </div>

                {/* Saved Jobs */}
                {savedJobs.length === 0 ? (

                    <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">

                        <div className="max-w-md px-6 text-center">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">

                                <Bookmark className="h-7 w-7 text-slate-500" />

                            </div>

                            <h2 className="mt-6 text-xl font-bold text-white sm:text-2xl">
                                No saved jobs yet
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                                Jobs you save for later will appear here.
                                Start exploring opportunities and build your
                                shortlist.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {savedJobs.map((job) => (
                            <Job
                                key={job._id}
                                job={job}
                            />
                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};

export default SavedJobs;