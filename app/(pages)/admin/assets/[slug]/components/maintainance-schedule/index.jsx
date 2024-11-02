import { Table } from "antd";
import ActionBar from "./components/actionBar";

const columns = [
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

const MaintainanceSchedule = () => {
  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar />
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Maintenance Schedules: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={false}
          size={"large"}
          scroll={{ x: 1100 }}
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
      </div>
    </div>
  );
};

export default MaintainanceSchedule;
