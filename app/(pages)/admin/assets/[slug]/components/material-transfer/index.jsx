"use client";
import { useMemo, useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import PreviewPopup from "@/components/previewPopup";
import AddMaterialTransferPopup from "app/(pages)/admin/material-transfer/components/addMaterialTransferPopup";

const MaterialTransfer = ({ materialTransferData, setDetails }) => {
  console.log("materialTransferData", materialTransferData);
  const [fetchingData, setFetchingData] = useState(false);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();
  const { slug } = useParams();

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Origin",
      dataIndex: "origination",
      key: "origination",
      render: (origination) => rigs.find((i) => i.id === origination).name,
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (destination) => rigs.find((i) => i.id === destination).name,
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: () => (
        <EyeOutlined
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  const filteredData = useMemo(() => {
    if (!searchText) return materialTransferData; // Return full data if no search
    return materialTransferData?.filter((item) =>
      checkedList?.some((key) =>
        item[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, materialTransferData, checkedList]);

  return (
    <div className="px-3 lg:px-6 pb-4 pt-3">
      <PreviewPopup
        visible={previewPopupVisible}
        setVisible={setPreviewPopupVisible}
      />
      {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setMaterialTransferData={setDetails}
          assetDetailsSlug={slug}
          setAssetDetails={setDetails}
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
          setDetails={setDetails}
          setFetchingData={setFetchingData}
        />
        <Table
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {
          //       console.log("record", record);
          //       router.push(`/admin/material-transfer/${record?._id}`);
          //     },
          //   };
          // }}
          loading={fetchingData}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={newColumns}
          rowSelection={rowSelection}
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
            className: "custom-pagination",
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
