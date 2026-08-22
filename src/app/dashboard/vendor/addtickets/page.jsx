import React, { Suspense } from "react";
import AddTicketForm from "./AddTicketForm";
import Loading from "@/app/loading";
import { getUserSession } from "@/lib/core/getUserSession";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

const addTicketPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/unauthorized");
  }

  if (user?.role === "fraud") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-600 mt-2">
          You do not have permission to access this page. Admins have been
          notified of your attempt to access this page.and marked your account
          as fraud. Please contact support if you believe this is a mistake.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <Loading />
          </div>
        }
      >
        <AddTicketForm user={user ? user : null} />
      </Suspense>
      <ToastContainer />
    </div>
  );
};

export default addTicketPage;
