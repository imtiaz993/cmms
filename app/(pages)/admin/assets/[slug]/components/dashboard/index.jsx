import {
  Card,
  Tooltip,
  Collapse,
  Badge,
  Divider,
  Statistic,
  Table,
  Checkbox,
  Tabs,
  Select,
} from "antd";
import {
  FolderFilled,
  ExclamationCircleOutlined,
  WarningFilled,
  PlusSquareOutlined,
  PlusSquareFilled,
} from "@ant-design/icons";
import { title } from "process";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { Children } from "react";

// Work Order Card Tabs
const AssetInfoTab = ({ dashboardDetails }) => {
  return (
    <div className="mt-5">
      <div className="flex sm:block">
        <Select
          placeholder="Select a New Asset Class"
          options={[
            {
              value: "Rig Hpu",
              label: "Rig Hpu",
            },
          ]}
          style={{ height: "36px" }}
          className="w-1/2 sm:w-auto"
        />
        <Button
          text="Change Asset Class"
          fullWidth={false}
          outlined
          className="ml-3 !text-xs md:!text-sm w-1/2 sm:w-auto"
        />
      </div>
      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between p-4">
        {/* Left Column */}
        <div className="w-full mr-5">
          <div>
            <p className="font-bold text-lg">Summary</p>

            <p>
              <span className="opacity-50 mr-2">Parent Asset</span>
              <span>{dashboardDetails.parentAsset}</span>
            </p>
            <p>
              <span className="opacity-50 mr-2">Subunit</span>
              <span>{dashboardDetails.childAsset}</span>
            </p>
            <p>
              <span className="opacity-50 mr-2">Accounting Dept.</span>
              <span>{dashboardDetails.accountingDept}</span>
            </p>
          </div>

          <div className="mt-3">
            {/* Equipment Info Section */}
            <p className="font-bold text-lg">Equipment Info</p>
            <p>
              <span className="opacity-50 mr-2">Supplier</span>
              <span>{dashboardDetails.supplier}</span>
            </p>
            <p>
              <span className="opacity-50 mr-2">Model</span>
              <span>{dashboardDetails.model}</span>
            </p>
            <p>
              <span className="opacity-50 mr-2">Make</span>
              <span>{dashboardDetails.make}</span>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full">
          {/* Details Section */}
          <div>
            <p className="font-bold text-lg">Details</p>

            <p>
              <span className="opacity-50 mr-2">Serial Number</span>
              <span>{dashboardDetails.serialNumber}</span>
            </p>

            <p>
              <span className="opacity-50 mr-2">Alternative Id #</span>
              <span>{dashboardDetails.assetNumber}</span>
            </p>

            <p>
              <span className="opacity-50 mr-2">RFID/Barcode</span>
              <span>{dashboardDetails.rfidBarCode}</span>
            </p>

            <p>
              <span className="opacity-50 mr-2">Physical Location</span>
              <span>{dashboardDetails.physicalLocation}</span>
            </p>

            <p>
              <span className="opacity-50 mr-2">Downtime Cost/hour</span>
              <span> - </span>
            </p>

            <p>
              <span className="opacity-50 mr-2">Estimated Life</span>
              <span> - </span>
            </p>

            <p>
              <span className="opacity-50 mr-2">Spec Details</span>
              <span>{dashboardDetails.specDetails}</span>
            </p>

            <p>
              <span className="opacity-50 mr-2">VIN Number</span>
              <span>-</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaintenanceTab = ({ dashboardDetails }) => {
  return (
    <div>
      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between p-4">
        {/* Left Column */}
        <div className="w-full mr-5">
          <div>
            <p className="font-bold text-lg">Status Info</p>

            <p>
              <span className="opacity-50 mr-2">Maintenance Start Date</span>
              <span>{dashboardDetails.maintStartDate}</span>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full">
          <div>
            <p className="font-bold text-lg">Information</p>
            <p>
              <span className="opacity-50 mr-2">Condition</span>
              <span>{dashboardDetails.condition}</span>
            </p>
            <p>
              <span className="opacity-50 mr-2">
                Original Manufacturer&apos;s Date
              </span>
              <span>{dashboardDetails.originalMfrDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomAttributesTab = ({ customFields }) => {
  return (
    <div>
      {/* Main Container */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between p-4">
        {/* Left Column */}
        <div className="w-full mr-5">
          <div>
            {/* Equipment Info Section */}
            <p className="font-bold text-lg">Custom Fields</p>
            {customFields.length > 0 ? (
              customFields.map((field) => (
                <p key={field.uniqueKey}>
                  <span className="opacity-50 mr-2">{field.name}</span>
                  <span>{field.value}</span>
                </p>
              ))
            ) : (
              <div> No Custom Fields To Display</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ChildrenAssetsTab = () => {
  return (
    <div className="text-center my-10">
      <ExclamationCircleOutlined /> No Children Assets To Display
    </div>
  );
};

const WorkOrderCard = ({ dashboardDetails }) => {
  const tabs = [
    {
      label: "Asset Info",
      children: <AssetInfoTab dashboardDetails={dashboardDetails} />,
    },
    {
      label: "Maintenance Info",
      children: <MaintenanceTab dashboardDetails={dashboardDetails} />,
    },
    {
      label: "Custom Fields",
      children: (
        <CustomAttributesTab customFields={dashboardDetails.customFields} />
      ),
    },
    {
      label: "Children Assets",
      children: <ChildrenAssetsTab dashboardDetails={dashboardDetails} />,
    },
  ];
  return (
    <Card
      loading={false}
      className="!bg-primary"
      title={
        <div className="flex items-center gap-2 text-sm md:text-base">
          <div className="relative flex">
            <span className="px-2 py-1 bg-secondary rounded-full">
              <FolderFilled />{" "}
            </span>
            <Tooltip title="Upload Image">
              <Badge className="absolute top-0 right-2 cursor-pointer">
                <PlusSquareFilled />
              </Badge>
            </Tooltip>
          </div>
          {dashboardDetails.assetNumber}{" "}
          <p className="text-xs font-normal">(Rig Hpu) </p>
        </div>
      }
      extra={
        <p className="text-xs md:text-base">
          <span className="opacity-50 mr-2">Criticality: </span>
          {dashboardDetails.criticality} <WarningFilled />
        </p>
      }
    >
      <div className="grid md:grid-cols-2 mx-2 gap-3">
        <div>
          <div>
            <span className="opacity-70 mr-3">Cost Center</span>
            <span>
              {dashboardDetails.physicalLocation} -{" "}
              {dashboardDetails.parentAsset}
            </span>
          </div>
        </div>
        <div>
          <div>
            <span className="opacity-70 mr-3">Asset Class</span>
            <span>
              {dashboardDetails.parentAsset}-{dashboardDetails.part}
            </span>
          </div>
        </div>
        <div>
          <div>
            <span className="opacity-70 mr-3">Criticality</span>
            <span>{dashboardDetails.criticality}</span>
          </div>
        </div>
        <div>
          <div>
            <span className="opacity-70 mr-3">Maintenance Status</span>
            <span>{dashboardDetails.maintStatus}</span>
          </div>
        </div>
        <div>
          <div>
            <span className="opacity-70 mr-3">Installed Date</span>
            <span>{dashboardDetails.installedDate}</span>
          </div>
        </div>
      </div>

      <Collapse style={{ marginTop: "20px" }}>
        <Collapse.Panel header="More Details" key="1">
          <div>
            <Tabs
              type="card"
              size={"small"}
              items={tabs.map((i, index) => ({ ...i, key: index }))}
              tabBarStyle={{ borderColor: "white" }}
              className="asset-tabs"
            />
          </div>
        </Collapse.Panel>
      </Collapse>
    </Card>
  );
};

const CostCard = ({ dashboardDetails }) => {
  const router = useRouter();
  return (
    <Card
      loading={false}
      className="!bg-primary"
      title="Cost"
      style={{ marginTop: "20px" }}
      extra={
        <Button
          text="View Cost"
          fullWidth={false}
          onClick={() => router.push("/admin/assets/John%20Brown?tab=cost")}
          outlined
        />
      }
    >
      <div className="text-center my-10">
        <ExclamationCircleOutlined /> No data to display
      </div>
    </Card>
  );
};

const columns = [
  {
    title: <Checkbox />,
    dataIndex: "checkbox",
    key: "checkbox",
    render: (_, record) => <Checkbox />,
  },
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Event Type",
    dataIndex: "eventType",
    key: "eventType",
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
  },
  {
    title: "Craft",
    dataIndex: "craft",
    key: "craft",
  },
  {
    title: "Last Performed",
    dataIndex: "lastPerformed",
    key: "lastPerformed",
  },
  {
    title: "Next Scheduled",
    dataIndex: "nextScheduled",
    key: "nextScheduled",
  },
];

const data = [
  {
    checkbox: true,
    asset: "04233889RY",
    eventType: "General",
    frequency: "90 Day",
    craft: "Rig Manager",
    lastPerformed: "09/09/2024",
    nextScheduled: "10/09/2024",
  },
  {
    asset: "04233889RY",
    eventType: "General",
    frequency: "90 Day",
    craft: "Rig Manager",
    lastPerformed: "09/09/2024",
    nextScheduled: "10/09/2024",
  },
  {
    asset: "04233889RY",
    eventType: "General",
    frequency: "90 Day",
    craft: "Rig Manager",
    lastPerformed: "09/09/2024",
    nextScheduled: "10/09/2024",
  },
];

const MaintenanceCard = ({ dashboardDetails }) => {
  const router = useRouter();

  return (
    <Card
      title={<h2 className="text-wrap">Maintenance Schedule</h2>}
      extra={
        <Button
          text="View Maintenance Schedule"
          fullWidth={false}
          onClick={() =>
            router.push("/admin/assets/John%20Brown?tab=maintenance-schedule")
          }
          className="!text-xs md:!text-sm"
          outlined
        />
      }
      className="!bg-primary"
      style={{ marginTop: "20px" }}
    >
      <Table
        loading={false}
        size={"medium"}
        scroll={{ x: 700 }}
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.total,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          onChange: () => {},
        }}
        style={{
          marginTop: 16,
          overflow: "auto",
        }}
      />
    </Card>
  );
};

const TotalOpenWorkOrdersCard = ({ dashboardDetails }) => {
  return (
    <Card
      className="!bg-primary"
      title={"Total Open Work Orders"}
      style={{ marginTop: "20px" }}
      extra={<Statistic value={1} />}
    >
      <div className="">
        <div className="text-right opacity-70">Time Range: Last 30 days</div>
        {/* Unplanned Work Orders */}
        <div className="space-y-4">
          <h4 className="font-semibold">Unplanned Work Orders</h4>
          <div className="flex items-center space-x-4">
            <div className="border-[6px] border-[#ff4d4f] rounded-full  h-20 w-20 flex flex-col justify-center text-center">
              <div className="text-xl">10</div>
              <div className="">Open</div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <Statistic
                value={0}
                title={
                  <p className="text-xs md:text-sm opacity-70">Under 24 hrs</p>
                }
              />

              <Statistic
                value={0}
                title={
                  <p className="text-xs md:text-sm opacity-70"> 24-48 hrs </p>
                }
              />

              <Statistic
                value={0}
                title={
                  <p className="text-xs md:text-sm opacity-70">Over 48 hrs</p>
                }
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Planned Work Orders */}
        <div className="space-y-4">
          <h4 className="font-semibold">Planned Work Orders</h4>
          <div className="flex items-center space-x-4">
            <div className="border-[6px] border-[#52c41a] rounded-full  h-20 w-20 flex flex-col justify-center text-center">
              <div className="text-xl">10</div>
              <div className="">Open</div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <Statistic
                value={1}
                title={
                  <p className="text-xs md:text-sm opacity-70">Past Due</p>
                }
              />

              <Statistic
                value={0}
                title={
                  <p className="text-xs md:text-sm opacity-70"> Completed </p>
                }
              />

              <Statistic
                value={0}
                suffix="%"
                title={
                  <p className="text-xs md:text-sm opacity-70">
                    Completion Rate
                  </p>
                }
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Event Work Orders */}
        <div className="space-y-4">
          <h4 className="font-semibold">Event Work Orders</h4>
          <div className="flex items-center space-x-4">
            <div className="border-[6px] border-[#1890ff] rounded-full h-20 w-20 flex flex-col justify-center text-center">
              <div className="text-xl">10</div>
              <div className="">Open</div>
            </div>
            <div className="flex gap-2 md:gap-4">
              <Statistic value={0} title="Under 24 hrs" />

              <Statistic value={0} title="24-48 hrs" />

              <Statistic value={0} suffix="%" title="Over 48 hrs" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = ({ dashboardDetails }) => {
  return (
    <div className="p-5">
      <WorkOrderCard dashboardDetails={dashboardDetails} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <TotalOpenWorkOrdersCard dashboardDetails={dashboardDetails} />
        </div>
        <div>
          <CostCard dashboardDetails={dashboardDetails} />
          <MaintenanceCard dashboardDetails={dashboardDetails} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
