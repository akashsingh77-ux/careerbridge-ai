import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";
import { Building2, Plus, Search } from "lucide-react";

const Companies = () => {
    useGetAllCompanies();

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Page Header */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <Building2 className="h-5 w-5 text-teal-400" />
                            </div>

                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                                Recruiter Workspace
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Companies
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                            Manage your registered companies and keep your
                            organization profiles up to date.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        className="h-11 w-full rounded-xl bg-teal-400 px-5 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Company
                    </Button>
                </div>

                {/* Search */}
                <section className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-2xl shadow-black/10 sm:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative w-full">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                            <Input
                                value={input}
                                className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-11 text-slate-100 placeholder:text-slate-500 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                placeholder="Search company by name..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        {input && (
                            <button
                                type="button"
                                onClick={() => setInput("")}
                                className="h-11 rounded-xl border border-slate-700 px-4 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </section>

                {/* Companies Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
                    <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <Building2 className="h-5 w-5 text-teal-400" />

                            <div>
                                <h2 className="text-base font-semibold text-white">
                                    Registered Companies
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    View and manage your recently registered
                                    companies.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <CompaniesTable />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Companies;
