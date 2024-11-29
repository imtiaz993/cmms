"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getUser } from "@/utils/index";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window != "undefined") {
      const token = getToken();
      const data = getUser();
      if (token) {
        if (data?.role === "supervisor") {
          router?.replace("/supervisor/dashboard");
        }
        if (data?.role === "admin") {
          router?.replace("/admin/dashboard");
        }
        router.replace("/admin/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [router]);

  return <></>;
}
