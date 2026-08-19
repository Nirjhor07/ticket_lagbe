"use client";

import { useState } from "react";
import {
  Envelope,
  Pencil,
  Person,
  ShieldCheck,
  Xmark,
} from "@gravity-ui/icons";

// 1. Reusable Edit Modal
const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || "",
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onUpdate?.(formData);
      onClose();
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl p-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
            Edit Profile Information
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            <Xmark className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-800/40 text-slate-400 dark:text-zinc-500 text-sm cursor-not-allowed"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Email address cannot be modified directly.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          {/* Modal Actions */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition shadow-sm"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Main Reusable Profile Component
export default function ProfileView({ user, onUpdateProfile }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  const roleStyles = {
    admin:
      "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800",
    vendor:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800",
    user: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-400 dark:border-indigo-800",
  };

  const handleUpdate = async (updatedFields) => {
    if (onUpdateProfile) {
      await onUpdateProfile(updatedFields);
    }
    setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Card Header Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900" />

        <div className="px-6 pb-6 pt-0">
          {/* Avatar and Action Top Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-4">
            <div className="relative w-28 h-28 rounded-2xl ring-4 ring-white dark:ring-zinc-900 overflow-hidden bg-slate-100 dark:bg-zinc-800 shadow-md">
              {currentUser?.image ? (
                <img
                  src={currentUser.image}
                  alt={currentUser?.name || "Profile"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Person className="w-12 h-12" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-medium text-sm transition shadow-sm"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* User Name & Role Badge */}
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
                {currentUser?.name || "Anonymous User"}
              </h2>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize border ${
                  roleStyles[currentUser?.role?.toLowerCase()] ||
                  roleStyles.user
                }`}
              >
                {currentUser?.role || "user"}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
              Ticket Lagbe Platform Account
            </p>
          </div>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-start gap-3.5">
          <span className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
            <Envelope className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
              Email Address
            </span>
            <p className="text-sm font-semibold truncate text-slate-800 dark:text-zinc-200 mt-0.5">
              {currentUser?.email}
            </p>
          </div>
        </div>

        {/* Role & Permissions */}
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex items-start gap-3.5">
          <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
              Account Role
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200 capitalize mt-0.5">
              {currentUser?.role || "user"}
            </p>
            <span className="text-xs text-slate-500 dark:text-zinc-400 mt-1 block">
              {currentUser?.role === "admin"
                ? "Full administrative permissions across all platform modules."
                : currentUser?.role === "vendor"
                  ? "Merchant access for schedule and ticket inventory management."
                  : "Customer access for booking tickets and reservations."}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={currentUser}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
