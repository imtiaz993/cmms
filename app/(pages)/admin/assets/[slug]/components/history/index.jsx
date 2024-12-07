import { Table } from "antd";
import ActionBar from "./components/actionBar";
import { useState } from "react";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Cost Center",
    dataIndex: "costCenter",
    key: "costCenter",
  },

  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Parent Asset",
    dataIndex: "parentAsset",
    key: "parentAsset",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Change Summary",
    dataIndex: "changeSummary",
    key: "changeSummary",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
];

const data = [
  {
    date: "February 16, 2024",
    costCenter: "Rig 26 - Hydraulic Systems",
    asset: "04233889RY",
    parentAsset: "-",
    status: "In Full Service",
    location: "-",
    changeSummary: "-",
    createdBy: "Bilberry, Danielle",
  },
  {
    date: "February 15, 2024",
    costCenter: "Rig 26 - Hydraulic Systems",
    asset: "04233889RY",
    parentAsset: "-",
    status: "In Full Service",
    location: "-",
    changeSummary: "-",
    createdBy: "Bilberry, Danielle",
  },
  {
    date: "February 14, 2024",
    costCenter: "Rig 26 - Hydraulic Systems",
    asset: "04233889RY",
    parentAsset: "-",
    status: "In Full Service",
    location: "-",
    changeSummary: "-",
    createdBy: "Bilberry, Danielle",
  },
];
const defaultCheckedList = columns.map((item) => item.key);

const HistoryAssetDetail = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  return (
    <div className="px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar checkedList={checkedList} setCheckedList={setCheckedList} columns={columns} />
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Historical Updates: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={false}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={newColumns}
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

export default HistoryAssetDetail;
