import React from "react";
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
    MoreHorizontal,
    UserRound,
    Mail,
    Phone,
    FileText,
    CalendarDays,
    UserCheck,
    UserX,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, id) => {
        console.log("called");
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/status/${id}/update`,
                { status }
            );

            console.log(res);

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[1050px]">
                <TableCaption className="border-t border-slate-800 px-4 py-5 text-sm text-slate-500">
                    A list of your recent applied users
                </TableCaption>

                <TableHeader>
                    <TableRow className="border-b border-slate-700 hover:bg-transparent">
                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <UserRound className="h-4 w-4 text-teal-400" />
                                Full Name
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-teal-400" />
                                Email
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-teal-400" />
                                Contact
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-teal-400" />
                                Resume
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
                    {applicants?.applications?.map((item) => (
                        <TableRow
                            key={item._id}
                            className="border-b border-slate-800/80 transition-colors hover:bg-slate-800/40"
                        >
                            <TableCell className="px-5 py-4 font-medium text-slate-100">
                                {item?.applicant?.fullname || "Unknown"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-slate-300">
                                {item?.applicant?.email || "—"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-slate-300">
                                {item?.applicant?.phoneNumber || "—"}
                            </TableCell>

                            <TableCell className="max-w-[260px] px-5 py-4">
                                {item?.applicant?.profile?.resume ? (
                                    <a
                                        className="inline-flex max-w-full items-center gap-2 truncate font-medium text-teal-400 transition-colors hover:text-teal-300 hover:underline"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={
                                            item?.applicant?.profile
                                                ?.resumeOriginalName
                                        }
                                    >
                                        <FileText className="h-4 w-4 shrink-0" />
                                        <span className="truncate">
                                            {item?.applicant?.profile
                                                ?.resumeOriginalName ||
                                                "View Resume"}
                                        </span>
                                    </a>
                                ) : (
                                    <span className="text-slate-500">NA</span>
                                )}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-sm text-slate-400">
                                {item?.applicant?.createdAt
                                    ? item.applicant.createdAt.split("T")[0]
                                    : "—"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            aria-label="Open applicant actions"
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="end"
                                        className="w-40 rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-100 shadow-2xl"
                                    >
                                        {shortlistingStatus.map(
                                            (status, index) => {
                                                const isAccepted =
                                                    status === "Accepted";

                                                return (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            statusHandler(
                                                                status,
                                                                item?._id
                                                            )
                                                        }
                                                        key={index}
                                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-400"
                                                    >
                                                        {isAccepted ? (
                                                            <UserCheck className="h-4 w-4" />
                                                        ) : (
                                                            <UserX className="h-4 w-4" />
                                                        )}
                                                        <span>{status}</span>
                                                    </button>
                                                );
                                            }
                                        )}
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

export default ApplicantsTable;
