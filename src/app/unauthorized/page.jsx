import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen w-full bg-[#E3F2FD] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(21,101,192,0.12)] text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1565C0] to-[#2196F3] flex items-center justify-center text-white shadow-md shadow-[#1565C0]/20">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#2196F3] uppercase">
            Error 401
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Authentication Required
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            You need to be signed in to access this page. Please log in to your
            account to continue.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/auth/login"
            className="flex-1 py-3 px-4 bg-gradient-to-r from-[#1565C0] to-[#2196F3] hover:from-[#0D47A1] hover:to-[#1976D2] text-white text-sm font-bold rounded-xl shadow-sm transition-all text-center"
          >
            Log In
          </Link>
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
