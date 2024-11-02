"use client";
import { Tabs } from "antd";
import AssetReports from "./assetReports";
import MaintenanceReports from "./maintenanceReports";
import AnalyticsReports from "./analyticsReports";

const Reports = () => {
  const tabs = [
    {
      label: "Assets",
      children: <AssetReports />,
    },
    {
      label: "Maintenance",
      children: <MaintenanceReports />,
    },
    {
      label: "Analytics",
      children: <AnalyticsReports />,
    },
  ];
  return (
    <div className="pb-4 pt-3">
      <Tabs
        type="card"
        size={"small"}
        items={tabs.map((i, index) => ({ ...i, key: index }))}
        tabBarStyle={{ borderColor: "white" }}
        className="reports-tabs"
      />
    </div>
  );
};
export default Reports;
