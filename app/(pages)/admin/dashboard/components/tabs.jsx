"use cient";

import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("../dashboard"), {
  ssr: false,
});

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import Assets from "./assets";
import Reports from "./reports";
import Schedule from "./schedule";
import Inventory from "./inventory";
import WorkOrders from "./work-orders";
import Documents from "./documents";

const Tabs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const activeLocation = searchParams.get("location");

  const onChange = (key) => {
    router.push(
      `/admin/dashboard?tab=${key}&location=${
        activeLocation || "noram-drilling"
      }`
    );
  };

  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
      children: <Dashboard activeLocation={activeLocation} />,
    },
    {
      key: "assets",
      label: "Assets",
      children: <Assets />,
    },
    {
      key: "inventory",
      label: "Inventory",
      children: <Inventory />,
    },
    {
      key: "work-orders",
      label: "Work Orders",
      children: <WorkOrders />,
    },
    {
      key: "schedule",
      label: "Schedule",
      children: "Content of Schedule",
    },
    {
      key: "readings",
      label: "Readings",
      children: "Content of Readings",
    },
    {
      key: "documents",
      label: "Documents",
      children: <Documents />,
    },
    {
      key: "reports",
      label: "Reports",
      children: <Reports />,
    },
    {
      key: "material-transfer",
      label: "Material Transfer",
      children: "Content of Material Transfer",
    },
  ];
  return (
    <div className="dashboard-tabs">
      <AntTabs
        activeKey={tabs.find((i) => i.key === activeTab)?.key || "dashboard"}
        animated
        items={tabs}
        onChange={onChange}
        className="select-none"
      />
    </div>
  );
};
export default Tabs;
