// Layout.js
"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getDarkMode, getToken, getUser } from "@/utils/index";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "./appbar";
import Sidebar from "./sidebar";
import { message, Select } from "antd";
import { ConfigProvider, theme } from "antd";
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
import { jwtDecode } from "jwt-decode";
import {
  AppstoreOutlined,
  BarChartOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  SettingOutlined,
  ShareAltOutlined,
  SwapOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  setlocation,
  setLocationError,
  setLocationLoading,
} from "app/redux/slices/locationsSlice";
import { getSites } from "app/services/setUp/sites";
import {
  setSystem,
  setSystemError,
  setSystemLoading,
} from "app/redux/slices/systemsSlice";
import { getSystems } from "app/services/setUp/systems";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";
  const activeLocation = searchParams.get("location") || null;
  const activeSystem = searchParams.get("system") || null;
  const isNewEditDetails = pathname.split("/")[3];
  const locations = useSelector((state) => state.location.location);
  const systems = useSelector((state) => state.system.system);

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Control Panel",
    },
    { key: "assets", icon: <AppstoreOutlined />, label: "Assets" },
    { key: "inventory", icon: <DatabaseOutlined />, label: "Inventory" },
    { key: "work-orders", icon: <ToolOutlined />, label: "Work Orders" },
    { key: "documents", icon: <FileTextOutlined />, label: "Documents" },
    { key: "reports", icon: <BarChartOutlined />, label: "Reports" },
    {
      key: "material-transfer",
      icon: <SwapOutlined />,
      label: "Material Transfer",
    },
    { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  // Find the current item based on the current page
  const currentItem =
    items.find((item) => item.key === currentPage) || items[0];

  // Dark mode
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false); //getDarkMode());

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark-mode");
      document.documentElement.classList.remove("dark");
    }
    // localStorage.setItem("darkMode", isDarkMode.toString());
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
    const handleFetchLocations = async () => {
      const user = getUser();
      dispatch(setLocationLoading(true));
      const { status, data } = await getSites();
      if (status === 200) {
        // if (user?.role === "rigManager")
        dispatch(
          setlocation(
            user.role === "rigManager"
              ? data?.data.filter((rig) =>
                  user?.rigsArray.some((userRig) => userRig._id === rig._id)
                )
              : data?.data
          )
        );
      } else {
        dispatch(setLocationError(data?.error));
      }
      dispatch(setLocationLoading(false));
    };
    const handleFetchSystems = async () => {
      dispatch(setSystemLoading(true));
      const { status, data } = await getSystems();
      if (status === 200) {
        dispatch(setSystem(data?.data));
      } else {
        dispatch(setSystemError(data?.error));
      }
      dispatch(setSystemLoading(false));
    };

    handleFetchAssets();
    handleFetchInventory();
    handleFetchLocations();
    handleFetchSystems();
  }, [dispatch]);

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

    if (typeof window !== "undefined") {
      const userToken = getToken();
      const isValid = checkTokenExpiration(userToken);

      if (!userToken) {
        router.replace("/login");
      } else if (!isValid) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        message.error("Token expired! Please login.");
        router.replace("/login");
      }
    }
    const user = getUser();

    if (user && user.role === "rigManager" && currentItem.key === "settings") {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  return (
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
        <div className="flex items-start mt-7">
          <Sidebar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            params={`?location=${activeLocation || ""}&system=${
              activeSystem || ""
            }`}
          />
          <div className="w-full lg:w-[calc(100%-251px)]">
            {!["new", "profile", "change-password"].includes(currentPage) &&
              !isNewEditDetails && (
                <>
                  <h1 className="px-5 md:px-10 text-2xl font-medium capitalize">
                    {currentItem.icon} {currentItem.label}
                  </h1>
                  {currentPage !== "settings" && (
                    <div className="px-5 md:px-10 flex gap-3 my-4">
                      <Select
                        value={activeLocation}
                        onChange={(value) => {
                          if (value) {
                            router.push(
                              `/admin/${currentPage}${
                                value && `?location=${value}`
                              } `
                            );
                          } else {
                            router.push(`/admin/${currentPage}`);
                          }
                        }}
                        allowClear={true}
                        options={locations.map((i) => ({
                          label: i.site,
                          value: i._id,
                        }))}
                        placeholder={
                          <p>
                            <EnvironmentOutlined /> Site
                          </p>
                        }
                        className="w-full sm:w-44 !h-10 shadow-custom"
                        dropdownRender={(menu) => (
                          <div>
                            <div
                              style={{
                                padding: "8px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <EnvironmentOutlined
                                style={{ marginRight: "8px", fontSize: "16px" }}
                              />
                              <span>Sites</span>
                            </div>
                            {menu}
                          </div>
                        )}
                      />
                      {activeLocation !== "12" && activeLocation !== "13" && (
                        <Select
                          value={activeSystem}
                          allowClear={true}
                          onChange={(value) =>
                            router.push(
                              `/admin/${currentPage}?location=${activeLocation}${
                                value ? `&system=${value}` : ""
                              }`
                            )
                          }
                          options={
                            activeLocation &&
                            systems
                              .filter((i) => i?.site?._id === activeLocation)
                              ?.map((i) => ({
                                label: i.system,
                                value: i._id,
                              }))
                          }
                          placeholder={
                            <p>
                              <ShareAltOutlined /> System
                            </p>
                          }
                          className="w-full sm:w-44 !h-10 shadow-custom"
                          dropdownRender={(menu) => (
                            <div>
                              <div
                                style={{
                                  padding: "8px",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ShareAltOutlined
                                  style={{
                                    marginRight: "8px",
                                    fontSize: "16px",
                                  }}
                                />
                                <span>Systems</span>
                              </div>
                              {menu}
                            </div>
                          )}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            {children}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
