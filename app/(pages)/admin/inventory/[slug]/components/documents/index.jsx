"use client";
import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./actionBar";
import { EyeOutlined } from "@ant-design/icons";

const columns = [
  { title: "Document Name", dataIndex: "title", key: "title" },
  // {
  //   title: "Asset #",
  //   dataIndex: "asset",
  //   key: "asset",
  //   render: (asset) => asset.id,
  // },
  { title: "Document Type", dataIndex: "type", key: "type" },
  { title: "Category", dataIndex: "type", key: "type" },
  { title: "Uploaded By", dataIndex: "uploadedBy", key: "uploadedBy" },
  { title: "Uploaded Date", dataIndex: "createdAt", key: "createdAt" },
  {
    title: "",
    dataIndex: "link",
    key: "link",
    render: (link) => (
      <a href={link} target="_blank" className="text-tertiary">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </a>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Documents = ({ documentsData, setData, superUsers }) => {
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
          superUsers={superUsers}
          setData={setData}
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          rowKey="_id"
          dataSource={
            documentsData &&
            documentsData.length > 0 &&
            documentsData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: documentsData?.length,
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
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

export default Documents;
