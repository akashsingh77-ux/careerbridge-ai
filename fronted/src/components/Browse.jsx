import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search, BriefcaseBusiness } from "lucide-react";

const Browse = () => {
    useGetAllJobs();

    const { allJobs } = useSelector((store) => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* Header */}
                <div className="mb-8 sm:mb-10">

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>

                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1.5">
                                <Search className="h-3.5 w-3.5 text-teal-400" />

                                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                                    Job Search
                                </span>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                Search Results
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                                Discover opportunities that match your skills,
                                experience, and career goals.
                            </p>

                        </div>

                        {/* Result count */}
                        <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 shadow-lg">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-lg font-extrabold leading-none text-white">
                                    {allJobs.length}
                                </p>

                                <p className="mt-1 text-xs font-medium text-slate-500">
                                    {allJobs.length === 1
                                        ? "Opportunity found"
                                        : "Opportunities found"}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div className="mt-7 h-px w-full bg-slate-800" />

                </div>

                {/* Jobs */}
                {allJobs.length === 0 ? (

                    <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">

                        <div className="text-center">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800">
                                <Search className="h-6 w-6 text-slate-500" />
                            </div>

                            <h2 className="mt-5 text-xl font-bold text-white">
                                No jobs found
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Try searching with a different keyword or skill.
                            </p>

                        </div>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                        {allJobs.map((job) => (
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

export default Browse;