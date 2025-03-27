import { Input } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReportsPopup from "./popups/reportsPopup";
import { useEffect, useState } from "react";
import AssetSummaryPopup from "./popups/assetSummaryPopup";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/icons/index";

const reportsData = [
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
    title: "Inventory in Stock",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-instock",
  },
  {
    title: "Inventory Disposed",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-disposed",
  },
  {
    title: "Inventory Broken",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-broken",
  },
  {
    title: "Inventory Sold",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-sold",
  },
  {
    title: "Inventory Received",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-received",
  },
  {
    title: "Inventory Shipped",
    description:
      "This report shows the summary of the active inventories in the system.",
    endPoint: "inventory-shipped",
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
        visible={popup === "Inventory in Stock"}
        setVisible={setPopup}
        title="Inventory in Stock Report"
        type="inventory"
        endPoint="inventory-instock"
      />
      <ReportsPopup
        visible={popup === "Inventory Disposed"}
        setVisible={setPopup}
        title="Inventory Disposed Report"
        type="inventory"
        endPoint="inventory-disposed"
      />
      <ReportsPopup
        visible={popup === "Inventory Broken"}
        setVisible={setPopup}
        title="Inventory Broken Report"
        type="inventory"
        endPoint="inventory-broken"
      />
      <ReportsPopup
        visible={popup === "Inventory Sold"}
        setVisible={setPopup}
        title="Inventory Sold Report"
        type="inventory"
        endPoint="inventory-sold"
      />
      <ReportsPopup
        visible={popup === "Inventory Received"}
        setVisible={setPopup}
        title="Inventory Received Report"
        type="inventory"
        endPoint="inventory-received"
      />
      <ReportsPopup
        visible={popup === "Inventory Shipped"}
        setVisible={setPopup}
        title="Inventory Shipped Report"
        type="inventory"
        endPoint="inventory-shipped"
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
