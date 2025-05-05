"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateInventoryPopup from "./components/createInventoryPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import InventoryDetailsPopup from "./components/inventoryDetailsPopup";
import Button from "@/components/common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteInventory, getFilteredInventory } from "app/services/inventory";
import { EditPagePencil } from "@/icons/index";
import ConfirmationPopup from "@/components/confirmationPopup";
import Link from "next/link";
import { setInventory } from "app/redux/slices/inventoriesSlice";
import { updateShippingCart } from "app/redux/slices/inventoryShippingCartSlice";
import { setAssignToAsset } from "app/redux/slices/assignToAssetSlice";

const Inventory = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const {
    inventory = [],
    isLoading,
    error,
  } = useSelector((state) => state.inventory);
  const [detailsPopup, setDetailsPopup] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { inventoryShippingCart } = useSelector(
    (state) => state.inventoryShippingCart
  );

  const columns = [
    {
      title: "Part #",
      dataIndex: "partNumber",
      key: "partNumber",
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (record.items?.length > 1 ? "" : text),
      width: 250,
    },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
      key: "receivedDate",
      render: (text, record) => (record.items?.length > 1 ? "" : text),
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (record.items?.length > 1 ? "" : text),
      width: 100,
    },
    {
      title: "tag ID",
      dataIndex: "tagId",
      key: "tagId",
      render: (text, record) => (record.items?.length > 1 ? "" : text),
      width: 100,
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render: (site, record) => (record.items?.length > 1 ? "" : site?.site),
      width: 200,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor, record) =>
        record.items?.length > 1 ? "" : vendor?.name,
      width: 200,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <p className="flex gap-5 text-tertiary">
          {record.items?.length > 1 ? (
            <DeleteOutlined
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                setDeleteConfirmation(record.items.map((item) => item._id));
              }}
            />
          ) : (
            <>
              <EyeOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setDetailsPopup(record);
                }}
              />
              <Link
                href={`/admin/inventory/${record._id}/edit`}
                onClick={(e) => e.stopPropagation()}
              >
                <EditPagePencil />
              </Link>
              <DeleteOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirmation(record._id);
                }}
              />
            </>
          )}
        </p>
      ),
      width: 150,
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  // Group inventory by partNumber
  const groupedInventory = useMemo(() => {
    const partNumberMap = {};
    filteredInventory.forEach((item) => {
      const partNum = item.partNumber || "";
      if (!partNumberMap[partNum]) {
        partNumberMap[partNum] = {
          partNumber: partNum,
          key: partNum,
          items: [],
        };
      }
      partNumberMap[partNum].items.push({ ...item, key: item._id });
    });
    return Object.values(partNumberMap).map((group) => {
      if (group.items.length === 1) {
        // Single-item: Use item fields, no items array
        const item = group.items[0];
        return {
          ...item,
          key: item._id, // Use _id for single-item rows
          items: [], // Empty items to indicate non-expandable
        };
      }
      // Multi-item: Only partNumber and items
      return group;
    });
  }, [filteredInventory]);

  // Filter and control expansion for search
  const displayedInventory = useMemo(() => {
    if (!groupedInventory.length) return [];

    let preparedInventory = groupedInventory.map((group) => ({
      ...group,
      key: group.items.length > 1 ? group.partNumber : group._id,
    }));

    if (!searchText) {
      setExpandedRowKeys([]);
      return preparedInventory;
    }

    const matchedPartNumbers = new Set();

    preparedInventory.forEach((group) => {
      if (group.items.length > 1) {
        // Multi-item: Check partNumber and items
        const groupMatches = group.partNumber
          .toLowerCase()
          .includes(searchText.toLowerCase());
        const itemMatches = group.items.some((item) =>
          newColumns.some((col) =>
            item[col.dataIndex]
              ?.toString()
              ?.toLowerCase()
              ?.includes(searchText.toLowerCase())
          )
        );
        if (groupMatches || itemMatches) {
          matchedPartNumbers.add(group.partNumber);
        }
      } else {
        // Single-item: Check all fields
        const matches = newColumns.some((col) =>
          group[col.dataIndex]
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase())
        );
        if (matches) {
          matchedPartNumbers.add(group._id);
        }
      }
    });

    if (searchText.length >= 3) {
      setExpandedRowKeys(
        [...matchedPartNumbers].filter((key) =>
          groupedInventory.some(
            (g) => g.partNumber === key && g.items.length > 1
          )
        )
      );
    }

    preparedInventory = preparedInventory.filter((group) => {
      if (group.items.length > 1) {
        return (
          matchedPartNumbers.has(group.partNumber) ||
          group.partNumber.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      return matchedPartNumbers.has(group._id);
    });

    return preparedInventory;
  }, [searchText, groupedInventory, checkedList]);

  useEffect(() => {
    if (activeLocation || activeLocation === "") {
      const fetchFilteredInventory = async () => {
        setIsFiltering(true);
        try {
          const { status, data } = await getFilteredInventory({
            site: activeLocation ? activeLocation : null,
            system: activeSystem ? activeSystem : null,
          });
          if (status === 200) {
            setFilteredInventory(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered inventory"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered inventory");
        } finally {
          setIsFiltering(false);
        }
      };
      fetchFilteredInventory();
    } else {
      setFilteredInventory(inventory);
    }
  }, [activeLocation, activeSystem, inventory]);

  const addToShippingCart = async (keys) => {
    const matchedInventory = filteredInventory.filter((i) =>
      keys.some((key) => {
        const group = groupedInventory.find(
          (g) =>
            (g.items.length > 1 && g.partNumber === key) ||
            (g.items.length === 0 && g._id === key)
        );
        return group?.items.length > 1
          ? group.items.some((item) => item._id === i._id)
          : group?._id === i._id;
      })
    );
    matchedInventory.forEach((i) => {
      dispatch(updateShippingCart({ ...i, selectedQuantity: 1 }));
    });
    message.success("Inventory added to shipping cart");
    setSelectedRowKeys([]);
  };

  const handleAssignToAsset = async () => {
    const matchedInventory = filteredInventory.filter((i) =>
      selectedRowKeys.some((key) => {
        const group = groupedInventory.find(
          (g) =>
            (g.items.length > 1 && g.partNumber === key) ||
            (g.items.length == 0 && g._id === key)
        );
        return group?.items.length > 1
          ? group.items.some((item) => item._id === i._id)
          : group?._id === i._id;
      })
    );
    dispatch(
      setAssignToAsset(
        matchedInventory.map((i) => ({ ...i, selectedQuantity: 1 }))
      )
    );
    message.success("Inventory added");
    setSelectedRowKeys([]);
    router.push("/admin/inventory/assign-to-asset");
  };

  const handleDelete = async (ids) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    for (const id of idArray) {
      const { status, data } = await deleteInventory(id);
      if (status === 200) {
        dispatch(setInventory(inventory.filter((i) => i._id !== id)));
        setFilteredInventory((prev) => prev.filter((i) => i._id !== id));
        message.success(data?.message || "Inventory deleted successfully");
      } else {
        message.error(data?.message || "Failed to delete inventory");
      }
    }
    setDeleteConfirmation(false);
  };

  const expandedRowRender = (record) => (
    <Table
      columns={newColumns.map((col, index) => ({
        ...col,
        onCell: index === 0 ? () => ({}) : undefined,
      }))}
      dataSource={record.items}
      pagination={false}
      size="large"
      rowKey="key"
      showHeader={false}
      // className="nested-inventory-table"
      onRow={(item) => ({
        onClick: () => router.push(`/admin/inventory/${item._id}`),
        style: { cursor: "pointer" },
      })}
      style={{ paddingLeft: "50px" }}
    />
  );

  return (
    <>
      <style jsx global>{`
        .nested-inventory-table .ant-table-tbody > tr > td {
          padding: 16px 8px !important;
        }
        .nested-inventory-table .ant-table-row {
          background: #fafafa !important;
        }
      `}</style>
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Inventory"}
        message="Are you sure you want to delete this inventory?"
        onConfirm={() => handleDelete(deleteConfirmation)}
      />
      <div className="text-right absolute top-[85px] right-5 md:right-10 lg:right-[90px]">
        <Button
          text={
            inventoryShippingCart.length > 0
              ? `Shipping Cart (${inventoryShippingCart.length})`
              : "Shipping Cart"
          }
          fullWidth={false}
          prefix={<ShoppingCartOutlined />}
          onClick={() =>
            router.push(
              `/admin/new/material-transfer?materialType=inventory${
                activeLocation && activeLocation !== null
                  ? "&location=" + activeLocation
                  : ""
              }`
            )
          }
        />
      </div>
      <div className="max-h-[calc(100dvh-170px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        <InventoryDetailsPopup
          visible={detailsPopup}
          setVisible={setDetailsPopup}
          inventory={detailsPopup}
        />
        <div>
          <ActionBar
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            columns={columns}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            setSearchText={setSearchText}
            setFilteredInventory={setFilteredInventory}
            addToShippingCart={addToShippingCart}
            handleAssignToAsset={handleAssignToAsset}
          />
          <Table
            loading={isLoading || isFiltering}
            size="large"
            scroll={{ x: 1400 }}
            columns={newColumns}
            rowSelection={rowSelection}
            rowKey="key"
            dataSource={displayedInventory}
            pagination={{
              total: displayedInventory?.length,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} part numbers`,
              className: "custom-pagination",
            }}
            expandable={{
              expandedRowRender,
              expandedRowKeys,
              onExpand: (expanded, record) => {
                const newExpandedRowKeys = expanded
                  ? [...expandedRowKeys, record.key]
                  : expandedRowKeys.filter((key) => key !== record.key);
                setExpandedRowKeys(newExpandedRowKeys);
              },
              rowExpandable: (record) => record.items?.length > 1,
            }}
            style={{
              marginTop: 16,
              overflow: "auto",
            }}
            onRow={(record) => ({
              onClick: () => {
                if (record.items?.length <= 1) {
                  router.push(`/admin/inventory/${record._id}`);
                }
              },
              style: {
                cursor: record.items?.length <= 1 ? "pointer" : "default",
              },
            })}
          />
        </div>
      </div>
    </>
  );
};

export default Inventory;
