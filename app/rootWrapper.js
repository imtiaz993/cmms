"use client";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootWrapper({ children }) {
  const [isWindow, setIsWindow] = useState();

  useEffect(() => {
    if (typeof window != "undefined") {
      setIsWindow(true);
    }
  }, []);

  return (
    isWindow && (
      <div>
        {children}
        <ToastContainer />
      </div>
    )
  );
}
