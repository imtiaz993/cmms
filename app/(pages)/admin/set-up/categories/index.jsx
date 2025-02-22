import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { filterCategories, getCategories } from "app/services/setUp/categories";
import { useSearchParams } from "next/navigation";

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
    render: () => (
      <div className="text-right">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
        />
      </div>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Categories = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [categories, setCategories] = useState([
    {
      category: "Crown",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [searchText, setSearchText] = useState("");
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

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

  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredCategories = async () => {
        setLoading(true);
        try {
          const { status, data } = await filterCategories({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setCategories(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered categories"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered categories");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredCategories();
    } else {
      setCategories(categories);
    }
  }, [activeLocation, activeSystem, categories]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Categories</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setCategories={setCategories}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowSelection={rowSelection}
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
