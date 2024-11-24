import { message, Table } from "antd";
import { getReadings } from "app/services/reports";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Parent Asset",
    dataIndex: "parentAsset",
    key: "parentAsset",
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
    title: "Hours / Days Downtime",
    dataIndex: "hoursDaysDowntime",
    key: "hoursDaysDowntime",
  },
  {
    title: "Criticality",
    dataIndex: "criticality",
    key: "criticality",
  },
];

const data = [
  {
    parentAsset: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDaysDowntime: "10",
    criticality: "Critical",
  },
  {
    parentAsset: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDaysDowntime: "10",
    criticality: "Critical",
  },
  {
    parentAsset: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDaysDowntime: "10",
    criticality: "Critical",
  },
  {
    parentAsset: "04233889RY",
    assetNo: "123456",
    serialNo: "123456",
    hoursDaysInService: "10",
    hoursDaysDowntime: "10",
    criticality: "Critical",
  },
];

const Readings = () => {
  const [readings, setReadings] = useState(data);
  const [fetchingData, setFetchingData] = useState(false);

  useEffect(() => {
    const handleFetchReadings = async () => {
      setFetchingData(true);
      const { status, data } = await getReadings();
      if (status === 200) {
        setReadings(data.data);
      } else {
        message.error(data.error);
      }
      setFetchingData(false);
    };
    handleFetchReadings();
  }, []);
  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Readings: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={fetchingData}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={columns}
          dataSource={readings}
          pagination={{
            total: readings.length,
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
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
