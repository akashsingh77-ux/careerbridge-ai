import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import {
    SlidersHorizontal,
    ChevronDown,
    ChevronUp
} from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Location",
        array: [
            "Delhi NCR",
            "Bangalore",
            "Hyderabad",
            "Pune",
            "Mumbai",
            "Chennai",
            "Gurgaon",
            "Noida",
            "Kolkata",
            "Ahmedabad",
            "Jaipur",
            "Remote"
        ]
    },
    {
        fitlerType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "MERN Stack Developer",
            "Software Engineer",
            "Data Scientist",
            "Data Analyst",
            "Machine Learning Engineer",
            "AI Engineer",
            "DevOps Engineer",
            "Cloud Engineer",
            "UI/UX Designer",
            "Product Manager"
        ]
    },
    {
        fitlerType: "Salary",
        array: [
            "0-3 LPA",
            "3-6 LPA",
            "6-10 LPA",
            "10-15 LPA",
            "15-20 LPA",
            "20-30 LPA",
            "30+ LPA"
        ]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [expandedFilters, setExpandedFilters] = useState({});
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    const toggleFilter = (filterType) => {
        setExpandedFilters((prev) => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white shadow-xl">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                    <SlidersHorizontal className="h-4 w-4 text-teal-400" />
                </div>

                <div>
                    <h1 className="text-base font-extrabold tracking-wide text-white">
                        FILTER JOBS
                    </h1>

                    <p className="mt-0.5 text-xs font-medium text-slate-500">
                        Refine your search
                    </p>
                </div>

            </div>

            {/* Filter Sections */}
            <div className="mt-5">

                {fitlerData.map((data) => {

                    const isExpanded = expandedFilters[data.fitlerType];

                    const visibleItems = isExpanded
                        ? data.array
                        : data.array.slice(0, 5);

                    return (
                        <div
                            key={data.fitlerType}
                            className="
                                mb-6
                                border-b
                                border-slate-800
                                pb-5
                                last:mb-0
                                last:border-b-0
                            "
                        >

                            {/* Section Header */}
                            <div className="mb-3 flex items-center justify-between">

                                <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                                    {data.fitlerType}
                                </h2>

                                <span className="text-[10px] font-bold text-slate-500">
                                    {data.array.length}
                                </span>

                            </div>

                            {/* Options */}
                            <div className="space-y-1">

                                {visibleItems.map((item, idx) => {

                                    const itemId = `${data.fitlerType}-${idx}`;

                                    return (
                                        <label
                                            key={itemId}
                                            htmlFor={itemId}
                                            className="
                                                group
                                                flex
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-lg
                                                px-2
                                                py-2
                                                transition-all
                                                duration-200
                                                hover:bg-slate-800
                                            "
                                        >

                                            {/* Native Radio */}
                                            <input
                                                id={itemId}
                                                type="radio"
                                                name="job-filter"
                                                value={item}
                                                checked={selectedValue === item}
                                                onChange={(e) =>
                                                    changeHandler(e.target.value)
                                                }
                                                className="
                                                    h-4
                                                    w-4
                                                    shrink-0
                                                    cursor-pointer
                                                    appearance-none
                                                    rounded-full
                                                    border
                                                    border-slate-600
                                                    bg-transparent
                                                    transition-all
                                                    duration-200
                                                    checked:border-teal-400
                                                    checked:bg-teal-400
                                                    focus:outline-none
                                                    focus:ring-2
                                                    focus:ring-teal-500/20
                                                "
                                            />

                                            <span className="
                                                flex-1
                                                text-sm
                                                font-medium
                                                text-slate-300
                                                transition-colors
                                                duration-200
                                                group-hover:text-white
                                            ">
                                                {item}
                                            </span>

                                        </label>
                                    );
                                })}

                            </div>

                            {/* View More / Less */}
                            {data.array.length > 5 && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleFilter(data.fitlerType)
                                    }
                                    className="
                                        mt-3
                                        flex
                                        items-center
                                        gap-1.5
                                        bg-transparent
                                        text-xs
                                        font-bold
                                        text-teal-400
                                        transition-colors
                                        hover:text-teal-300
                                    "
                                >

                                    {isExpanded ? (
                                        <>
                                            View Less
                                            <ChevronUp className="h-3.5 w-3.5" />
                                        </>
                                    ) : (
                                        <>
                                            View More
                                            <ChevronDown className="h-3.5 w-3.5" />
                                        </>
                                    )}

                                </button>
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    )
}

export default FilterCard