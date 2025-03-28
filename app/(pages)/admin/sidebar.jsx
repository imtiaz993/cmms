import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu, Select } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ToolOutlined,
  DatabaseOutlined,
  SwapOutlined,
  SettingOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { getUser } from "@/utils/index";

const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  params,
  activeLocation,
  system,
  locations,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";
  const slashNewPages = pathname.split("/")[3];
  console.log("slashNewPages", slashNewPages);

  const items = [
    {
      key: "dashboard",
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Control Panel</span>,
    },
    {
      key: "assets",
      icon: <AppstoreOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Assets</span>,
    },
    {
      key: "inventory",
      icon: <DatabaseOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Inventory</span>,
    },
    {
      key: "work-orders",
      icon: <ToolOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Work Orders</span>,
    },
    {
      key: "documents",
      icon: <FileTextOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Documents</span>,
    },
    {
      key: "reports",
      icon: <BarChartOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Reports</span>,
    },
    {
      key: "material-transfer",
      icon: <SwapOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Material Transfer</span>,
    },
    getUser() !== "rigManager" && {
      key: "settings",
      icon: <SettingOutlined style={{ fontSize: "18px" }} />,
      label: <span style={{ fontSize: "18px" }}>Settings</span>,
    },
  ];

  const onClick = ({ key }) => {
    setOpenSidebar(false);
    router.push(`/admin/${key}${params ? params : ""}`);
  };

  return (
    <div className="rounded-tr-xl bg-primary overflow-hidden shadow-custom">
      <div className=" max-h-[calc(100dvh-16px-60px-16px)] min-h-[calc(100dvh-16px-60px-16px)] overflow-auto hidden lg:block lg:w-[250px] p-5 pt-7 select-none">
        {!["new", "profile", "change-password"].includes(currentPage) &&
          !slashNewPages && (
            <div className="mx-1">
              {/* Display the selected location in a styled div */}
              {/* {activeLocation && (
                <div className="p-2 bg-[#0F0E13] rounded text-xl text-center font-medium">
                  <p className="text-[#efbf60] flex items-center justify-center gap-2">
                    <EnvironmentOutlined />
                    {locations.find((loc) => loc._id === activeLocation)
                      ?.site || "Unknown Site"}
                  </p>
                </div>
              )} */}
              {/* Select component for changing the location */}
              {locations && (
                <Select
                  className="mt-2 mx-1 p-2 rounded text-xl text-center font-medium w-full sidebar-select"
                  bordered={false}
                  value={activeLocation ?? "all"}
                  onChange={(value) => {
                    if (value === "all") {
                      router.push(`/admin/${currentPage}`);
                    } else if (value) {
                      router.push(
                        `/admin/${currentPage}${value && `?location=${value}`}`
                      );
                    } else {
                      router.push(`/admin/${currentPage}`);
                    }
                  }}
                  // allowClear={true}
                  options={[
                    {
                      label: (
                        <div
                          className={`flex items-center gap-2 ${
                            !activeLocation ? "!text-black" : "text-[#efbf60]"
                          }`}
                        >
                          {/* <EnvironmentOutlined /> */}
                          <span
                            className={!activeLocation ? "text-black " : ""}
                          >
                            All Sites
                          </span>
                        </div>
                      ),
                      value: "all",
                    },
                    ...locations.map((i) => ({
                      label: (
                        <div
                          className={`flex items-center gap-2 ${
                            i._id === activeLocation
                              ? "!text-black"
                              : "text-[#efbf60]"
                          }`}
                        >
                          {/* <EnvironmentOutlined /> */}
                          <span
                            className={
                              activeLocation === i._id ? "text-black" : ""
                            }
                          >
                            {i.site}
                          </span>
                        </div>
                      ),
                      value: i._id,
                    })),
                  ]}
                  placeholder={
                    <div className="flex items-center justify-center gap-2 text-[#efbf60]">
                      {/* <EnvironmentOutlined /> */}
                      <span>All Sites</span>
                    </div>
                  }
                  suffixIcon={<span className="text-[#efbf60]">▼</span>} // Custom arrow
                />
              )}
            </div>
          )}

        <Menu
          mode="inline"
          defaultSelectedKeys={[currentPage]}
          selectedKeys={
            currentPage !== "new"
              ? [currentPage || "dashboard"]
              : [
                  slashNewPages === "asset"
                    ? "assets"
                    : slashNewPages === "work-order"
                    ? "work-orders"
                    : slashNewPages,
                ]
          }
          onClick={onClick}
          items={items}
          className="[&_.ant-menu-item]:!pl-3 !border-none sidebar-menu"
        />
      </div>
      <Drawer
        title=""
        placement={"left"}
        closable={true}
        onClose={() => {
          setOpenSidebar(false);
        }}
        open={openSidebar}
        key={"left"}
      >
        <div className="select-none">
          {/* Select component for changing the location */}
          {locations && (
            <Select
              className="mt-2 mx-1 p-2 rounded text-xl text-center font-medium w-full sidebar-select"
              bordered={false}
              value={activeLocation ?? "all"}
              onChange={(value) => {
                if (value === "all") {
                  router.push(`/admin/${currentPage}`);
                } else if (value) {
                  router.push(
                    `/admin/${currentPage}${value && `?location=${value}`}`
                  );
                } else {
                  router.push(`/admin/${currentPage}`);
                }
              }}
              // allowClear={true}
              options={[
                {
                  label: (
                    <div
                      className={`flex items-center gap-2 ${
                        !activeLocation ? "!text-black" : "text-[#efbf60]"
                      }`}
                    >
                      {/* <EnvironmentOutlined /> */}
                      <span className={!activeLocation ? "text-black" : ""}>
                        All Sites
                      </span>
                    </div>
                  ),
                  value: "all",
                },
                ...locations.map((i) => ({
                  label: (
                    <div
                      className={`flex items-center gap-2 ${
                        i._id === activeLocation
                          ? "!text-black"
                          : "text-[#efbf60]"
                      }`}
                    >
                      {/* <EnvironmentOutlined /> */}
                      <span
                        className={activeLocation === i._id ? "text-black" : ""}
                      >
                        {i.site}
                      </span>
                    </div>
                  ),
                  value: i._id,
                })),
              ]}
              placeholder={
                <div className="flex items-center justify-center gap-2 text-[#efbf60]">
                  {/* <EnvironmentOutlined /> */}
                  <span>All Sites</span>
                </div>
              }
              suffixIcon={<span className="text-[#efbf60]">▼</span>} // Custom arrow
            />
          )}
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPage]}
            selectedKeys={
              currentPage !== "new"
                ? [currentPage || "dashboard"]
                : [
                    slashNewPages === "asset"
                      ? "assets"
                      : slashNewPages === "work-order"
                      ? "work-orders"
                      : slashNewPages,
                  ]
            }
            onClick={onClick}
            items={items}
            style={{ border: "none" }}
            className="sidebar-menu"
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
