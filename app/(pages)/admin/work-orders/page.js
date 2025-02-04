"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Tabs } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getWorkOrders } from "app/services/workOrders";
import { EditPagePencil } from "@/icons/index";
import WOtable from "./planned";
import EarlyMaintenancePopup from "./components/earlyMaintenancePopup";
import ActionBar from "./components/actionBar";
import PreviewPopup from "@/components/previewPopup";
import Link from "next/link";

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fetchingWorkOrders, setFetchingWorkOrders] = useState(true);
  const [currentTab, setCurrentTab] = useState("Planned");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };
  const plannedColumns = [
    {
      title: "Asset #",
      dataIndex: "asset",
      key: "asset",
      render: (asset) => (
        <Link href={"#"} className="text-[#017BFE] underline">
          {asset?.name}
        </Link>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Start Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Criticality",
      dataIndex: "criticality",
      key: "criticality",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
    },
    {
      title: "Last Performed",
      dataIndex: "lastPerformed",
      key: "lastPerformed",
    },
  ];
  const unplannedColumns = [
    {
      title: "Issue #",
      dataIndex: "issue",
      key: "issue",
      render: (issue) => (
        <Link href={"#"} className="text-[#017BFE] underline">
          {issue}
        </Link>
      ),
    },
    {
      title: "Description of Issue",
      dataIndex: "issueIdentification",
      key: "issueIdentification",
    },
    {
      title: "Technician",
      dataIndex: "technicianAssignment",
      key: "technicianAssignment",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Time Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Asset #",
      dataIndex: "asset",
      key: "asset",
      render: (asset) => asset?.name,
    },
  ];
  const columns = [
    // Add columns of planned when currentTab is Planned else unPlanned
    ...(currentTab === "Planned" ? plannedColumns : unplannedColumns),
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="flex gap-3">
          <EyeOutlined
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

  const [checkedList, setCheckedList] = useState(
    columns.map((item) => item.key)
  );
  const showAddWOModal = () => {
    setAddWOVisible(true);
  };

  useEffect(() => {
    setCheckedList(columns.map((item) => item.key));
    setSelectedRowKeys([]);
    const fetchWorkOrders = async () => {
      setFetchingWorkOrders(true);
      const { status, data } = await getWorkOrders(currentTab);
      if (status === 200) {
        setWorkOrders(data?.data);
      } else {
        message.error(data.error || "Failed to fetch work orders");
      }
      setFetchingWorkOrders(false);
    };
    fetchWorkOrders();
  }, [currentTab]);

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

  const tabs = [
    {
      label: "Planned",
      children: (
        <WOtable
          filteredColumns={filteredColumns}
          filteredData={filteredData}
          fetchingWorkOrders={fetchingWorkOrders}
          rowSelection={rowSelection}
        />
      ),
    },
    {
      label: "Unplanned",
      children: (
        <WOtable
          filteredColumns={filteredColumns}
          filteredData={filteredData}
          fetchingWorkOrders={fetchingWorkOrders}
          rowSelection={rowSelection}
        />
      ),
    },
  ];

  return (
    <>
      {addWOVisible && (
        <EarlyMaintenancePopup
          visible={addWOVisible}
          setVisible={setAddWOVisible}
        />
      )}
      {previewPopupVisible && (
        <PreviewPopup
          visible={previewPopupVisible}
          setVisible={setPreviewPopupVisible}
        />
      )}
      <div className="max-h-[calc(100dvh-140px-16px-60px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        <ActionBar
          showAddWOModal={showAddWOModal}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          setSearchText={setSearchText}
          unplanned={currentTab === "Unplanned"}
          setFetchingWorkOrders={setFetchingWorkOrders}
        />
        <Tabs
          size={"small"}
          items={tabs.map((i, index) => ({ ...i, key: index }))}
          activeKey={tabs.findIndex((i) => i.label === currentTab)} // Ensure controlled component behavior
          // tabBarStyle={{ borderColor: "white" }}
          onChange={(key) => setCurrentTab(tabs[key].label)}
          className="asset-tabs md:!mt-3"
        />
      </div>
    </>
  );
};
export default WorkOrders;
