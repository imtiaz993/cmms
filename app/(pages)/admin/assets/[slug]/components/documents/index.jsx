"use client";
import { Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";

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

const Documents = ({ documentsData, setDetails }) => {
  const [fetchingDocuments, setFetchingDocuments] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredDocuments = useMemo(() => {
    if (!documentsData) return [];
    return documentsData.filter((document) => {
      return (
        !searchText ||
        Object.values(document)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    });
  }, [searchText, documentsData]);

  return (
    <div className="px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar
          setSearchText={setSearchText}
          searchText={searchText}
          setDetails={setDetails} //set Asset Details on Document add
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
