"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { EyeFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PreviewPopup from "../../../../components/previewPopup";
import { getMaterialTransferData } from "app/services/materialTransfer";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";

const MaterialTransfer = () => {
  const [materialTransferData, setMaterialTransferData] = useState();
  const [fetchingData, setFetchingData] = useState(false);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();

  const columns = [
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Creator",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "Transporter",
      dataIndex: "transporter",
      key: "transporter",
    },
    {
      title: "Material Transfer Type",
      dataIndex: "materialTransferType",
      key: "materialTransferType",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
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

  const handleFetchData = async () => {
    const { status, data } = await getMaterialTransferData();
    if (status === 200) {
      setMaterialTransferData(data.data);
      setFetchingData(false);
    } else {
      setFetchingData(false);
      message.error(data.error || "Failed to fetch data");
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return materialTransferData; // Return full data if no search
    return materialTransferData?.filter((item) =>
      checkedList?.some((key) =>
        item[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, materialTransferData, checkedList]);

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
          handleFetchData={handleFetchData}
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
          Total Material Transfer:{" "}
          <span>{"(" + materialTransferData?.length + ")"}</span>
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
          dataSource={
            filteredData &&
            filteredData.length > 0 &&
            filteredData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: filteredData?.length,
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
