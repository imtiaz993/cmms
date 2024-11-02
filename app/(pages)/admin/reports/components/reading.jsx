import { Table } from "antd";

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
  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Readings: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={false}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={columns}
          dataSource={data}
          pagination={{
            total: data.total,
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
