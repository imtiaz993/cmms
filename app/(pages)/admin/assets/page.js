"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";
import { useRouter } from "next/navigation";
import { getAssets } from "app/services/assets";
import { useSelector } from "react-redux";
import { rigs, systems } from "@/constants/rigsAndSystems";
import { EditPagePencil } from "@/icons/index";

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

const defaultCheckedList = [
  "mainSystem",
  "physicalLocation",
  "assetNumber",
  "make",
  "model",
  "criticality",
  "maintStatus",
  "installedDate",
];

const Assets = () => {
  // const [assets, setAssets] = useState();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  // Filter columns dynamically based on checkedList
  const mainColumns = [
    {
      title: "Asset #",
      dataIndex: "assetNumber",
      key: "assetNumber",
      render: (assetNumber) => (
        <a className="text-[#017BFE] underline">{assetNumber}</a>
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
      title: "Installed Date",
      dataIndex: "installedDate",
      key: "installedDate",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => <EditPagePencil />,
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

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  // Function to filter the assets based on search text
  const filteredAssets = useMemo(() => {
    if (!searchText) return assets; // Return full data if no search
    return assets?.filter((asset) =>
      checkedList.some((key) =>
        asset[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, assets, checkedList]);

  // Render expanded row content<
  const expandedRowRender = (record) => (
    <Table
      columns={parentColumns}
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
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => router.push(`/admin/assets/${record._id}`),
        })}
        loading={isLoading}
        size="large"
        scroll={{ x: 1100 }}
        columns={mainColumns}
        rowSelection={rowSelection}
        // rowKey="_id"
        dataSource={filteredAssets}
        pagination={{
          total: filteredAssets?.length,
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
