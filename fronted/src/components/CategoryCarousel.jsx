import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Java Developer",
    "Python Developer",
    "JavaScript Developer",
    "React Developer",
    "Node.js Developer",
    "Software Engineer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning Engineer",
    "AI Engineer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Cybersecurity Engineer",
    "Database Administrator",
    "Mobile App Developer",
    "Android Developer",
    "iOS Developer",
    "UI/UX Designer",
    "Product Manager",
    "QA / Test Engineer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="relative overflow-hidden bg-slate-950 px-4 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24">

            {/* Background glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-teal-500/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">

                {/* Heading */}
                <div className="mb-12 text-center">

                    <div className="mb-5 inline-flex items-center gap-3">

                        <span className="h-2 w-2 rounded-full bg-teal-400" />

                        <p className="text-sm font-bold uppercase tracking-[0.25em] text-teal-400">
                            Explore by role
                        </p>

                        <span className="h-2 w-2 rounded-full bg-teal-400" />

                    </div>

                    <h2 className="
                        text-3xl
                        font-extrabold
                        tracking-tight
                        text-white
                        sm:text-4xl
                        md:text-5xl
                    ">
                        Find your next
                        <span className="text-teal-400">
                            {" "}career move
                        </span>
                    </h2>

                    <p className="
                        mx-auto
                        mt-5
                        max-w-2xl
                        text-sm
                        leading-relaxed
                        text-slate-400
                        sm:text-base
                    ">
                        Explore popular roles and discover opportunities that
                        match your skills, experience, and career goals.
                    </p>

                </div>

                {/* Carousel */}
                <div className="relative px-7 sm:px-10">

                    <Carousel
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >

                        <CarouselContent className="-ml-3">

                            {category.map((cat, index) => (

                                <CarouselItem
                                    key={index}
                                    className="basis-full pl-3 sm:basis-1/2 lg:basis-1/3"
                                >

                                    <button
                                        type="button"
                                        onClick={() => searchJobHandler(cat)}
                                        className="
                                            group
                                            flex
                                            h-14
                                            w-full
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-slate-700
                                            bg-slate-900
                                            px-5
                                            text-sm
                                            font-bold
                                            text-white
                                            shadow-lg
                                            transition-all
                                            duration-200
                                            hover:-translate-y-1
                                            hover:border-teal-500
                                            hover:bg-slate-800
                                            hover:text-teal-300
                                            hover:shadow-teal-500/10
                                            active:scale-[0.98]
                                        "
                                    >

                                        <span className="flex items-center justify-center gap-3">

                                            <span className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-teal-500
                                                transition-transform
                                                duration-200
                                                group-hover:scale-125
                                            " />

                                            <span className="truncate">
                                                {cat}
                                            </span>

                                        </span>

                                    </button>

                                </CarouselItem>

                            ))}

                        </CarouselContent>

                        {/* Previous */}
                        <CarouselPrevious
                            className="
                                left-0
                                h-14
                                w-10
                                rounded-xl
                                border-slate-700
                                bg-slate-900
                                text-white
                                shadow-lg
                                hover:border-teal-500
                                hover:bg-slate-800
                                hover:text-teal-400
                                disabled:opacity-40
                                sm:-left-2
                            "
                        />

                        {/* Next */}
                        <CarouselNext
                            className="
                                right-0
                                h-14
                                w-10
                                rounded-xl
                                border-slate-700
                                bg-slate-900
                                text-white
                                shadow-lg
                                hover:border-teal-500
                                hover:bg-slate-800
                                hover:text-teal-400
                                disabled:opacity-40
                                sm:-right-2
                            "
                        />

                    </Carousel>

                </div>

                {/* Bottom label */}
                <div className="mt-10 flex items-center justify-center gap-4">

                    <span className="h-px w-14 bg-slate-700" />

                    <span className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-slate-500
                    ">
                        Popular career paths
                    </span>

                    <span className="h-px w-14 bg-slate-700" />

                </div>

            </div>

        </section>
    );
};

export default CategoryCarousel;