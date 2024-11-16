"use client";
import { useEffect, useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";
import { useRouter } from "next/navigation";
import { getAssets } from "app/services/assets";

// Common column structure
const baseColumns = [
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Physical Location",
    dataIndex: "physicalLocation",
    key: "physicalLocation",
  },
  { title: "Serial #", dataIndex: "serialNo", key: "serialNo" },
  { title: "Asset #", dataIndex: "assetNo", key: "assetNo" },
  { title: "Part #", dataIndex: "partNo", key: "partNo" },
  { title: "Make", dataIndex: "make", key: "make" },
  { title: "Model", dataIndex: "model", key: "model" },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Criticality", dataIndex: "criticality", key: "criticality" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Installed Date", dataIndex: "installedDate", key: "installedDate" },
  { title: "Company", dataIndex: "company", key: "company" },
];

// Data with unique keys
const data = [
  {
    key: "johnBrown",
    mainSystem: "John Brown",
    physicalLocation: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    key: "jimGreen",
    mainSystem: "Jim Green",
    description: "New Description",
    physicalLocation: "London No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    key: "joeBlack",
    mainSystem: "Joe Black",
    description: "New Description",
    physicalLocation: "Sidney No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
];

const defaultCheckedList = [
  "mainSystem",
  "physicalLocation",
  "assetNo",
  "make",
  "model",
  "category",
  "criticality",
  "status",
  "installedDate",
];

const Assets = () => {
  const [assets, setAssets] = useState()
  const [fetchingAssets, setFetchingAssets] = useState(true)
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const handleFetchAssets = async () => {
      const { status, data } = await getAssets();
      if (status === 200) {
        setFetchingAssets(false)
        setAssets(data.data)
      } else {
        setFetchingAssets(false)
        message.error(data.error);
      }
    }
    handleFetchAssets()
  }, [])


  // Filter columns dynamically based on checkedList
  const mainColumns = [
    { title: "Main System", dataIndex: "mainSystem", key: "mainSystem" },
    ...baseColumns.filter((col) => checkedList.includes(col.key)),
  ];

  const parentColumns = [
    { title: "Parent Asset", dataIndex: "parentAsset", key: "parentAsset" },
    ...baseColumns.filter((col) => checkedList.includes(col.key)),
  ];

  const childColumns = [
    { title: "Child Asset", dataIndex: "childAsset", key: "childAsset" },
    ...baseColumns.filter((col) => checkedList.includes(col.key)),
  ];

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  // Render expanded row content
  const expandedRowRender = (record) => (
    <Table
      columns={parentColumns}
      dataSource={[record]} // Single parent data for nested table
      pagination={false}
      size="small"
      rowKey="key"
      expandable={{
        expandedRowRender: (parentRecord) => (
          <Table
            columns={childColumns}
            dataSource={[parentRecord]} // Single child data for further nesting
            pagination={false}
            size="small"
            rowKey="key"
          />
        ),
      }}
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
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      {addAssetVisible && (
        <CreateAssetPopup
          addAssetVisible={addAssetVisible}
          setAddAssetVisible={setAddAssetVisible}
        />
      )}
      <ActionBar
        showAddAssetModal={showAddAssetModal}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={baseColumns}
      />
      <div className="flex gap-3 justify-end">
        <p className="text-secondary">
          Total Assets: <span>{`(${assets?.length})`}</span>
        </p>
        <p className="text-secondary">
          Parent Assets: <span>{`(${assets?.length})`}</span>
        </p>
      </div>
      <Table
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => router.push(`/admin/assets/${record.key}`),
        })}
        loading={fetchingAssets}
        size="large"
        scroll={{ x: 1100 }}
        columns={mainColumns}
        dataSource={assets && assets.length > 0 && assets}
        pagination={{
          total: assets?.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
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
