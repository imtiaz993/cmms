"use client";
import { message, Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { getDocuments } from "app/services/document";

const columns = [
  {
    title: "Asset Description",
    dataIndex: "assetDescription",
    key: "assetDescription",
  },
  {
    title: "Main Asset System",
    dataIndex: "mainAssetSystem",
    key: "mainAssetSystem",
  },
  {
    title: "Document Type",
    dataIndex: "docType",
    key: "docType",
  },
  {
    title: "Uploaded By",
    dataIndex: "uploadedBy",
    key: "uploadedBy",
  },
  {
    title: "Uploaded Date",
    dataIndex: "uploadedDate",
    key: "uploadedDate",
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
  },
  {
    title: "",
    dataIndex: "download",
    key: "download",
    render: () => (
      <DownloadOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
    ),
  },
];

const data = [
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    assetDescription: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    mainAssetSystem: "-",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
];

const Documents = () => {
  const [documents, setDocuments] = useState(data);
  const [fetchingDocuments, setFetchingDocuments] = useState(true);
  const [searchText, setSearchText] = useState(""); // State for search text

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
    if (!searchText) return documents; // Return full data if no search
    return documents?.filter((document) =>
      Object.keys(document).some((key) =>
        document[key]
          ?.toString()
          ?.toLowerCase()
          ?.includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar
          setSearchText={setSearchText}
          setDocuments={setDocuments}
          setFetchingDocuments={setFetchingDocuments}
        />
        <div className="flex justify-end">
          <p className="text-secondary">
            Total Documents: <span>{"(" + data.length + ")"}</span>
          </p>
        </div>
        <Table
          loading={false}
          size={"large"}
          scroll={{ x: 1100 }}
          columns={columns}
          dataSource={filteredDocuments}
          pagination={{
            total: data.total,
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            onChange: () => {},
          }}
          style={{
            marginTop: 16,
            overflow: "auto",
          }}
        />
      </div>
    </div>
  );
};

export default Documents;
