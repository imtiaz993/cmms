import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateInventoryPopup from "./components/createInventoryPopup";

const columns = [
  {
    title: "Inventory",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cost Center",
    dataIndex: "costCenter",
    key: "costCenter",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Serial No.",
    dataIndex: "serialNo",
    key: "serialNo",
  },
  {
    title: "OEM Serial No.",
    dataIndex: "oemSerialNo",
    key: "oemSerialNo",
  },
  {
    title: "Alt ID No.",
    dataIndex: "altIdNo",
    key: "altIdNo",
  },
  {
    title: "Criticality",
    dataIndex: "criticality",
    key: "criticality",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
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
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
];

const data = [
  {
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Joe Black",
    costCenter: "Sidney No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Red",
    costCenter: "London No. 2 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "John Brown",
    costCenter: "New York No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
  {
    name: "Jim Green",
    costCenter: "London No. 1 Lake Park",
    description: "New Description",
    serialNo: 912,
    oemSerialNo: 5342,
    altIdNo: 345,
    criticality: "Critical",
    category: "Production",
    status: "Active",
    location: "United States",
    company: "ABC Company",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Inventory = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addInventoryVisible, setAddInventoryVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const showAddInventoryModal = () => {
    setAddInventoryVisible(true);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      {addInventoryVisible && (
        <CreateInventoryPopup
          addInventoryVisible={addInventoryVisible}
          setAddInventoryVisible={setAddInventoryVisible}
        />
      )}
      <div>
        <ActionBar
          showAddInventoryModal={showAddInventoryModal}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
        />
        <div className="flex gap-3 justify-end">
          <p className="text-secondary">
            Total Inventory: <span>{"(" + data.length + ")"}</span>
          </p>
          <p className="text-secondary">
            Parent Inventory: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={false}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          rowSelection={rowSelection}
          dataSource={data.map((i, index) => ({ ...i, key: index }))}
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

export default Inventory;
