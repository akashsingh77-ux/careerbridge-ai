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
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import {
    Loader2,
    Mail,
    LockKeyhole,
    GraduationCap,
    BriefcaseBusiness,
    LogIn,
} from "lucide-react";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));

            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
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

                <div className="relative w-full max-w-md">
                    {/* Card */}
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
                                <LogIn className="h-7 w-7 text-teal-400" />
                            </div>

                            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                Welcome back
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Sign in to continue your CareerBridge journey.
                            </p>
                        </div>

                        {/* Form */}
                        <div className="px-6 py-7 sm:px-8">

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
                                    placeholder="Enter your password"
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

                            {/* Role */}
                            <div className="mb-7">
                                <Label className="mb-3 block text-sm font-semibold text-slate-300">
                                    Continue as
                                </Label>

                                <RadioGroup className="grid grid-cols-2 gap-3">

                                    {/* Student */}
                                    <label
                                        className={`
                                            flex
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
                                                    : "border-slate-700 bg-slate-950 hover:border-slate-600"
                                            }
                                        `}
                                    >
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            className="h-4 w-4 cursor-pointer accent-teal-500"
                                            checked={
                                                input.role === "student"
                                            }
                                            onChange={changeEventHandler}
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
                                                    : "border-slate-700 bg-slate-950 hover:border-slate-600"
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

                            {/* Login Button */}
                            {loading ? (
                                <Button
                                    type="button"
                                    disabled
                                    className="
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
                                    Login
                                    <LogIn className="ml-2 h-4 w-4" />
                                </Button>
                            )}

                            {/* Signup */}
                            <p className="mt-6 text-center text-sm text-slate-500">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-semibold text-teal-400 transition-colors hover:text-teal-300 hover:underline"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>

                    {/* Bottom text */}
                    <p className="mt-5 text-center text-xs text-slate-600">
                        Your career. Your opportunities. Your next step.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;