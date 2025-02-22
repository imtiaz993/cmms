import { useEffect, useMemo, useState } from "react";
import ActionBar from "./components/actionBar";
import { Table } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { filterSites, getSites } from "app/services/setUp/sites";
import { useSearchParams } from "next/navigation";

const columns = [
  {
    title: "Site Name",
    dataIndex: "site",
    key: "site",
    render: (siteName) => (
      <span className="text-[#017BFE] underline">{siteName}</span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Apt./Suite #",
    dataIndex: "apartment",
    key: "apartment",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Zip Code",
    dataIndex: "zip",
    key: "zip",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    render: () => (
      <>
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        <DeleteOutlined
          style={{ fontSize: "20px", cursor: "pointer", marginLeft: "13px" }}
        />
      </>
    ),
  },
];

const defaultCheckedList = columns.map((item) => item.key);

const Sites = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [sites, setSites] = useState([
    {
      site: "Rig 20",
      description: "Description 1",
      address: "Address 1",
      apartment: "Apt 1",
      city: "City 1",
      state: "State 1",
      zip: "Zip 1",
      country: "Country 1",
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
    const handleFetchSites = async () => {
      setLoading(true);
      const { status, data } = await getSites();
      if (status === 200) {
        setLoading(false);
        setSites(data.data);
      } else {
        setLoading(false);
        message.error(data.error);
      }
    };
    handleFetchSites();
  }, []);

  const displayedSites = useMemo(() => {
    if (!searchText) return sites; // Return full data if no search
    return sites?.filter((site) =>
      checkedList.some((key) =>
        site[key]?.toString()?.toLowerCase()?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, sites, checkedList]);

  useEffect(() => {
    if (activeLocation) {
      const fetchFilteredSites = async () => {
        setLoading(true);
        try {
          const { status, data } = await filterSites({
            location: activeLocation,
            system: activeSystem ? activeSystem : "",
          });

          if (status === 200) {
            setSites(data.data);
          } else {
            message.error(data?.message || "Failed to fetch filtered sites");
          }
        } catch (error) {
          message.error("Error fetching filtered sites");
        } finally {
          setLoading(false);
        }
      };

      fetchFilteredSites();
    } else {
      setSites(sites);
    }
  }, [activeLocation, activeSystem, sites]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px-10px)] overflow-auto p-[12px_12px_28px_0px]">
      <h3 className="font-semibold text-lg pb-8">List of Sites</h3>
      <ActionBar
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        columns={columns}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setSearchText={setSearchText}
        setLoading={setLoading}
        setSites={setSites}
      />
      <Table
        loading={loading}
        size="large"
        scroll={{ x: 1200 }}
        columns={newColumns}
        rowSelection={rowSelection}
        rowKey="_id"
        dataSource={
          displayedSites &&
          displayedSites.length > 0 &&
          displayedSites.map((i, index) => ({ ...i, key: index }))
        }
        pagination={{
          total: displayedSites?.length,
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

export default Sites;
