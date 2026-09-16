import { Button } from "@/components/ui/button";
import { Bookmark, MapPin, BriefcaseBusiness, IndianRupee, ArrowUpRight } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Job = ({ job }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const saveJobHandler = async (jobId) => {
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/job/save`,
                { jobId },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/saved-jobs");
            }
        } catch (error) {
            console.log("SAVE JOB ERROR:", error);
            console.log("RESPONSE:", error.response);
            console.log("DATA:", error.response?.data);

            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;

        return Math.floor(
            timeDifference / (1000 * 24 * 60 * 60)
        );
    };

    return (
        <div
            className="
                group
                relative
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-800
                bg-slate-900
                p-5
                shadow-lg
                shadow-black/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-teal-500/50
                hover:shadow-xl
                hover:shadow-teal-950/30
            "
        >

            {/* Top Section */}
            <div className="flex items-center justify-between">

                <p className="
                    text-sm
                    font-medium
                    text-slate-500
                ">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} ${
                            daysAgoFunction(job?.createdAt) === 1
                                ? "day"
                                : "days"
                        } ago`
                    }
                </p>

                <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-slate-700
                    bg-slate-800
                    text-slate-400
                    transition-all
                    duration-300
                    group-hover:border-teal-500/50
                    group-hover:text-teal-400
                ">
                    <Bookmark className="h-4 w-4" />
                </div>

            </div>

            {/* Company */}
            <div className="mt-5 flex items-center gap-3">

                <div className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-700
                    bg-white
                ">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={job?.company?.logo}
                            className="object-contain"
                        />
                    </Avatar>
                </div>

                <div className="min-w-0">

                    <h1 className="
                        truncate
                        text-base
                        font-extrabold
                        text-white
                    ">
                        {job?.company?.name}
                    </h1>

                    <div className="
                        mt-1
                        flex
                        items-center
                        gap-1.5
                        text-slate-500
                    ">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />

                        <p className="text-xs font-medium">
                            {job?.location || "India"}
                        </p>
                    </div>

                </div>

            </div>

            {/* Job Information */}
            <div className="mt-6">

                <h1 className="
                    break-words
                    text-xl
                    font-extrabold
                    leading-snug
                    text-white
                    transition-colors
                    duration-200
                    group-hover:text-teal-300
                ">
                    {job?.title}
                </h1>

                <p className="
                    mt-3
                    line-clamp-4
                    break-words
                    text-sm
                    font-medium
                    leading-6
                    text-slate-400
                ">
                    {job?.description}
                </p>

            </div>

            {/* Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">

                <Badge
                    variant="ghost"
                    className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-teal-500/20
                        bg-teal-500/10
                        px-3
                        py-1.5
                        font-bold
                        text-teal-300
                    "
                >
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    {job?.position} Positions
                </Badge>

                <Badge
                    variant="ghost"
                    className="
                        rounded-lg
                        border
                        border-slate-700
                        bg-slate-800
                        px-3
                        py-1.5
                        font-bold
                        text-slate-300
                    "
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    variant="ghost"
                    className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        border
                        border-teal-500/20
                        bg-teal-500/10
                        px-3
                        py-1.5
                        font-bold
                        text-teal-300
                    "
                >
                    <IndianRupee className="h-3.5 w-3.5" />
                    {job?.salary} LPA
                </Badge>

            </div>

            {/* Buttons */}
            <div className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-3
            ">

                <Button
                    onClick={() =>
                        navigate(`/description/${job?._id}`)
                    }
                    className="
                        group/button
                        h-10
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-4
                        font-bold
                        text-slate-200
                        transition-all
                        duration-300
                        hover:border-teal-500
                        hover:bg-teal-500
                        hover:text-slate-950
                    "
                >
                    View Details

                    <ArrowUpRight className="
                        ml-2
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover/button:-translate-y-0.5
                        group-hover/button:translate-x-0.5
                    " />
                </Button>

                {user?.role === "student" && (
                    <Button
                        onClick={() => saveJobHandler(job?._id)}
                        className="
                            h-10
                            rounded-xl
                            border
                            border-teal-500/30
                            bg-teal-500/10
                            px-4
                            font-bold
                            text-teal-300
                            transition-all
                            duration-300
                            hover:border-teal-500
                            hover:bg-teal-500
                            hover:text-slate-950
                        "
                    >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save For Later
                    </Button>
                )}

            </div>

        </div>
    );
};

export default Job;