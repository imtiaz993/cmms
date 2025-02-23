import { Input, message, Table } from "antd";
import { getReadings } from "app/services/reports";
import { useEffect, useMemo, useState } from "react";
import ActionBar from "./readingComponents/actionBar";

const columns = [
  {
    title: "Sub-Category",
    dataIndex: "subCategory",
    key: "subCategory",
  },
  {
    title: "Asset #",
    dataIndex: "assetNo",
    key: "assetNo",
  },
  {
    title: "Serial #",
    dataIndex: "serialNo",
    key: "serialNo",
  },
  {
    title: "Hours / Days in Service",
    dataIndex: "hoursDaysInService",
    key: "hoursDaysInService",
  },
  {
    title: "Hours in Downtime",
    dataIndex: "hoursDowntime",
    key: "hoursDowntime",
  },
  {
    title: "Days in Downtime",
    dataIndex: "daysDowntime",
    key: "daysDowntime",
  },
];

const data = [
  {
    subCategory: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDowntime: "10",
    daysDowntime: "10",
  },
  {
    subCategory: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDowntime: "10",
    daysDowntime: "10",
  },
  {
    subCategory: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDowntime: "10",
    daysDowntime: "10",
  },
  {
    subCategory: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDowntime: "10",
    daysDowntime: "10",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Readings = () => {
  const [readings, setReadings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const filteredData = useMemo(() => {
    if (!searchText) return readings;
    return readings.filter((reading) => {
      const matchesSearch =
        !searchText ||
        Object.values(reading)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      return matchesSearch;
    });
  }, [searchText, readings]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const handleFetchReadings = async () => {
      setIsLoading(true);
      const { status, data } = await getReadings();
      if (status === 200) {
        setReadings(data.data);
      } else {
        message.error(data.error);
      }
      setIsLoading(false);
    };
    handleFetchReadings();
  }, []);
  return (
    <div className="px-5 mt-2 h-[calc(100dvh-210px-60px)] overflow-auto lg:px-10">
      <div className="mt-3">
        <Input.Search
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[300px] searchBar"
        />
      </div>

      <div className="mt-5 bg-primary rounded-lg p-4 md:p-6 shadow-custom">
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
    </div>
  );
};

export default Readings;
