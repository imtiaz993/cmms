"use client";
import { useMemo, useState } from "react";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import CreateInventoryPopup from "./components/createInventoryPopup";
import { useSelector } from "react-redux";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import InventoryDetailsPopup from "./components/inventoryDetailsPopup";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

const Inventory = () => {
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
      dataIndex: "partItem",
      key: "partItem",
    },
    {
      title: "Description",
      dataIndex: "details",
      key: "details",
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
      dataIndex: "location",
      key: "location",
    },
    {
      title: "",
      dataIndex: "partItem",
      key: "actions",
      render: (part) => (
        <EyeOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setDetailsPopup(part)}
        />
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const router = useRouter();

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
