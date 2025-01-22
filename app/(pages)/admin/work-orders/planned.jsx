import { useState, useMemo, useEffect } from "react";
import { Table, message, Input, Checkbox } from "antd";
import { EyeFilled } from "@ant-design/icons";
import EarlyMaintenancePopup from "./components/earlyMaintenancePopup";
import ActionBar from "./components/actionBar";
import { useRouter } from "next/navigation";
import PreviewPopup from "../../../../components/previewPopup";
import { getWorkOrders } from "app/services/workOrders";
import { EditPagePencil } from "@/icons/index";

const Planned = () => {
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [fetchingWorkOrders, setFetchingWorkOrders] = useState(true);
  const [checkedList, setCheckedList] = useState([
    "checkbox",
    "task",
    "mainSystem",
    "assignee",
    "details",
    "lastPerformed",
    "actions",
    // "asset", "assetDescription", "workOrder",// "workRequired",
    // "priorityLevel","createdAt", "due", "status",// "costCenter", // "cost",
  ]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const columns = [
    // {
    //   title: "Asset #",
    //   dataIndex: "asset",
    //   key: "asset",
    //   render: (asset) => asset?.name,
    // },
    // {
    //   title: "Asset Description",
    //   dataIndex: "asset",
    //   key: "assetDescription",
    //   render: (asset) => asset?.description,
    // },
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_, record) => <Checkbox />,
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Main System",
      dataIndex: "mainSystem",
      key: "mainSystem",
    },
    {
      title: "Assignee",
      dataIndex: "personDoingWork",
      key: "assignee",
    },
    {
      title: "Details",
      dataIndex: "problemDescription",
      key: "details",
    },
    {
      title: "Last Performed",
      dataIndex: "lastPerformed",
      key: "lastPerformed",
    },
    // { title: "Work Order #", dataIndex: "_id", key: "workOrder" },
    // // { title: "Work Required", dataIndex: "workRequired", key: "workRequired" },
    // { title: "Priority", dataIndex: "priorityLevel", key: "priorityLevel" },
    // { title: "Created Date", dataIndex: "createdAt", key: "createdAt" },
    // { title: "Due Date", dataIndex: "date", key: "due" },
    // { title: "Status", dataIndex: "status", key: "status" },
    // // { title: "Cost Center", dataIndex: "costCenter", key: "costCenter" },
    // // { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="flex gap-3">
          <EyeFilled
            onClick={(e) => {
              e.stopPropagation();
              setPreviewPopupVisible(true);
            }}
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
          <EditPagePencil />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchWorkOrders = async () => {
      const { status, data } = await getWorkOrders("planned");
      if (status === 200) {
        setWorkOrders(data?.data);
      } else {
        message.error(data.error || "Failed to fetch work orders");
      }
      setFetchingWorkOrders(false);
    };
    fetchWorkOrders();
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
    <div className="max-h-[calc(100dvh-220px-50px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg rounded-tl-none shadow-custom">
      {previewPopupVisible && (
        <PreviewPopup
          visible={previewPopupVisible}
          setVisible={setPreviewPopupVisible}
        />
      )}
      {addWOVisible && (
        <EarlyMaintenancePopup
          visible={addWOVisible}
          setVisible={setAddWOVisible}
        />
      )}

      <ActionBar
        showAddWOModal={showAddWOModal}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        setSearchText={setSearchText}
        setFetchingWorkOrders={setFetchingWorkOrders}
      />

      {/* <div className="flex justify-end">
        <p className="text-secondary">
          Total Planned Work Orders: <span>{`(${filteredData.length})`}</span>
        </p>
      </div> */}

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
          total: filteredData.length,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          style: { justifyContent: "center" },
        }}
        style={{ marginTop: 16, overflow: "auto" }}
      />
    </div>
  );
};

export default Planned;
