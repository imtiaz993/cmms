"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";
import { useRouter, useSearchParams } from "next/navigation";
import { getAssets, getFilteredAssets } from "app/services/assets";
import { useSelector } from "react-redux";
import { rigs, systems } from "@/constants/rigsAndSystems";
import { EditPagePencil } from "@/icons/index";
import { EyeOutlined } from "@ant-design/icons";
import Link from "next/link";

// Common column structure
// const baseColumns = [
//   { title: "Asset #", dataIndex: "assetNumber", key: "assetNumber" },
//   // { title: "Description", dataIndex: "description", key: "description" },
//   // {
//   //   title: "Physical Location",
//   //   dataIndex: "physicalLocation",
//   //   key: "physicalLocation",
//   //   render: (physicalLocation) =>
//   //     rigs.find((i) => i.id === physicalLocation).name,
//   // },
//   { title: "Serial #", dataIndex: "serialNumber", key: "serialNumber" },
//   // { title: "Part #", dataIndex: "part", key: "part" },
//   // { title: "Make", dataIndex: "make", key: "make" },
//   { title: "Model", dataIndex: "model", key: "model" },
//   { title: "Priority", dataIndex: "criticality", key: "criticality" },
//   { title: "Status", dataIndex: "maintStatus", key: "maintStatus" },
//   { title: "Installed Date", dataIndex: "installedDate", key: "installedDate" },
// ];

// Filter columns dynamically based on checkedList
const mainColumns = [
  {
    title: "Asset #",
    dataIndex: "assetNumber",
    key: "assetNumber",
    render: (_, record) => (
      <Link
        href={"/admin/assets/" + record._id}
        className="text-[#017BFE] underline"
      >
        {record.assetNumber}
      </Link>
    ),
  },
  {
    title: "Main System",
    dataIndex: "mainSystem",
    key: "mainSystem",
    render: (mainSystem) => systems.find((i) => i.id === mainSystem).name,
  },
  { title: "Serial #", dataIndex: "serialNumber", key: "serialNumber" },
  { title: "Model", dataIndex: "model", key: "model" },
  { title: "Priority", dataIndex: "criticality", key: "criticality" },
  { title: "Status", dataIndex: "maintStatus", key: "maintStatus" },
  {
    title: "Purchase Date",
    dataIndex: "purchaseDate",
    key: "purchaseDate",
  },
  {
    title: "",
    dataIndex: "_id",
    key: "actions",
    render: (id) => (
      <Link href={"/admin/assets/" + id} className="flex gap-5 text-tertiary">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <EditPagePencil />
      </Link>
    ),
  },
  // ...baseColumns.filter((col) => checkedList.includes(col.key)),
];

const parentColumns = [
  // { title: "Parent Asset", dataIndex: "parentAsset", key: "parentAsset" },
  // ...baseColumns.filter((col) => checkedList.includes(col.key)),
  {
    title: "Part Name",
    dataIndex: "partName",
    key: "partName",
  },
  {
    title: "Part #",
    dataIndex: "part",
    key: "part",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Details",
    dataIndex: "details",
    key: "details",
  },
  {
    title: "Installed Date",
    dataIndex: "installedDate",
    key: "installedDate",
  },
];

// const childColumns = [
//   { title: "Child Asset", dataIndex: "childAsset", key: "childAsset" },
//   ...baseColumns.filter((col) => checkedList.includes(col.key)),
// ];

const defaultCheckedList = mainColumns.map((item) => item.key);

const Assets = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  // const [assets, setAssets] = useState();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newMainColumns = mainColumns.filter((item) =>
    checkedList.includes(item.key)
  );
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  // Function to filter assets based on search text
  const displayedAssets = useMemo(() => {
    if (!searchText) return filteredAssets;
    return filteredAssets?.filter((asset) =>
      checkedList.some((key) =>
        asset[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, filteredAssets, checkedList]);

  // Render expanded row content<
  const expandedRowRender = (record) => (
    <Table
      columns={newMainColumns}
      dataSource={[record]} // Single parent data for nested table
      pagination={false}
      size="small"
      rowKey="key"
      rowSelection={rowSelection}
      // expandable={{
      //   expandedRowRender: (parentRecord) => (
      //     <Table
      //       columns={childColumns}
      //       dataSource={[parentRecord]} // Single child data for further nesting
      //       pagination={false}
      //       size="small"
      //       rowKey="key"
      //     />
      //   ),
      // }}
    />
  );

  // Handle row expand/collapse
  const handleRowExpand = (expanded, record) => {
    const newExpandedRowKeys = expanded
      ? [...expandedRowKeys, record.key]
      : expandedRowKeys.filter((key) => key !== record.key);
    setExpandedRowKeys(newExpandedRowKeys);
  };

  useEffect(() => {
    if (activeLocation || activeLocation === "") {
      const fetchFilteredAssets = async () => {
        setIsFiltering(true);
        try {
          const { status, data } = await getFilteredAssets({
            location: activeLocation ? activeLocation : null,
            system: activeSystem ? activeSystem : null,
          });

          if (status === 200) {
            setFilteredAssets(data.data);
          } else {
            message.error(data?.message || "Failed to fetch filtered assets");
          }
        } catch (error) {
          message.error("Error fetching filtered assets");
        } finally {
          setIsFiltering(false);
        }
      };

      fetchFilteredAssets();
    } else {
      setFilteredAssets(assets); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem, assets]);

  return (
    <div className="max-h-[calc(100dvh-220px-50px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
      {addAssetVisible && (
        <CreateAssetPopup
          visible={addAssetVisible}
          setVisible={setAddAssetVisible}
        />
      )}
      <ActionBar
        showAddAssetModal={() => setAddAssetVisible(true)}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={mainColumns}
        setSearchText={setSearchText}
      />
      {/* <div className="flex gap-3 justify-end">
        <p className="text-secondary">
          Total Assets: <span>{`(${assets?.length})`}</span>
        </p>
        <p className="text-secondary">
          Parent Assets: <span>{`(${assets?.length})`}</span>
        </p>
      </div> */}
      <Table
        loading={isFiltering || isLoading}
        size="large"
        scroll={{ x: 1100 }}
        columns={newMainColumns}
        rowSelection={rowSelection}
        // rowKey="_id"
        dataSource={displayedAssets}
        pagination={{
          total: displayedAssets?.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          className: "custom-pagination",
        }}
        style={{ marginTop: 16 }}
        rowKey="key"
        expandable={{
          expandedRowRender,
          expandedRowKeys,
          onExpand: handleRowExpand,
        }}
      />
    </div>
  );
};

export default Assets;
