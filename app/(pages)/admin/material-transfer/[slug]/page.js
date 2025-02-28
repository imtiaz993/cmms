"use client";
import Button from "@/components/common/Button";
import {
  ArrowLeftOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  FolderFilled,
  MailOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { Badge, Card, Dropdown, Menu, message, Steps, Table, Tabs } from "antd";
import ViewAssetsDetailsPopup from "./viewAssetsDetailsPopup";
import { useEffect, useState } from "react";
import UploadLinkDocPopup from "../../../../../components/uploadLinkDocPopup";
import UploadDocPopup from "../../../../../components/uploadDocPopup";
import { usePathname, useRouter } from "next/navigation";
import AddAssetPopupMT from "@/components/addAssetPopupInMT";
import {
  completeMaterialTransfer,
  cancelMaterialTransfer,
  emailMaterialTransferDetails,
  getMaterialTransferDetails,
  printMaterialTransferDetails,
} from "app/services/materialTransfer";
import AddInventoryPopupMT from "@/components/addInventoryPopupInMT";
import dayjs from "dayjs";
import Documents from "./documents";
import { getAdminsManagers } from "app/services/common";

import { Input } from "antd";
import { useSelector } from "react-redux";
import { rigs } from "@/constants/rigsAndSystems";

const { TextArea } = Input;

const data = [
  {
    asset: "RGE9214051001",
    description: "HPU Motor 125HP",
    make: "N/A",
    modal: "N/A",
    serialNumber: "RGE9214051001",
    condition: "Like New",
    transReason: "Not Selected",
  },
  {
    asset: "RGE9214051001",
    description: "HPU Motor 125HP",
    make: "N/A",
    modal: "N/A",
    serialNumber: "RGE9214051001",
    condition: "Like New",
    transReason: "Not Selected",
  },
  {
    asset: "RGE9214051001",
    description: "HPU Motor 125HP",
    make: "N/A",
    modal: "N/A",
    serialNumber: "RGE9214051001",
    condition: "Like New",
    transReason: "Not Selected",
  },
];

const MaterialTransferDetail = () => {
  const [details, setDetails] = useState();
  const { assets } = useSelector((state) => state.assets);
  const { inventory } = useSelector((state) => state.inventory);
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [uploadLinkDocVisible, setUploadLinkDocVisible] = useState(false);
  const [uploadDocVisible, setUploadDocVisible] = useState(false);
  const [addAssetPopup, setAddAssetPopup] = useState(false);
  const [addInventoryPopup, setAddInventoryPopup] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [superUsers, setSuperUsers] = useState([]);
  const router = useRouter();
  // Extract the slug from the URL
  const pathname = usePathname();
  const urlParts = pathname.split("/");
  const slug = urlParts[urlParts.length - 1];

  const { Step } = Steps;

  useEffect(() => {
    const fetchData = async () => {
      const { status, data } = await getMaterialTransferDetails(slug);
      if (status === 200) {
        console.log(data);
        setDetails(data?.data);
        setSelectedRowKeys(data?.data?.materialTransfer.inventory);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };
    const handleFetchSuperUsers = async () => {
      const { status, data } = await getAdminsManagers();
      if (status === 200) {
        setSuperUsers(data.data);
      } else {
        message.error(data.error);
      }
    };
    handleFetchSuperUsers();
    fetchData();
  }, []);
  console.log(details);

  const handleEmail = async () => {
    const { status, data } = await emailMaterialTransferDetails(slug);
    if (status === 200) {
      message.success(data.message || "Email sent successfully");
    } else {
      message.error(data.message || "Failed to send email");
    }
  };

  const handlePrint = async () => {
    const { status, data } = await printMaterialTransferDetails(slug);
    if (status === 200) {
      window.open(data.data);
      message.success(data.message || "Printed successfully");
    } else {
      message.error(data.message || "Failed to print");
    }
  };

  const handleComplete = async () => {
    const { status, data } = await completeMaterialTransfer(
      details?.materialTransfer._id
    );
    if (status === 200) {
      message.success(
        data.message || "Material Transfer Completed Successfully"
      );
    } else {
      message.error(data.message || "Failed to complete");
    }
  };

  const handleCancel = async () => {
    const { status, data } = await cancelMaterialTransfer(
      details?.materialTransfer._id
    );
    if (status === 200) {
      message.success(
        data.message || "Material Transfer Canceled Successfully"
      );
    } else {
      message.error(data.message || "Failed to cancel");
    }
  };

  const columns = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    {
      title:
        details?.materialTransfer?.inventories?.length > 0 === "inventory"
          ? "Part #"
          : "Asset #",
      dataIndex:
        details?.materialTransfer?.inventories?.length > 0 === "inventory"
          ? "partNumber"
          : "assetID",
      key:
        details?.materialTransfer?.inventories?.length > 0 === "inventory"
          ? "partNumber"
          : "assetID",
    },
    {
      title: "Location",
      dataIndex: "site",
      key: "site",
      render: (_, record) => <span>{record?.site?.site}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    ...(details?.materialTransfer?.inventories?.length > 0 === "inventory"
      ? [
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
        ]
      : []),
  ];

  return (
    <div className="p-7 overflow-auto h-[calc(100dvh-130px)]">
      <UploadLinkDocPopup
        visible={uploadLinkDocVisible}
        setVisible={setUploadLinkDocVisible}
        materialTransferSlug={slug}
        setDetails={setDetails}
      />
      <UploadDocPopup
        visible={uploadDocVisible}
        setVisible={setUploadDocVisible}
        materialTransferSlug={slug}
        setDetails={setDetails}
      />
      <div className="flex justify-between gap-3 mb-5">
        <Button
          prefix={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          fullWidth={false}
          outlined
        />
        <div className="">
          <Button
            text="Email"
            prefix={<MailOutlined />}
            fullWidth={false}
            onClick={() => handleEmail()}
          />

          <Button
            text="Print"
            prefix={<PrinterFilled />}
            fullWidth={false}
            className="ml-3"
            onClick={() => handlePrint()}
          />
          {(details?.materialTransfer?.status !== "canceled" ||
            details?.materialTransfer?.status !== "completed") && (
            <Button
              text="Cancel"
              fullWidth={false}
              className="ml-3"
              onClick={() => handleCancel()}
            />
          )}
          {(details?.materialTransfer?.status !== "canceled" ||
            details?.materialTransfer?.status !== "completed") && (
            <Button
              text="Complete"
              fullWidth={false}
              className="ml-3"
              onClick={() => handleComplete()}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-3/5">
          <Card
            loading={false}
            className="!bg-primary"
            title={
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-secondary rounded-full">
                  <FolderFilled />
                </span>
                {details?.materialTransfer?._id}{" "}
                <p className="text-xs font-normal">
                  ({details?.materialTransfer?.status})
                </p>
              </div>
            }
          >
            <div className="grid md:grid-cols-2 mx-2 gap-3">
              <div>
                <span className="opacity-70 mr-3">Origin</span>
                <span className="">
                  {details?.materialTransfer.origiationSites
                    .map((i) => i.site)
                    .join(",")}
                </span>
              </div>
              {/* <div>
                <span className="opacity-70 mr-3">Transporter</span>
                <span className="">
                  {details?.materialTransfer.transporter}
                </span>
              </div> */}
              <div>
                <span className="opacity-70 mr-3">Destination</span>
                <span className="">
                  {details?.materialTransfer.destinationSite?.site}
                </span>
              </div>
              {/* <div>
                <span className="opacity-70 mr-3">Attention To</span>
                <span className="">
                  {details?.materialTransfer.attentionTo}
                </span>
              </div> */}
            </div>
          </Card>
          <Card
            loading={false}
            className="!bg-primary"
            title={<div>Transfer Details</div>}
            style={{ marginTop: "20px" }}
          >
            <div className="grid md:grid-cols-3 mx-2 gap-3">
              <div>
                <span className="opacity-70 mr-3">Creator</span>
                <span className="">{details?.materialTransfer.createdBy}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Created On</span>
                <span className="">
                  {dayjs(details?.materialTransfer.createdAt).format(
                    "MMM DD, YYYY"
                  )}
                </span>
              </div>
              {/* <div className="flex">
                <span className="opacity-70 mr-3 block">
                  Material Transfer Type
                </span>
                <span className="">
                  {details?.materialTransfer.materialTransferType}
                </span>
              </div> */}
              <div className="md:col-span-2">
                <span className="opacity-70 mr-3">Comments</span>
                <span className="">{details?.materialTransfer.comments}</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="md:w-2/5">
          <Card
            loading={false}
            title={<p>Workflow Status</p>}
            // extra={
            //   <Button
            //     outlined
            //     size="small"
            //     fullWidth={false}
            //     className="!text-xs !h-7 mr-3"
            //     text="Export"
            //     prefix={<ExportOutlined />}
            //     onClick={() => message.info("Export will be available soon.")}
            //   />
            // }
          >
            <Steps
              direction="vertical"
              current={1} // Adjust this based on the progress
              progressDot
            >
              <Step
                title={<p className="text-sm">Ship</p>}
                description={
                  <div>
                    <p>
                      <span className="text-[#52c41a]">Created</span> by{" "}
                      {details?.materialTransfer.createdBy}
                    </p>
                  </div>
                }
              />
              <Step
                title={<p className="text-sm">Receive</p>}
                description={
                  <div>
                    <p>
                      {details?.materialTransfer?.status}
                      {/* <span className="text-[#52c41a]">Approved</span> by
                      Midland Yard */}
                    </p>
                  </div>
                }
              />
            </Steps>
          </Card>
        </div>
      </div>
      <div>
        <Card
          loading={false}
          className="!bg-primary"
          style={{ marginTop: "20px" }}
          title={
            <div className="flex items-center justify-between gap-3">
              <Badge count={0}>
                <h1 className="text-base">Material Transfered</h1>
              </Badge>
            </div>
          }
        >
          <div className="">
            <Table
              loading={false}
              scroll={{ x: 700 }}
              columns={columns}
              dataSource={
                details?.materialTransfer?.assets?.length > 0
                  ? details?.materialTransfer?.assets
                  : details?.materialTransfer?.inventories
              }
              pagination={false}
              style={{
                overflow: "auto",
              }}
            />
          </div>
        </Card>
        <Card
          loading={false}
          className="!bg-primary"
          title={
            <div className="flex items-center justify-between gap-3">
              <Badge count={0}>
                <h1 className="text-base">Material Transfer Documents</h1>
              </Badge>
            </div>
          }
          style={{ marginTop: "20px" }}
        >
          <Documents
            documentsData={details?.documents}
            setData={setDetails}
            superUsers={superUsers}
          />
        </Card>
      </div>
    </div>
  );
};

export default MaterialTransferDetail;
