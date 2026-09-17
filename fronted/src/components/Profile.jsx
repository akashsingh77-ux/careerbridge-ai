import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Contact,
    Mail,
    Pen,
    FileText,
    UserRound,
    BriefcaseBusiness,
    ExternalLink
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetApplieadJobs";

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

            <Navbar />

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

                {/* Profile Card */}
                <section
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900
                        shadow-xl
                        shadow-black/20
                    "
                >

                    {/* Profile Header Background */}
                    <div className="relative border-b border-slate-800 bg-slate-900 px-5 py-7 sm:px-7 sm:py-8">

                        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />

                        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                            {/* User information */}
                            <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                                <div className="relative shrink-0">

                                    <div className="absolute -inset-1 rounded-full bg-teal-500/20 blur-sm" />

                                    <Avatar className="relative h-20 w-20 border-2 border-slate-700 sm:h-24 sm:w-24">

                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt={user?.fullname || "profile"}
                                        />

                                    </Avatar>

                                </div>

                                <div className="min-w-0">

                                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-1">

                                        <UserRound className="h-3 w-3 text-teal-400" />

                                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                                            Candidate Profile
                                        </span>

                                    </div>

                                    <h1 className="truncate text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                        {user?.fullname}
                                    </h1>

                                    <p className="mt-1 max-w-xl break-words text-sm leading-6 text-slate-400 sm:text-base">
                                        {user?.profile?.bio || "Add a professional bio to introduce yourself."}
                                    </p>

                                </div>

                            </div>

                            {/* Edit button */}
                            <Button
                                onClick={() => setOpen(true)}
                                variant="outline"
                                className="
                                    h-10
                                    shrink-0
                                    rounded-xl
                                    border-slate-700
                                    bg-slate-800
                                    px-4
                                    font-bold
                                    text-slate-200
                                    transition-all
                                    duration-200
                                    hover:border-teal-500/50
                                    hover:bg-teal-500/10
                                    hover:text-teal-300
                                "
                            >
                                <Pen className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>

                        </div>

                    </div>

                    {/* Profile Details */}
                    <div className="px-5 py-6 sm:px-7 sm:py-8">

                        {/* Contact Information */}
                        <div>

                            <div className="mb-4 flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                    <Contact className="h-4 w-4 text-teal-400" />
                                </div>

                                <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                                    Contact Information
                                </h2>

                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">

                                {/* Email */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-slate-800
                                        bg-slate-950
                                        px-4
                                        py-3
                                    "
                                >

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                                        <Mail className="h-4 w-4 text-teal-400" />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                            Email
                                        </p>

                                        <p className="mt-1 break-all text-sm font-medium text-slate-300">
                                            {user?.email}
                                        </p>

                                    </div>

                                </div>

                                {/* Phone */}
                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-slate-800
                                        bg-slate-950
                                        px-4
                                        py-3
                                    "
                                >

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                                        <Contact className="h-4 w-4 text-teal-400" />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                                            Phone
                                        </p>

                                        <p className="mt-1 break-words text-sm font-medium text-slate-300">
                                            {user?.phoneNumber}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Divider */}
                        <div className="my-7 h-px bg-slate-800" />

                        {/* Skills */}
                        <div>

                            <div className="mb-4 flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                        <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                                    </div>

                                    <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">
                                        Skills
                                    </h2>

                                </div>

                                <span className="text-xs font-medium text-slate-600">
                                    {user?.profile?.skills?.length || 0} skills
                                </span>

                            </div>

                            <div className="flex flex-wrap gap-2">

                                {user?.profile?.skills?.length !== 0 ? (

                                    user?.profile?.skills?.map((item, index) => (
                                        <Badge
                                            key={index}
                                            className="
                                                rounded-lg
                                                border
                                                border-teal-500/20
                                                bg-teal-500/10
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-semibold
                                                text-teal-300
                                                hover:bg-teal-500/15
                                            "
                                        >
                                            {item}
                                        </Badge>
                                    ))

                                ) : (

                                    <span className="text-sm text-slate-500">
                                        No skills added yet.
                                    </span>

                                )}

                            </div>

                        </div>

                        {/* Divider */}
                        <div className="my-7 h-px bg-slate-800" />

                        {/* Resume */}
                        <div>

                            <div className="mb-4 flex items-center gap-2">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                    <FileText className="h-4 w-4 text-teal-400" />
                                </div>

                                <div>

                                    <Label className="text-sm font-extrabold uppercase tracking-wider text-white">
                                        Resume
                                    </Label>

                                    <p className="mt-0.5 text-xs text-slate-600">
                                        Your latest uploaded resume
                                    </p>

                                </div>

                            </div>

                            {isResume ? (

                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="
                                        group
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        gap-4
                                        rounded-xl
                                        border
                                        border-slate-800
                                        bg-slate-950
                                        px-4
                                        py-3
                                        transition-all
                                        duration-200
                                        hover:border-teal-500/40
                                        hover:bg-slate-900
                                    "
                                >

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                                            <FileText className="h-4 w-4 text-teal-400" />
                                        </div>

                                        <span className="truncate text-sm font-semibold text-slate-300 group-hover:text-teal-300">
                                            {user?.profile?.resumeOriginalName}
                                        </span>

                                    </div>

                                    <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 transition-colors group-hover:text-teal-400" />

                                </a>

                            ) : (

                                <span className="text-sm text-slate-500">
                                    No resume uploaded.
                                </span>

                            )}

                        </div>

                    </div>

                </section>

                {/* Applied Jobs */}
                <section
                    className="
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-800
                        bg-slate-900
                        shadow-xl
                        shadow-black/20
                    "
                >

                    <div className="border-b border-slate-800 px-5 py-5 sm:px-7">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10">
                                <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                            </div>

                            <div>

                                <h2 className="text-lg font-extrabold text-white sm:text-xl">
                                    Applied Jobs
                                </h2>

                                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                                    Track the jobs you've applied for.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Application Table */}
                    <div className="w-full overflow-x-auto p-3 sm:p-5">
                        <AppliedJobTable />
                    </div>

                </section>

            </main>

            {/* Update Profile */}
            <UpdateProfileDialog
                open={open}
                setOpen={setOpen}
            />

        </div>
    );
};

export default Profile;