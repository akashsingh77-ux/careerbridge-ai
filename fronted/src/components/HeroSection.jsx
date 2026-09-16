import { Search, ArrowRight, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 py-16 sm:py-20 lg:py-24">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl text-center">

        {/* Small badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm">
          <Sparkles size={15} className="text-teal-400" />
          Find opportunities that move you forward
        </div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your next opportunity
          <br />
          <span className="text-teal-400">
            starts here.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base md:text-lg">
          Discover meaningful jobs, connect with growing companies, and take
          the next confident step in your career.
        </p>

        {/* Search */}
        <div className="mx-auto mt-9 flex w-full max-w-2xl items-center rounded-xl border border-slate-700 bg-white p-1.5 shadow-2xl shadow-black/20 sm:rounded-2xl sm:p-2">

          <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:px-4">
            <Search
              size={20}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by job title, skill or keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchJobHandler();
                }
              }}
              className="w-full min-w-0 border-none bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 sm:text-base"
            />
          </div>

          <Button
            onClick={searchJobHandler}
            className="h-11 shrink-0 rounded-lg bg-slate-900 px-4 text-white hover:bg-teal-700 sm:h-12 sm:rounded-xl sm:px-6"
          >
            <span className="hidden sm:inline">
              Search Jobs
            </span>

            <span className="sm:hidden">
              <Search size={19} />
            </span>

            <ArrowRight
              size={17}
              className="ml-2 hidden sm:block"
            />
          </Button>

        </div>

        {/* Supporting text */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 sm:text-sm">
          <span>Explore new opportunities</span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />

          <span>Build your career</span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />

          <span>Find your fit</span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;