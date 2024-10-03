import React, { useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";

const columns = [
  {
    title: "Asset",
    dataIndex: "name",
  },
  {
    title: "Cost Center",
    dataIndex: "costCenter",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Serial No.",
    dataIndex: "serialNo",
  },
  {
    title: "OEM Serial No.",
    dataIndex: "oemSerialNo",
  },
  {
    title: "Alt ID No.",
    dataIndex: "altIdNo",
  },
  {
    title: "Criticality",
    dataIndex: "criticality",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Company",
    dataIndex: "company",
  },
];

const data = [
  {
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Joe Black",
    costCenter: "Sidney No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Red",
    costCenter: "London No. 2 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Assets = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-8 pb-4 pt-3">
      {addAssetVisible && (
        <CreateAssetPopup
          addAssetVisible={addAssetVisible}
          setAddAssetVisible={setAddAssetVisible}
        />
      )}
      <div>
        <ActionBar
          showAddAssetModal={showAddAssetModal}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
        />
        <div className="flex gap-3 justify-end">
          <p className="text-secondary">
            Total Assets: <span>{"(" + data.length + ")"}</span>
          </p>
          <p className="text-secondary">
            Parent Assets: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          columns={newColumns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
          style={{
            marginTop: 16,
            overflow: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default Assets;
