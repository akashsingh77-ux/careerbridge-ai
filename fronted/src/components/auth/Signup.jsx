import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import {
    Loader2,
    User,
    Mail,
    Phone,
    LockKeyhole,
    GraduationCap,
    BriefcaseBusiness,
    ImagePlus,
    UserPlus,
    Upload,
    Check,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0],
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message ||
                    "Something went wrong"
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-4 py-10 sm:py-14">
                {/* Background decoration */}
                <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

                <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

                <div className="relative w-full max-w-2xl">
                    {/* Main Card */}
                    <form
                        onSubmit={submitHandler}
                        className="
                            overflow-hidden
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            shadow-2xl
                            shadow-black/30
                        "
                    >
                        {/* Header */}
                        <div className="border-b border-slate-800 px-6 py-7 text-center sm:px-8">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-500/20 bg-teal-500/10">
                                <UserPlus className="h-7 w-7 text-teal-400" />
                            </div>

                            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                Create your account
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Join CareerBridge and discover your next opportunity.
                            </p>
                        </div>

                        {/* Form Content */}
                        <div className="px-6 py-7 sm:px-8">

                            {/* Full Name */}
                            <div className="mb-5">
                                <Label
                                    htmlFor="fullname"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300"
                                >
                                    <User className="h-4 w-4 text-teal-400" />
                                    Full Name
                                </Label>

                                <Input
                                    id="fullname"
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="
                                        h-11
                                        rounded-xl
                                        border-slate-700
                                        bg-slate-950
                                        text-white
                                        placeholder:text-slate-600
                                        focus:border-teal-500
                                        focus:ring-teal-500/20
                                    "
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-5">
                                <Label
                                    htmlFor="email"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300"
                                >
                                    <Mail className="h-4 w-4 text-teal-400" />
                                    Email
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className="
                                        h-11
                                        rounded-xl
                                        border-slate-700
                                        bg-slate-950
                                        text-white
                                        placeholder:text-slate-600
                                        focus:border-teal-500
                                        focus:ring-teal-500/20
                                    "
                                />
                            </div>

                            {/* Phone */}
                            <div className="mb-5">
                                <Label
                                    htmlFor="phoneNumber"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300"
                                >
                                    <Phone className="h-4 w-4 text-teal-400" />
                                    Phone Number
                                </Label>

                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className="
                                        h-11
                                        rounded-xl
                                        border-slate-700
                                        bg-slate-950
                                        text-white
                                        placeholder:text-slate-600
                                        focus:border-teal-500
                                        focus:ring-teal-500/20
                                    "
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <Label
                                    htmlFor="password"
                                    className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300"
                                >
                                    <LockKeyhole className="h-4 w-4 text-teal-400" />
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Create a password"
                                    className="
                                        h-11
                                        rounded-xl
                                        border-slate-700
                                        bg-slate-950
                                        text-white
                                        placeholder:text-slate-600
                                        focus:border-teal-500
                                        focus:ring-teal-500/20
                                    "
                                />
                            </div>

                            {/* Role + Profile */}
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                                {/* Role Card */}
                                <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                                    <Label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300">
                                        <BriefcaseBusiness className="h-4 w-4 text-teal-400" />
                                        Create account as
                                    </Label>

                                    <RadioGroup className="grid gap-3">

                                        {/* Student */}
                                        <label
                                            className={`
                                                flex
                                                min-h-[52px]
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-xl
                                                border
                                                px-4
                                                py-3
                                                transition-all
                                                duration-200
                                                ${
                                                    input.role === "student"
                                                        ? "border-teal-500/60 bg-teal-500/10"
                                                        : "border-slate-700 bg-slate-900 hover:border-slate-600"
                                                }
                                            `}
                                        >
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={
                                                    input.role === "student"
                                                }
                                                onChange={changeEventHandler}
                                                className="h-4 w-4 cursor-pointer accent-teal-500"
                                            />

                                            <GraduationCap
                                                className={`h-4 w-4 ${
                                                    input.role === "student"
                                                        ? "text-teal-400"
                                                        : "text-slate-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-semibold ${
                                                    input.role === "student"
                                                        ? "text-white"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                Student
                                            </span>
                                        </label>

                                        {/* Recruiter */}
                                        <label
                                            className={`
                                                flex
                                                min-h-[52px]
                                                cursor-pointer
                                                items-center
                                                gap-3
                                                rounded-xl
                                                border
                                                px-4
                                                py-3
                                                transition-all
                                                duration-200
                                                ${
                                                    input.role === "recruiter"
                                                        ? "border-teal-500/60 bg-teal-500/10"
                                                        : "border-slate-700 bg-slate-900 hover:border-slate-600"
                                                }
                                            `}
                                        >
                                            <Input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={
                                                    input.role === "recruiter"
                                                }
                                                onChange={changeEventHandler}
                                                className="h-4 w-4 cursor-pointer accent-teal-500"
                                            />

                                            <BriefcaseBusiness
                                                className={`h-4 w-4 ${
                                                    input.role === "recruiter"
                                                        ? "text-teal-400"
                                                        : "text-slate-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-semibold ${
                                                    input.role === "recruiter"
                                                        ? "text-white"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                Recruiter
                                            </span>
                                        </label>

                                    </RadioGroup>
                                </div>

                                {/* Profile Picture Card */}
                                <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                                    <Label
                                        htmlFor="profile"
                                        className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-300"
                                    >
                                        <ImagePlus className="h-4 w-4 text-teal-400" />
                                        Profile Picture
                                    </Label>

                                    {/* Hidden real input */}
                                    <input
                                        id="profile"
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />

                                    {/* Custom upload UI */}
                                    <label
                                        htmlFor="profile"
                                        className="
                                            flex
                                            min-h-[124px]
                                            cursor-pointer
                                            flex-col
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-dashed
                                            border-slate-700
                                            bg-slate-900
                                            px-4
                                            py-5
                                            text-center
                                            transition-all
                                            duration-200
                                            hover:border-teal-500/60
                                            hover:bg-teal-500/5
                                        "
                                    >
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
                                            {input.file ? (
                                                <Check className="h-5 w-5 text-teal-400" />
                                            ) : (
                                                <Upload className="h-5 w-5 text-teal-400" />
                                            )}
                                        </div>

                                        {input.file ? (
                                            <>
                                                <p className="max-w-full truncate text-sm font-semibold text-white">
                                                    {input.file.name}
                                                </p>

                                                <p className="mt-1 text-xs text-teal-400">
                                                    Image selected
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm font-semibold text-slate-300">
                                                    Choose profile picture
                                                </p>

                                                <p className="mt-1 text-xs text-slate-600">
                                                    JPG, PNG or other image formats
                                                </p>
                                            </>
                                        )}
                                    </label>
                                </div>

                            </div>

                            {/* Signup Button */}
                            {loading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="
                                        mt-7
                                        h-11
                                        w-full
                                        rounded-xl
                                        bg-teal-600
                                        font-bold
                                        text-white
                                    "
                                >
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="
                                        mt-7
                                        h-11
                                        w-full
                                        rounded-xl
                                        bg-teal-600
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-teal-900/20
                                        transition-all
                                        hover:bg-teal-500
                                    "
                                >
                                    Create Account
                                    <UserPlus className="ml-2 h-4 w-4" />
                                </Button>
                            )}

                            {/* Login */}
                            <p className="mt-6 text-center text-sm text-slate-500">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-teal-400 transition-colors hover:text-teal-300 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-5 text-center text-xs text-slate-600">
                        Build your profile. Discover opportunities. Grow your career.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;