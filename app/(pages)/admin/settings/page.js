"use client";
import { Tabs } from "antd";
import CompanyDetails from "./company-details";
import Sites from "./sites";
import Locations from "./locations";
import Categories from "./categories";
import SubCategories from "./sub-categories";
import Events from "./events";
import { useState } from "react";

const SetUp = () => {
  const [activeTab, setActiveTab] = useState("company-details");
  const tabs = [
    {
      key: "company-details",
      label: "Company Details",
      children: <CompanyDetails activeTab={activeTab} />,
    },
    { key: "sites", label: "Sites", children: <Sites activeTab={activeTab} /> },
    { key: "locations", label: "Systems", children: <Locations activeTab={activeTab} /> },
    { key: "categories", label: "Categories", children: <Categories activeTab={activeTab} /> },
    { key: "sub-categories", label: "Sub Categories", children: <SubCategories activeTab={activeTab} /> },
    { key: "events", label: "Events", children: <Events /> },
  ];
  return (
    <div className="mt-5 bg-primary !mx-5 lg:!mx-10 rounded-lg shadow-custom pl-3">
      <Tabs
        defaultActiveKey="1"
        animated
        items={tabs}
        className="select-none asset-tabs"
        onChange={(key) => setActiveTab(key)}
      />
    </div>
  );
};

export default SetUp;
