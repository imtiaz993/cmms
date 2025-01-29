"use client";
import { useEffect, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./actionBar";
import { EditPagePencil } from "@/icons/index";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Event",
    dataIndex: "event",
    key: "event",
  },
  {
    title: "Notes",
    dataIndex: "notes",
    key: "notes",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (text, record) => (
      <div>
        <EditPagePencil />
      </div>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      // const { status, data } = null;
      const status = null,
        data = null;
      if (status === 200) {
        setEvents(data?.data);
        message.success(data?.message || "Events fetched successfully");
      } else {
        message.error(data?.message || "Failed to fetch events");
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="px-3 lg:px-5 pb-4 mt-1">
      <div>
        <ActionBar
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          rowSelection={rowSelection}
          rowKey="_id"
          dataSource={
            events &&
            events.length > 0 &&
            events.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: events?.length,
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

export default Events;
