import { Input, message, Table } from "antd";
import { getReadings } from "app/services/reports";
import { useEffect, useMemo, useState } from "react";
import ActionBar from "./readingComponents/actionBar";
import { SearchIcon } from "@/icons/index";

const columns = [
  {
    title: "System",
    dataIndex: "system",
    key: "system",
  },
  {
    title: "Asset #",
    dataIndex: "assetID",
    key: "assetID",
  },
  {
    title: "Serial #",
    dataIndex: "serialNumber",
    key: "serialNumber",
  },
  {
    title: "Hours in Service",
    dataIndex: "activeHours",
    key: "hoursInService",
  },
  {
    title: "Days in Service",
    dataIndex: "activeHours",
    key: "daysInService",
    render: (activeHours, record) =>
      activeHours && (activeHours !== 0 ? Math.floor(activeHours / 24) : 0),
  },
  {
    title: "Hours in Downtime",
    dataIndex: "inActiveHours",
    key: "hoursDowntime",
  },
  {
    title: "Days in Downtime",
    dataIndex: "inActiveHours",
    key: "daysDowntime",
    render: (inActiveHours, record) =>
      inActiveHours &&
      (inActiveHours !== 0 ? Math.floor(inActiveHours / 24) : 0),
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
  const [searchText, setSearchText] = useState("");
  const filteredData = useMemo(() => {
    if (!searchText) return readings;
    return (
      readings &&
      readings.filter((reading) => {
        const matchesSearch =
          !searchText ||
          Object.values(reading)
            .join(" ")
            .toLowerCase()
            .includes(searchText.toLowerCase());
        return matchesSearch;
      })
    );
  }, [searchText, readings]);

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
        <Input
          placeholder="Search"
          prefix={<SearchIcon />}
          onChange={(e) => setSearchText(e.target.value)}
          className="sm:!w-[362px] searchBar"
          allowClear
        />
      </div>

      <div className="mt-5 bg-primary rounded-lg p-4 md:p-6 shadow-custom">
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
    </div>
  );
};

export default Readings;
