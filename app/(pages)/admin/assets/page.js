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
import { EditPagePencil } from "@/icons/index";
import {
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import AssetDetailsPopup from "./components/assetDetailsPoup";
import Button from "@/components/common/Button";
import { setAssets } from "app/redux/slices/assetsSlice";
import ConfirmationPopup from "@/components/confirmationPopup";
import { updateShippingCart } from "app/redux/slices/assetsShippingCartSlice";
import InventoryDetailsPopup from "../inventory/components/inventoryDetailsPopup";

// System Columns
const systemColumns = [
  { title: "System", dataIndex: "system", key: "system", width: 150 },
];

const Assets = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const params = activeLocation ? "&location=" + activeLocation : "";
  const { assets, isLoading } = useSelector((state) => state.assets);
  const [addAssetVisible, setAddAssetVisible] = useState(false);
  const [expandedSystemKeys, setExpandedSystemKeys] = useState([]);
  const [expandedAssetKeys, setExpandedAssetKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [inventoryDetailsPopup, setInventoryDetailsPopup] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  // Asset Columns
  const assetColumns = [
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
      width: 250,
    },
    {
      title: "Serial #",
      dataIndex: "serialNumber",
      key: "serialNumber",
      width: 100,
    },
    { title: "Model", dataIndex: "model", key: "model", width: 200 },
    {
      title: "Priority",
      dataIndex: "criticality",
      key: "criticality",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "maintStatus",
      key: "maintStatus",
      render: (status) => {
        if (status === "damagedBeyondRepair") return "Damaged Beyond Repair";
        if (status === "outForRepair") return "Out for Repair";
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : "";
      },
      width: 130,
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      width: 200,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <p className="flex gap-5 text-tertiary">
          <EyeOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setAssetDetailsPopup(record);
            }}
          />
          <Link
            href={"/admin/assets/" + id + "/edit"}
            onClick={(e) => e.stopPropagation()}
          >
            <EditPagePencil />
          </Link>
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              setDeleteConfirmation(id);
            }}
          />
        </p>
      ),
      width: 200,
    },
  ];

  // Parts (Inventory) Columns
  const inventoryColumns = [
    {
      title: "Part Number",
      dataIndex: "partNumber",
      key: "partNumber",
      render: (_, record) => (
        <Link
          href={"/admin/inventory/" + record._id}
          className="text-[#017BFE] underline"
        >
          {record.partNumber}
        </Link>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor) => vendor?.name,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <EyeOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setInventoryDetailsPopup(record)}
        />
      ),
    },
  ];

  // Column filtering state
  const defaultCheckedList = assetColumns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newAssetColumns = assetColumns.filter((item) =>
    checkedList.includes(item.key)
  );

  const dispatch = useDispatch();
  const { assetsShippingCart } = useSelector(
    (state) => state.assetsShippingCart
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowsData(rows);
      setSelectedRowKeys(keys);
    },
  };

  // Combined columns for system and asset headers, excluding actions
  const combinedColumns = [
    ...systemColumns,
    ...newAssetColumns.filter((col) => col.key !== "actions"),
    {
      name: "withForActions",
      dataIndex: "",
      key: "withForActions",
      width: 250,
    },
  ];

  // Flatten assets for filtering and searching
  const flattenAssets = (systems) => {
    return systems.map((system) => ({
      ...system,
      key: system._id,
      assets: system.assets.map((asset) => ({
        ...asset,
        key: asset._id,
        systemId: system._id,
        assignedInventories: asset.assignedInventories.map((inv) => ({
          ...inv,
          key: inv._id,
        })),
      })),
    }));
  };

  // Filter systems based on search text and determine expansions
  const displayedSystems = useMemo(() => {
    const flattenedSystems = flattenAssets(filteredAssets);

    if (!searchText) {
      // When search is cleared, expand all systems and collapse all assets
      setExpandedSystemKeys(flattenedSystems.map((system) => system._id));
      setExpandedAssetKeys([]);
      return flattenedSystems;
    }

    const matchedSystemKeys = new Set();
    const matchedAssetKeys = new Set();

    flattenedSystems.forEach((system) => {
      let systemHasMatches = false;
      system.assets.forEach((asset) => {
        const assetMatches = newAssetColumns.some((col) =>
          asset[col.dataIndex]
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase())
        );
        const partsMatch = asset.assignedInventories.some((part) =>
          inventoryColumns.some((col) =>
            part[col.dataIndex]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
        );
        if (assetMatches || partsMatch) {
          systemHasMatches = true;
          if (partsMatch) matchedAssetKeys.add(asset._id);
        }
      });
      const systemMatches = system.system
        .toLowerCase()
        .includes(searchText.toLowerCase());
      if (systemMatches || systemHasMatches) {
        matchedSystemKeys.add(system._id);
      }
    });

    // Expand only matched systems and assets if search text is 3+ characters
    if (searchText.length >= 3) {
      setExpandedSystemKeys([...matchedSystemKeys]);
      setExpandedAssetKeys([...matchedAssetKeys]);
    }

    return flattenedSystems;
  }, [searchText, filteredAssets, checkedList]);

  // Fetch and filter assets
  useEffect(() => {
    const fetchFilteredAssets = async () => {
      setIsFiltering(true);
      try {
        const { status, data } = await getFilteredAssets({
          site: activeLocation || null,
          system: activeSystem || null,
        });
        if (status === 200) {
          setFilteredAssets(data.data);
          // Expand all systems by default
          setExpandedSystemKeys(data.data.map((system) => system._id));
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
  }, [activeLocation, activeSystem]);

  const addToShippingCart = (assetsData) => {
    const matchedAssets = filteredAssets
      .flatMap((system) => system.assets)
      .filter((asset) => assetsData.includes(asset._id));

    matchedAssets.forEach((asset) => {
      dispatch(updateShippingCart(asset));
    });
    message.success("Assets added to shipping cart");
    setSelectedRowKeys([]);
  };

  const handleDelete = async (id) => {
    const { status, data } = await deleteAsset(id);
    if (status === 200) {
      const updatedSystems = filteredAssets.map((system) => ({
        ...system,
        assets: system.assets.filter((asset) => asset._id !== id),
      }));
      setFilteredAssets(updatedSystems);
      dispatch(setAssets(updatedSystems.flatMap((system) => system.assets)));
      message.success(data?.message || "Asset deleted successfully");
    } else {
      message.error(data?.message || "Failed to delete asset");
    }
    setDeleteConfirmation(false);
  };

  // Nested table for parts (assigned inventories)
  const expandedAssetRowRender = (asset, assetIndex, indent, expanded) => (
    <Table
      columns={inventoryColumns}
      dataSource={asset.assignedInventories}
      pagination={false}
      size="small"
      rowKey="key"
      // showHeader={expandedAssetKeys.indexOf(asset.key) === 0} // Headers for first expanded asset
      style={{ paddingLeft: 40 }} // Indent parts table
    />
  );

  // Nested table for assets within a system
  const expandedSystemRowRender = (system) => (
    <Table
      columns={newAssetColumns}
      dataSource={system.assets}
      pagination={false}
      size="small"
      rowKey="key"
      onRow={(record) => ({
        onClick: () => {
          router.push("/admin/assets/" + record._id);
        },
        style: { cursor: "pointer" },
      })}
      rowSelection={rowSelection}
      showHeader={false} // No headers in expanded asset tables
      style={{ paddingLeft: 80 }} // Indent asset table
      expandable={{
        expandedRowRender: expandedAssetRowRender,
        expandedRowKeys: expandedAssetKeys,
        onExpand: (expanded, record) => {
          const newExpandedAssetKeys = expanded
            ? [...expandedAssetKeys, record.key]
            : expandedAssetKeys.filter((key) => key !== record.key);
          setExpandedAssetKeys(newExpandedAssetKeys);
        },
        rowExpandable: (record) => record.assignedInventories.length > 0,
      }}
    />
  );

  return (
    <>
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Asset"}
        message="Are you sure you want to delete this asset?"
        onConfirm={() => handleDelete(deleteConfirmation)}
      />
      <InventoryDetailsPopup
        visible={inventoryDetailsPopup}
        setVisible={setInventoryDetailsPopup}
        inventory={inventoryDetailsPopup}
      />
      <div className="text-right absolute top-[85px] right-5 md:right-10 lg:right-[90px]">
        <Button
          text={
            assetsShippingCart.length > 0
              ? `Shipping Cart (${assetsShippingCart.length})`
              : "Shipping Cart"
          }
          fullWidth={false}
          prefix={<ShoppingCartOutlined />}
          onClick={() =>
            router.push(
              "/admin/new/material-transfer?materialType=asset" + params
            )
          }
        />
      </div>
      <div className="max-h-[calc(100dvh-170px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        <AssetDetailsPopup
          visible={assetDetailsPopup}
          setVisible={setAssetDetailsPopup}
          asset={assetDetailsPopup}
        />
        <ActionBar
          showAddAssetModal={() => setAddAssetVisible(true)}
          setSearchText={setSearchText}
          selectedRowKeys={selectedRowKeys}
          selectedRowsData={selectedRowsData}
          addToShippingCart={addToShippingCart}
          columns={assetColumns}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          setFilteredAssets={setFilteredAssets}
        />
        <Table
          loading={isFiltering || isLoading}
          size="large"
          scroll={{ x: 1100 }}
          columns={combinedColumns}
          dataSource={displayedSystems}
          rowKey="key"
          pagination={{
            total: displayedSystems.length,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} systems`,
            className: "custom-pagination",
          }}
          expandable={{
            expandedRowRender: expandedSystemRowRender,
            expandedRowKeys: expandedSystemKeys,
            onExpand: (expanded, record) => {
              const newExpandedSystemKeys = expanded
                ? [...expandedSystemKeys, record.key]
                : expandedSystemKeys.filter((key) => key !== record.key);
              setExpandedSystemKeys(newExpandedSystemKeys);
            },
            rowExpandable: (record) => record.assets.length > 0,
          }}
          style={{ marginTop: 16 }}
          showHeader={true}
        />
      </div>
    </>
  );
};

export default Assets;
