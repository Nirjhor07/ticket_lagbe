"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    if (error) {
      console.error("App boundary caught an error:", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen w-full bg-[#E3F2FD] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(21,101,192,0.12)] text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">
            Error 500
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Something Went Wrong
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            An unexpected server error occurred while processing your request.
            Please try again or head back home.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {reset && (
            <button
              onClick={() => reset()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[#1565C0] to-[#2196F3] hover:from-[#0D47A1] hover:to-[#1976D2] text-white text-sm font-bold rounded-xl shadow-sm transition-all"
            >
              Try Again
            </button>
          )}
          <Link
            href="/"
            className="flex-1 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold rounded-xl border border-gray-200 transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
