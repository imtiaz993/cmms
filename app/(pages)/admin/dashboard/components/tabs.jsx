"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import Dashboard from "./dashboard";

const Tabs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");
  const activeLocation = searchParams.get("location");

  const onChange = (key) => {
    router.push(`/admin/dashboard?tab=${key}`);
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
      children: "Content of Assets",
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
      children: "Content of Documents",
    },
    {
      key: "reports",
      label: "Reports",
      children: "Content of Reports",
    },
    {
      key: "material-transfer",
      label: "Material Transfer",
      children: "Content of Material Transfer",
    },
  ];
  return (
    <div className="px-2">
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
