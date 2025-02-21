// Layout.js
"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getToken, getUser } from "@/utils/index";
import { useDispatch } from "react-redux";
import Appbar from "./appbar";
import Sidebar from "./sidebar";
import { message, Select } from "antd";
import { ConfigProvider, theme } from "antd";
import { rigs } from "@/constants/rigsAndSystems";
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

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const isNewEditDetails = pathname.split("/")[3];

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
    { key: "set-up", icon: <SettingOutlined />, label: "Set Up" },
  ];

  // Find the current item based on the current page
  const currentItem =
    items.find((item) => item.key === currentPage) || items[0];

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
      const userData = getUser();
      const isValid = checkTokenExpiration(userToken);
      console.log("Token valid:", isValid);

      if (!userToken) {
        router.replace("/login");
      } else if (!isValid) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        message.error("Token expired! Please login.");
        router.replace("/login");
      } else if (userData?.role === "supervisor") {
        router.replace("/supervisor/dashboard");
      }
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
            params={`?location=${activeLocation}&system=${activeSystem}`}
          />
          <div className="w-full lg:w-[calc(100%-300px)]">
            {currentPage !== "new" && !isNewEditDetails && (
              <>
                <h1 className="px-5 md:px-10 text-2xl font-medium capitalize">
                  {currentItem.icon} {currentItem.label}
                </h1>
                {currentPage !== "set-up" && (
                  <div className="px-5 md:px-10 flex gap-3 my-4">
                    <Select
                      value={activeLocation}
                      onChange={(value) =>
                        router.push(
                          `/admin/${currentPage}?location=${value}&system=${activeSystem}`
                        )
                      }
                      options={rigs.map((i) => ({
                        label: i.name,
                        value: i.id,
                      }))}
                      placeholder="Select Parent Location"
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
                            <span>Locations</span>
                          </div>
                          {menu}
                        </div>
                      )}
                    />
                    {activeLocation !== "12" && activeLocation !== "13" && (
                      <Select
                        value={activeSystem}
                        onChange={(value) =>
                          router.push(
                            `/admin/${currentPage}?location=${activeLocation}&system=${value}`
                          )
                        }
                        options={activeLocation && rigs
                          .find((i) => i?.id === activeLocation)
                          .systems?.map((i) => ({
                            label: i.name,
                            value: i.id,
                          }))}
                        placeholder="Select System"
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
                                style={{ marginRight: "8px", fontSize: "16px" }}
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
