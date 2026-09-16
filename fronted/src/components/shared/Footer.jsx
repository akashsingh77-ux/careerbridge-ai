import React from "react";
import {
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Bookmark,
  Sparkles,
  Search,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Footer = () => {
  const recruiterOnlyMessage = () => {
    toast.info(
      "This section is available only for recruiters. Please log in or sign up as a recruiter to continue."
    );
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:pr-8">

            <Link
              to="/"
              className="group inline-flex items-center gap-3"
            >

              <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-slate-700
                bg-slate-900
                text-teal-400
                shadow-lg
                transition-all
                duration-300
                group-hover:border-teal-500
                group-hover:bg-teal-500
                group-hover:text-slate-950
              ">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div>
                <h2 className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-white
                ">
                  Career<span className="text-teal-400">Bridge</span>
                </h2>

                <p className="
                  mt-0.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                ">
                  Opportunities. Growth. Careers.
                </p>
              </div>

            </Link>

            <p className="
              mt-6
              max-w-sm
              text-sm
              leading-7
              text-slate-400
            ">
              Discover meaningful opportunities, connect with growing
              companies, and take the next confident step in your career.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition-all
                  duration-300
                  hover:border-teal-500
                  hover:bg-teal-500
                  hover:text-slate-950
                "
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition-all
                  duration-300
                  hover:border-teal-500
                  hover:bg-teal-500
                  hover:text-slate-950
                "
              >
                <FaTwitter className="h-4 w-4" />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition-all
                  duration-300
                  hover:border-teal-500
                  hover:bg-teal-500
                  hover:text-slate-950
                "
              >
                <FaInstagram className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-800
                  bg-slate-900
                  text-slate-400
                  transition-all
                  duration-300
                  hover:border-teal-500
                  hover:bg-teal-500
                  hover:text-slate-950
                "
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>

            </div>

          </div>

          {/* Job Seekers */}
          <div>

            <h3 className="
              mb-5
              text-base
              font-extrabold
              uppercase
              tracking-wider
              text-white
            ">
              Job Seekers
            </h3>

            <ul className="space-y-4 text-sm">

              <li>
                <Link
                  to="/jobs"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <Search className="h-4 w-4" />
                  Browse Jobs
                  <ArrowUpRight className="
                    h-3.5
                    w-3.5
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  " />
                </Link>
              </li>

              <li>
                <Link
                  to="/browse"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  Explore Opportunities
                  <ArrowUpRight className="
                    h-3.5
                    w-3.5
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  " />
                </Link>
              </li>

              <li>
                <Link
                  to="/saved-jobs"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <Bookmark className="h-4 w-4" />
                  Saved Jobs
                  <ArrowUpRight className="
                    h-3.5
                    w-3.5
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  " />
                </Link>
              </li>

              <li>
                <Link
                  to="/ai-interview"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <Sparkles className="h-4 w-4" />
                  AI Interview
                  <ArrowUpRight className="
                    h-3.5
                    w-3.5
                    opacity-0
                    transition-all
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    group-hover:opacity-100
                  " />
                </Link>
              </li>

            </ul>

          </div>

          {/* Employers */}
          <div>
            <h3
              className="
                mb-5
                text-base
                font-extrabold
                uppercase
                tracking-wider
                text-white
              "
            >
              Employers
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <button
                  type="button"
                  onClick={recruiterOnlyMessage}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  Add New Company
                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={recruiterOnlyMessage}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <Search className="h-4 w-4" />
                  Manage Job Posts
                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={recruiterOnlyMessage}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <Sparkles className="h-4 w-4" />
                  Join CareerBridge
                  <ArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      opacity-0
                      transition-all
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                      group-hover:opacity-100
                    "
                  />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="
              mb-5
              text-base
              font-extrabold
              uppercase
              tracking-wider
              text-white
            ">
              Contact
            </h3>

            <ul className="space-y-5 text-sm">

              <li>
                <a
                  href="mailto:support@jobhunt.com"
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-800
                    bg-slate-900
                    text-teal-400
                  ">
                    <Mail className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <span className="break-all">
                      support@jobhunt.com
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="tel:+919876543210"
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-800
                    bg-slate-900
                    text-teal-400
                  ">
                    <Phone className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Phone
                    </p>
                    <span>
                      +91 98765 43210
                    </span>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Mumbai%2C%20Maharashtra%2C%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group
                    flex
                    items-start
                    gap-3
                    font-semibold
                    text-slate-400
                    transition-colors
                    hover:text-teal-400
                  "
                >
                  <div className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-800
                    bg-slate-900
                    text-teal-400
                  ">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <span>
                      Mumbai, Maharashtra, India
                    </span>
                  </div>
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* Bottom Section */}
        <div
          className="
            mt-12
            border-t
            border-slate-800
            pt-7
          "
        >
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-slate-500">
              © 2026 CareerBridge. All rights reserved.
            </p>

            <p className="mt-2 text-sm font-bold text-slate-400">
              Built with{" "}
              <span className="text-teal-400">♥</span>{" "}
              by{" "}
              <span className="text-white">
                AKASH SINGH
              </span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;