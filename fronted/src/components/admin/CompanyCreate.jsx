import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { ArrowLeft, Building2, CheckCircle2, Plus } from "lucide-react";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                { companyName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);

                const companyId = res?.data?.company?._id;

                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate("/admin/companies")}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-teal-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Companies
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                        <Building2 className="h-6 w-6 text-teal-400" />
                    </div>

                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                        Recruiter Workspace
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Create Your Company
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Register your company to start creating job
                        opportunities and managing applications.
                    </p>
                </div>

                {/* Form Card */}
                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7">
                    <div className="mb-7 flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
                            <Plus className="h-5 w-5 text-teal-400" />
                        </div>

                        <div>
                            <h2 className="font-semibold text-white">
                                Company Information
                            </h2>

                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                Enter your company name below. You can update
                                additional company details after registration.
                            </p>
                        </div>
                    </div>

                    <div>
                        <Label
                            htmlFor="companyName"
                            className="text-sm font-medium text-slate-300"
                        >
                            Company Name
                        </Label>

                        <Input
                            id="companyName"
                            type="text"
                            value={companyName}
                            className="mt-2 h-12 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                            placeholder="e.g. Microsoft, Google, JobHunt"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />

                        <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400" />
                            <span>
                                You can change or complete your company
                                information later.
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/admin/companies")}
                            className="h-11 w-full rounded-xl border-slate-700 bg-transparent px-6 text-slate-300 hover:bg-slate-800 hover:text-white sm:w-auto"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            onClick={registerNewCompany}
                            className="h-11 w-full rounded-xl bg-teal-400 px-6 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Continue
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CompanyCreate;
