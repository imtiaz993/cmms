"use client";
import { Tabs } from "antd";
import AssetReports from "./components/assetReports";
import MaintenanceReports from "./components/maintenanceReports";
import AnalyticsReports from "./components/analyticsReports";
import Readings from "./components/reading";

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
    {
      label: "Readings",
      children: <Readings />,
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
