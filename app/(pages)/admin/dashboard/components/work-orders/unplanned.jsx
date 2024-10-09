import { useState } from "react";
import { Select, Table } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import EarlyMaintenancePopup from "./earlyMaintenancePopup";
import ActionBar from "./actionBar";
import CreateUnplannedWOPopup from "./createUnplannedWOPopup";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Work Order #",
    dataIndex: "workOrder",
  },
  {
    title: "Work Required",
    dataIndex: "workRequired",
  },
  {
    title: "Priority",
    dataIndex: "priority",
  },
  {
    title: "Created Date",
    dataIndex: "created",
  },
  {
    title: "Due Date",
    dataIndex: "due",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Cost Center",
    dataIndex: "costCenter",
  },
  {
    title: "Cost",
    dataIndex: "cost",
  },
  {
    title: "Asset #",
    dataIndex: "asset",
  },
  {
    title: "Asset Description",
    dataIndex: "assetDescription",
  },
  {
    title: "",
    dataIndex: "print",
    render: () => (
      <PrinterOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
    ),
  },
];

const data = [
  {
    workOrder: "PWO013942000998",
    workRequired: "Weekly Maintenance (...",
    priority: "High",
    created: "September 30, 2024",
    due: "October 7, 2024",
    status: "Open",
    costCenter: "Rig 21 - Drilling Sy...",
    cost: "$0.00",
    asset: "21-001",
    assetDescription: "AC Powered 1500 HP O...",
    print: "",
  },
  {
    workOrder: "PWO013942000998",
    workRequired: "Weekly Maintenance (...",
    priority: "High",
    created: "September 30, 2024",
    due: "October 7, 2024",
    status: "Open",
    costCenter: "Rig 21 - Drilling Sy...",
    cost: "$0.00",
    asset: "21-001",
    assetDescription: "AC Powered 1500 HP O...",
    print: "",
  },
  {
    workOrder: "PWO013942000998",
    workRequired: "Weekly Maintenance (...",
    priority: "High",
    created: "September 30, 2024",
    due: "October 7, 2024",
    status: "Open",
    costCenter: "Rig 21 - Drilling Sy...",
    cost: "$0.00",
    asset: "21-001",
    assetDescription: "AC Powered 1500 HP O...",
    print: "",
  },
  {
    workOrder: "PWO013942000998",
    workRequired: "Weekly Maintenance (...",
    priority: "High",
    created: "September 30, 2024",
    due: "October 7, 2024",
    status: "Open",
    costCenter: "Rig 21 - Drilling Sy...",
    cost: "$0.00",
    asset: "21-001",
    assetDescription: "AC Powered 1500 HP O...",
    print: "",
  },
  {
    workOrder: "PWO013942000998",
    workRequired: "Weekly Maintenance (...",
    priority: "High",
    created: "September 30, 2024",
    due: "October 7, 2024",
    status: "Open",
    costCenter: "Rig 21 - Drilling Sy...",
    cost: "$0.00",
    asset: "21-001",
    assetDescription: "AC Powered 1500 HP O...",
    print: "",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Unplanned = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const router = useRouter();

  const showAddWOModal = () => {
    setAddWOVisible(true);
  };
  return (
    <div className="h-[calc(100dvh-220px)] overflow-auto mt-4 px-3 lg:px-6">
      <div className="">
        {addWOVisible && (
          <CreateUnplannedWOPopup
            visible={addWOVisible}
            setVisible={setAddWOVisible}
          />
        )}
        <div>
          <ActionBar
            showAddWOModal={showAddWOModal}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            columns={columns}
            unplanned
          />
          <div className="flex justify-end">
            <p className="text-secondary">
              Total Unplanned Work Orders:{" "}
              <span>{"(" + data.length + ")"}</span>
            </p>
          </div>
          <Table
            rowClassName="cursor-pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  router.push(
                    `/admin/dashboard/components/work-orders/${record?.workOrder}`
                  );
                },
              };
            }}
            loading={false}
            size={"large"}
            scroll={{ x: 1100 }}
            columns={newColumns}
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
    </div>
  );
};

export default Unplanned;
