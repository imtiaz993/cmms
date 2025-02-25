import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { message, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  deleteSubCategory,
  filterSubCategories,
  getSubCategories,
} from "app/services/setUp/subCategories";
import { getCategories } from "app/services/setUp/categories";

const SubCategories = ({ activeTab }) => {
  const columns = [
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (subCategory) => (
        <span className="text-[#017BFE] underline">{subCategory}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => (
        <span className="text-[#017BFE] underline">
          {record.category?.category}
        </span>
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
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));

  useEffect(() => {
    const handleFetch = async () => {
      setLoading(true);
      const { status, data } = await getSubCategories();
      if (status === 200) {
        setLoading(false);
        setSubCategories(data.data);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    const handleFetchCategories = async () => {
      const { status, data } = await getCategories();
      if (status === 200) {
        setCategories(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchCategories();
    handleFetch();
  }, [activeTab]);

  const filteredData = useMemo(() => {
    if (!searchText) return subCategories; // Return full data if no search
    return subCategories?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, subCategories, checkedList]);

  const fetchFilteredSubCategories = async (values) => {
    setLoading(true);
    const { status, data } = await filterSubCategories(values);
    if (status === 200) {
      setLoading(false);
      setSubCategories(data.data);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };

  const handleDelete = async (subcategory) => {
    setLoading(true);
    const { status, data } = await deleteSubCategory(subcategory._id);
    if (status === 200) {
      setLoading(false);
      setSubCategories((prev) => prev.filter((i) => i._id !== subcategory._id));
      message.success(data.message);
    } else {
      setLoading(false);
      message.error(data.error);
    }
  };

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Locations</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setSubCategories={setSubCategories}
        categories={categories}
        fetchFilteredSubCategories={fetchFilteredSubCategories}
        activeTab={activeTab}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowKey="_id"
        dataSource={
          filteredData &&
          filteredData.length > 0 &&
          filteredData.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: filteredData?.length,
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

export default SubCategories;
