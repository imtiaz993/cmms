import { Input, List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReportsPopup from "./popups/reportsPopup";
import { SearchIcon } from "@/icons/index";

const AnalyticsReports = () => {
  const [popup, setPopup] = useState(false);

  const reportsData = [
    {
      title: "Defect and Cost Analysis",
      description:
        "This report lists the top 10 reasons that are recorded for asset breakdowns and the cost incurred with that activity for a given period of time. This report lists the asset with failure costs and then considers the cost.",
    },
    {
      title: "Asset Class Trend Summary",
      description:
        "This report lists the summary of performance measurables like work orders, downtime, labor hours, and costs for assets belonging to a specific asset class.",
    },
    {
      title: "Corrective Maintenance Measurables",
      description:
        "This report shows corrective maintenance activity by cost center for the selected year. It lists unplanned work orders opened during each month and lists them by zone and priority on the left and unplanned work orders closed by month and lists them by zone and priority on the right.",
    },
    {
      title: "Maintenance Cost Breakdown",
      description:
        "This is a summary report of maintenance cost by facility. It shows maintenance costs (Labor Cost, Inventory Cost, and Work Order Cost) for all planned, unplanned, and event maintenance tasks associated with each asset at the facility for a selected date range.",
    },
    {
      title: "Monthly Maintenance Cost Breakdown",
      description:
        "This report shows accumulated maintenance cost for the year selected. It includes parts, labor, and downtime cost in its calculations. The information is trended for each asset with subtotals provided for each zone with the final total for the entire cost center.",
    },
    {
      title: "Maintenance and Reliability",
      description:
        "This report shows maintenance and reliability summaries for assets of a particular cost center/zone.",
    },
    {
      title: "Exponential Smoothing Forecast",
      description:
        "This report shows a forecast for the next 3 months of downtime, unplanned man hours, maintenance cost, and cost of downtime using exponential smoothing. The alpha used in the calculation is 0.2. The forecast values are highlighted.",
    },
  ];

  const [filteredData, setFilteredData] = useState(reportsData);

  return (
    <div className="px-5 mt-2 h-[calc(100dvh-210px-60px)] overflow-auto lg:px-10">
      <div className="mt-3">
        <Input
          placeholder="Search"
          prefix={<SearchIcon />}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setFilteredData(
              reportsData.filter(
                (i) =>
                  i.title.toLowerCase().includes(value) ||
                  i.description.toLowerCase().includes(value)
              )
            );
          }}
          className="sm:!w-[362px] searchBar"
          allowClear
        />
      </div>
      <>
        <ReportsPopup
          visible={popup === "Defect and Cost Analysis"}
          setVisible={setPopup}
          title="Defect and Cost Analysis Report"
          type="analytics"
          fromToDate
          includeChildAssets
        />

        <ReportsPopup
          visible={popup === "Asset Class Trend Summary"}
          setVisible={setPopup}
          title="Asset Class Trend Summary Report"
          type="analytics"
          year
        />

        <ReportsPopup
          visible={popup === "Corrective Maintenance Measurables"}
          setVisible={setPopup}
          title="Corrective Maintenance Measurables Report"
          type="analytics"
          year
        />

        <ReportsPopup
          visible={popup === "Maintenance Cost Breakdown"}
          setVisible={setPopup}
          title="Maintenance Cost Breakdown Report"
          type="analytics"
          fromToDate
          includeChildAssets
        />

        <ReportsPopup
          visible={popup === "Monthly Maintenance Cost Breakdown"}
          setVisible={setPopup}
          title="Monthly Maintenance Cost Breakdown Report"
          type="analytics"
          year
        />

        <ReportsPopup
          visible={popup === "Maintenance and Reliability"}
          setVisible={setPopup}
          title="Maintenance and Reliability Report"
          type="analytics"
          fromToDate
          includeChildAssets
        />

        <ReportsPopup
          visible={popup === "Exponential Smoothing Forecast"}
          setVisible={setPopup}
          title="Exponential Smoothing Forecast Report"
          type="analytics"
        />
      </>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredData.length > 0 &&
          filteredData.map((item, index) => (
            <div
              className="bg-primary rounded-lg shadow-custom p-5 cursor-pointer"
              key={index}
              onClick={() => setPopup(item.title)}
            >
              <h2 className="text-sm font-semibold">{item.title}</h2>
              <div className="flex justify-between gap-2">
                <p className="text-sm">{item.description}</p>
                <FileTextOutlined
                  key="file-text-icon"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AnalyticsReports;
