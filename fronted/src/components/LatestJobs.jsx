import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden bg-slate-950 px-4 sm:px-8 py-20 sm:py-24">

            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-teal-500/10 translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto">

                <div className="text-center mb-12 sm:mb-14">

                    <div className="inline-flex items-center gap-3 mb-5">

                        <span className="h-2 w-2 rounded-full bg-teal-400"></span>

                        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
                            <Sparkles className="h-4 w-4" />
                            Latest Opportunities
                        </p>

                        <span className="h-2 w-2 rounded-full bg-teal-400"></span>

                    </div>

                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-extrabold
                        tracking-tight
                        text-white
                    ">
                        Latest & Top{" "}
                        <span className="text-teal-400">
                            Job Openings
                        </span>
                    </h1>

                    <p className="
                        mt-4
                        max-w-3xl
                        mx-auto
                        text-sm
                        sm:text-base
                        text-slate-400
                        leading-relaxed
                    ">
                        Explore handpicked opportunities from top companies
                        and take the next confident step in your career.
                    </p>

                </div>

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-5
                    sm:gap-6
                ">
                    {
                        allJobs?.length <= 0
                            ? (
                                <span className="text-slate-400">
                                    No Job Available
                                </span>
                            )
                            : allJobs?.slice(0, 6).map((job) => (
                                <LatestJobCards
                                    onClick={() => navigate(`/description/${job._id}`)}
                                    key={job._id}
                                    job={job}
                                />
                            ))
                    }
                </div>

            </div>

        </section>
    )
}

export default LatestJobs