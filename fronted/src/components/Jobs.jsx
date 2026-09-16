import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './filterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion"
import { Menu, X, SlidersHorizontal, BriefcaseBusiness } from "lucide-react"

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (!searchedQuery) {
            setFilterJobs(allJobs);
            return;
        }

        const query = searchedQuery.toLowerCase();

        const filteredJobs = allJobs.filter((job) => {

            // Salary filter
            if (query.includes("lpa")) {
                const salary = Number(job?.salary);

                if (query === "0-3 lpa") {
                    return salary >= 0 && salary < 3;
                }

                if (query === "3-6 lpa") {
                    return salary >= 3 && salary < 6;
                }

                if (query === "6-10 lpa") {
                    return salary >= 6 && salary < 10;
                }

                if (query === "10-15 lpa") {
                    return salary >= 10 && salary < 15;
                }

                if (query === "15-20 lpa") {
                    return salary >= 15 && salary < 20;
                }

                if (query === "20-30 lpa") {
                    return salary >= 20 && salary < 30;
                }

                if (query === "30+ lpa") {
                    return salary >= 30;
                }
            }

            // Normal search / Location / Industry
            return (
                job?.title?.toLowerCase().includes(query) ||
                job?.description?.toLowerCase().includes(query) ||
                job?.location?.toLowerCase().includes(query)
            );
        });

        setFilterJobs(filteredJobs);

    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="relative overflow-hidden">

                {/* Background Glow */}
                <div className="
                    pointer-events-none
                    absolute
                    -top-40
                    right-0
                    h-96
                    w-96
                    rounded-full
                    bg-teal-500/5
                    blur-3xl
                " />

                <div className="
                    pointer-events-none
                    absolute
                    top-[500px]
                    -left-40
                    h-96
                    w-96
                    rounded-full
                    bg-cyan-500/5
                    blur-3xl
                " />

                <div className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    py-8
                    sm:px-6
                    sm:py-10
                    lg:px-8
                    lg:py-12
                ">

                    {/* Page Header */}
                    <div className="mb-8 sm:mb-10">

                        <div className="
                            mb-3
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-extrabold
                            uppercase
                            tracking-[0.2em]
                            text-teal-400
                        ">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                            Explore opportunities
                        </div>

                        <div className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-end
                            sm:justify-between
                        ">

                            <div>

                                <h1 className="
                                    text-3xl
                                    font-extrabold
                                    tracking-tight
                                    text-white
                                    sm:text-4xl
                                    md:text-5xl
                                ">
                                    Find your next
                                    <span className="text-teal-400">
                                        {" "}career move
                                    </span>
                                </h1>

                                <p className="
                                    mt-3
                                    max-w-2xl
                                    text-sm
                                    leading-6
                                    text-slate-400
                                    sm:text-base
                                ">
                                    Discover opportunities that match your
                                    skills, experience, and career goals.
                                </p>

                            </div>

                            {/* Mobile Filter Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="
                                    flex
                                    w-fit
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-900
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-bold
                                    text-slate-200
                                    transition-all
                                    hover:border-teal-500
                                    hover:bg-slate-800
                                    hover:text-teal-400
                                    lg:hidden
                                "
                            >
                                {
                                    showFilters ? (
                                        <>
                                            <X className="h-4 w-4" />
                                            Close Filters
                                        </>
                                    ) : (
                                        <>
                                            <SlidersHorizontal className="h-4 w-4" />
                                            Filters
                                        </>
                                    )
                                }
                            </button>

                        </div>

                    </div>

                    <div className="flex items-start gap-6">

                        {/* Desktop Filter */}
                        <aside className="
                            hidden
                            lg:block
                            lg:w-[23%]
                            xl:w-[22%]
                            shrink-0
                        ">
                            <div className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-900
                                shadow-xl
                                shadow-black/20
                            ">
                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                    border-b
                                    border-slate-800
                                    px-5
                                    py-4
                                ">
                                    <SlidersHorizontal className="h-4 w-4 text-teal-400" />

                                    <h2 className="
                                        text-sm
                                        font-extrabold
                                        uppercase
                                        tracking-wider
                                        text-white
                                    ">
                                        Filter Jobs
                                    </h2>
                                </div>

                                <div className="p-1">
                                    <FilterCard />
                                </div>
                            </div>
                        </aside>

                        {/* Mobile Filter */}
                        {
                            showFilters && (
                                <div className="
                                    fixed
                                    inset-0
                                    z-[60]
                                    bg-black/70
                                    backdrop-blur-sm
                                    lg:hidden
                                ">

                                    <div className="
                                        h-full
                                        w-[88%]
                                        max-w-sm
                                        overflow-y-auto
                                        border-r
                                        border-slate-800
                                        bg-slate-950
                                        shadow-2xl
                                    ">

                                        <div className="
                                            sticky
                                            top-0
                                            z-10
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-slate-800
                                            bg-slate-950/95
                                            px-5
                                            py-4
                                            backdrop-blur-md
                                        ">

                                            <div className="flex items-center gap-2">

                                                <SlidersHorizontal className="h-5 w-5 text-teal-400" />

                                                <h2 className="
                                                    text-lg
                                                    font-extrabold
                                                    text-white
                                                ">
                                                    Filters
                                                </h2>

                                            </div>

                                            <button
                                                onClick={() => setShowFilters(false)}
                                                className="
                                                    flex
                                                    h-9
                                                    w-9
                                                    items-center
                                                    justify-center
                                                    rounded-full
                                                    border
                                                    border-slate-700
                                                    bg-slate-900
                                                    text-slate-400
                                                    transition-all
                                                    hover:border-teal-500
                                                    hover:text-teal-400
                                                "
                                            >
                                                <X className="h-5 w-5" />
                                            </button>

                                        </div>

                                        <div className="p-2">
                                            <FilterCard />
                                        </div>

                                    </div>

                                </div>
                            )
                        }

                        {/* Jobs */}
                        <section className="min-w-0 flex-1">

                            {/* Results Header */}
                            <div className="
                                mb-5
                                flex
                                items-center
                                justify-between
                                gap-4
                            ">

                                <div className="flex items-center gap-2">

                                    <div className="
                                        flex
                                        h-9
                                        w-9
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-slate-800
                                        bg-slate-900
                                        text-teal-400
                                    ">
                                        <BriefcaseBusiness className="h-4 w-4" />
                                    </div>

                                    <div>

                                        <p className="
                                            text-sm
                                            font-bold
                                            text-white
                                        ">
                                            Available Jobs
                                        </p>

                                        <p className="
                                            text-xs
                                            font-medium
                                            text-slate-500
                                        ">
                                            {filterJobs?.length || 0} opportunities
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {
                                filterJobs.length <= 0 ? (
                                    <div className="
                                        flex
                                        min-h-[350px]
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-slate-800
                                        bg-slate-900/60
                                        px-6
                                        text-center
                                    ">

                                        <div className="
                                            mb-4
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-slate-700
                                            bg-slate-900
                                            text-teal-400
                                        ">
                                            <BriefcaseBusiness className="h-6 w-6" />
                                        </div>

                                        <h2 className="
                                            text-xl
                                            font-extrabold
                                            text-white
                                        ">
                                            No jobs found
                                        </h2>

                                        <p className="
                                            mt-2
                                            max-w-md
                                            text-sm
                                            leading-6
                                            text-slate-400
                                        ">
                                            We couldn't find any opportunities
                                            matching your current search or filters.
                                        </p>

                                    </div>
                                ) : (
                                    <div className="
                                        grid
                                        grid-cols-1
                                        gap-5
                                        sm:grid-cols-2
                                        xl:grid-cols-3
                                    ">
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}
                                                    className="min-w-0"
                                                >
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </section>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default Jobs