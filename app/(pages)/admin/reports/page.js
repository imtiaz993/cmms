"use client";
import { Tabs } from "antd";
import AssetReports from "./components/assetReports";
import MaintenanceReports from "./components/maintenanceReports";
import AnalyticsReports from "./components/analyticsReports";
import Readings from "./components/reading";
import { useEffect, useState } from "react";
import { getCategories } from "app/services/setUp/categories";
import InventoryReports from "./components/inventoryReports";

const Reports = () => {
  const [categories, setCategories] = useState([]);
  const tabs = [
    {
      label: "Assets",
      children: <AssetReports categories={categories} />,
    },
    {
      label: "Inventory",
      children: <InventoryReports categories={categories} />,
    },
    {
      label: "Maintenance",
      children: <MaintenanceReports categories={categories} />,
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

  useEffect(() => {
    const handleFetchCategories = async () => {
      const { status, data } = await getCategories();
      if (status === 200) {
        setCategories(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchCategories();
  }, []);
  return (
    <div className="pb-4 pt-3">
      <Tabs
        animated
        size={"small"}
        items={tabs.map((i, index) => ({ ...i, key: index }))}
        // tabBarStyle={{ borderColor: "white" }}
        className="reports-tabs"
      />
    </div>
  );
};
export default Reports;
