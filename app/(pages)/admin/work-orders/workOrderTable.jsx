import { Table } from "antd";

const WOtable = ({
  filteredColumns,
  filteredData,
  fetchingWorkOrders,
  rowSelection,
}) => {
  console.log("rowSelection", rowSelection);
  return (
    <Table
      // rowClassName="cursor-pointer"
      // onRow={(record) => ({
      //   onClick: () => router.push(`/admin/work-orders/${record?._id}`),
      // })}
      loading={fetchingWorkOrders}
      size="large"
      scroll={{ x: 1100 }}
      columns={filteredColumns}
      rowSelection={rowSelection}
      rowKey={"_id"}
      dataSource={filteredData}
      pagination={{
        total: filteredData.length,
        // pageSize: 10,
        showSizeChanger: true,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        className: "custom-pagination",
      }}
      style={{ marginTop: 16, overflow: "auto" }}
    />
  );
};

export default WOtable;
