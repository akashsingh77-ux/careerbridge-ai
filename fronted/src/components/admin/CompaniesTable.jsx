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
    Building2,
    CalendarDays,
    Edit2,
    MoreHorizontal,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(
        (store) => store.company
    );

    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }

            return company?.name
                ?.toLowerCase()
                .includes(searchCompanyByText.toLowerCase());
        });

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="w-full overflow-x-auto">
            <Table className="min-w-[700px]">
                <TableCaption className="border-t border-slate-800 px-4 py-5 text-sm text-slate-500">
                    A list of your recent registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow className="border-b border-slate-700 hover:bg-transparent">
                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-teal-400" />
                                Logo
                            </div>
                        </TableHead>

                        <TableHead className="h-12 px-5 text-left text-xs font-semibold uppercase tracking-wider text-slate-300">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-teal-400" />
                                Name
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
                    {filterCompany?.map((company) => (
                        <TableRow
                            key={company?._id}
                            className="border-b border-slate-800/80 transition-colors hover:bg-slate-800/40"
                        >
                            <TableCell className="px-5 py-4">
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                                    {company?.logo ? (
                                        <img
                                            src={company.logo}
                                            alt={`${company?.name || "Company"} logo`}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <Building2 className="h-5 w-5 text-slate-500" />
                                    )}
                                </div>
                            </TableCell>

                            <TableCell className="max-w-[280px] px-5 py-4 font-medium text-slate-100">
                                <span
                                    className="block truncate"
                                    title={company?.name}
                                >
                                    {company?.name || "Unnamed Company"}
                                </span>
                            </TableCell>

                            <TableCell className="whitespace-nowrap px-5 py-4 text-sm text-slate-400">
                                {company?.createdAt
                                    ? company.createdAt.split("T")[0]
                                    : "—"}
                            </TableCell>

                            <TableCell className="px-5 py-4 text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button
                                            type="button"
                                            aria-label={`Open actions for ${
                                                company?.name || "company"
                                            }`}
                                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all hover:border-slate-700 hover:bg-slate-800 hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </button>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        align="end"
                                        className="w-36 rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-100 shadow-2xl"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/companies/${company._id}`
                                                )
                                            }
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-teal-400"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                            <span>Edit</span>
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

export default CompaniesTable;
