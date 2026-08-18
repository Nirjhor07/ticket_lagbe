"use client";

import React from "react";
import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] font-sans pt-24 pb-16 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] bg-[#90CAF9]/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-[#2196F3]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#90CAF9]/30 border border-[#90CAF9]/50 shadow-sm mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#2196F3]" />
            <span className="text-sm font-bold text-[#1565C0] tracking-wide uppercase">
              Our Story
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-[#1565C0] tracking-tight mb-6"
          >
            Redefining Travel in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] via-[#2196F3] to-[#90CAF9]">
              Bangladesh & Beyond
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[#1565C0]/80 leading-relaxed font-medium mb-16 max-w-2xl mx-auto"
          >
            Ticket Lagbe? our mission is simple: to make booking your next bus,
            train, launch, or flight as effortless as the journey itself. We
            combine modern technology with user-centric design to bring all your
            travel needs into one seamless platform.
          </motion.p>

          {/* Feature Cards Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
          >
            {/* Feature 1 */}
            <motion.div
              variants={itemVariants}
              className="bg-white/40 backdrop-blur-xl border border-[#90CAF9]/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2196F3]/10 flex items-center justify-center text-[#2196F3] mb-6">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1565C0] mb-3">
                Lightning Fast
              </h3>
              <p className="text-[#1565C0]/75 font-medium leading-relaxed">
                Search, compare, and book tickets in seconds. Our highly
                optimized engine ensures you never miss out on a seat.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={itemVariants}
              className="bg-white/40 backdrop-blur-xl border border-[#90CAF9]/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2196F3]/10 flex items-center justify-center text-[#2196F3] mb-6">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1565C0] mb-3">
                100% Secure
              </h3>
              <p className="text-[#1565C0]/75 font-medium leading-relaxed">
                Your data and payments are protected by industry-leading
                encryption. Travel with complete peace of mind.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={itemVariants}
              className="bg-white/40 backdrop-blur-xl border border-[#90CAF9]/50 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2196F3]/10 flex items-center justify-center text-[#2196F3] mb-6">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#1565C0] mb-3">
                All-in-One
              </h3>
              <p className="text-[#1565C0]/75 font-medium leading-relaxed">
                No need to jump between apps. Bus, train, launch, or flight—we
                connect you to every corner of the country.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
