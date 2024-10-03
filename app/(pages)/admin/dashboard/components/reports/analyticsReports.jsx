import { List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const AnalyticsReports = () => {
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
  return (
    <div className="mt-2 h-[calc(100dvh-210px)] overflow-auto bg-primary px-2">
    <List
      itemLayout=""
      dataSource={reportsData.map((i, index) => ({ ...i, key: index }))}
      renderItem={(item) => (
        <List.Item
          actions={[
            <FileTextOutlined
            key="file-text-icon"
              style={{ fontSize: "24px", cursor: "pointer" }}
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
  );
};
export default AnalyticsReports;
