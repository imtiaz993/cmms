"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/index";

export default function Layout({ children }) {
  const router = useRouter();
  const [token, setToken] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const checkTokenExpiration = (token) => {
      if (!token) return false; // No token provided

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decodedToken.exp > currentTime; // Returns true if token is valid
      } catch (error) {
        console.error("Invalid token", error);
        return false;
      }
    };

    if (typeof window != "undefined") {
      const userToken = getToken();
      const userData = getUser();
      setToken(userToken);
      setData(userData);
      const isValid = checkTokenExpiration(userToken);
      console.log("Token valid:", isValid);

      if (!userToken) {
        router.replace("/login");
      } else if (!isValid) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        message.error("Token expired! Please login.");
        router.replace("/login");
      } else if (userData?.role === "admin") {
        router?.replace("/admin/dashboard");
      }
    }
  }, [router]);
  return (
    <>{token && data && data.role === "supervisor" && <div>{children}</div>}</>
  );
}
