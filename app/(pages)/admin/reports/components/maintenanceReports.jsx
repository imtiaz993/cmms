import { Input, List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReportsPopup from "./popups/reportsPopup";
import { useState } from "react";
import MaintenanceProceduresPopup from "./popups/maintenanceProceduresPopup";
import PlannedSummaryPopup from "./popups/plannedSummaryPopup";
import UnplannedDetailsPopup from "./popups/unplannedDetailsPopup";
import UnplannedSummaryPopup from "./popups/unplannedSummaryPopup";
import MaintenanceReusedPopup from "./popups/maintenanceReusedPopup";
import WOPersonnelSummaryPopup from "./popups/woPersonnelSummaryPopup";
import WOProcedurePopup from "./popups/woProcedurePopup";
import WOSummaryPopup from "./popups/woSummaryPopup";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/icons/index";

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
const MaintenanceReports = ({ categories }) => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [popup, setPopup] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredData, setFilteredData] = useState(reportsData);
  const [loading, setLoading] = useState(false);

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
          visible={popup === "Daily Readings"}
          setVisible={setPopup}
          title="Daily Readings Report"
          type="maintenance"
          physicalLocation
          dataOnly
        />

        <ReportsPopup
          visible={popup === "Downtime Summary"}
          setVisible={setPopup}
          title="Downtime Summary Report"
          type="maintenance"
          physicalLocation
          fromToDate
          includeChildAssets
        />

        <ReportsPopup
          visible={popup === "End of Month"}
          setVisible={setPopup}
          title="End of Month Report"
          type="maintenance"
          date
        />

        <ReportsPopup
          visible={popup === "Asset Downtime"}
          setVisible={setPopup}
          title="Asset Downtime Report"
          type="maintenance"
          fromToDate
          includeChildAssets
        />

        <ReportsPopup
          visible={popup === "Maintenance Forecast by Craft"}
          setVisible={setPopup}
          title="Maintenance Forecast by Craft Report"
          type="maintenance"
          fromToDate
        />

        <ReportsPopup
          visible={popup === "Maintenance Forecast by Zone"}
          setVisible={setPopup}
          title="Maintenance Forecast by Zone Report"
          type="maintenance"
          fromToDate
        />

        <MaintenanceProceduresPopup
          visible={popup === "Maintenance Procedures"}
          setVisible={setPopup}
          categories={categories}
        />

        <PlannedSummaryPopup
          visible={popup === "Planned Maintenance Summary"}
          setVisible={setPopup}
        />

        <UnplannedDetailsPopup
          visible={popup === "Unplanned Maintenance Details"}
          setVisible={setPopup}
        />

        <UnplannedSummaryPopup
          visible={popup === "Unplanned Maintenance Summary"}
          setVisible={setPopup}
        />

        <MaintenanceReusedPopup
          visible={popup === "Unplanned Work Order Survey"}
          setVisible={setPopup}
          title="Unplanned Work Order Survey Report"
          type="maintenance"
          includeWO
        />

        <ReportsPopup
          visible={popup === "Work Orders Past Due"}
          setVisible={setPopup}
          title="Work Order Past Due Report"
          type="maintenance"
          dataOnly
        />

        <WOPersonnelSummaryPopup
          visible={popup === "Work Order Personnel Summary"}
          setVisible={setPopup}
        />

        <WOProcedurePopup
          visible={popup === "Work Order Procedure"}
          setVisible={setPopup}
          categories={categories}
        />

        <WOSummaryPopup
          visible={popup === "Work Order Summary"}
          setVisible={setPopup}
          categories={categories}
        />

        <ReportsPopup
          visible={popup === "Work Orders With Delay Reasons"}
          setVisible={setPopup}
          title="Work Orders With Delay Reasons Report"
          type="maintenance"
          dataOnly
        />

        <MaintenanceReusedPopup
          visible={popup === "Maintenance Completion By Craft"}
          setVisible={setPopup}
          title="Maintenance Completion By Craft Report"
          type="maintenance"
          craft
        />

        <ReportsPopup
          visible={popup === "MTBF MTTR"}
          setVisible={setPopup}
          title="MTBF MTTR Report"
          type="maintenance"
          date
        />

        <ReportsPopup
          visible={popup === "Planned WOs vs Unplanned WOs"}
          setVisible={setPopup}
          title="Planned WOs vs Unplanned WOs Report"
          type="maintenance"
          fromToDate
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
export default MaintenanceReports;
