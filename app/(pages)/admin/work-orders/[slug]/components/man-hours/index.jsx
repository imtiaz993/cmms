import Link from "next/link";
import ActionBar from "./actionBar";
import { Table } from "antd";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { title } from "process";

const ManHours = ({ manHoursData, superUsers, setWorkOrder }) => {
  const columns = [
    {
      title: "Man Hours",
      dataIndex: "manHours",
      key: "manHours",
      render: (manHours) => parseFloat(manHours.toFixed(5)),
    },
    {
      title: "Performed By",
      dataIndex: "performedBy",
      key: "performedBy",
      render: (performedBy) =>
        superUsers.find((user) => user._id === performedBy)?.name,
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      key: "addedBy",
      render: (addedBy) =>
        superUsers.find((user) => user._id === addedBy)?.name,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  return (
    <div className="px-3 lg:px-5 pb-4 mt-1">
      <div>
        <ActionBar
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          setWorkOrder={setWorkOrder}
          superUsers={superUsers}
        />

        <Table
          loading={isLoading}
          size={"large"}
          scroll={{ x: 600 }}
          columns={newColumns}
          dataSource={
            manHoursData &&
            manHoursData.length > 0 &&
            manHoursData.map((i, index) => ({ ...i, key: index }))
          }
          pagination={{
            total: manHoursData?.length,
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

export default ManHours;
