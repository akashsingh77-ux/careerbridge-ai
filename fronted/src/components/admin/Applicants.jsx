import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { Users, UserCheck, BriefcaseBusiness } from "lucide-react";

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllApplicants();
    }, [params.id, dispatch]);

    const applicantCount = applicants?.applications?.length || 0;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                    <Users className="h-5 w-5 text-teal-400" />
                                </div>

                                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                                    Recruiter Workspace
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Applicants
                            </h1>

                            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                                Review candidates, evaluate applications, and
                                manage the hiring process for this job.
                            </p>
                        </div>

                        <div className="flex w-full items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 sm:w-auto">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400/10">
                                <UserCheck className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                    Total Applicants
                                </p>
                                <p className="text-lg font-bold text-white">
                                    {applicantCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applicants Table */}
                <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">
                    <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                            <BriefcaseBusiness className="h-5 w-5 text-teal-400" />
                            <div>
                                <h2 className="text-base font-semibold text-white">
                                    Candidate Applications
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Review and manage applicants for this job
                                    posting.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <ApplicantsTable />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Applicants;
