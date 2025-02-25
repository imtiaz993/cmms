import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ToolOutlined,
  DatabaseOutlined,
  SwapOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getUser } from "@/utils/index";

const Sidebar = ({ openSidebar, setOpenSidebar, params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";

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
    router.push(`/admin/${key}${params}`);
  };

  return (
    <div className="rounded-tr-xl bg-primary overflow-hidden shadow-custom">
      <div className=" max-h-[calc(100dvh-16px-60px-16px)] min-h-[calc(100dvh-16px-60px-16px)] overflow-auto hidden lg:block lg:w-[250px] p-5 pt-7 select-none">
        <Menu
          mode="inline"
          defaultSelectedKeys={[currentPage || "dashboard"]}
          onClick={onClick}
          items={items}
          className="[&_.ant-menu-item]:!pl-3 !border-none"
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
          <Menu
            mode="inline"
            defaultSelectedKeys={[currentPage || "dashboard"]}
            onClick={onClick}
            items={items}
            style={{ border: "none" }}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
