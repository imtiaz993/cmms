import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { message, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { deleteEvent, getEvents } from "app/services/setUp/events";
import ConfirmationPopup from "@/components/confirmationPopup";

const Events = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const columns = [
    {
      title: "Events",
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
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
            onClick={() => setDeleteConfirmation(record)}
          />
        </div>
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

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
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Event"}
        message="Are you sure you want to delete this event?"
        onConfirm={() => handleDelete(deleteConfirmation)}
      />
      <h3 className="font-semibold text-lg pb-8">List of Events</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setEvents={setEvents}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowKey="_id"
        dataSource={
          filteredData &&
          filteredData.length > 0 &&
          filteredData.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: filteredData?.length,
          // pageSize: 10,
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
  );
};

export default Events;
