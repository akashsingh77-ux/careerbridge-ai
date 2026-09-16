import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Building2, CheckCircle2, Globe, Loader2, MapPin, Upload } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
    const params = useParams();

    useGetCompanyById(params.id);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    const { singleCompany } = useSelector((store) => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];

        setInput({
            ...input,
            file,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!singleCompany) return;

        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null,
        });
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {/* Back */}
                <button
                    type="button"
                    onClick={() => navigate("/admin/companies")}
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-teal-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Companies
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10">
                            <Building2 className="h-6 w-6 text-teal-400" />
                        </div>

                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-400">
                            Recruiter Workspace
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Company Setup
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                        Keep your company profile accurate and professional.
                        These details will be associated with your job
                        postings.
                    </p>
                </div>

                <form onSubmit={submitHandler}>
                    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-2xl shadow-black/20 sm:p-7">
                        {/* Company identity */}
                        <div className="mb-7 flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-400/10">
                                <Building2 className="h-5 w-5 text-teal-400" />
                            </div>

                            <div className="min-w-0">
                                <h2 className="font-semibold text-white">
                                    Company Information
                                </h2>

                                <p className="mt-1 text-sm leading-5 text-slate-500">
                                    Update your company name, description,
                                    website, location, and logo.
                                </p>
                            </div>
                        </div>

                        {/* Form fields */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {/* Company Name */}
                            <div>
                                <Label
                                    htmlFor="company-name"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Company Name
                                </Label>

                                <Input
                                    id="company-name"
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                    placeholder="Enter company name"
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <Label
                                    htmlFor="company-website"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Website
                                </Label>

                                <div className="relative mt-2">
                                    <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                                    <Input
                                        id="company-website"
                                        type="text"
                                        name="website"
                                        value={input.website}
                                        onChange={changeEventHandler}
                                        className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <Label
                                    htmlFor="company-location"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Location
                                </Label>

                                <div className="relative mt-2">
                                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                                    <Input
                                        id="company-location"
                                        type="text"
                                        name="location"
                                        value={input.location}
                                        onChange={changeEventHandler}
                                        className="h-11 w-full rounded-xl border-slate-700 bg-slate-950 pl-10 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                        placeholder="e.g. Bengaluru, India"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <Label
                                    htmlFor="company-description"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Description
                                </Label>

                                <Input
                                    id="company-description"
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="mt-2 h-11 w-full rounded-xl border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-400/30"
                                    placeholder="Brief company description"
                                />
                            </div>

                            {/* Logo */}
                            <div className="md:col-span-2">
                                <Label
                                    htmlFor="company-logo"
                                    className="text-sm font-medium text-slate-300"
                                >
                                    Company Logo
                                </Label>

                                <div className="mt-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/70 p-4 transition-colors hover:border-teal-400/40">
                                    <label
                                        htmlFor="company-logo"
                                        className="flex cursor-pointer items-center gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10">
                                            <Upload className="h-5 w-5 text-teal-400" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-200">
                                                {input.file?.name ||
                                                    "Upload company logo"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Choose an image file to update
                                                your company branding.
                                            </p>
                                        </div>

                                        <Input
                                            id="company-logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={changeFileHandler}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
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

                            {loading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="h-11 w-full rounded-xl bg-teal-400 px-6 font-semibold text-slate-950 opacity-80 sm:w-auto"
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="h-11 w-full rounded-xl bg-teal-400 px-6 font-semibold text-slate-950 shadow-lg shadow-teal-400/10 transition-all hover:bg-teal-300 sm:w-auto"
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Update Company
                                </Button>
                            )}
                        </div>
                    </section>
                </form>
            </main>
        </div>
    );
};

export default CompanySetup;
