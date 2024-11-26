import { Modal, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./common/Button";

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

const AddInventoryPopupMT = ({
  visible,
  setVisible,
  inventory,
  setSelectedInventory,
  selectedRowKeys,
  setSelectedRowKeys,
}) => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedInventory(rows);
      setSelectedRowKeys(keys);
    },
  };

  return (
    <Modal
      title="Add Inventory"
      open={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={
        <div>
          <Button
            className="mr-2"
            onClick={() => setVisible(false)}
            outlined
            size="small"
            text="Close"
            fullWidth={false}
          />
          {/* <Button
            className=""
            onClick={() => setVisible(false)}
            size="small"
            text="Save"
            fullWidth={false}
          /> */}
        </div>
      }
    >
      <div>
        <Table
          columns={newColumns}
          dataSource={inventory}
          size="small"
          rowSelection={rowSelection}
          rowKey="_id"
          scroll={{ x: 1200 }}
          pagination={{
            total: inventory?.length,
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
          }}
        />
      </div>
    </Modal>
  );
};

export default AddInventoryPopupMT;
