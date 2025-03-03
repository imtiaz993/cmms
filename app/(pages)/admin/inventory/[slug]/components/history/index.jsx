"use client";
import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./actionBar";

const columns = [
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Event", dataIndex: "event", key: "event" },
  { title: "Field", dataIndex: "field", key: "field" },
  { title: "Changed From", dataIndex: "changedFrom", key: "changedFrom" },
  { title: "Changed To", dataIndex: "changedTo", key: "changedTo" },
  { title: "Action By", dataIndex: "actionBy", key: "actionBy" },
];

const defaultCheckedList = columns.map((item) => item.key);

const History = ({ historyData }) => {
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
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          dataSource={
            historyData &&
            historyData.length > 0 &&
            historyData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: historyData?.length,
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

export default History;
