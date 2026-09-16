import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
    User2,
    History,
    LogOut,
    Menu,
    X,
    BriefcaseBusiness,
    LayoutDashboard,
    Bookmark,
    Sparkles,
    ArrowRight
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const logoutHandler = async () => {
        try {
            const res = await axios.get(
                `${USER_API_END_POINT}/logout`,
                { withCredentials: true }
            )

            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
                setIsMenuOpen(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || "Something went wrong"
            )
        }
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center gap-3"
                >

                    <div className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        text-teal-400
                        shadow-lg
                    ">
                        <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <div className="hidden sm:block">

                        <h1 className="
                            text-xl
                            sm:text-2xl
                            font-extrabold
                            tracking-tight
                            text-white
                        ">
                            Career<span className="text-teal-400">Bridge</span>
                        </h1>

                        <p className="
                            text-[9px]
                            sm:text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-slate-500
                        ">
                            Opportunities. Growth. Careers.
                        </p>

                    </div>

                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-7">

                    <nav>

                        <ul className="flex items-center gap-6">

                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/admin/dashboard"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/admin/companies"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Companies
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/admin/jobs"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/browse"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Home
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/jobs"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/browse"
                                                className="
                                                    font-bold
                                                    text-slate-300
                                                    transition-colors
                                                    hover:text-teal-400
                                                "
                                            >
                                                Browse
                                            </Link>
                                        </li>

                                        {
                                            user && (
                                                <>
                                                    <li>
                                                        <Link
                                                            to="/saved-jobs"
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                font-bold
                                                                text-slate-300
                                                                transition-colors
                                                                hover:text-teal-400
                                                            "
                                                        >
                                                            <Bookmark className="h-4 w-4" />
                                                            Saved Jobs
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link
                                                            to="/ai-interview"
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-2
                                                                font-bold
                                                                text-slate-300
                                                                transition-colors
                                                                hover:text-teal-400
                                                            "
                                                        >
                                                            <Sparkles className="h-4 w-4" />
                                                            AI Interview
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                        </ul>

                    </nav>

                    {/* Login / Signup / Profile */}
                    {
                        !user ? (
                            <div className="flex items-center gap-3">

                                <Link to="/login">
                                    <Button
                                        variant="outline"
                                        className="
                                            rounded-lg
                                            border-slate-700
                                            bg-transparent
                                            px-5
                                            font-bold
                                            text-slate-200
                                            hover:border-teal-500
                                            hover:bg-slate-900
                                            hover:text-teal-400
                                        "
                                    >
                                        Login
                                    </Button>
                                </Link>

                                <Link to="/signup">
                                    <Button
                                        className="
                                            rounded-lg
                                            bg-teal-500
                                            px-5
                                            font-bold
                                            text-slate-950
                                            hover:bg-teal-400
                                        "
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>

                            </div>
                        ) : (
                            <Popover>

                                <PopoverTrigger asChild>

                                    <button
                                        className="
                                            rounded-full
                                            border-2
                                            border-slate-700
                                            p-0.5
                                            transition-all
                                            hover:border-teal-400
                                        "
                                    >
                                        <Avatar className="h-10 w-10 cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                            />
                                        </Avatar>
                                    </button>

                                </PopoverTrigger>

                                <PopoverContent
                                    align="end"
                                    className="
                                        w-80
                                        border-slate-700
                                        bg-slate-900
                                        text-white
                                        shadow-2xl
                                    "
                                >

                                    <div className="flex gap-4">

                                        <Avatar className="h-12 w-12 shrink-0 border border-slate-700">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                            />
                                        </Avatar>

                                        <div className="min-w-0">

                                            <h3 className="font-bold text-white">
                                                {user?.fullname}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-400 break-words">
                                                {user?.profile?.bio}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="my-4 h-px bg-slate-800"></div>

                                    <div className="flex flex-col gap-1">

                                        {
                                            user?.role === 'recruiter' && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-lg
                                                        px-3
                                                        py-2.5
                                                        font-semibold
                                                        text-slate-300
                                                        hover:bg-slate-800
                                                        hover:text-teal-400
                                                    "
                                                >
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </Link>
                                            )
                                        }

                                        {
                                            user?.role === 'student' && (
                                                <>
                                                    <Link
                                                        to="/profile"
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            font-semibold
                                                            text-slate-300
                                                            hover:bg-slate-800
                                                            hover:text-teal-400
                                                        "
                                                    >
                                                        <User2 className="h-4 w-4" />
                                                        View Profile
                                                    </Link>

                                                    <Link
                                                        to="/interview-history"
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            font-semibold
                                                            text-slate-300
                                                            hover:bg-slate-800
                                                            hover:text-teal-400
                                                        "
                                                    >
                                                        <History className="h-4 w-4" />
                                                        Interview History
                                                    </Link>
                                                </>
                                            )
                                        }

                                        <button
                                            onClick={logoutHandler}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-lg
                                                px-3
                                                py-2.5
                                                font-semibold
                                                text-slate-300
                                                hover:bg-slate-800
                                                hover:text-red-400
                                            "
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </button>

                                    </div>

                                </PopoverContent>

                            </Popover>
                        )
                    }

                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="
                            border-slate-700
                            bg-slate-900
                            text-white
                            hover:bg-slate-800
                            hover:text-teal-400
                        "
                    >
                        {
                            isMenuOpen
                                ? <X size={22} />
                                : <Menu size={22} />
                        }
                    </Button>

                </div>

            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="
                        md:hidden
                        border-t
                        border-slate-800
                        bg-slate-950
                        px-4
                        py-5
                    ">

                        <ul className="flex flex-col gap-1 font-bold">

                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li>
                                            <Link
                                                to="/admin/dashboard"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/admin/companies"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Companies
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/admin/jobs"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/browse"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Browse
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                to="/"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Home
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/jobs"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Jobs
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                to="/browse"
                                                onClick={closeMenu}
                                                className="
                                                    block
                                                    rounded-lg
                                                    px-3
                                                    py-3
                                                    text-slate-300
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Browse
                                            </Link>
                                        </li>

                                        {
                                            user && (
                                                <>
                                                    <li>
                                                        <Link
                                                            to="/saved-jobs"
                                                            onClick={closeMenu}
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-3
                                                                text-slate-300
                                                                hover:bg-slate-900
                                                                hover:text-teal-400
                                                            "
                                                        >
                                                            <Bookmark className="h-4 w-4" />
                                                            Saved Jobs
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link
                                                            to="/ai-interview"
                                                            onClick={closeMenu}
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                                rounded-lg
                                                                px-3
                                                                py-3
                                                                text-slate-300
                                                                hover:bg-slate-900
                                                                hover:text-teal-400
                                                            "
                                                        >
                                                            <Sparkles className="h-4 w-4" />
                                                            AI Interview
                                                        </Link>
                                                    </li>
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                !user && (
                                    <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-4">

                                        <Link
                                            to="/login"
                                            onClick={closeMenu}
                                        >
                                            <Button
                                                variant="outline"
                                                className="
                                                    w-full
                                                    border-slate-700
                                                    bg-transparent
                                                    font-bold
                                                    text-slate-200
                                                    hover:bg-slate-900
                                                    hover:text-teal-400
                                                "
                                            >
                                                Login
                                            </Button>
                                        </Link>

                                        <Link
                                            to="/signup"
                                            onClick={closeMenu}
                                        >
                                            <Button
                                                className="
                                                    w-full
                                                    bg-teal-500
                                                    font-bold
                                                    text-slate-950
                                                    hover:bg-teal-400
                                                "
                                            >
                                                Get Started
                                            </Button>
                                        </Link>

                                    </div>
                                )
                            }

                            {
                                user && (
                                    <div className="mt-3 flex flex-col gap-1 border-t border-slate-800 pt-4">

                                        {
                                            user.role === 'student' && (
                                                <Link
                                                    to="/profile"
                                                    onClick={closeMenu}
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        rounded-lg
                                                        px-3
                                                        py-3
                                                        text-slate-300
                                                        hover:bg-slate-900
                                                        hover:text-teal-400
                                                    "
                                                >
                                                    <User2 size={19} />
                                                    View Profile
                                                </Link>
                                            )
                                        }

                                        <button
                                            onClick={logoutHandler}
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                rounded-lg
                                                px-3
                                                py-3
                                                text-slate-300
                                                hover:bg-slate-900
                                                hover:text-red-400
                                            "
                                        >
                                            <LogOut size={19} />
                                            Logout
                                        </button>

                                    </div>
                                )
                            }

                        </ul>

                    </div>
                )
            }

        </header>
    )
}

export default Navbar