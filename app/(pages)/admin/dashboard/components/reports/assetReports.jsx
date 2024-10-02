import { List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const AssetReports = () => {
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
export default AssetReports;