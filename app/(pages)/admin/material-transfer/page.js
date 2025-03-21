"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";
import PreviewPopup from "@/components/previewPopup";
import {
  getFilteredMT,
  getMaterialTransferData,
} from "app/services/materialTransfer";
import { getAdminsManagers } from "app/services/common";

const MaterialTransfer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [materialTransferData, setMaterialTransferData] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [previewPopupVisible, setPreviewPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState(""); // State for search text

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
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Origin",
      dataIndex: "origiationSites",
      key: "origination",
      render: (origiationSites) =>
        origiationSites?.map((i) => i.site).join(","),
    },
    {
      title: "Destination",
      dataIndex: "destinationSite",
      key: "destination",
      render: (destinationSite) => destinationSite?.site,
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
  const [addMaterialTransferVisible, setAddMaterialTransferVisible] =
    useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  // const [selectedInventory, setSelectedInventory] = useState([]);
  const [superUsers, setSuperUsers] = useState([]);

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
  const handleFetchSuperUsers = async () => {
    setFetchingData(true);
    const { status, data } = await getAdminsManagers();
    if (status === 200) {
      setSuperUsers(data.data);
      setFetchingData(false);
    } else {
      message.error(data.error);
      setFetchingData(false);
    }
  };
  useEffect(() => {
    handleFetchSuperUsers();
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
            site: activeLocation ? activeLocation : null,
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
  console.log(materialTransferData);

  return (
    <div className="max-h-[calc(100dvh-170px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
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
          superUsers={superUsers}
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
            // pageSize: 10,
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
