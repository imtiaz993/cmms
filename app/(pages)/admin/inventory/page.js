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

const Inventory = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const {
    inventory = [],
    isLoading,
    error,
  } = useSelector((state) => state.inventory); // Get inventory from store
  const [detailsPopup, setDetailsPopup] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const columns = [
    {
      title: "Part #",
      dataIndex: "partNumber",
      key: "partNumber",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Received Date",
      dataIndex: "receivedDate",
      key: "receivedDate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "tag ID",
      dataIndex: "tagId",
      key: "tagId",
    },
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      render: (site) => site?.site,
    },
    {
      title: "System",
      dataIndex: "system",
      key: "system",
      render: (system) => system?.system,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <p className="flex gap-5 text-tertiary">
          <EyeOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setDetailsPopup(record)}
          />
          <Link href={`/admin/inventory/${id}/edit`}>
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
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { inventoryShippingCart } = useSelector(
    (state) => state.inventoryShippingCart
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  const displayedInventory = useMemo(() => {
    if (!searchText) return filteredInventory;
    return filteredInventory?.filter((inventoryItem) =>
      checkedList.some((key) =>
        inventoryItem[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, filteredInventory, checkedList]);

  useEffect(() => {
    if (activeLocation || activeLocation == "") {
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
      setFilteredInventory(inventory); // If no filters, use full inventory list
    }
  }, [activeLocation, activeSystem]);

  const addToShippingCart = async (inventoryList) => {
    const matchedInventory = filteredInventory.filter((i) =>
      inventoryList.includes(i._id)
    );

    // Dispatch updateShippingCart for each matched inventory
    matchedInventory.forEach((i) => {
      dispatch(updateShippingCart({ ...i, selectedQuantity: 1 }));
    });

    message.success("Inventory added to shipping cart");
    setSelectedRowKeys([]);
  };

  const handleDelete = async (id) => {
    const { status, data } = await deleteInventory(id);
    if (status === 200) {
      dispatch(setInventory(inventory.filter((i) => i._id !== id)));
      setFilteredInventory((prev) => prev.filter((i) => i._id !== id));
      message.success(data?.message || "Inventory deleted successfully");
    } else {
      message.error(data?.message || "Failed to delete inventory");
    }
    setDeleteConfirmation(false);
  };

  return (
    <>
      <ConfirmationPopup
        visible={deleteConfirmation}
        setVisible={setDeleteConfirmation}
        title={"Delete Inventory"}
        message="Are you sure you want to delete this inventory?"
        onConfirm={() => handleDelete(deleteConfirmation)}
      />
      <div className="text-right m-5 sm:m-0 sm:absolute top-[135px] right-5 md:right-10 lg:right-[90px]">
        <Button
          text={
            inventoryShippingCart.length > 0
              ? "Shipping Cart (" + inventoryShippingCart.length + ")"
              : "Shipping Cart"
          }
          fullWidth={false}
          prefix={<ShoppingCartOutlined />}
          onClick={() =>
            router.push("/admin/new/material-transfer?materialType=inventory")
          }
        />
      </div>
      <div className="max-h-[calc(100dvh-220px-50px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        {console.log("selected inventory", selectedRowKeys)}
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
            // setInventory={setInventory}
          />
          {/* <div className="flex gap-3 justify-end">
          <p className="text-secondary">
            Total Inventory: <span>{"(" + inventory?.length + ")"}</span>
          </p>
          <p className="text-secondary">
            Parent Inventory: <span>{"(" + inventory?.length + ")"}</span>
          </p>
        </div> */}
          <Table
            loading={isLoading || isFiltering}
            size={"large"}
            scroll={{ x: 1400 }}
            columns={newColumns}
            rowSelection={rowSelection}
            rowKey="_id"
            dataSource={
              displayedInventory &&
              displayedInventory.length > 0 &&
              displayedInventory.map((i, index) => ({ ...i, key: index }))
            }
            pagination={{
              total: displayedInventory?.length,
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
    </>
  );
};

export default Inventory;
