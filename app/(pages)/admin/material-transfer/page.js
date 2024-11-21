"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";
import { EyeFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PreviewPopup from "../../../../components/previewPopup";
import { getMaterialTransferData } from "app/services/materialTransfer";

const data = [
  {
    assetDesc: "AC Powered 1500 HP O...",
    assetSerial: "21-001",
    materialTransfer: "TRF16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    assetDesc: "AC Powered 1500 HP O...",
    assetSerial: "21-001",
    materialTransfer: "TRF16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    assetDesc: "AC Powered 1500 HP O...",
    assetSerial: "21-001",
    materialTransfer: "TRF16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    assetDesc: "AC Powered 1500 HP O...",
    assetSerial: "21-001",
    materialTransfer: "TRF16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
  {
    assetDesc: "AC Powered 1500 HP O...",
    assetSerial: "21-001",
    materialTransfer: "TRF16696000003",
    creator: "Manager, Rig 27",
    createdDate: "April 10, 2024",
    origination: "Rig 27",
    destination: "-",
    transporter: "Rig 27",
  },
];

const MaterialTransfer = () => {
  const [materialTransferData, setMaterialTransferData] = useState(data);
  const [fetchingData, setFetchingData] = useState(false);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();

  const columns = [
    {
      title: "Asset Description",
      dataIndex: "assetDesc",
      key: "assetDesc",
    },
    {
      title: "Asset Serial #",
      dataIndex: "assetSerial",
      key: "assetSerial",
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
      title: "Material Transfer #",
      dataIndex: "materialTransfer",
      key: "materialTransfer",
    },
    {
      title: "",
      dataIndex: "download",
      key: "download",
      render: () => (
        <EyeFilled
          onClick={(e) => {
            e.stopPropagation();
            setPreviewPopupVisible(true);
          }}
          style={{ fontSize: "20px", cursor: "pointer" }}
        />
      ),
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  useEffect(() => {
    const handleFetchData = async () => {
      const { status, data } = await getMaterialTransferData();
      if (status === 200) {
        setMaterialTransferData(data);
        setFetchingData(false);
      } else {
        setFetchingData(false);
        message.error(data.error || "Failed to fetch data");
      }
      handleFetchData();
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return materialTransferData; // Return full data if no search
    return materialTransferData?.filter((item) =>
      checkedList.some((key) =>
        item[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data, checkedList]);

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <PreviewPopup
        visible={previewPopupVisible}
        setVisible={setPreviewPopupVisible}
      />
      {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
        />
      )}
      <div>
        <ActionBar
          showAddMaterialTransferModal={() =>
            setAddMaterialTransferVisible(true)
          }
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          setSearchText={setSearchText}
          setMaterialTransferData={setMaterialTransferData}
          setFetchingData={setFetchingData}
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
                  `/admin/material-transfer/${record?.materialTransfer}`
                );
              },
            };
          }}
          loading={fetchingData}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={newColumns}
          dataSource={filteredData}
          pagination={{
            total: filteredData.total,
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
