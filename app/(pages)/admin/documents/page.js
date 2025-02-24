"use client";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { getDocuments, getDocumentsByCategory } from "app/services/document";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const columns = [
  {
    title: "Document Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Asset / MT / workOrders",
    dataIndex: "asset",
    key: "asset",
    render: (text, record) => {
      let content = "unknown"; // Default content
      let url = "#"; // Default URL

      // Check for asset, materialTransfer, and workOrder properties
      if (record.asset) {
        content = "Asset (" + record.asset.id + ")";
        url = "/admin/assets/" + record.asset.id; // Update URL for asset
      } else if (record.materialTransfer) {
        content = "Material Transfer (" + record.materialTransfer.id + ")";
        url = "/admin/material-transfer/" + record.materialTransfer.id; // URL for material transfer
      } else if (record.workOrder) {
        content = "Work Order (" + record.workOrder.id + ")";
        url = "/admin/work-orders/" + record.workOrder.id; // URL for work order
      }

      return (
        <Link href={url} target="_blank">
          {content}
        </Link>
      );
    },
  },
  {
    title: "Document Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Category",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Uploaded By",
    dataIndex: "uploadedBy",
    key: "uploadedBy",
  },
  {
    title: "Upload Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  // {
  //   title: "Description",
  //   dataIndex: "description",
  //   key: "description",
  // },
  {
    title: "Preview",
    dataIndex: "link",
    key: "link",
    render: (link) => (
      <a href={link} target="_blank" className="text-tertiary">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </a>
    ),
  },
];
const defaultCheckedList = columns.map((item) => item.key);

const Documents = () => {
  const searchParams = useSearchParams();
  const activeLocation = searchParams.get("location") || "";
  const activeSystem = searchParams.get("system") || "";
  const [documents, setDocuments] = useState([]);
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const newColumns = columns.filter((item) => checkedList.includes(item.key));
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const handleFetchDocuments = async () => {
      setFetchingDocuments(true);
      const { status, data } = await getDocuments();
      if (status === 200) {
        setFetchingDocuments(false);
        setDocuments(data.data);
      } else {
        setFetchingDocuments(false);
        message.error(data.error);
      }
    };
    handleFetchDocuments();
  }, []);

  const displayedDocuments = useMemo(() => {
    if (!searchText) return documents;
    return documents?.filter((document) =>
      checkedList.some((key) =>
        document[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, documents, checkedList]);

  useEffect(() => {
    if (activeLocation || activeLocation === "") {
      const fetchFilteredDocuments = async () => {
        setFetchingDocuments(true);
        try {
          const { status, data } = await getDocumentsByCategory({
            location: activeLocation ? activeLocation : null,
            system: activeSystem ? activeSystem : null,
          });

          if (status === 200) {
            setDocuments(data.data);
          } else {
            message.error(data?.message || "Failed to fetch filtered assets");
          }
        } catch (error) {
          message.error("Error fetching filtered assets");
        } finally {
          setFetchingDocuments(false);
        }
      };

      fetchFilteredDocuments();
    } else {
      setDocuments(documents); // If no filters, use full assets list
    }
  }, [activeLocation, activeSystem]);

  return (
    <div className="max-h-[calc(100dvh-140px-16px-60px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
      <div>
        <ActionBar
          setSearchText={setSearchText}
          searchText={searchText}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
          columns={columns}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          setDocuments={setDocuments}
          documents={documents}
          setIsLoading={setFetchingDocuments}
        />
        {/* <div className="flex justify-end">
          <p className="text-secondary">
            Total Documents: <span>({filteredDocuments.length})</span>
          </p>
        </div> */}
        <Table
          loading={fetchingDocuments}
          size="large"
          scroll={{ x: 1100 }}
          columns={newColumns}
          rowKey="_id"
          rowSelection={rowSelection}
          dataSource={displayedDocuments}
          pagination={{
            total: displayedDocuments.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
            className: "custom-pagination",
          }}
          style={{ marginTop: 16, overflow: "auto" }}
        />
      </div>
    </div>
  );
};

export default Documents;
