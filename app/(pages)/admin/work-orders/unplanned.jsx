import { useState, useEffect, useMemo } from "react";
import { message, Table } from "antd";
import { EyeFilled, PrinterOutlined } from "@ant-design/icons";
import EarlyMaintenancePopup from "./components/earlyMaintenancePopup";
import ActionBar from "./components/actionBar";
import CreateUnplannedWOPopup from "./components/createUnplannedWOPopup";
import { useRouter } from "next/navigation";
import PreviewPopup from "../../../../components/previewPopup";

import { getWorkOrders } from "app/services/workOrders";

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

const Unplanned = () => {
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [fetchingWorkOrders, setFetchingWorkOrders] = useState(true);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const [checkedList, setCheckedList] = useState([
    "asset",
    "assetDescription",
    "workOrder",
    // "workRequired",
    "priorityLevel",
    "createdAt",
    "date",
    "status",
    // "costCenter",
    // "cost",
  ]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const columns = [
    {
      title: "Asset #",
      dataIndex: "asset",
      key: "asset",
      render: (asset) => asset?.name,
    },
    {
      title: "Asset Description",
      dataIndex: "asset",
      key: "assetDescription",
      render: (asset) => asset?.description,
    },
    { title: "Work Order #", dataIndex: "_id", key: "workOrder" },
    // { title: "Work Required", dataIndex: "workRequired", key: "workRequired" },
    { title: "Priority", dataIndex: "priorityLevel", key: "priorityLevel" },
    { title: "Created Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Due Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    // { title: "Cost Center", dataIndex: "costCenter", key: "costCenter" },
    // { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "Affected Equipment",
      dataIndex: "affectedEquipment",
      key: "affectedEquipment",
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

  useEffect(() => {
    const fetchUnplannedWorkOrders = async () => {
      setFetchingWorkOrders(true);
      const { status, data } = await getWorkOrders("unplanned");
      if (status === 200) {
        setWorkOrders(data?.data);
      } else {
        message.error(data.error || "Failed to fetch unplanned work orders");
      }
      setFetchingWorkOrders(false);
    };
    fetchUnplannedWorkOrders();
  }, []);

  // Dynamically filter columns based on the checkedList
  const filteredColumns = columns.filter((column) =>
    checkedList.includes(column.key)
  );

  // Filter data based on searchText
  const filteredData = useMemo(() => {
    if (!searchText) return workOrders; // Return all data if no search text
    return workOrders?.filter((item) =>
      checkedList.some((key) =>
        item[key]?.toString()?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, workOrders]);

  const showAddWOModal = () => {
    setAddWOVisible(true);
  };

  return (
    <div className="h-[calc(100dvh-220px)] overflow-auto mt-4 px-3 lg:px-6">
      <PreviewPopup
        visible={previewPopupVisible}
        setVisible={setPreviewPopupVisible}
      />
      {addWOVisible && (
        <CreateUnplannedWOPopup
          visible={addWOVisible}
          setVisible={setAddWOVisible}
        />
      )}

      <ActionBar
        showAddWOModal={showAddWOModal}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        unplanned
        setSearchText={setSearchText}
        setFetchingWorkOrders={setFetchingWorkOrders}
      />

      <div className="flex justify-end">
        <p className="text-secondary">
          Total Unplanned Work Orders:{" "}
          <span>{"(" + workOrders.length + ")"}</span>
        </p>
      </div>

      <Table
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => router.push(`/admin/work-orders/${record?._id}`),
        })}
        loading={fetchingWorkOrders}
        size="large"
        scroll={{ x: 1100 }}
        columns={filteredColumns}
        dataSource={filteredData}
        pagination={{
          total: workOrders.length,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default Unplanned;
