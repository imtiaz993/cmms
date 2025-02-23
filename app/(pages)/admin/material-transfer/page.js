"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { EyeFilled, EyeOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import PreviewPopup from "@/components/previewPopup";
import {
  getFilteredMT,
  getMaterialTransferData,
} from "app/services/materialTransfer";
import AddMaterialTransferPopup from "./components/addMaterialTransferPopup";
import { rigs } from "@/constants/rigsAndSystems";
import Link from "next/link";
import { EditPagePencil } from "@/icons/index";

const MaterialTransfer = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [materialTransferData, setMaterialTransferData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text

  const columns = [
    {
      title: "Asset #",
      dataIndex: "assets",
      key: "assetNumber",
      render: (assets) => (
        <Link
          className="text-[#017BFE] underline"
          href={`/admin/assets/${assets[0]._id}`}
        >
          {assets
            ?.map((asset, index) =>
              index === 0 ? asset._id : ", " + asset._id
            )
            .join("")}

          {/*Assets has multiple assets but we are showing only one*/}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "comments",
      key: "description",
    },
    {
      title: "Created Date",
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
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: () => (
        <div className="flex gap-3">
          <EyeOutlined
            onClick={(e) => {
              e.stopPropagation();
              setPreviewPopupVisible(true);
            }}
            style={{ fontSize: "20px", cursor: "pointer" }}
          />
          <EditPagePencil />
        </div>
      ),
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  // const [selectedInventory, setSelectedInventory] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

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
    if (!activeLocation) handleFetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return materialTransferData; // Return full data if no search
    return materialTransferData?.filter((item) =>
      checkedList?.some((key) =>
        item[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, materialTransferData, checkedList]);

  useEffect(() => {
    if (activeLocation || activeLocation == "") {
      const fetchFilteredMaterials = async () => {
        setFetchingData(true);
        try {
          const { status, data } = await getFilteredMT({
            location: activeLocation ? activeLocation : null,
            system: activeSystem ? activeSystem : null,
          });

          if (status === 200) {
            setMaterialTransferData(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered materials transfer"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered materials transfer");
        } finally {
          setFetchingData(false);
        }
      };

      fetchFilteredMaterials();
    } else {
      setMaterialTransferData(materialTransferData); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
      <PreviewPopup
        visible={previewPopupVisible}
        setVisible={setPreviewPopupVisible}
      />
      {/* {addMaterialTransferVisible && (
        <AddMaterialTransferPopup
          addMaterialTransferVisible={addMaterialTransferVisible}
          setAddMaterialTransferVisible={setAddMaterialTransferVisible}
          selectedInventory={selectedInventory}
          setSelectedInventory={setSelectedInventory}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setMaterialTransferData={setMaterialTransferData}
        />
      )} */}
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
