import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { message, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCategory, getCategories } from "app/services/setUp/categories";
import { useSearchParams } from "next/navigation";

const Categories = () => {
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <span className="text-[#017BFE] underline">{category}</span>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="text-right">
          <DeleteOutlined
            style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  const defaultCheckedList = columns.map((item) => item.key);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  useEffect(() => {
    const handleFetchCategories = async () => {
      setLoading(true);
      const { status, data } = await getCategories();
      if (status === 200) {
        setLoading(false);
        setCategories(data.data);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    handleFetchCategories();
  }, []);

  const displayCategories = useMemo(() => {
    if (!searchText) return categories; // Return full data if no search
    return categories?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, categories, checkedList]);

  const handleDelete = async (category) => {
    setLoading(true);
    const { status, data } = await deleteCategory(category._id);
    if (status === 200) {
      setLoading(false);
      setCategories((prev) => prev.filter((i) => i._id !== category._id));
      message.success(data.message);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Categories</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setCategories={setCategories}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowKey="_id"
        dataSource={
          displayCategories &&
          displayCategories.length > 0 &&
          displayCategories.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: displayCategories?.length,
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
  );
};

export default Categories;
