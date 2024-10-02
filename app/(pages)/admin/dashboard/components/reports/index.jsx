import { Tabs } from "antd";
import AssetReports from "./assetReports";
import MaintenanceReports from "./maintenanceReports";
import AnalyticsReports from "./analyticsReports";

const Reports = () => {
  const tabs = [
    {
      key: "assets",
      label: "Assets",
      children: <AssetReports />,
    },
    {
      key: "maintenance",
      label: "Maintenance",
      children: <MaintenanceReports />,
    },
    {
      key: "analytics",
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
        items={tabs}
        tabBarStyle={{ borderColor:"white" }}
        className="reports-tabs"
      />
    </div>
  );
};
export default Reports;
