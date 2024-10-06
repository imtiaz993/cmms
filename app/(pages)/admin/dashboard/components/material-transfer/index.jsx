import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";

const columns = [
  {
    title: "Material Transfer #",
    dataIndex: "materialTranfser",
  },
  {
    title: "Creator",
    dataIndex: "creator",
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
  },
  {
    title: "Origination",
    dataIndex: "origination",
  },
  {
    title: "Destination",
    dataIndex: "destination",
  },
  {
    title: "Transporter",
    dataIndex: "transporter",
  },
];

const data = [
  {
    materialTranfser: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTranfser: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTranfser: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTranfser: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTranfser: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const MaterialTransfer = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  const showAddMaterialTransferModal = () => {
    setAddMaterialTransferVisible(true);
  };

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
        />
      )}
      <div>
        <ActionBar
          showAddMaterialTransferModal={showAddMaterialTransferModal}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
        />
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Material Transfer: <span>{"(" + data.length + ")"}</span>
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

export default MaterialTransfer;
