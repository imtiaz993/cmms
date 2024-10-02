import { List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const MaintenanceReports = () => {
  const reportsData = [
    {
      title: "Daily Readings",
      description:
        "This report shows the latest readings recorded for each asset for a cost center.",
    },
    {
      title: "Downtime Summary",
      description:
        "This report provides the cause of downtime and the costs incurred for a particular date range.",
    },
    {
      title: "End of Month",
      description:
        "This report shows a detailed summary of maintenance activities for a particular location and month.",
    },
    {
      title: "Asset Downtime",
      description:
        "This report provides details of all the identified causes that resulted in downtime for a particular asset as well as all the costs associated with the activity for a given date range for assets with open/completed unplanned work orders.",
    },
    {
      title: "Maintenance Forecast by Craft",
      description:
        "This report shows all the upcoming planned maintenance work orders and the date they are expected to be created. It lists them by facility, zone, and groups them by the craft that these jobs are assigned to.",
    },
    {
      title: "Maintenance Forecast by Zone",
      description:
        "This report shows all the upcoming planned maintenance work orders and the date they are expected to be created. It groups them by the zone within a cost center.",
    },
    {
      title: "Maintenance Procedures",
      description:
        "This report displays the maintenance procedures detailing the steps that need to be taken during a particular maintenance routine task and the parts needed to accomplish the tasks for a particular asset class.",
    },
    {
      title: "Planned Maintenance Summary",
      description:
        "This report shows a summary of all planned maintenance jobs in the system for a facility for a given date range. Jobs that are past due and/or closed late are highlighted.",
    },
    {
      title: "Unplanned Maintenance Details",
      description:
        "This report provides details about all corrective/unplanned work orders for assets along with all the activity and the costs that have incurred. The conclusion is total cost incurred by each asset for a date range for unplanned maintenance.",
    },
    {
      title: "Unplanned Maintenance Summary",
      description:
        "This report shows a summary of all unplanned maintenance jobs in the system for a facility for a given date range. It lists the problem, the number of hours spent on the job, and the downtime incurred with each job.",
    },
    {
      title: "Unplanned Work Order Survey",
      description:
        "This report displays the results from the unplanned work order survey including comments.",
    },
    {
      title: "Work Orders Past Due",
      description:
        "This report shows planned work orders that are past due. The first one is a summary of all planned work orders that are past due and no delay reasons have been identified, and the second one lists all planned work orders that have delay reasons identified and are still past due.",
    },
    {
      title: "Work Order Personnel Summary",
      description:
        "This report will provide personnel summary data for all work orders.",
    },
    {
      title: "Work Order Procedure",
      description:
        "This report will show you all planned, event, and campaign work orders and their procedure steps.",
    },
    {
      title: "Work Order Summary",
      description:
        "This report displays work order details such as work order number, assets, cost center, and status, and can be filtered using a comprehensive set of conditions.",
    },
    {
      title: "Work Orders With Delay Reasons",
      description:
        "This will display planned and unplanned work orders with delay reasons.",
    },
    {
      title: "Maintenance Completion By Craft",
      description:
        "This report shows a count of all work orders. It lists them by facility, zone, and groups them by the craft that these jobs are assigned to.",
    },
    {
      title: "MTBF MTTR",
      description: "Display the 12 month MTBF and MTTR.",
    },
    {
      title: "Top Offenders",
      description: "Display the top offenders of the assets in a time range.",
    },
    {
      title: "Planned WOs vs Unplanned WOs",
      description:
        "Display the pie charts of planned vs unplanned WOs in a time range.",
    },
  ];
  return (
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
  );
};
export default MaintenanceReports;
