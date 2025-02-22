"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Tabs } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getWorkOrders } from "app/services/workOrders";
import Link from "next/link";
import WOtable from "./workOrderTable";
import EarlyMaintenancePopup from "./components/earlyMaintenancePopup";
import ActionBar from "./components/actionBar";
import UnplannedPreviewPopup from "./components/UnplannedPreviewPopup";
import PlannedPreviewPopup from "./components/PlannedPreviewPopup";
import { useSearchParams } from "next/navigation";

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
  const displayedData = useMemo(() => {
    if (!searchText) return workOrders; // Return all data if no search text
    return workOrders?.filter((item) =>
      checkedList.some((key) =>
        item[key]?.toString()?.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, workOrders]);

  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredWorkOrders = async () => {
        setFetchingWorkOrders(true);
        try {
          const { status, data } = await getDocumentsByCategory({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setWorkOrders(data.data);
          } else {
            message.error(data?.message || "Failed to fetch filtered assets");
          }
        } catch (error) {
          message.error("Error fetching filtered assets");
        } finally {
          setFetchingWorkOrders(false);
        }
      };

      fetchFilteredWorkOrders();
    } else {
      setWorkOrders(workOrders); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem, workOrders]);

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
        <EarlyMaintenancePopup
          visible={addWOVisible}
          setVisible={setAddWOVisible}
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
