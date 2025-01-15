"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils";
import RightAuthImage from "@/components/rightAuthImage";
import AuthNavbar from "./authNavbar";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(true);

  useEffect(() => {
    const data = getUser();
    if (data?.role === "supervisor") {
      router?.replace("/supervisor/dashboard");
    }
    if (data?.role === "admin") {
      router?.replace("/admin/dashboard");
    }
    setUser(data);
  }, [router]);

  return (
    <>
      {(!user || !user.role) && (
        <>
          <AuthNavbar />
          {/* Background Layers */}
          <div className="absolute inset-0">
            {/* Triangle Background */}
            <div
              className="w-full mt-56 h-[200px] bg-[#3F3F3F]"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>

            {/* Black Background */}
            <div className="bg-[#3F3F3F]  h-[calc(100vh-224px-200px)]"></div>
          </div>

          {/* Content Section */}
          <div className="relative md:flex min-h-screen w-11/12 mx-auto md:w-full">
            <div className="md:w-7/12 md:mx-10">{children}</div>
            <div className="w-5/12 pt-40 hidden md:block">
              <RightAuthImage />
            </div>
          </div>
        </>
      )}
    </>
  );
}
