"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/index";

export default function Layout({ children }) {
  const router = useRouter();
  const [token, setToken] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (typeof window != "undefined") {
      const userToken = getToken();
      const userData = getUser();
      setToken(userToken);
      setData(userData);

      if (!userToken) {
        router.replace("/login");
      } else if (userData?.role === "supervisor") {
        router?.replace("/supervisor/dashboard");
      }
    }
  }, [router]);
  return <>{token && data && data.role === "admin" && <div>{children}</div>}</>;
}
