import { useState } from "react";
import { message, Select, Table, Upload } from "antd";
import ActionBar from "./components/actionBar";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";
import Button from "@/components/common/Button";
import { PrinterOutlined } from "@ant-design/icons";
import UploadLinkDocPopup from "./[slug]/uploadLinkDocPopup";
import UploadDocPopup from "./[slug]/uploadDocPopup";
import ViewAssetsDetailsPopup from "./[slug]/viewAssetsDetailsPopup";

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
  {
    title: "",
    dataIndex: "download",
    render: () => (
      <PrinterOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
    ),
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
  const [uploadLinkDocVisible, setUploadLinkDocVisible] = useState(false);
  const [uploadDocVisible, setUploadDocVisible] = useState(false);
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);

  const showAddMaterialTransferModal = () => {
    setAddMaterialTransferVisible(true);
  };

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <UploadLinkDocPopup
        visible={uploadLinkDocVisible}
        setVisible={setUploadLinkDocVisible}
      />
      <UploadDocPopup
        visible={uploadDocVisible}
        setVisible={setUploadDocVisible}
      />
      <ViewAssetsDetailsPopup
        visible={assetDetailsPopup}
        setVisible={setAssetDetailsPopup}
      />
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
        <div className="sm:flex justify-between">
          <div className="flex gap-3">
            <div className="w-1/2 sm:min-w-40">
              <Select
                name="status"
                placeholder="Status"
                style={{ height: "36px", width: "100%" }}
                options={[
                  { label: "Draft", value: "draft" },
                  { label: "In Progress", value: "progress" },
                  { label: "Approved", value: "approved" },
                  { label: "Declined", value: "declined" },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <div className="w-1/2 lg:xw-1/4 flex gap-2">
            <Button
              text="Upload Link Doc"
              outlined
              fullWidth={false}
              onClick={() => {
                setUploadLinkDocVisible(true);
              }}
            />
            <Button
              text="Upload Doc"
              outlined
              fullWidth={false}
              onClick={() => {
                setUploadDocVisible(true);
              }}
            />
            <Button
              text="Upload Doc"
              outlined
              fullWidth={false}
              onClick={() => {
                setAssetDetailsPopup(true);
              }}
            />
          </div>
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
