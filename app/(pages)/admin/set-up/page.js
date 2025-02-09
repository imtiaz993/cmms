"use client";
import { Tabs } from "antd";
import CompanyDetails from "./company-details";
import Sites from "./sites";
import Locations from "./locations";
import Categories from "./categories";
import SubCategories from "./sub-categories";
import Events from "./events";

const SetUp = () => {
  const tabs = [
    {
      key: "company-details",
      label: "Company Details",
      children: <CompanyDetails />,
    },
    { key: "sites", label: "Sites", children: <Sites /> },
    { key: "locations", label: "Locations", children: <Locations /> },
    { key: "categories", label: "Categories", children: <Categories /> },
    { key: "sub-categories", label: "Sub Categories", children: <SubCategories /> },
    { key: "events", label: "Events", children: <Events /> },
  ];
  return (
    <div className="mt-5 bg-primary !mx-5 lg:!mx-10 rounded-lg shadow-custom pl-3">
      <Tabs
        defaultActiveKey="1"
        animated
        items={tabs}
        className="select-none asset-tabs"
      />
    </div>
  );
};

export default SetUp;
