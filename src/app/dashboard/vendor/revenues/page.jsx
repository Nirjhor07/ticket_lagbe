import { revenueVendor } from "@/lib/api/getRevenueVendor";
import { getUserSession } from "@/lib/core/getUserSession";
import RevenueAnalytics from "./RevenueAnalytics";

const VendorRevenuePage = async () => {
  const user = await getUserSession();
  const revenueData = await revenueVendor(user?.id);

  return (
    <main className="w-full min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Vendor Revenue & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your ticket sales metrics and financial growth.
          </p>
        </header>

        <RevenueAnalytics revenueData={revenueData} />
      </div>
    </main>
  );
};

export default VendorRevenuePage;
