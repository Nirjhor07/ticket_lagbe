import React from "react";
import { ToastContainer } from "react-toastify";

const vendorlayout = async ({ children }) => {
  // const user = await getUserSession();

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default vendorlayout;
