"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] font-sans pt-24 pb-20 relative overflow-hidden flex items-center">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-[#90CAF9]/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-[#2196F3]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* --- Left Column: Header & Contact Info --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[45%] flex flex-col pt-4"
          >
            {/* Header Section */}
            <motion.div variants={itemLeft} className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#90CAF9]/30 border border-[#90CAF9]/40 shadow-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#2196F3]" />
                <span className="text-xs font-extrabold text-[#1565C0] tracking-wider uppercase">
                  Support
                </span>
              </div>

              <h1 className="text-5xl lg:text-[3.5rem] font-extrabold text-[#1565C0] tracking-tight mb-6 leading-tight">
                Get in Touch
              </h1>

              <p className="text-lg text-[#1565C0]/80 font-medium leading-relaxed max-w-md">
                Have a question about your booking or need help planning your
                trip? Our team is here to help 24/7.
              </p>
            </motion.div>

            {/* Contact Details List */}
            <div className="flex flex-col gap-8">
              {/* Email */}
              <motion.div
                variants={itemLeft}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2196F3] shrink-0 border border-[#90CAF9]/30 transition-transform hover:scale-105">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1565C0] mb-0.5">
                    Email Us
                  </h4>
                  <a
                    href="mailto:info@ticketlagbe.com"
                    className="text-[#1565C0]/75 font-medium hover:text-[#2196F3] transition-colors"
                  >
                    info@ticketlagbe.com
                  </a>
                </div>
              </motion.div>

              {/* Call Us */}
              <motion.div
                variants={itemLeft}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2196F3] shrink-0 border border-[#90CAF9]/30 transition-transform hover:scale-105">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1565C0] mb-0.5">
                    Call Us
                  </h4>
                  <a
                    href="+880 1850052605"
                    className="text-[#1565C0]/75 font-medium hover:text-[#2196F3] transition-colors"
                  >
                    +880 1850052605
                  </a>
                </div>
              </motion.div>

              {/* Office Location */}
              <motion.div
                variants={itemLeft}
                className="flex items-center gap-5"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#2196F3] shrink-0 border border-[#90CAF9]/30 transition-transform hover:scale-105">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1565C0] mb-0.5">
                    Office Location
                  </h4>
                  <p className="text-[#1565C0]/75 font-medium leading-relaxed">
                    571/C,3rd floor, khilgaon, Dhaka-1219, Bangladesh
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* --- Right Column: Clean Form Card --- */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemRight}
            className="w-full lg:w-[55%]"
          >
            <form className="bg-white/90 backdrop-blur-md border border-[#90CAF9]/40 rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(21,101,192,0.1)] flex flex-col gap-7">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-extrabold text-[#1565C0]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#90CAF9]/60 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/30 focus:border-[#2196F3] text-[#1565C0] font-medium placeholder:text-[#90CAF9] transition-all shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-sm font-extrabold text-[#1565C0]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#90CAF9]/60 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/30 focus:border-[#2196F3] text-[#1565C0] font-medium placeholder:text-[#90CAF9] transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-extrabold text-[#1565C0]">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-[#90CAF9]/60 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/30 focus:border-[#2196F3] text-[#1565C0] font-medium placeholder:text-[#90CAF9] transition-all shadow-sm"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2.5">
                <label className="text-sm font-extrabold text-[#1565C0]">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-[#90CAF9]/60 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/30 focus:border-[#2196F3] text-[#1565C0] font-medium placeholder:text-[#90CAF9] transition-all resize-none shadow-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="w-max bg-[#1565C0] text-white font-bold shadow-[0_8px_20px_-6px_rgba(21,101,192,0.5)] hover:bg-[#0D47A1] hover:shadow-[0_10px_25px_-6px_rgba(21,101,192,0.6)] transition-all duration-300 hover:-translate-y-1 rounded-xl px-10 py-3.5 mt-2"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
