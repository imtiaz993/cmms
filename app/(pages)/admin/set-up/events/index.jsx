import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { message, Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import {
  deleteEvent,
  filterEvents,
  getEvents,
} from "app/services/setUp/events";

const Events = () => {
  const columns = [
    {
      title: "events",
      dataIndex: "event",
      key: "event",
      render: (event) => (
        <span className="text-[#017BFE] underline">{event}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="text-right">
          <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const { status, data } = await getEvents();
      if (status === 200) {
        setLoading(false);
        setEvents(data.data);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    handleFetch();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return events; // Return full data if no search
    return events?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, events, checkedList]);
  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredEvents = async () => {
        setLoading(true);
        try {
          const { status, data } = await filterEvents({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setEvents(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered sub categories"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered sub categories");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredEvents();
    } else {
      setEvents(events);
    }
  }, [activeLocation, activeSystem]);

  const handleDelete = async (event) => {
    setLoading(true);
    const { status, data } = await deleteEvent(event._id);
    if (status === 200) {
      setLoading(false);
      setEvents((prev) => prev.filter((i) => i._id !== event._id));
      message.success(data.message);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };
  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Events</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setEvents={setEvents}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowSelection={rowSelection}
        rowKey="_id"
        dataSource={
          filteredData &&
          filteredData.length > 0 &&
          filteredData.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: filteredData?.length,
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
  );
};

export default Events;
