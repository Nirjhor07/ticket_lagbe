import { requireRole } from "@/lib/core/requireRool";
import React from "react";
import { ToastContainer } from "react-toastify";

const vendorlayout = async ({ children }) => {
  await requireRole("vendor");
  // const user = await getUserSession();

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default vendorlayout;
