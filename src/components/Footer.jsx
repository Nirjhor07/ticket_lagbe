"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#1565C0] pt-16 pb-8 overflow-hidden font-sans border-t border-[#2196F3]/30">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50px] bg-[#2196F3]/40 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30%] h-[150px] bg-[#90CAF9]/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* --- Top Section: 4 Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none w-max"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E3F2FD] to-[#90CAF9] shadow-lg shadow-[#E3F2FD]/10 transition-transform duration-300 group-hover:scale-105">
                {/* Transport Icon */}
                <svg
                  className="w-5 h-5 text-[#1565C0]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-[#E3F2FD] tracking-wider uppercase drop-shadow-sm">
                Ticket<span className="text-[#90CAF9]">Bari</span>
              </h1>
            </Link>
            <p className="text-sm text-[#E3F2FD]/80 leading-relaxed font-medium max-w-xs">
              Book bus, train, launch & flight tickets easily. Your seamless
              travel experience starts right here.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#90CAF9] uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Home", "All Tickets", "About", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm font-medium text-[#E3F2FD]/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#90CAF9] uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="flex flex-col gap-3">
              {/* Email */}
              <li>
                <a
                  href="mailto:info@ticketlagbe.com"
                  className="flex items-center gap-3 text-sm font-medium text-[#E3F2FD]/80 hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2196F3]/20 text-[#90CAF9] group-hover:bg-[#2196F3]/40 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  info@ticketlagbe.com
                </a>
              </li>
              {/* Phone */}
              <li>
                <a
                  href="+880 1850052605"
                  className="flex items-center gap-3 text-sm font-medium text-[#E3F2FD]/80 hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2196F3]/20 text-[#90CAF9] group-hover:bg-[#2196F3]/40 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                  +880 1850052605
                </a>
              </li>
              {/* Facebook */}
              <li>
                <a
                  href="https://www.facebook.com/share/18yu5DVHkF/"
                  className="flex items-center gap-3 text-sm font-medium text-[#E3F2FD]/80 hover:text-white transition-colors group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2196F3]/20 text-[#90CAF9] group-hover:bg-[#2196F3]/40 transition-colors">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  Ticket Lagbe
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#90CAF9] uppercase tracking-wider">
              Payment Methods
            </h3>
            <p className="text-sm text-[#E3F2FD]/80 mb-2">Securely book with</p>
            <div className="flex flex-wrap gap-3">
              {/* Stripe Icon */}
              <div className="px-3 py-1.5 bg-white rounded-md shadow-sm flex items-center justify-center">
                <svg viewBox="0 0 60 25" className="h-5" fill="#635BFF">
                  <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.6-.87-2.58-2.08-2.58zM43.7 20.3V5.59h-4.22v14.71h4.22zM33.8 13.06c0-2.5 1.29-3.79 3.26-3.79 1.14 0 1.96.34 2.56.7l.64-3.55a6.45 6.45 0 0 0-3-.63c-3.75 0-7.39 2.22-7.39 7.7 0 4.63 2.76 6.81 6.55 6.81 1.48 0 2.82-.47 3.73-.97l-.67-3.41c-.96.48-1.92.74-2.85.74-1.99 0-2.83-1.28-2.83-3.6zM22.51 13.58c0-.98.79-1.61 2.2-1.61 1.09 0 2.2.33 3.01.78l.68-3.41a7.1 7.1 0 0 0-3.87-1.03c-3.64 0-6.33 1.91-6.33 5.37 0 5.09 7.03 4.14 7.03 6.64 0 1.16-.96 1.76-2.58 1.76-1.57 0-2.9-.5-3.87-1.12l-.76 3.48c1.07.6 2.66 1 4.3 1 3.99 0 6.87-1.94 6.87-5.5 0-5.32-6.68-4.27-6.68-6.36zM10.95 5.59v3.42l-2.03-.4v-2.3L4.69 7.37v12.93H.47v-15l8.45-2.22 2.03 2.51zm0 4.1v10.61h-4.23V9.69h4.23z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar: Copyright --- */}
        <div className="mt-8 pt-8 border-t border-[#90CAF9]/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#E3F2FD]/60 text-center md:text-left">
            © 2025 Ticket Lagbe. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm font-medium text-[#E3F2FD]/60">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
