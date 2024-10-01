"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils";

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
          <div>{children}</div>
        </>
      )}
    </>
  );
}
