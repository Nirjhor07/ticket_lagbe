"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Email/Password Sign In Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    // console.log("Sign In Payload:", payload);

    const { data, error } = await authClient.signIn.email({
      email: payload.email,
      password: payload.password,
    });
    if (error) {
      toast.error(error.message || "Failed to sign in. Please try again.");
      setIsLoading(false);
    }
    if (data) {
      toast.success("Sign-in successful!");
      router.push("/");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  // Google Sign In Handler
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "Google sign-in failed. Please try again.",
        );
        setIsLoading(false);
        return;
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[#E3F2FD] overflow-hidden font-sans">
      {/* --- Abstract Background --- */}
      <div className="absolute inset-0 z-0 bg-[#E3F2FD]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#90CAF9]/40 via-[#E3F2FD] to-[#E3F2FD]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#2196F3]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#90CAF9]/30 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* --- Centered Form Container --- */}
      <div className="relative z-10 w-full max-w-[440px]">
        {/* Sleek Glassmorphism Card */}
        <div className="bg-white/60 backdrop-blur-2xl border border-white shadow-[0_8px_32px_rgba(21,101,192,0.15)] rounded-[2.5rem] p-8 sm:p-10">
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group mb-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[#1565C0] to-[#2196F3] shadow-md shadow-[#1565C0]/20 transition-transform duration-300 group-hover:scale-105">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z" />
                </svg>
              </div>
            </Link>
            <h1 className="text-2xl font-black text-[#1565C0] tracking-tight mb-1">
              Ticket<span className="text-[#2196F3]"> Lagbe?</span>
            </h1>
            <p className="text-sm font-medium text-[#1565C0]/70">
              Sign in to access your travels
            </p>
          </div>

          {/* --- Main Sign In Form --- */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input (Nested Glass Style) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1565C0]/50">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="w-full pl-11 pr-4 py-4 bg-white/50 border border-white/60 rounded-2xl text-[#1565C0] font-semibold placeholder:text-[#1565C0]/40 focus:outline-none focus:bg-white focus:border-[#2196F3] focus:ring-4 focus:ring-[#90CAF9]/30 transition-all shadow-sm"
              />
            </div>

            {/* Password Input (Nested Glass Style) */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#1565C0]/50">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="w-full pl-11 pr-12 py-4 bg-white/50 border border-white/60 rounded-2xl text-[#1565C0] font-semibold placeholder:text-[#1565C0]/40 focus:outline-none focus:bg-white focus:border-[#2196F3] focus:ring-4 focus:ring-[#90CAF9]/30 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#1565C0]/50 hover:text-[#2196F3] focus:outline-none transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password Layout */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer appearance-none w-4 h-4 rounded border border-[#90CAF9] bg-white checked:bg-[#2196F3] checked:border-[#2196F3] focus:ring-2 focus:ring-[#90CAF9]/50 transition-all cursor-pointer"
                  />
                  <svg
                    className="w-3 h-3 text-white absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-[#1565C0]/80 group-hover:text-[#1565C0] transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-sm font-bold text-[#2196F3] hover:text-[#1565C0] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 bg-gradient-to-r from-[#1565C0] to-[#2196F3] hover:from-[#0D47A1] hover:to-[#1976D2] text-white font-bold text-base rounded-2xl shadow-[0_8px_20px_-6px_rgba(21,101,192,0.4)] transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/50 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white/40 border-t-white" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* --- Divider --- */}
          <div className="flex items-center gap-3 my-7">
            <div className="h-px flex-1 bg-[#90CAF9]/40"></div>
            <span className="text-xs font-bold text-[#1565C0]/50 uppercase tracking-widest">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-[#90CAF9]/40"></div>
          </div>

          {/* --- Google Sign In Button (Moved to bottom) --- */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white hover:bg-[#F8FBFF] text-[#1565C0] font-bold text-sm rounded-2xl border border-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] transition-all focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/30 disabled:opacity-50"
          >
            {/* Google Logo SVG */}
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          {/* --- Footer Link --- */}
          <div className="mt-8 text-center text-sm font-semibold text-[#1565C0]/70">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="font-bold text-[#2196F3] hover:text-[#1565C0] hover:underline transition-all"
            >
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
