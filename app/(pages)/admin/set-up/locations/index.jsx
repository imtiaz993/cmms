import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { filterLocations, filterSystems, getLocations, getSystems } from "app/services/setUp/systems";

const columns = [
  {
    title: "location",
    dataIndex: "location",
    key: "location",
    render: (location) => (
      <span className="text-[#017BFE] underline">{location}</span>
    ),
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <div className="text-right">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
        />
      </div>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Locations = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [locations, setLocations] = useState([
    {
      location: "Rig 20",
    },
  ]);
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
  }, []);

  const displayedLocations = useMemo(() => {
    if (!searchText) return locations; // Return full data if no search
    return locations?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, locations, checkedList]);

  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredLocations = async () => {
        setLoading(true);
        try {
          const { status, data } = await filterSystems({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setLocations(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered systems"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered systems");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredLocations();
    } else {
      setLocations(locations);
    }
  }, [activeLocation, activeSystem, locations]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Systems</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setLocations={setLocations}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowSelection={rowSelection}
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
