import { Input, List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReportsPopup from "./popups/reportsPopup";

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
    <div className="px-3 mt-2 h-[calc(100dvh-210px)] overflow-auto lg:px-6">
      <div className="sticky top-0 bg-[#212020] z-10 !h-12 flex justify-end">
        <Input.Search
          placeholder="Search Reports"
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
          style={{ height: "36px" }}
          className="sm:!w-[300px] searchBar"
        />
      </div>
      <ReportsPopup
        visible={popup === "Defect and Cost Analysis"}
        setVisible={setPopup}
        title="Generate Defect and Cost Analysis Report"
        fromToDate
        includeChildAssets
      />

      <ReportsPopup
        visible={popup === "Asset Class Trend Summary"}
        setVisible={setPopup}
        title="Generate Asset Class Trend Summary Report"
        year
      />

      <ReportsPopup
        visible={popup === "Corrective Maintenance Measurables"}
        setVisible={setPopup}
        title="Generate Corrective Maintenance Measurables Report"
        year
      />

      <ReportsPopup
        visible={popup === "Maintenance Cost Breakdown"}
        setVisible={setPopup}
        title="Generate Maintenance Cost Breakdown Report"
        fromToDate
        includeChildAssets
      />

      <ReportsPopup
        visible={popup === "Monthly Maintenance Cost Breakdown"}
        setVisible={setPopup}
        title="Generate Monthly Maintenance Cost Breakdown Report"
        year
      />

      <ReportsPopup
        visible={popup === "Maintenance and Reliability"}
        setVisible={setPopup}
        title="Generate Maintenance and Reliability Report"
        fromToDate
        includeChildAssets
      />

      <ReportsPopup
        visible={popup === "Exponential Smoothing Forecast"}
        setVisible={setPopup}
        title="Generate Exponential Smoothing Forecast Report"
      />

      <div className="bg-primary px-2">
        <List
          itemLayout=""
          dataSource={filteredData.map((i, index) => ({ ...i, key: index }))}
          renderItem={(item) => (
            <List.Item
              actions={[
                <FileTextOutlined
                  key="file-text-icon"
                  style={{ fontSize: "24px", cursor: "pointer" }}
                  onClick={() => setPopup(item.title)}
                />,
              ]}
            >
              <List.Item.Meta
                title={<p className="text-white">{item.title}</p>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
export default AnalyticsReports;
