import { Input } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReportsPopup from "./popups/reportsPopup";
import { useEffect, useState } from "react";
import AssetSummaryPopup from "./popups/assetSummaryPopup";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/icons/index";

const reportsData = [
  {
    title: "Inventory is Currently Down",
    description: "This report lists all inventories that are currently down.",
  },
  {
    title: "Inventory Class Assignment",
    description:
      "This report shows the active inventory classes and the inventory assigned to each inventory class at the selected facility.",
  },
  {
    title: "Inventory Classes by Entity",
    description:
      "This report shows the active inventory classes that are currently tied to an inventory at a cost center. It excludes the inventory classes that exist in the system but are not associated with any inventory found currently at the selected cost center.",
  },
  {
    title: "Inventory Details",
    description:
      "This report shows the details about the inventory status, inventory class, custom attributes, maintenance information and costs related to an inventory.",
    endPoint: "inventory-details",
  },
  {
    title: "Newly Added Inventories",
    description:
      "This report shows a list of newly added inventories defaulted to within the past 90 days or you can select a date range.",
    endPoint: "newly-added-inventories",
  },
  {
    title: "Inventory Operational Status",
    description:
      "This is a summary report of the inventory’s current operating status at a cost center. It shows a color-coded representation for easy and quick recognition of the inventory state as it stands today.",
  },
  {
    title: "Inventory Physical Location",
    description:
      "This report shows the current and previous physical location for a particular inventory.",
    endPoint: "inventory-physical-location",
  },
  {
    title: "Inventory Status Change",
    description:
      "This report shows how long an inventory was listed in a particular status type.",
    endPoint: "inventory-status-update",
  },
  {
    title: "Inventory Summary",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-summary",
  },
  {
    title: "Total Cost of Ownership",
    description:
      "This report provides the total cost of ownership of inventories assigned to a cost center/zone. The report provides a summary of planned and unplanned work order counts along with the labor hours and parts costs. It also takes into account any assigned contract costs. The conclusion provides details about current costs and estimated future costs based on the estimated life of the inventory.",
  },
  {
    title: "Custom Attributes",
    description:
      "This report displays inventories of a particular inventory class that have specific custom attribute values.",
  },
];
const InventoryReports = ({ categories }) => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [popup, setPopup] = useState("");
  const [reports, setReports] = useState([]);
  const [filteredData, setFilteredData] = useState(reportsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      // setLoading(true);
      // const { status, data } = await getWorkOrders(currentTab);
      // if (status === 200) {
      //   setWorkOrders(data?.data);
      // } else {
      //   message.error(data.error || "Failed to fetch reports");
      // }
      // setLoading(false);
    };
    if (!activeLocation) fetchReports();
  }, []);

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
      <ReportsPopup
        visible={popup === "Inventory is Currently Down"}
        setVisible={setPopup}
        title="Inventory is Currently Down Report"
        type="inventory"
      />
      <ReportsPopup
        visible={popup === "Inventory Class Assignment"}
        setVisible={setPopup}
        title="Inventory Class Assignment Report"
        type="inventory"
      />
      <ReportsPopup
        visible={popup === "Inventory Classes by Entity"}
        setVisible={setPopup}
        title="Inventory Classes by Entity Report"
        type="inventory"
        dataOnly
      />
      <ReportsPopup
        visible={popup === "Inventory Details"}
        setVisible={setPopup}
        title="Inventory Details Report"
        type="inventory"
        partNumber
        endPoint="inventory-details"
      />
      <ReportsPopup
        visible={popup === "Newly Added Inventories"}
        setVisible={setPopup}
        title="Newly Added Inventories Report"
        type="inventory"
        costCenter={false}
        fromToDate
        endPoint="newly-added-inventories"
      />
      <ReportsPopup
        visible={popup === "Inventory Operational Status"}
        setVisible={setPopup}
        title="Inventory Operational Status Report"
        type="inventory"
        dataOnly
      />
      <ReportsPopup
        visible={popup === "Inventory Physical Location"}
        setVisible={setPopup}
        title="Inventory Physical Location Report"
        type="inventory"
        dataOnly
        endPoint="inventory-physical-location"
      />
      <ReportsPopup
        visible={popup === "Inventory Status Change"}
        setVisible={setPopup}
        title="Inventory Status Change Report"
        type="inventory"
        partNumber
        fromToDate
        endPoint="inventory-status-update"
      />
      <AssetSummaryPopup
        visible={popup === "Inventory Summary"}
        setVisible={setPopup}
        categories={categories}
        endPoint="inventory-summary"
      />
      <ReportsPopup
        visible={popup === "Total Cost of Ownership"}
        setVisible={setPopup}
        title="Total Cost of Ownership Report"
        type="inventory"
        partNumber
        includeChildAssets
      />
      <ReportsPopup
        visible={popup === "Custom Attributes"}
        setVisible={setPopup}
        title="Custom Attributes Report"
        type="inventory"
      />
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
                  onClick={() => setPopup(item.title)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default InventoryReports;
