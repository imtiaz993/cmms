import { Input, List, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReportsPopup from "./popups/reportsPopup";
import { useEffect, useState } from "react";
import AssetSummaryPopup from "./popups/assetSummaryPopup";
import { useSearchParams } from "next/navigation";
import { SearchIcon } from "@/icons/index";

const reportsData = [
  {
    title: "Asset is Currently Down",
    description: "This report lists all assets that are currently down.",
    endPoint: "asset-down",
  },

  // { removed because it was not in the screenshot of brandons doc
  //   title: "Asset Classes by Entity",
  //   description:
  //     "This report shows the active asset classes that are currently tied to an asset at a cost center. It excludes the asset classes that exist in the system but are not associated with any asset found currently at the selected cost center.",
  // },
  // {
  //   title: "Asset Details",
  //   description:
  //     "This report shows the details about the asset status, asset class, custom attributes, maintenance information and costs related to an asset.",
  //   endPoint: "asset-details",
  // },
  {
    title: "Newly Added Assets",
    description:
      "This report shows a list of newly added assets defaulted to within the past 90 days or you can select a date range.",
    endPoint: "newly-added-assets",
  },
  {
    title: "Asset Operational Status",
    description:
      "This is a summary report of the asset’s current operating status at a cost center. It shows a color-coded representation for easy and quick recognition of the asset state as it stands today.",
    endPoint: "asset-operational-status",
  },
  {
    title: "Asset Physical Location",
    description:
      "This report shows the current and previous physical location for a particular asset.",
    endPoint: "asset-physical-location",
  },
  {
    title: "Asset Status Change",
    description:
      "This report shows how long an asset was listed in a particular status type.",
    endPoint: "asset-status-update",
  },
  {
    title: "Asset Summary",
    description:
      "This report shows the summary of the active assets in the system.",
    endPoint: "asset-summary",
  },
  {
    title: "Total Cost of Ownership",
    description:
      "This report provides the total cost of ownership of assets assigned to a cost center/zone. The report provides a summary of planned and unplanned work order counts along with the labor hours and parts costs. It also takes into account any assigned contract costs. The conclusion provides details about current costs and estimated future costs based on the estimated life of the asset.",
    endPoint: "asset-cost",
  },
];
const AssetReports = ({ categories }) => {
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
        visible={popup === "Asset is Currently Down"}
        setVisible={setPopup}
        title="Asset is Currently Down Report"
        type="asset"
        endPoint="asset-down"
      />
      {/* <ReportsPopup
        visible={popup === "Asset Details"}
        setVisible={setPopup}
        title="Asset Details Report"
        type="asset"
        assetNumber
        endPoint="asset-details"
      /> */}
      <ReportsPopup
        visible={popup === "Newly Added Assets"}
        setVisible={setPopup}
        title="Newly Added Assets Report"
        type="asset"
        costCenter={false}
        fromToDate
        endPoint="newly-added-assets"
      />
      <ReportsPopup
        visible={popup === "Asset Operational Status"}
        setVisible={setPopup}
        title="Asset Operational Status Report"
        type="asset"
        dataOnly
        endPoint="asset-operational-status"
      />
      <ReportsPopup
        visible={popup === "Asset Physical Location"}
        setVisible={setPopup}
        title="Asset Physical Location Report"
        type="asset"
        dataOnly
        endPoint="asset-physical-location"
      />
      <ReportsPopup
        visible={popup === "Asset Status Change"}
        setVisible={setPopup}
        title="Asset Status Change Report"
        type="asset"
        assetNumber
        fromToDate
        endPoint="asset-status-update"
      />
      <AssetSummaryPopup
        visible={popup === "Asset Summary"}
        setVisible={setPopup}
        categories={categories}
        dataOnly
        endPoint="asset-summary"
      />
      <ReportsPopup
        visible={popup === "Total Cost of Ownership"}
        setVisible={setPopup}
        title="Total Cost of Ownership Report"
        type="asset"
        assetNumber
        includeChildAssets
        endPoint="asset-cost"
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
export default AssetReports;
