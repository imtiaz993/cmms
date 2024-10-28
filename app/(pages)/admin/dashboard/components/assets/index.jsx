import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Asset",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Physical Location",
    dataIndex: "physicalLocation",
    key: "physicalLocation",
  },
  {
    title: "Serial #",
    dataIndex: "serialNo",
    key: "serialNo",
  },
  {
    title: "Asset #",
    dataIndex: "assetNo",
    key: "assetNo",
  },
  {
    title: "Part #",
    dataIndex: "partNo",
    key: "partNo",
  },
  {
    title: "Criticality",
    dataIndex: "criticality",
    key: "criticality",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Installed Date",
    dataIndex: "installedDate",
    key: "installedDate",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
];

const data = [
  {
    name: "John Brown",
    physicalLocation: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    name: "Jim Green",
    description: "New Description",
    physicalLocation: "London No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    name: "Joe Black",
    description: "New Description",
    physicalLocation: "Sidney No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    name: "Jim Red",
    description: "New Description",
    physicalLocation: "London No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
  {
    name: "Joe Black",
    description: "New Description",
    physicalLocation: "Sidney No. 1 Lake Park",
    serialNo: 912,
    assetNo: 5342,
    partNo: 345,
    criticality: "Critical",
    status: "Active",
    installedDate: "12/12/2022",
    company: "ABC Company",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Assets = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const router = useRouter();

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      {addAssetVisible && (
        <CreateAssetPopup
          addAssetVisible={addAssetVisible}
          setAddAssetVisible={setAddAssetVisible}
        />
      )}
      <div>
        <ActionBar
          showAddAssetModal={showAddAssetModal}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
        />
        <div className="flex gap-3 justify-end">
          <p className="text-secondary">
            Total Assets: <span>{"(" + data.length + ")"}</span>
          </p>
          <p className="text-secondary">
            Parent Assets: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          rowClassName="cursor-pointer"
          onRow={(record) => ({
            onClick: () => {
              router.push(`/admin/dashboard/components/assets/${record?.name}`);
            },
          })}
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

export default Assets;
