import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { filterSubCategories, getSubCategories } from "app/services/setUp/subCategories";

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

const SubCategories = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [subCategories, setSubCategories] = useState([
    {
      subCategory: "Sub Category 1",
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
    handleFetch();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return subCategories; // Return full data if no search
    return subCategories?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, subCategories, checkedList]);

  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredSubCategories = async () => {
        setLoading(true);
        try {
          const { status, data } = await filterSubCategories({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setSubCategories(data.data);
          } else {
            message.error(
              data?.message || "Failed to fetch filtered sub categories"
            );
          }
        } catch (error) {
          message.error("Error fetching filtered sub categories");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredSubCategories();
    } else {
      setSubCategories(subCategories);
    }
  }, [activeLocation, activeSystem, subCategories]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Locations</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setSubCategories={setSubCategories}
      />
      <Table
        loading={loading}
        size="large"
        // scroll={{ x: 300 }}
        columns={newColumns}
        rowSelection={rowSelection}
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
