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
    endPoint: "readings",
  },
  {
    title: "Downtime Summary",
    description:
      "This report provides the cause of downtime and the costs incurred for a particular date range.",
    endPoint: "downtime-summary",
  },
  {
    title: "Maintenance Procedures",
    description:
      "This report displays the maintenance procedures detailing the steps that need to be taken during a particular maintenance routine task and the parts needed to accomplish the tasks for a particular asset class.",
    endPoint: "maintenance-procedures",
  },
  {
    title: "Planned Maintenance Summary",
    description:
      "This report shows a summary of all planned maintenance jobs in the system for a facility for a given date range. Jobs that are past due and/or closed late are highlighted.",
    endPoint: "planned-maintenance-summary",
  },

  {
    title: "Unplanned Maintenance Summary",
    description:
      "This report shows a summary of all unplanned maintenance jobs in the system for a facility for a given date range. It lists the problem, the number of hours spent on the job, and the downtime incurred with each job.",
    endPoint: "unplanned-maintenance-summary",
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
    endPoint: "past-due-work-orders",
  },
  {
    title: "Work Order Procedure",
    description:
      "This report will show you all planned, event, and campaign work orders and their procedure steps.",
    endPoint: "work-order-procedure",
  },
  {
    title: "Work Order Summary",
    description:
      "This report displays work order details such as work order number, assets, cost center, and status, and can be filtered using a comprehensive set of conditions.",
    endPoint: "work-order-summary",
  },
  {
    title: "Planned WOs vs Unplanned WOs",
    description:
      "Display the pie charts of planned vs unplanned WOs in a time range.",
    endPoint: "planned-vs-unplanned",
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
    <div className="px-5 mt-2 h-[calc(100dvh-230px)] overflow-auto lg:px-10">
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
          dataOnly
          endPoint="readings"
        />

        <ReportsPopup
          visible={popup === "Downtime Summary"}
          setVisible={setPopup}
          title="Downtime Summary Report"
          type="maintenance"
          fromToDate
          includeChildAssets
          endPoint="downtime-summary"
        />

        <MaintenanceProceduresPopup
          visible={popup === "Maintenance Procedures"}
          setVisible={setPopup}
          categories={categories}
          endPoint="maintenance-procedures"
        />

        <PlannedSummaryPopup
          visible={popup === "Planned Maintenance Summary"}
          setVisible={setPopup}
          title="Planned Maintenance Summary Report"
          endPoint="planned-maintenance-summary"
        />

        <PlannedSummaryPopup //unplanned
          visible={popup === "Unplanned Maintenance Summary"}
          setVisible={setPopup}
          title="Unplanned Maintenance Summary Report"
          endPoint="unplanned-maintenance-summary"
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
          endPoint="past-due-work-orders"
        />

        <PlannedSummaryPopup
          visible={popup === "Work Order Procedure"}
          setVisible={setPopup}
          title="Work Order Procedure Report"
          categories={categories}
          endPoint="work-order-procedure"
        />

        <PlannedSummaryPopup //WOSummaryPopup
          visible={popup === "Work Order Summary"}
          setVisible={setPopup}
          title="Work Order Summary Report"
          categories={categories}
          endPoint="work-order-summary"
        />

        <ReportsPopup
          visible={popup === "Planned WOs vs Unplanned WOs"}
          setVisible={setPopup}
          title="Planned WOs vs Unplanned WOs Report"
          type="maintenance"
          fromToDate
          endPoint="planned-vs-unplanned"
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
