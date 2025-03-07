"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Tabs } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import {
  getFilteredWorkOrders,
  getWorkOrders,
  getWorkOrdersByStatus,
} from "app/services/workOrders";
import Link from "next/link";
import WOtable from "./workOrderTable";
import EarlyMaintenancePopup from "./components/earlyMaintenancePopup";
import ActionBar from "./components/actionBar";
import UnplannedPreviewPopup from "./components/UnplannedPreviewPopup";
import PlannedPreviewPopup from "./components/PlannedPreviewPopup";
import { useSearchParams } from "next/navigation";
import MaintenanceReschulePopup from "./components/maintenanceReschulePopup";

const WorkOrders = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [workOrders, setWorkOrders] = useState([]);
  const [addWOVisible, setAddWOVisible] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [fetchingWorkOrders, setFetchingWorkOrders] = useState(true);
  const [currentTab, setCurrentTab] = useState("Unplanned");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [WOStatus, setWOStatus] = useState("all");

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
        <Link
          href={"/admin/assets/" + asset?._id}
          target={"_blank"}
          className="text-[#017BFE] underline"
        >
          {asset?.assetID}
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
      dataIndex: "startDate",
      key: "startDate",
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
      render: (status) => <p className="capitalize">{status}</p>,
    },
    {
      title: "Due Date",
      dataIndex: "endDate",
      key: "dueDate",
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
      title: "Issue ID",
      dataIndex: "issueID",
      key: "issueID",
      render: (issue, record) => (
        <Link
          href={"/admin/work-orders/" + record._id}
          className="text-[#017BFE] underline"
        >
          {issue}
        </Link>
      ),
    },
    {
      title: "Description of Issue",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Technician",
      dataIndex: "technician",
      key: "technician",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <p className="capitalize">{status}</p>,
    },
    {
      title: "Due Date",
      dataIndex: "endDate",
      key: "dueDate",
    },
    {
      title: "Asset #",
      dataIndex: "asset",
      key: "asset",
      render: (asset) => (
        <Link
          href={"/admin/assets/" + asset?._id}
          target={"_blank"}
          className="text-[#017BFE] underline"
        >
          {asset?.assetID}
        </Link>
      ),
    },
  ];
  const columns = [
    // Add columns of planned when currentTab is Planned else unPlanned
    ...(currentTab === "Planned" ? plannedColumns : unplannedColumns),
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (_, record, index) => (
        <EyeOutlined
          onClick={(e) => {
            e.stopPropagation();
            setPreviewPopup(true);
            setPreviewIndex(index);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];

  const [checkedList, setCheckedList] = useState(
    columns.map((item) => item.key)
  );
  const showAddWOModal = () => {
    setAddWOVisible(true);
  };

  // useEffect(() => {
  //   setCheckedList(columns.map((item) => item.key));
  //   setSelectedRowKeys([]);
  //   const fetchWorkOrders = async () => {
  //     setFetchingWorkOrders(true);
  //     const { status, data } = await getWorkOrders(currentTab.toLowerCase());
  //     if (status === 200) {
  //       setWorkOrders(data?.data);
  //     } else {
  //       message.error(data.error || "Failed to fetch work orders");
  //     }
  //     setFetchingWorkOrders(false);
  //   };
  //   fetchWorkOrders();
  // }, [activeLocation, activeSystem, currentTab]);

  // Dynamically filter columns based on the checkedList
  const filteredColumns = columns.filter((column) =>
    checkedList.includes(column.key)
  );

  // Filter data based on searchText
  const displayedData = useMemo(() => {
    if (!searchText) return workOrders; // Return all data if no search text
    return workOrders?.filter((item) =>
      checkedList.some((key) =>
        item[key]?.toString()?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, workOrders]);

  useEffect(() => {
    setCheckedList(columns.map((item) => item.key));
    setSelectedRowKeys([]);
    const fetchFilteredWorkOrders = async () => {
      setFetchingWorkOrders(true);
      const { status, data } = await getFilteredWorkOrders(
        { site: activeLocation ?? "", system: activeSystem ?? "" },
        currentTab.toLowerCase(),
        WOStatus
      );
      if (status === 200) {
        setWorkOrders(data.data);
      } else {
        message.error(data?.message || "Failed to fetch filtered workorders");
      }
      setFetchingWorkOrders(false);
    };
    fetchFilteredWorkOrders();
  }, [activeLocation, activeSystem, currentTab]);

  const tabs = [
    {
      label: "Unplanned",
      children: (
        <WOtable
          filteredColumns={filteredColumns}
          filteredData={displayedData}
          fetchingWorkOrders={fetchingWorkOrders}
          rowSelection={rowSelection}
        />
      ),
    },
    {
      label: "Planned",
      children: (
        <WOtable
          filteredColumns={filteredColumns}
          filteredData={displayedData}
          fetchingWorkOrders={fetchingWorkOrders}
          rowSelection={rowSelection}
        />
      ),
    },
  ];

  return (
    <>
      {addWOVisible && currentTab === "Planned" && (
        <MaintenanceReschulePopup
          visible={addWOVisible}
          setVisible={setAddWOVisible}
          selectedWorkOrders={selectedRowKeys}
        />
      )}

      {previewPopup && (
        <>
          <UnplannedPreviewPopup
            visible={previewPopup && currentTab === "Unplanned"}
            setVisible={setPreviewPopup}
            workOrder={workOrders[previewIndex]}
          />
          <PlannedPreviewPopup
            visible={previewPopup && currentTab === "Planned"}
            setVisible={setPreviewPopup}
            workOrder={workOrders[previewIndex]}
          />
        </>
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
          setWorkOrders={setWorkOrders}
          WOStatus={WOStatus}
          setWOStatus={setWOStatus}
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
