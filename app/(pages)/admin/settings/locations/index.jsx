import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { message, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteSystem,
  filterSystems,
  getSystems,
} from "app/services/setUp/systems";

const Locations = ({ activeTab }) => {
  const columns = [
    {
      title: "System",
      dataIndex: "system",
      key: "system",
      render: (system) => (
        <span className="text-[#017BFE] underline">{system}</span>
      ),
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render: (_, record) => (
        <span>{record.site?.site}</span>
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
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  useEffect(() => {
    const handleFetchLocations = async () => {
      setLoading(true);
      const { status, data } = await getSystems();
      if (status === 200) {
        setLoading(false);
        setLocations(data.data);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    handleFetchLocations();
  }, [activeTab]);

  const displayedLocations = useMemo(() => {
    if (!searchText) return locations; // Return full data if no search
    return locations?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, locations, checkedList]);

  const handleDelete = async (system) => {
    setLoading(true);
    const { status, data } = await deleteSystem(system._id);
    if (status === 200) {
      setLoading(false);
      setLocations((prev) => prev.filter((i) => i._id !== system._id));
      message.success(data.message);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };
  const handleFetchFilteredSystems = async (values) => {
    setLoading(true);
    const { status, data } = await filterSystems(values);
    if (status === 200) {
      setLoading(false);
      setLocations(data.data);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Systems</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setLocations={setLocations}
        handleFetchFilteredSystems={handleFetchFilteredSystems}
        activeTab={activeTab}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowKey="_id"
        dataSource={
          displayedLocations &&
          displayedLocations.length > 0 &&
          displayedLocations.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: displayedLocations?.length,
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

export default Locations;
