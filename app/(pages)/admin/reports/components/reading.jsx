import { Input, message, Table } from "antd";
import { getFilteredReadings, getReadings } from "app/services/reports";
import { useEffect, useMemo, useState } from "react";
import ActionBar from "./readingComponents/actionBar";
import { SearchIcon } from "@/icons/index";
import { useSearchParams } from "next/navigation";

const columns = [
  {
    title: "System",
    dataIndex: "system",
    key: "system",
    render: (system) => system.system,
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
    render: (activeHours) => activeHours && parseFloat(activeHours).toFixed(5),
  },
  {
    title: "Days in Service",
    dataIndex: "activeHours",
    key: "daysInService",
    render: (activeHours) =>
      activeHours && parseFloat(activeHours / 24).toFixed(5),
  },
  {
    title: "Hours in Downtime",
    dataIndex: "inActiveHours",
    key: "hoursDowntime",
    render: (inActiveHours) =>
      inActiveHours && parseFloat(inActiveHours).toFixed(5),
  },
  {
    title: "Days in Downtime",
    dataIndex: "inActiveHours",
    key: "daysDowntime",
    render: (inActiveHours) =>
      inActiveHours && parseFloat(inActiveHours / 24).toFixed(5),
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
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
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
      const { status, data } = await getFilteredReadings({
        site: activeLocation ? activeLocation : null,
        system: activeSystem ? activeSystem : null,
      });
      if (status === 200) {
        setReadings(data.data);
      } else {
        message.error(data.error);
      }
      setIsLoading(false);
    };
    handleFetchReadings();
  }, [activeLocation, activeSystem]);
  return (
    <div className="px-5 mt-2 h-[calc(100dvh-230px)] overflow-auto lg:px-10">
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
          setReadings={setReadings}
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
