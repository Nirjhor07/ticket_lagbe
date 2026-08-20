import React, { Suspense } from "react";
import AddTicketForm from "./AddTicketForm";
import Loading from "@/app/loading";
import { getUserSession } from "@/lib/core/getUserSession";
import { ToastContainer } from "react-toastify";

const addTicketPage = async () => {
  const user = await getUserSession();
  console.log("User session in addTicketPage:", user);

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
