import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
    Loader2,
    User,
    Mail,
    Phone,
    FileText,
    Code2
} from "lucide-react";
import { Button } from "./ui/button";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map((skill) => skill) || "",
        file: user?.profile?.resume || "",
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];

        setInput({
            ...input,
            file,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                className="
                    careerbridge-dialog-scroll
                    w-[95%]
                    max-w-[520px]
                    max-h-[90vh]
                    overflow-x-hidden
                    overflow-y-auto
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-950
                    p-0
                    text-white
                    shadow-2xl
                    shadow-black/40
                    sm:max-w-[520px]
                "
            >
                <style>
                    {`
                        .careerbridge-dialog-scroll::-webkit-scrollbar {
                            width: 0px;
                            height: 0px;
                        }

                        .careerbridge-dialog-scroll {
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                        }
                    `}
                </style>

                <DialogHeader className="border-b border-slate-800 px-5 py-5 sm:px-7">
                    <DialogTitle className="text-xl font-bold tracking-tight text-white">
                        Update Profile
                    </DialogTitle>

                    <p className="mt-1 text-sm text-slate-500">
                        Keep your professional information up to date.
                    </p>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-5 px-5 py-6 sm:px-7">

                        {/* Name */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="fullname"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <User className="h-4 w-4 text-teal-400" />
                                Name
                            </Label>

                            <Input
                                id="fullname"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="
                                    h-11
                                    border-slate-700
                                    bg-slate-900
                                    text-white
                                    placeholder:text-slate-600
                                    focus:border-teal-500
                                    focus:ring-teal-500/20
                                "
                            />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="email"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <Mail className="h-4 w-4 text-teal-400" />
                                Email
                            </Label>

                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="
                                    h-11
                                    border-slate-700
                                    bg-slate-900
                                    text-white
                                    placeholder:text-slate-600
                                    focus:border-teal-500
                                    focus:ring-teal-500/20
                                "
                            />
                        </div>

                        {/* Phone */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="phoneNumber"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <Phone className="h-4 w-4 text-teal-400" />
                                Number
                            </Label>

                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="
                                    h-11
                                    border-slate-700
                                    bg-slate-900
                                    text-white
                                    placeholder:text-slate-600
                                    focus:border-teal-500
                                    focus:ring-teal-500/20
                                "
                            />
                        </div>

                        {/* Bio */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="bio"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <FileText className="h-4 w-4 text-teal-400" />
                                Bio
                            </Label>

                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="
                                    h-11
                                    border-slate-700
                                    bg-slate-900
                                    text-white
                                    placeholder:text-slate-600
                                    focus:border-teal-500
                                    focus:ring-teal-500/20
                                "
                            />
                        </div>

                        {/* Skills */}
                        <div className="grid gap-2">
                            <Label
                                htmlFor="skills"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <Code2 className="h-4 w-4 text-teal-400" />
                                Skills
                            </Label>

                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="C++, React, Node.js"
                                className="
                                    h-11
                                    border-slate-700
                                    bg-slate-900
                                    text-white
                                    placeholder:text-slate-600
                                    focus:border-teal-500
                                    focus:ring-teal-500/20
                                "
                            />
                        </div>

                        {/* Resume */}
                        <div className="grid gap-2 min-w-0">
                            <Label
                                htmlFor="file"
                                className="flex items-center gap-2 text-sm font-semibold text-slate-300"
                            >
                                <FileText className="h-4 w-4 text-teal-400" />
                                Resume
                            </Label>

                            <div className="min-w-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="
                                        h-11
                                        w-full
                                        min-w-0
                                        cursor-pointer
                                        border-0
                                        bg-transparent
                                        p-0
                                        text-sm
                                        text-slate-400
                                        file:mr-3
                                        file:h-11
                                        file:border-0
                                        file:bg-slate-800
                                        file:px-3
                                        file:text-sm
                                        file:font-medium
                                        file:text-slate-200
                                        hover:file:bg-slate-700
                                    "
                                />
                            </div>
                        </div>

                    </div>

                    <DialogFooter
                        className="
                            mx-0
                            mb-0
                            border-t
                            border-slate-800
                            bg-slate-950
                            px-5
                            py-4
                            sm:px-7
                        "
                    >
                        {loading ? (
                            <Button
                                type="button"
                                disabled
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    bg-teal-600
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
                                    font-semibold
                                    text-white
                                    hover:bg-teal-500
                                "
                            >
                                Update Profile
                            </Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;