"use client";
import { useEffect, useMemo, useState } from "react";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateInventoryPopup from "./components/createInventoryPopup";
import { useSelector } from "react-redux";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import InventoryDetailsPopup from "./components/inventoryDetailsPopup";
import Button from "@/components/common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { getFilteredInventory } from "app/services/inventory";
import { EditPagePencil } from "@/icons/index";

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
      title: "Location",
      dataIndex: "system",
      key: "system",
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <p className="flex gap-5 text-tertiary">
          <EyeOutlined
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={() => setDetailsPopup(record.partNumber)}
          />
          <span
            className="cursor-pointer"
            onClick={() => router.push("/admin/inventory/" + id + "/edit")}
          >
            <EditPagePencil />
          </span>
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

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  const displayedInventory = useMemo(() => {
    if (!searchText) return filteredInventory;
    return inventory?.filter((inventoryItem) =>
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
            location: activeLocation ? activeLocation : null,
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
      setFilteredInventory(inventory); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem]);

  return (
    <>
      <div className="text-right m-5 sm:m-0 sm:absolute top-[135px] right-5 md:right-10 lg:right-[90px]">
        <Button
          text={
            selectedRowKeys.length > 0
              ? "Shipping Cart (" + selectedRowKeys.length + ")"
              : "Shipping Cart"
          }
          fullWidth={false}
          prefix={<ShoppingCartOutlined />}
          onClick={() => router.push("/admin/new/material-transfer")}
        />
      </div>
      <div className="max-h-[calc(100dvh-220px-50px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
        {console.log("selected inventory", selectedRowKeys)}
        <InventoryDetailsPopup
          visible={detailsPopup}
          setVisible={setDetailsPopup}
          part={detailsPopup}
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
    </>
  );
};

export default Inventory;
