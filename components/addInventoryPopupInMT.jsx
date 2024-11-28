import { message, Modal, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "./common/Button";
import { updateMTAssetInventory } from "app/services/materialTransfer";

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
  selectedRowKeys,
  setSelectedRowKeys,
  materialTransferId,
}) => {
  const { inventory } = useSelector((state) => state.inventory);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selected, setSelected] = useState(selectedRowKeys);
  console.log("selectee", selected);
  console.log("selectee kjey", selectedRowKeys);

  const rowSelection = {
    selectedRowKeys: selected,
    onChange: (keys, rows) => {
      setSelected(keys);
    },
  };

  const handleSubmit = async () => {
    console.log(selected);
    if (materialTransferId) {
      const { status, data } = await updateMTAssetInventory({
        materialTransferId,
        inventory: selected,
      });

      if (status === 200) {
        message.success(data.message || "Updated successfully");
        setSelectedRowKeys(selected);
      } else {
        message.error(data.message || "Something went wrong");
      }
      setVisible(false);
    } else {
      setSelectedRowKeys(selected);
      setVisible(false);
    }
  };
  return (
    <Modal
      title="Add Inventory"
      open={visible}
      onCancel={() => {
        setSelected(selectedRowKeys);
        setVisible(false);
      }}
      width={800}
      footer={
        <div>
          <Button
            className="mr-2"
            onClick={() => {
              setSelected(selectedRowKeys);
              setVisible(false);
            }}
            outlined
            size="small"
            text="Cancel"
            fullWidth={false}
          />
          <Button
            className=""
            onClick={() => handleSubmit()}
            size="small"
            text="Save"
            fullWidth={false}
          />
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
