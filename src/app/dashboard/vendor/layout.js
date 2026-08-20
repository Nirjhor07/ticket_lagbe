import React from "react";
import { ToastContainer } from "react-toastify";

const vendorlayout = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default vendorlayout;
