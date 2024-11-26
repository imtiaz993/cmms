// Layout.js
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getToken, getUser } from "@/utils/index";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "./appbar";
import Sidebar from "./sidebar";
import { Select } from "antd";
import { ConfigProvider, theme } from "antd";
import { rigs } from "@/constants/rigsAndSystems";
import { setIn } from "formik";
import {
  setInventory,
  setInventoryLoading,
  setInventoryError,
} from "app/redux/slices/inventoriesSlice";
import { getInventory } from "app/services/inventory";
import { getAssets } from "app/services/assets";
import {
  setAssets,
  setAssetsError,
  setAssetsLoading,
} from "app/redux/slices/assetsSlice";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";
  const activeLocation = searchParams.get("location") || "1";
  const activeSystem = searchParams.get("system") || "1";

  // Dark mode
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

  useEffect(() => {
    const handleFetchInventory = async () => {
      dispatch(setInventoryLoading(true)); // Set loading state
      const { status, data } = await getInventory();
      if (status == 200) {
        dispatch(setInventory(data.data)); // Store inventory in Redux
      } else {
        dispatch(setInventoryError(data.error)); // Store error in Redux
      }
      dispatch(setInventoryLoading(false));
    };

    const handleFetchAssets = async () => {
      dispatch(setAssetsLoading(true));
      const { status, data } = await getAssets();
      if (status === 200) {
        dispatch(setAssets(data?.data));
      } else {
        dispatch(setAssetsError(data?.error));
      }
      dispatch(setAssetsLoading(false));
    };

    handleFetchAssets();
    handleFetchInventory();
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = getToken();
      const userData = getUser();
      if (!userToken) {
        router.replace("/login");
      } else if (userData?.role === "supervisor") {
        router.replace("/supervisor/dashboard");
      }
    }
  }, [router]);

  return (
    <ConfigProvider
      theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }}
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
                    .systems.map((i) => ({ label: i.name, value: i.id }))}
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
  );
}
