"use client";
import { useMemo, useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import PreviewPopup from "@/components/previewPopup";

const MaterialTransfer = ({ materialTransferData, setData, superUsers }) => {
  console.log("materialTransferData", materialTransferData);
  const [fetchingData, setFetchingData] = useState(false);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();
  const { slug } = useParams();

  const columns = [
    {
      title: "Material Transfer #",
      dataIndex: "_id",
      key: "_id",
      // render: (_id) => (
      //   <span>
      //     {_id}
      //   </span>
      // ),
    },
    {
      title: "Description",
      dataIndex: "comments",
      key: "description",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Origin",
      dataIndex: "origination",
      key: "origination",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-3">
          <EyeOutlined
            onClick={(e) => {
              // e.stopPropagation();
              // setPreviewPopupVisible(true);
              router.push(`/admin/material-transfer/${record._id}`);
            }}
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
        </div>
      ),
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

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
      <div>
        <ActionBar
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          setSearchText={setSearchText}
          setData={setData}
          setFetchingData={setFetchingData}
          superUsers={superUsers}
          slug={slug}
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
          dataSource={
            filteredData &&
            filteredData.length > 0 &&
            filteredData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: filteredData?.length,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
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
