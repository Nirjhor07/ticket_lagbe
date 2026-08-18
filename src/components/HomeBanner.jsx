"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

// High-quality placeholder images for Bus, Train, and Plane
const carouselImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop",
    title: "Bus Journeys",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1200&auto=format&fit=crop",
    title: "Railway Express",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    title: "Air Travel",
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  // --- Animation Variants for Right Side Carousel ---
  const slideVariants = {
    hidden: (dir) => ({ opacity: 0, x: dir > 0 ? 100 : -100, scale: 0.95 }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -100 : 100,
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" },
    }),
  };

  // --- Animation Variants for Left Side Text (Staggered) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each element animating in
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full min-h-[50vh] bg-[#E3F2FD] flex items-center justify-center overflow-hidden font-sans py-12 ">
      {/* --- Ambient Background Glows --- */}
      <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-[#90CAF9]/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[60%] bg-[#2196F3]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* --- Left Side: Modern Typography & CTA --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left z-20"
        >
          {/* Modern SaaS-style Pill Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#90CAF9]/30 border border-[#90CAF9]/50 w-max mx-auto lg:mx-0 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#2196F3] animate-pulse" />
            <span className="text-sm font-bold text-[#1565C0] tracking-wide uppercase">
              Ticket Lagbe Platform
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-extrabold text-[#1565C0] tracking-tight leading-[1.15]"
          >
            Your Next <br />
            {/* Shimmering Gradient Text Animation */}
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#1565C0] via-[#64B5F6] to-[#1565C0] bg-[length:200%_auto] drop-shadow-sm inline-block"
            >
              Adventure,
            </motion.span>
            <br />
            Simplified.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-[#1565C0]/80 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed"
          >
            Experience the gravity of seamless travel. Find flights, trains, and
            buses all within a single, smooth journey designed for modern
            explorers.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-2 justify-center lg:justify-start"
          >
            <Button
              size="lg"
              className="bg-[#1565C0] text-white font-bold shadow-[0_8px_25px_-8px_rgba(21,101,192,0.5)] hover:bg-[#0D47A1] transition-all duration-300 hover:-translate-y-1 rounded-xl px-8"
            >
              Start Exploring
            </Button>
            <Button
              size="lg"
              variant="bordered"
              className="text-[#1565C0] border-[#1565C0]/30 hover:bg-[#90CAF9]/30 font-bold transition-all duration-300 rounded-xl px-8"
            >
              View Offers
            </Button>
          </motion.div>
        </motion.div>

        {/* --- Right Side: Image Carousel --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full lg:w-1/2 relative flex items-center justify-center z-10"
        >
          {/* Slider Container */}
          <div className="relative w-full max-w-[550px] aspect-[4/3] group rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(21,101,192,0.25)] bg-[#90CAF9]/20">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  src={carouselImages[currentIndex].src}
                  alt={carouselImages[currentIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient Overlay for better text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Image Title */}
              <div className="absolute bottom-6 left-8">
                <motion.p
                  key={`title-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-2xl font-bold tracking-wide drop-shadow-lg"
                >
                  {carouselImages[currentIndex].title}
                </motion.p>
              </div>
            </div>

            {/* Prev Navigation Button */}
            <button
              onClick={handlePrev}
              className="absolute left-[-20px] lg:left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#2196F3] hover:text-white transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
              aria-label="Previous image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 ml-[-2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={handleNext}
              className="absolute right-[-20px] lg:right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-[#2196F3] hover:text-white transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
              aria-label="Next image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 mr-[-2px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Dots Indicators */}
            <div className="absolute bottom-6 right-8 flex gap-2 z-20">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
