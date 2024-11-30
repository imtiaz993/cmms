"use client";
import { useMemo, useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateInventoryPopup from "./components/createInventoryPopup";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Part Name",
    dataIndex: "partName",
    key: "partName",
  },
  {
    title: "Part Number",
    dataIndex: "partItem",
    key: "partItem",
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
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "PO",
    dataIndex: "PO",
    key: "PO",
  },
  {
    title: "SO",
    dataIndex: "SO",
    key: "SO",
  },
  {
    title: "Invoice number",
    dataIndex: "invoiceNumber",
    key: "invoiceNumber",
  },
  {
    title: "Supplier",
    dataIndex: "supplier",
    key: "supplier",
  },
  {
    title: "Received Date",
    dataIndex: "receivedDate",
    key: "receivedDate",
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Inventory = () => {
  const {
    inventory = [],
    isLoading,
    error,
  } = useSelector((state) => state.inventory); // Get inventory from store
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [addInventoryVisible, setAddInventoryVisible] = useState(false);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState(""); // State for search text

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  const filteredInventory = useMemo(() => {
    if (!searchText) return inventory; // Return full data if no search
    return inventory?.filter((inventoryItem) =>
      checkedList.some((key) =>
        inventoryItem[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, inventory, checkedList]);

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      {console.log("selected inventory", selectedRowKeys)}
      {addInventoryVisible && (
        <CreateInventoryPopup
          addInventoryVisible={addInventoryVisible}
          setAddInventoryVisible={setAddInventoryVisible}
        />
      )}
      <div>
        <ActionBar
          showAddInventoryModal={() => setAddInventoryVisible(true)}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setSearchText={setSearchText}
          // setInventory={setInventory}
        />
        <div className="flex gap-3 justify-end">
          <p className="text-secondary">
            Total Inventory: <span>{"(" + inventory?.length + ")"}</span>
          </p>
          <p className="text-secondary">
            Parent Inventory: <span>{"(" + inventory?.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          rowSelection={rowSelection}
          rowKey="_id"
          dataSource={
            filteredInventory &&
            filteredInventory.length > 0 &&
            filteredInventory.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: filteredInventory?.length,
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

export default Inventory;
