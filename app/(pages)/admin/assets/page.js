"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateAssetPopup from "./components/createAssetPopup";
import { useRouter, useSearchParams } from "next/navigation";
import {
  deleteAsset,
  getAssets,
  getFilteredAssets,
  updateAsset,
} from "app/services/assets";
import { useDispatch, useSelector } from "react-redux";
import { rigs, systems } from "@/constants/rigsAndSystems";
import { EditPagePencil } from "@/icons/index";
import {
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AssetDetailsPopup from "./components/assetDetailsPoup";
import Button from "@/components/common/Button";
import { setMaterialTransfer } from "app/redux/slices/saveMaterialTransferData";
import { setAssets } from "app/redux/slices/assetsSlice";
import ConfirmationPopup from "@/components/confirmationPopup";

// Common column structure
// const baseColumns = [
//   { title: "Asset #", dataIndex: "assetNumber", key: "assetNumber" },
//   // { title: "Description", dataIndex: "description", key: "description" },
//   // {
//   //   title: "Physical Location",
//   //   dataIndex: "physicalLocation",
//   //   key: "physicalLocation",
//   //   render: (physicalLocation) =>
//   //     rigs.find((i) => i.id === physicalLocation).name,
//   // },
//   { title: "Serial #", dataIndex: "serialNumber", key: "serialNumber" },
//   // { title: "Part #", dataIndex: "part", key: "part" },
//   // { title: "Make", dataIndex: "make", key: "make" },
//   { title: "Model", dataIndex: "model", key: "model" },
//   { title: "Priority", dataIndex: "criticality", key: "criticality" },
//   { title: "Status", dataIndex: "maintStatus", key: "maintStatus" },
//   { title: "Installed Date", dataIndex: "installedDate", key: "installedDate" },
// ];

const Assets = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  // const [assets, setAssets] = useState();
  const { assets, isLoading, error } = useSelector((state) => state.assets);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setselectedRowsData] = useState([])
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const dispatch = useDispatch();

  // Filter columns dynamically based on checkedList
  const mainColumns = [
    {
      title: "Asset #",
      dataIndex: "assetID",
      key: "assetID",
      render: (_, record) => (
        <Link
          href={"/admin/assets/" + record._id}
          className="text-[#017BFE] underline"
        >
          {record.assetID}
        </Link>
      ),
    },
    {
      title: "Main System",
      dataIndex: "system",
      key: "mainSystem",
      render: (system) => system.system,
    },
    { title: "Serial #", dataIndex: "serialNumber", key: "serialNumber" },
    { title: "Model", dataIndex: "model", key: "model" },
    { title: "Priority", dataIndex: "criticality", key: "criticality" },
    {
      title: "Status",
      dataIndex: "maintStatus",
      key: "maintStatus",
      render: (status) => {
        if (status === "damagedBeyondRepair") {
          return "Damaged Beyond Repair";
        } else if (status === "outForRepair") {
          return "Out for repair";
        } else {
          return status.charAt(0).toUpperCase() + status.slice(1);
        }
      },
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <p className="flex gap-5 text-tertiary">
          <EyeOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setAssetDetailsPopup(record)}
          />
          <Link href={"/admin/assets/" + id + "/edit"}>
            <EditPagePencil />
          </Link>
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => {
              setDeleteConfirmation(id);
            }}
          />
        </p>
      ),
    },
    // ...baseColumns.filter((col) => checkedList.includes(col.key)),
  ];
  console.log("assets", assets);
  const parentColumns = [
    // { title: "Parent Asset", dataIndex: "parentAsset", key: "parentAsset" },
    // ...baseColumns.filter((col) => checkedList.includes(col.key)),
    {
      title: "Part Name",
      dataIndex: "partName",
      key: "partName",
    },
    {
      title: "Part #",
      dataIndex: "part",
      key: "part",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Installed Date",
      dataIndex: "installedDate",
      key: "installedDate",
    },
  ];

  // const childColumns = [
  //   { title: "Child Asset", dataIndex: "childAsset", key: "childAsset" },
  //   ...baseColumns.filter((col) => checkedList.includes(col.key)),
  // ];

  const defaultCheckedList = mainColumns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newMainColumns = mainColumns.filter((item) =>
    checkedList.includes(item.key)
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setselectedRowsData(rows)
      setSelectedRowKeys(keys);
    },
  };

  const showAddAssetModal = () => {
    setAddAssetVisible(true);
  };

  // Function to filter assets based on search text
  const displayedAssets = useMemo(() => {
    if (!searchText) return filteredAssets;
    return filteredAssets?.filter((asset) =>
      checkedList.some((key) =>
        asset[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, filteredAssets, checkedList]);

  // Render expanded row content<
  const expandedRowRender = (record) => (
    <Table
      columns={newMainColumns}
      dataSource={[record]} // Single parent data for nested table
      pagination={false}
      size="small"
      rowKey="_id"
      rowSelection={rowSelection}
    // expandable={{
    //   expandedRowRender: (parentRecord) => (
    //     <Table
    //       columns={childColumns}
    //       dataSource={[parentRecord]} // Single child data for further nesting
    //       pagination={false}
    //       size="small"
    //       rowKey="key"
    //     />
    //   ),
    // }}
    />
  );

  // Handle row expand/collapse
  const handleRowExpand = (expanded, record) => {
    const newExpandedRowKeys = expanded
      ? [...expandedRowKeys, record._id]
      : expandedRowKeys.filter((key) => key !== record._id);
    setExpandedRowKeys(newExpandedRowKeys);
  };

  useEffect(() => {
    if (activeLocation || activeLocation === "") {
      const fetchFilteredAssets = async () => {
        setIsFiltering(true);
        try {
          const { status, data } = await getFilteredAssets({
            site: activeLocation ? activeLocation : null,
            system: activeSystem ? activeSystem : null,
          });

          if (status === 200) {
            setFilteredAssets(data.data);
          } else {
            message.error(data?.message || "Failed to fetch filtered assets");
          }
        } catch (error) {
          message.error("Error fetching filtered assets");
        } finally {
          setIsFiltering(false);
        }
      };

      fetchFilteredAssets();
    } else {
      setFilteredAssets(assets); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem]);

  const saveMaterialTransfer = async (assetsData) => {
    const matchedAssets = filteredAssets.filter((asset) =>
      assetsData.includes(asset._id)
    );

    dispatch(setMaterialTransfer(matchedAssets));
    router.push("/admin/new/material-transfer?materialType=asset");
  };

  const handleDelete = async (id) => {
    const { status, data } = await deleteAsset(id);
    if (status === 200) {
      dispatch(setAssets(assets.filter((asset) => asset._id !== id)));
      setFilteredAssets((prev) => prev.filter((asset) => asset._id !== id));
      message.success(data?.message || "Asset deleted successfully");
    } else {
      message.error(data?.message || "Failed to delete asset");
    }
    setDeleteConfirmation(false);
  };

  return (
    <>
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Asset"}
        message="Are you sure you want to delete this asset?"
        onConfirm={() => handleDelete(deleteConfirmation)}
      />
      <div className="text-right m-5 sm:m-0 sm:absolute top-[135px] right-5 md:right-10 lg:right-[90px]">
        <Button
          text={
            selectedRowKeys.length > 0
              ? "Shipping Cart (" + selectedRowKeys.length + ")"
              : "Shipping Cart"
          }
          fullWidth={false}
          prefix={<ShoppingCartOutlined />}
          onClick={() => {
            saveMaterialTransfer(selectedRowKeys);
          }}
        />
      </div>
      <div className="max-h-[calc(100dvh-220px-50px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        <AssetDetailsPopup
          visible={assetDetailsPopup}
          setVisible={setAssetDetailsPopup}
          asset={assetDetailsPopup}
        />
        <ActionBar
          showAddAssetModal={() => setAddAssetVisible(true)}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={mainColumns}
          setSearchText={setSearchText}
          setFilteredAssets={setFilteredAssets}
          selectedRowKeys={selectedRowKeys}
          selectedRowsData={selectedRowsData}

        />
        {console.log("displayedAssets", filteredAssets, displayedAssets)}
        <Table
          loading={isFiltering || isLoading}
          size="large"
          scroll={{ x: 1100 }}
          columns={newMainColumns}
          rowSelection={rowSelection}
          rowKey="_id"
          dataSource={displayedAssets}
          pagination={{
            total: displayedAssets?.length,
            // pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            className: "custom-pagination",
          }}
          style={{ marginTop: 16 }}
        // rowKey="key"
        // expandable={{
        //   expandedRowRender,
        //   expandedRowKeys,
        //   onExpand: handleRowExpand,
        // }}
        />
      </div>
    </>
  );
};

export default Assets;
