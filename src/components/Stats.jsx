"use client";

import React from "react";
import { motion } from "framer-motion";

// The statistics data
const statsData = [
  {
    id: 1,
    value: "2M+",
    label: "Happy Travelers",
    description: "Trusted by millions across the country.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    value: "500+",
    label: "Transport Partners",
    description: "Top-rated bus, train, and flight operators.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    id: 3,
    value: "10M+",
    label: "Tickets Booked",
    description: "Successfully processed through our platform.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    value: "150+",
    label: "Destinations",
    description: "Connecting cities, towns, and districts.",
    icon: (
      <svg
        className="w-8 h-8"
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
    ),
  },
];

export default function Stats() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 bg-[#E3F2FD] relative overflow-hidden font-sans">
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] right-[10%] w-[30%] h-[50%] bg-[#90CAF9]/40 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] bg-[#2196F3]/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#90CAF9]/30 border border-[#90CAF9]/40 shadow-sm mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#2196F3] animate-pulse" />
            <span className="text-xs font-extrabold text-[#1565C0] tracking-wider uppercase">
              Our Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-[#1565C0] tracking-tight"
          >
            Trusted by the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2196F3] to-[#1565C0]">
              Nation
            </span>
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              className="bg-white/80 backdrop-blur-xl border border-[#90CAF9]/40 rounded-3xl p-8 text-center shadow-[0_8px_30px_-12px_rgba(21,101,192,0.15)] hover:shadow-[0_15px_40px_-12px_rgba(21,101,192,0.25)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[#E3F2FD] border border-[#90CAF9]/50 flex items-center justify-center text-[#2196F3] mb-6 group-hover:scale-110 group-hover:bg-[#2196F3] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>

              {/* Stat Value */}
              <h3 className="text-4xl font-black text-[#1565C0] mb-2 drop-shadow-sm">
                {stat.value}
              </h3>

              {/* Label */}
              <h4 className="text-lg font-bold text-[#2196F3] mb-2 uppercase tracking-wide">
                {stat.label}
              </h4>

              {/* Description */}
              <p className="text-sm font-medium text-[#1565C0]/70 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
