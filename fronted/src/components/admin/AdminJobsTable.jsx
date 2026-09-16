import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";
import {
    CalendarDays,
    Edit2,
    Eye,
    MoreHorizontal,
    BriefcaseBusiness,
    Building2,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(
        (store) => store.job
    );

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }

            return (
                job?.title
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase()) ||
                job?.company?.name
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase())
            );
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[760px]">
                <TableCaption className="border-t border-slate-800 px-4 py-5 text-sm text-slate-500">
                    A list of your recent posted jobs
                </TableCaption>

                <TableHeader>
                    <TableRow className="border-b border-slate-700 hover:bg-transparent">
                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-teal-400" />
                                Company Name
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                                Role
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-teal-400" />
                                Date
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-right text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow
                            key={job._id}
                            className="border-b border-slate-800/80 transition-colors hover:bg-slate-800/40"
                        >
                            <TableCell className="px-5 py-4 font-medium text-slate-100">
                                {job?.company?.name || "Unknown Company"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-slate-300">
                                {job?.title || "Untitled Role"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-sm text-slate-400">
                                {job?.createdAt
                                    ? job.createdAt.split("T")[0]
                                    : "—"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            aria-label="Open job actions"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="end"
                                        className="w-40 rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-100 shadow-2xl"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/companies/${job._id}`
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-400"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/jobs/${job._id}/applicants`
                                                )
                                            }
                                            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-400"
                                        >
                                            <Eye className="h-4 w-4" />
                                            <span>Applicants</span>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
