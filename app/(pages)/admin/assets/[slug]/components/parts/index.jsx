"use client";
import { useState } from "react";
import { Table } from "antd";
import ActionBar from "./actionBar";
import { EyeOutlined } from "@ant-design/icons";
import InventoryDetailsPopup from "app/(pages)/admin/inventory/components/inventoryDetailsPopup";

const Parts = ({ partsData, setData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailsPopup, setDetailsPopup] = useState();
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
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      render: (vendor) => vendor?.vendor,
    },
    {
      title: "",
      dataIndex: "_id",
      key: "actions",
      render: (id, record) => (
        <EyeOutlined
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setDetailsPopup(record)}
        />
      ),
    },
  ];
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  return (
    <div className="px-3 lg:px-5 pb-4 mt-1">
      <div>
        <InventoryDetailsPopup
          visible={detailsPopup}
          setVisible={setDetailsPopup}
          inventory={detailsPopup}
        />
        <ActionBar
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 1400 }}
          columns={newColumns}
          dataSource={
            partsData &&
            partsData.length > 0 &&
            partsData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: partsData?.length,
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

export default Parts;
