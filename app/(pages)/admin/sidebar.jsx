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
} from "@ant-design/icons";

const Sidebar = ({ openSidebar, setOpenSidebar, params }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = pathname.split("/")[2] || "dashboard";

  const items = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Control Panel" },
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
  ];

  const onClick = ({ key }) => {
    setOpenSidebar(false);
    router.push(`/admin/${key}${params}`);
  };

  return (
    <div className="rounded-tr-xl bg-primary overflow-hidden">
      <div className=" max-h-[calc(100dvh-16px-60px)] min-h-[calc(100dvh-16px-60px)] overflow-auto hidden lg:block lg:w-[250px] p-5 select-none">
        <Menu
          mode="inline"
          defaultSelectedKeys={[currentPage || "dashboard"]}
          onClick={onClick}
          items={items}
          style={{ border: "none" }}
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
