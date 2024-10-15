"use cient";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs as AntTabs } from "antd";
import WorkOrders from "./work-orders";
import Documents from "./documents";
import MaterialTransfer from "./material-transfer";
import Dashboard from "./dashboard";
import MaintainanceSchedule from "./maintainance-schedule";
import HistoryAssetDetail from "./history";

const Tabs = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const onChange = (key) => {
    router.push(`/admin/dashboard/components/assets/John%20Brown?tab=${key}`);
  };

  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
      children: <Dashboard />,
    },
    {
      key: "work-orders",
      label: "Work Orders",
      children: <WorkOrders />,
    },
    {
      key: "maintenance-schedule",
      label: "Maintenance Schedule",
      children: <MaintainanceSchedule />,
    },
    {
      key: "history",
      label: "History",
      children: <HistoryAssetDetail />,
    },
    {
      key: "cost",
      label: "Cost",
      children: "Content of Cost",
    },
    {
      key: "documents",
      label: "Documents",
      children: <Documents />,
    },
    {
      key: "readings",
      label: "Readings",
      children: "Content of Readings",
    },
    {
      key: "material-transfer",
      label: "Material Transfer",
      children: <MaterialTransfer />,
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