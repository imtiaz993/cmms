"use client";
import { useEffect, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./actionBar";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";

const columns = [
  // { title: "Asset #", dataIndex: "assetNumber", key: "assetNumber" },
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
  { title: "Start Date", dataIndex: "date", key: "date" },
  {
    title: "Criticality",
    dataIndex: "criticality",
    key: "criticality",
    render: (criticality) =>
      criticality === "Critical" ? (
        <p className="text-red-500">Critical</p>
      ) : criticality === "High" ? (
        <p className="text-orange-500">High</p>
      ) : criticality === "Medium" ? (
        <p className="text-yellow-500">Medium</p>
      ) : (
        <p className="text-green-500 capitalize">{criticality}</p>
      ),
  },
  { title: "Schedule", dataIndex: "schedule", key: "schedule" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <p className="capitalize">{status}</p>,
  },
  { title: "Last Performed", dataIndex: "lastPerformed", key: "lastPerformed" },
  {
    title: "",
    dataIndex: "_id",
    key: "actions",
    render: (id) => (
      <Link href={`/admin/work-orders/${id}`} className="text-tertiary">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </Link>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Maintenance = ({ maintenanceData, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  return (
    <div className="px-3 lg:px-5 pb-4 mt-1">
      <div>
        <ActionBar
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          setData={setData}
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          dataSource={
            maintenanceData &&
            maintenanceData.length > 0 &&
            maintenanceData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: maintenanceData?.length,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            className: "custom-pagination",
          }}
          style={{
            marginTop: 16,
            overflow: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default Maintenance;
