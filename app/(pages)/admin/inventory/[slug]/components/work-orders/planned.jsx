import { useState } from "react";
import { Select, Table } from "antd";
import { EyeFilled, PrinterOutlined } from "@ant-design/icons";
import EarlyMaintenancePopup from "./earlyMaintenancePopup";
import ActionBar from "./actionBar";
import { useRouter } from "next/navigation";
import PreviewPopup from "../../../../../../../components/previewPopup";

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

const Planned = () => {
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const columns = [
    {
      title: "Work Order #",
      dataIndex: "workOrder",
      key: "workOrder",
    },
    {
      title: "Work Required",
      dataIndex: "workRequired",
      key: "workRequired",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Created Date",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "Due Date",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Cost Center",
      dataIndex: "costCenter",
      key: "costCenter",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Asset #",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Asset Description",
      dataIndex: "assetDescription",
      key: "assetDescription",
    },
    {
      title: "",
      dataIndex: "print",
      key: "print",
      render: () => (
        <EyeFilled
          onClick={(e) => {
            e.stopPropagation();
            setPreviewPopupVisible(true);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const router = useRouter();

  console.log(checkedList);

  const showAddWOModal = () => {
    setAddWOVisible(true);
  };
  return (
    <div className="h-[calc(100dvh-220px)] overflow-auto mt-4 px-3 lg:px-6">
      <div className="">
        <PreviewPopup
          visible={previewPopupVisible}
          setVisible={setPreviewPopupVisible}
        />
        {addWOVisible && (
          <EarlyMaintenancePopup
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
          />
          <div className="flex justify-end">
            <p className="text-secondary">
              Total Planned Work Orders: <span>{"(" + data.length + ")"}</span>
            </p>
          </div>
          <Table
            rowClassName="cursor-pointer"
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  router.push(
                    `/admin/work-orders/${record?._id}`
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

export default Planned;
