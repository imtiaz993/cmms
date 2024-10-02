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
    <div>
      <Tabs
        animated
        defaultActiveKey="assets"
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
