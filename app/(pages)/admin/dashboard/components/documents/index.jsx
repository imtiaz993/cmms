import { Table } from "antd";
import ActionBar from "./components/actionBar";
import { DownloadOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Document Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Parent",
    dataIndex: "parent",
    key: "parent",
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
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
  {
    name: "#1 PUMP GEAREND INSP 8-16-23.pdf",
    category: "Work Order",
    parent: "UWO013940000021",
    docType: "Inspection Document",
    uploadedBy: "Manager, Rig 21",
    uploadedDate: "June 15, 2024",
    comments: "SN#",
  },
];

const Documents = () => {
  return (
    <div className="h-[calc(100dvh-140px)] overflow-auto px-3 lg:px-6 pb-4 pt-3">
      <div>
        <ActionBar />
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
          dataSource={data}
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
