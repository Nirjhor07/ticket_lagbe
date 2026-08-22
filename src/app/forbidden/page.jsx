import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen w-full bg-[#E3F2FD] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(21,101,192,0.12)] text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
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
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">
            Error 403
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Access Forbidden
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            You don’t have permission to access this resource or dashboard.
            Contact your administrator if you believe this is a mistake.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block w-full py-3 px-4 bg-gradient-to-r from-[#1565C0] to-[#2196F3] hover:from-[#0D47A1] hover:to-[#1976D2] text-white text-sm font-bold rounded-xl shadow-sm transition-all"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
