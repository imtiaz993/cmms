"use client";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { getDocuments } from "app/services/document";

const columns = [
  {
    title: "Document Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
    render: (asset) => asset.id,
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
    title: "Uploaded Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Comments",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "",
    dataIndex: "link",
    key: "link",
    render: (link) => (
      <a href={link} target="_blank">
        <DownloadOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </a>
    ),
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar
          setSearchText={setSearchText}
          searchText={searchText}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Documents: <span>({filteredDocuments.length})</span>
          </p>
        </div>
        <Table
          loading={fetchingDocuments}
          size="large"
          scroll={{ x: 1100 }}
          columns={columns}
          dataSource={filteredDocuments}
          pagination={{
            total: filteredDocuments.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }}
          style={{ marginTop: 16, overflow: "auto" }}
        />
      </div>
    </div>
  );
};

export default Documents;
