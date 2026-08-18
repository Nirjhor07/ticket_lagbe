"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Lightning Fast Booking",
    description:
      "Search, compare, and book your tickets in just a few clicks. Our optimized engine saves you valuable time.",
    icon: (
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    bgColor: "bg-[#90CAF9]/30",
    iconColor: "text-[#2196F3]",
  },
  {
    id: 2,
    title: "100% Secure Payments",
    description:
      "Your transactions are protected by industry-leading encryption. We ensure your data and money are always safe.",
    icon: (
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    bgColor: "bg-[#2196F3]/20",
    iconColor: "text-[#1565C0]",
  },
  {
    id: 3,
    title: "All Transport Modes",
    description:
      "From luxury buses to express trains and domestic flights, find all your travel options on a single platform.",
    icon: (
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
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    bgColor: "bg-[#1565C0]/10",
    iconColor: "text-[#1565C0]",
  },
  {
    id: 4,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is available around the clock to assist you with cancellations, refunds, or any inquiries.",
    icon: (
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
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    bgColor: "bg-[#E3F2FD]",
    iconColor: "text-[#2196F3]",
  },
];

export default function WhyChooseUs() {
  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-[#E3F2FD] overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-[#1565C0] tracking-tight relative inline-block"
          >
            Why Choose Us?
            {/* Decorative Underline matching the reference */}
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-[#2196F3] rounded-full" />
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          {/* Left Side: Feature Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 flex flex-col gap-5"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                variants={cardVariants}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(21,101,192,0.06)] hover:shadow-[0_8px_30px_rgb(21,101,192,0.12)] transition-shadow duration-300 flex items-start gap-5 border border-[#90CAF9]/20"
              >
                {/* Icon Box */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${feature.bgColor} ${feature.iconColor}`}
                >
                  {feature.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-bold text-[#1565C0] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#1565C0]/70 font-medium leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Image with custom border radius and offset background */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="w-full lg:w-1/2 relative h-[500px] lg:h-[650px] mt-8 lg:mt-0"
          >
            {/* The offset background shape (Blue solid) */}
            <div className="absolute top-6 left-6 w-full h-full rounded-tl-[6rem] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl bg-[#2196F3] shadow-lg" />

            {/* The actual image container */}
            <div className="relative w-full h-full rounded-tl-[6rem] rounded-tr-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden border-4 border-white shadow-2xl z-10 bg-white">
              <img
                src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1000&auto=format&fit=crop"
                alt="Modern High Speed Train"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Optional: Subtle gradient overlay for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1565C0]/30 to-transparent mix-blend-multiply pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
