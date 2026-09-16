import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, BriefcaseBusiness, IndianRupee, ArrowUpRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="
                group
                relative
                p-5 sm:p-6
                rounded-2xl
                bg-slate-900
                border border-slate-800
                cursor-pointer
                w-full
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-teal-500/50
                hover:shadow-xl
                hover:shadow-teal-950/30
            "
        >
            <div className="absolute top-5 right-5">

                <div
                    className="
                        h-9 w-9
                        rounded-full
                        border border-slate-700
                        bg-slate-800
                        flex items-center justify-center
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:border-teal-500
                        group-hover:bg-teal-500
                        group-hover:text-slate-950
                    "
                >
                    <ArrowUpRight className="h-4 w-4" />
                </div>

            </div>

            <div className="min-w-0 pr-12">

                <h1 className="font-bold text-lg text-white truncate">
                    {job?.company?.name}
                </h1>

                <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />

                    <p className="text-sm">
                        India
                    </p>
                </div>

            </div>

            <div className="min-w-0 mt-6">

                <h1 className="
                    font-extrabold
                    text-xl
                    text-white
                    my-2
                    break-words
                    leading-snug
                    group-hover:text-teal-300
                    transition-colors
                    duration-200
                ">
                    {job?.title}
                </h1>

                <p className="
                    text-sm
                    text-slate-400
                    line-clamp-4
                    break-words
                    leading-relaxed
                ">
                    {job?.description}
                </p>

            </div>

            <div className="flex flex-wrap items-center gap-2 mt-6">

                <Badge
                    variant="ghost"
                    className="
                        flex items-center gap-1.5
                        bg-teal-500/10
                        border border-teal-500/20
                        text-teal-300
                        font-semibold
                        px-3 py-1.5
                        rounded-lg
                    "
                >
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    {job?.position} Positions
                </Badge>

                <Badge
                    variant="ghost"
                    className="
                        flex items-center gap-1.5
                        bg-slate-800
                        border border-slate-700
                        text-slate-300
                        font-semibold
                        px-3 py-1.5
                        rounded-lg
                    "
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    variant="ghost"
                    className="
                        flex items-center gap-1.5
                        bg-teal-500/10
                        border border-teal-500/20
                        text-teal-300
                        font-semibold
                        px-3 py-1.5
                        rounded-lg
                    "
                >
                    <IndianRupee className="h-3.5 w-3.5" />
                    {job?.salary} LPA
                </Badge>

            </div>

        </div>
    )
}

export default LatestJobCards