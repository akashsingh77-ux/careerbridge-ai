import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import {
    CalendarDays,
    Building2,
    BriefcaseBusiness,
    Clock3,
    CheckCircle2,
    XCircle,
    CircleDot,
} from "lucide-react";

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job);

    const getStatusStyles = (status) => {
        if (status === "rejected") {
            return {
                className:
                    "border-red-500/20 bg-red-500/10 text-red-400",
                icon: XCircle,
            };
        }

        if (status === "pending") {
            return {
                className:
                    "border-slate-500/20 bg-slate-500/10 text-slate-300",
                icon: Clock3,
            };
        }

        return {
            className:
                "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
            icon: CheckCircle2,
        };
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">

                {/* Caption */}
                <TableCaption className="pb-5 pt-2 text-sm text-slate-500">
                    A list of your applied jobs
                </TableCaption>

                {/* Header */}
                <TableHeader>
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-3.5 w-3.5 text-teal-400" />
                                Date
                            </div>
                        </TableHead>

                        <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="h-3.5 w-3.5 text-teal-400" />
                                Job Role
                            </div>
                        </TableHead>

                        <TableHead className="h-12 text-xs font-bold uppercase tracking-wider text-slate-500">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-3.5 w-3.5 text-teal-400" />
                                Company
                            </div>
                        </TableHead>

                       <TableHead className="h-12 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
    <div className="flex items-center justify-end gap-2">
        <CircleDot className="h-3.5 w-3.5 text-teal-400" />
        Status
    </div>
</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Body */}
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableCell
                                colSpan={4}
                                className="h-32 text-center text-sm text-slate-500"
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900">
                                        <BriefcaseBusiness className="h-5 w-5 text-slate-600" />
                                    </div>

                                    <p>
                                        You haven't applied for any job yet.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => {
                            const status = getStatusStyles(
                                appliedJob?.status
                            );

                            const StatusIcon = status.icon;

                            return (
                                <TableRow
                                    key={appliedJob._id}
                                    className="
                                        border-slate-800
                                        transition-colors
                                        hover:bg-slate-900/60
                                    "
                                >
                                    {/* Date */}
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-slate-300">
                                            <CalendarDays className="h-4 w-4 text-slate-600" />

                                            {appliedJob?.createdAt?.split(
                                                "T"
                                            )[0]}
                                        </div>
                                    </TableCell>

                                    {/* Job Role */}
                                    <TableCell className="py-4">
                                        <div className="max-w-[260px]">
                                            <span className="line-clamp-2 text-sm font-semibold text-white">
                                                {appliedJob?.job?.title}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Company */}
                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
                                                <Building2 className="h-4 w-4 text-teal-400" />
                                            </div>

                                            <span className="text-sm font-medium text-slate-300">
                                                {appliedJob?.job?.company?.name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell className="py-4 text-right">
                                        <Badge
                                            className={`
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-full
                                                border
                                                px-3
                                                py-1
                                                text-[11px]
                                                font-bold
                                                tracking-wide
                                                shadow-none
                                                ${status.className}
                                            `}
                                        >
                                            <StatusIcon className="h-3.5 w-3.5" />

                                            {appliedJob?.status?.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;