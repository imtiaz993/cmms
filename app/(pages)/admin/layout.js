"use client";

import { act, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getToken, getUser } from "@/utils/index";
import Appbar from "./appbar";
import Sidebar from "./sidebar";
import { Select } from "antd";
import { ConfigProvider, theme, Button, Card } from "antd";
import { rigs, systems } from "@/constants/rigsAndSystems";

export default function Layout({ children }) {
  const router = useRouter();
  const [token, setToken] = useState();
  const [data, setData] = useState();
  const [openSidebar, setOpenSidebar] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";
  const activeLocation = searchParams.get("location") || "1";
  const activeSystem = searchParams.get("system") || "1";

  //dark mode
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.toggle("dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // useEffect(() => {
  //   if (typeof window != "undefined") {
  //     const userToken = getToken();
  //     const userData = getUser();
  //     setToken(userToken);
  //     setData(userData);

  //     if (!userToken) {
  //       router.replace("/login");
  //     } else if (userData?.role === "supervisor") {
  //       router?.replace("/supervisor/dashboard");
  //     }
  //   }
  // }, [router]);
  return (
    <>
      {/* {token && data && data.role === "admin" && ( */}
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <div>
          <Appbar
            setOpenSidebar={setOpenSidebar}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <div className="flex items-start mt-4">
            <Sidebar
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
              params={`?location=${activeLocation}&system=${activeSystem}`}
            />
            <div className="w-full lg:w-[calc(100%-300px)]">
              <div className="px-6 flex gap-3 mb-4">
                <Select
                  value={activeLocation}
                  onChange={(value) =>
                    router.push(
                      `/admin/${currentPage}?location=${value}&system=${activeSystem}`
                    )
                  }
                  options={rigs.map((i) => ({ label: i.name, value: i.id }))}
                  placeholder="Select Parent Location"
                  className="w-full sm:w-40"
                />
                {activeLocation !== "12" && activeLocation !== "13" && (
                  <Select
                    value={activeSystem}
                    onChange={(value) =>
                      router.push(
                        `/admin/${currentPage}?location=${activeLocation}&system=${value}`
                      )
                    }
                    options={rigs
                      .find((i) => i.id === activeLocation)
                      .systems.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
                    placeholder="Select Child Location"
                    className="w-full sm:w-40"
                  />
                )}
              </div>
              {children}
            </div>
          </div>
        </div>
      </ConfigProvider>
      {/* )} */}
    </>
  );
}
