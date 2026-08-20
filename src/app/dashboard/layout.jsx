import { DashboardSidebar } from "@/components/DashboardSidebar";
import { getUserSession } from "@/lib/core/getUserSession";
import React from "react";
import { ToastContainer } from "react-toastify";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();

  return (
    <div className="relative flex min-h-screen bg-[#E3F2FD] text-slate-900 antialiased">
      {/* Sidebar Component */}
      <DashboardSidebar userRole={user?.role || "user"} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default DashboardLayout;
