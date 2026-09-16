import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import {
    BriefcaseBusiness,
    Users,
    Clock3,
    UserCheck,
    UserX,
    Plus,
    ArrowRight,
    TrendingUp,
    Building2,
    CalendarDays,
    Mail,
    Loader2,
    BarChart3,
} from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/recruiter/dashboard`,
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setDashboard(res.data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100">
                <Navbar />

                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/20 bg-teal-400/10">
                            <Loader2 className="h-6 w-6 animate-spin text-teal-400" />
                        </div>

                        <p className="text-sm font-medium text-slate-400">
                            Loading recruiter dashboard...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const stats = dashboard?.stats || {};

    const jobPerformance = dashboard?.jobPerformance || [];
    const recentApplications = dashboard?.recentApplications || [];

    const totalApplications = stats.totalApplicants || 0;

    const getPercentage = (value) => {
        if (!totalApplications) {
            return 0;
        }

        return Math.round((value / totalApplications) * 100);
    };

    const statCards = [
        {
            title: "Total Jobs",
            value: stats.totalJobs || 0,
            description: "Published job postings",
            icon: BriefcaseBusiness,
        },
        {
            title: "Total Applicants",
            value: stats.totalApplicants || 0,
            description: "Applications received",
            icon: Users,
        },
        {
            title: "Pending",
            value: stats.pending || 0,
            description: "Awaiting review",
            icon: Clock3,
        },
        {
            title: "Accepted",
            value: stats.accepted || 0,
            description: "Successful applications",
            icon: UserCheck,
        },
    ];

    const statusCards = [
        {
            title: "Pending",
            value: stats.pending || 0,
            percentage: getPercentage(stats.pending || 0),
            icon: Clock3,
        },
        {
            title: "Accepted",
            value: stats.accepted || 0,
            percentage: getPercentage(stats.accepted || 0),
            icon: UserCheck,
        },
        {
            title: "Rejected",
            value: stats.rejected || 0,
            percentage: getPercentage(stats.rejected || 0),
            icon: UserX,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                <BarChart3 className="h-5 w-5 text-teal-400" />
                            </div>

                            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                                Recruiter Workspace
                            </span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Recruiter Dashboard
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                            Track your hiring activity, applications, and job
                            performance from one place.
                        </p>
                    </div>

                    <Button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="h-11 w-full rounded-xl bg-teal-400 px-5 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                    </Button>
                </div>

                {/* Statistics */}
                <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-700"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            {stat.title}
                                        </p>

                                        <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                                            {stat.value}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {stat.description}
                                        </p>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                                        <Icon className="h-5 w-5 text-teal-400" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Main Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Job Performance */}
                    <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/10 xl:col-span-2">
                        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
                            <div>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-5 w-5 text-teal-400" />

                                    <h2 className="text-base font-semibold text-white">
                                        Job Performance
                                    </h2>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    Applicant activity across your job
                                    postings.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/admin/jobs")}
                                className="hidden items-center gap-1 text-sm font-semibold text-teal-400 transition-colors hover:text-teal-300 sm:flex"
                            >
                                Manage Jobs
                                <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="p-5 sm:p-6">
                            {jobPerformance.length === 0 ? (
                                <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                                        <BriefcaseBusiness className="h-6 w-6 text-slate-500" />
                                    </div>

                                    <h3 className="mt-4 text-sm font-semibold text-white">
                                        No jobs posted yet
                                    </h3>

                                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                                        Create your first job posting to start
                                        receiving applications.
                                    </p>

                                    <Button
                                        onClick={() =>
                                            navigate("/admin/jobs/create")
                                        }
                                        className="mt-5 rounded-xl bg-teal-400 font-semibold text-slate-950 hover:bg-teal-300"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Job
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {jobPerformance
                                        .slice(0, 6)
                                        .map((job, index) => {
                                            const maxApplicants = Math.max(
                                                ...jobPerformance.map(
                                                    (item) =>
                                                        item.applicants || 0
                                                ),
                                                1
                                            );

                                            const width =
                                                ((job.applicants || 0) /
                                                    maxApplicants) *
                                                100;

                                            return (
                                                <div
                                                    key={job._id}
                                                    className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
                                                                    <span className="text-sm font-bold text-teal-400">
                                                                        {index +
                                                                            1}
                                                                    </span>
                                                                </div>

                                                                <div className="min-w-0">
                                                                    <h3 className="truncate text-sm font-semibold text-white">
                                                                        {job.title ||
                                                                            "Untitled Role"}
                                                                    </h3>

                                                                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                                                        <CalendarDays className="h-3.5 w-3.5" />

                                                                        {job.createdAt
                                                                            ? new Date(
                                                                                  job.createdAt
                                                                              ).toLocaleDateString(
                                                                                  "en-IN",
                                                                                  {
                                                                                      day: "2-digit",
                                                                                      month: "short",
                                                                                      year: "numeric",
                                                                                  }
                                                                              )
                                                                            : "Date unavailable"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="shrink-0 text-right">
                                                            <p className="text-lg font-bold text-white">
                                                                {job.applicants ||
                                                                    0}
                                                            </p>

                                                            <p className="text-xs text-slate-500">
                                                                applicants
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                                                        <div
                                                            className="h-full rounded-full bg-teal-400 transition-all duration-500"
                                                            style={{
                                                                width: `${width}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Application Status */}
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/10">
                        <div className="border-b border-slate-800 px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-teal-400" />

                                <div>
                                    <h2 className="text-base font-semibold text-white">
                                        Application Status
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Current hiring pipeline.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <div className="mb-6 flex items-center justify-center">
                                <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-slate-800">
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-white">
                                            {totalApplications}
                                        </p>

                                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                            Applications
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {statusCards.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div key={item.title}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="h-4 w-4 text-teal-400" />

                                                    <span className="text-sm font-medium text-slate-300">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                <span className="text-sm font-bold text-white">
                                                    {item.value}
                                                </span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                                <div
                                                    className="h-full rounded-full bg-teal-400 transition-all duration-500"
                                                    style={{
                                                        width: `${item.percentage}%`,
                                                    }}
                                                />
                                            </div>

                                            <p className="mt-1 text-right text-xs text-slate-600">
                                                {item.percentage}%
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Recent Applications */}
                <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/10">
                    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 sm:px-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-teal-400" />

                                <h2 className="text-base font-semibold text-white">
                                    Recent Applications
                                </h2>
                            </div>

                            <p className="mt-1 text-sm text-slate-500">
                                The latest candidates who applied to your jobs.
                            </p>
                        </div>
                    </div>

                    {recentApplications.length === 0 ? (
                        <div className="flex min-h-[220px] flex-col items-center justify-center px-5 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
                                <Users className="h-6 w-6 text-slate-500" />
                            </div>

                            <h3 className="mt-4 text-sm font-semibold text-white">
                                No applications yet
                            </h3>

                            <p className="mt-1 max-w-sm text-sm text-slate-500">
                                Applications from candidates will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <div className="min-w-[760px]">
                                <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] border-b border-slate-800 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6">
                                    <div>Candidate</div>
                                    <div>Position</div>
                                    <div>Status</div>
                                    <div>Date</div>
                                </div>

                                <div>
                                    {recentApplications.map((application) => {
                                        const applicant =
                                            application?.applicant;
                                        const job = application?.job;

                                        const status =
                                            application?.status || "pending";

                                        const statusStyles = {
                                            pending:
                                                "border-amber-400/20 bg-amber-400/10 text-amber-300",
                                            accepted:
                                                "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
                                            rejected:
                                                "border-rose-400/20 bg-rose-400/10 text-rose-300",
                                        };

                                        return (
                                            <div
                                                key={application._id}
                                                className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr] items-center border-b border-slate-800/80 px-5 py-4 transition-colors last:border-b-0 hover:bg-slate-800/30 sm:px-6"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                                                        {applicant?.profile
                                                            ?.profilePhoto ? (
                                                            <img
                                                                src={
                                                                    applicant
                                                                        .profile
                                                                        .profilePhoto
                                                                }
                                                                alt={
                                                                    applicant?.fullname ||
                                                                    "Candidate"
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <Users className="h-4 w-4 text-slate-500" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-white">
                                                            {applicant?.fullname ||
                                                                "Unknown Candidate"}
                                                        </p>

                                                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500">
                                                            <Mail className="h-3 w-3 shrink-0" />

                                                            {applicant?.email ||
                                                                "Email unavailable"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="pr-4">
                                                    <p className="truncate text-sm font-medium text-slate-300">
                                                        {job?.title ||
                                                            "Unknown Position"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span
                                                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${
                                                            statusStyles[
                                                                status
                                                            ] ||
                                                            statusStyles.pending
                                                        }`}
                                                    >
                                                        {status}
                                                    </span>
                                                </div>

                                                <div className="text-sm text-slate-500">
                                                    {application?.createdAt
                                                        ? new Date(
                                                              application.createdAt
                                                          ).toLocaleDateString(
                                                              "en-IN",
                                                              {
                                                                  day: "2-digit",
                                                                  month: "short",
                                                              }
                                                          )
                                                        : "—"}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Quick Actions */}
                <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/jobs")}
                        className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition-all hover:border-teal-400/30 hover:bg-slate-900/80"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10">
                                <BriefcaseBusiness className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Manage Jobs
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    View and edit your postings
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-teal-400" />
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/companies")}
                        className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition-all hover:border-teal-400/30 hover:bg-slate-900/80"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10">
                                <Building2 className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Manage Companies
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Manage your company profiles
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-teal-400" />
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin/jobs")}
                        className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition-all hover:border-teal-400/30 hover:bg-slate-900/80"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/10">
                                <Users className="h-5 w-5 text-teal-400" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Review Applicants
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Open applicants from your jobs
                                </p>
                            </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-slate-600 transition-transform group-hover:translate-x-1 group-hover:text-teal-400" />
                    </button>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;