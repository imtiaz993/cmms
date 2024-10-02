"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import Dashboard from "./dashboard";
import Assets from "./assets";
import Reports from "./reports";
import Schedule from "./schedule";

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
      children: "Content of Inventory",
    },
    {
      key: "work-orders",
      label: "Work Orders",
      children: "Content of Work Orders",
    },
    {
      key: "schedule",
      label: "Schedule",
      children: <Schedule />,
    },
    {
      key: "readings",
      label: "Readings",
      children: "Content of Readings",
    },
    {
      key: "documents",
      label: "Documents",
      children: "Content of Documents",
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
    <div>
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
