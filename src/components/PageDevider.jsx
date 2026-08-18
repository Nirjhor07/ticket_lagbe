"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PageDivider() {
  return (
    <div className="w-full py-20 bg-[#E3F2FD] overflow-hidden font-sans">
      <div className="container mx-auto px-12 max-w-4xl">
        {/* --- Main Track Container --- */}
        <div className="relative w-full flex items-center">
          {/* 1. The Base Track (Muted Blue) */}
          <div className="absolute left-0 right-0 h-1.5 bg-[#90CAF9]/50 rounded-full" />

          {/* 2. The Active Glowing Track (Fills as train moves) */}
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            className="absolute left-0 h-1.5 bg-[#2196F3] rounded-full shadow-[0_0_12px_#2196F3]"
          />

          {/* 3. Departure Station (Left Dot) */}
          <div className="absolute left-0 -translate-x-1/2 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="w-5 h-5 rounded-full bg-[#1565C0] border-4 border-[#E3F2FD] shadow-[0_2px_8px_rgba(21,101,192,0.4)] z-10 relative"
            />
            <span className="absolute top-7 text-[11px] font-extrabold text-[#1565C0] uppercase tracking-widest mt-1">
              Departure
            </span>
          </div>

          {/* 4. Arrival Station (Right Dot) */}
          <div className="absolute right-0 translate-x-1/2 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "backOut", delay: 2.5 }} // Pops exactly as train arrives
              className="w-5 h-5 rounded-full bg-[#2196F3] border-4 border-[#E3F2FD] shadow-[0_2px_8px_rgba(33,150,243,0.4)] z-10 relative"
            />
            <span className="absolute top-7 text-[11px] font-extrabold text-[#2196F3] uppercase tracking-widest mt-1">
              Arrival
            </span>
          </div>

          {/* 5. Animated Train */}
          <motion.div
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            // -translate-x-[95%] ensures the front of the train aligns perfectly with the station dot without overlapping it
            // bottom-3 lifts the train so it sits perfectly on top of the track
            className="absolute bottom-3 -translate-x-[95%] z-20"
          >
            {/* Subtle Train Vibration Loop (Simulates riding on tracks) */}
            <motion.div
              animate={{ y: [0, -1.5, 0] }}
              transition={{ repeat: Infinity, duration: 0.2, ease: "linear" }}
            >
              {/* Clean, Modern Locomotive SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 text-[#1565C0] drop-shadow-md"
              >
                <path d="M12 4H4c-1.1 0-2 .9-2 2v10h2c0 1.1.9 2 2 2s2-.9 2-2h6c0 1.1.9 2 2 2s2-.9 2-2h2v-5l-4-7zm-6 3h4v4H6V7zm10 4h-4V7h2.5l1.5 4zm-8 7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
