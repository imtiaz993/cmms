import { List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReportsPopup from "./popups/reportsPopup";
import { useState } from "react";

const AssetReports = () => {
  const [popup, setPopup] = useState("");
  const reportsData = [
    {
      title: "Asset is Currently Down",
      description: "This report lists all assets that are currently down.",
    },
    {
      title: "Asset Class Assignment",
      description:
        "This report shows the active asset classes and the asset assigned to each asset class at the selected facility.",
    },
    {
      title: "Asset Classes by Entity",
      description:
        "This report shows the active asset classes that are currently tied to an asset at a cost center. It excludes the asset classes that exist in the system but are not associated with any asset found currently at the selected cost center.",
    },
    {
      title: "Asset Details",
      description:
        "This report shows the details about the asset status, asset class, custom attributes, maintenance information and costs related to an asset.",
    },
    {
      title: "Newly Added Assets",
      description:
        "This report shows a list of newly added assets defaulted to within the past 90 days or you can select a date range.",
    },
    {
      title: "Asset Operational Status",
      description:
        "This is a summary report of the asset’s current operating status at a cost center. It shows a color-coded representation for easy and quick recognition of the asset state as it stands today.",
    },
    {
      title: "Asset Physical Location",
      description:
        "This report shows the current and previous physical location for a particular asset.",
    },
    {
      title: "Asset Status Change",
      description:
        "This report shows how long an asset was listed in a particular status type.",
    },
    {
      title: "Asset Summary",
      description:
        "This report shows the summary of the active assets in the system.",
    },
    {
      title: "Total Cost of Ownership",
      description:
        "This report provides the total cost of ownership of assets assigned to a cost center/zone. The report provides a summary of planned and unplanned work order counts along with the labor hours and parts costs. It also takes into account any assigned contract costs. The conclusion provides details about current costs and estimated future costs based on the estimated life of the asset.",
    },
    {
      title: "Custom Attributes",
      description:
        "This report displays assets of a particular asset class that have specific custom attribute values.",
    },
  ];

  return (
    <div className="px-3 mt-2 h-[calc(100dvh-210px)] overflow-auto lg:px-6">
      <ReportsPopup
        visible={popup === "Asset is Currently Down"}
        setVisible={setPopup}
        title="Generate Asset is Currently Down Report"
      />
      <ReportsPopup
        visible={popup === "Asset Class Assignment"}
        setVisible={setPopup}
        title="Generate Asset Class Assignment Report"
      />
      <ReportsPopup
        visible={popup === "Asset Classes by Entity"}
        setVisible={setPopup}
        title="Generate Asset Classes by Entity Report"
        dataOnly
      />
      <ReportsPopup
        visible={popup === "Asset Details"}
        setVisible={setPopup}
        title="Generate Asset Details Report"
        assetNumber
      />
      <ReportsPopup
        visible={popup === "Newly Added Assets"}
        setVisible={setPopup}
        title="Generate Newly Added Assets Report"
        costCenter={false}
        fromToDate
      />
      <ReportsPopup
        visible={popup === "Asset Operational Status"}
        setVisible={setPopup}
        title="Generate Asset Operational Status Report"
        dataOnly
      />

      <ReportsPopup
        visible={popup === "Asset Physical Location"}
        setVisible={setPopup}
        title="Generate Asset Physical Location Report"
        dataOnly
      />

      <ReportsPopup
        visible={popup === "Asset Status Change"}
        setVisible={setPopup}
        title="Generate Asset Status Change Report"
        assetNumber
        fromToDate
      />

      {/* <ReportsPopup
        visible={popup === "Asset Summary"}
        setVisible={setPopup}
        title="Generate Asset Summary Report"
        dataOnly
      /> */}

      <ReportsPopup
        visible={popup === "Total Cost of Ownership"}
        setVisible={setPopup}
        title="Generate Total Cost of Ownership Report"
        assetNumber
        includeChildAssets
      />

      <ReportsPopup
        visible={popup === "Custom Attributes"}
        setVisible={setPopup}
        title="Generate Custom Attributes Report"
        dataOnly
      />

      <div className="bg-primary px-2">
        <List
          itemLayout=""
          dataSource={reportsData.map((i, index) => ({ ...i, key: index }))}
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
export default AssetReports;
