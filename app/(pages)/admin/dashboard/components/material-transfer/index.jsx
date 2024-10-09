import { useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";
import { PrinterOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const columns = [
  {
    title: "Material Transfer #",
    dataIndex: "materialTransfer",
    key: "materialTransfer",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Created Date",
    dataIndex: "createdDate",
    key: "createdDate",
  },
  {
    title: "Origination",
    dataIndex: "origination",
    key: "origination",
  },
  {
    title: "Destination",
    dataIndex: "destination",
    key: "destination",
  },
  {
    title: "Transporter",
    dataIndex: "transporter",
    key: "transporter",
  },
  {
    title: "",
    dataIndex: "download",
    key: "download",
    render: () => (
      <PrinterOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
    ),
  },
];

const data = [
  {
    materialTransfer: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTransfer: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTransfer: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTransfer: "MT16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    materialTransfer: "MT16696000003",
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
  const router = useRouter();

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
        <p className="text-secondary text-end">
          Total Material Transfer: <span>{"(" + data.length + ")"}</span>
        </p>
        <Table
          rowClassName="cursor-pointer"
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log("record", record);
                router.push(
                  `/admin/dashboard/components/material-transfer/${record?.materialTransfer}`
                );
              },
            };
          }}
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

export default MaterialTransfer;
