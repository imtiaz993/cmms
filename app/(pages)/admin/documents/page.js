"use client";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { getDocuments } from "app/services/document";
import Link from "next/link";

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
      <a href={link} target="_blank">
        <EyeOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </a>
    ),
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
    },
  };

  useEffect(() => {
    const handleFetchDocuments = async () => {
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

  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    return documents.filter((document) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(document.type);
      const matchesSearch =
        !searchText ||
        Object.values(document)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchText, selectedCategories, documents]);

  return (
    <div className="h-[calc(100dvh-140px-16px-60px)] overflow-auto px-3 lg:px-6 pb-4 pt-5 bg-primary mx-5 md:mx-10 rounded-lg shadow-custom">
      <div>
        <ActionBar
          setSearchText={setSearchText}
          searchText={searchText}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        {/* <div className="flex justify-end">
          <p className="text-secondary">
            Total Documents: <span>({filteredDocuments.length})</span>
          </p>
        </div> */}
        <Table
          loading={false}
          size="large"
          scroll={{ x: 1100 }}
          columns={columns}
          rowKey="_id"
          rowSelection={rowSelection}
          dataSource={filteredDocuments}
          pagination={{
            total: filteredDocuments.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          style={{ marginTop: 16, overflow: "auto", fontSize: "18px" }}
        />
      </div>
    </div>
  );
};

export default Documents;
