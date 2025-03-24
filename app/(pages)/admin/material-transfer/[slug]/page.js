"use client";
import Button from "@/components/common/Button";
import {
  FolderFilled,
  LeftOutlined,
  MailOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { Badge, Card, message, Spin, Steps, Table } from "antd";
import { useEffect, useState } from "react";
import UploadLinkDocPopup from "../../../../../components/uploadLinkDocPopup";
import UploadDocPopup from "../../../../../components/uploadDocPopup";
import { usePathname, useRouter } from "next/navigation";
import {
  completeMaterialTransfer,
  cancelMaterialTransfer,
  emailMaterialTransferDetails,
  getMaterialTransferDetails,
  printMaterialTransferDetails,
} from "app/services/materialTransfer";
import dayjs from "dayjs";
import Documents from "./documents";
import { getAdminsManagers } from "app/services/common";
import { useSelector } from "react-redux";

const MaterialTransferDetail = () => {
  const [details, setDetails] = useState();
  const { assets } = useSelector((state) => state.assets);
  const { inventory } = useSelector((state) => state.inventory);
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [uploadLinkDocVisible, setUploadLinkDocVisible] = useState(false);
  const [uploadDocVisible, setUploadDocVisible] = useState(false);
  const [superUsers, setSuperUsers] = useState([]);
  const router = useRouter();
  // Extract the slug from the URL
  const pathname = usePathname();
  const urlParts = pathname.split("/");
  const slug = urlParts[urlParts.length - 1];

  const { Step } = Steps;

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
  useEffect(() => {
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
      fetchData();
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
      fetchData();
      message.success(
        data.message || "Material Transfer Cancelled Successfully"
      );
    } else {
      message.error(data.message || "Failed to cancel");
    }
  };

  const columns = [
    {
      title:
        details?.materialTransfer?.inventories?.length > 0
          ? "Part #"
          : "Asset #",
      dataIndex:
        details?.materialTransfer?.inventories?.length > 0
          ? "inventory"
          : "asset",
      key:
        details?.materialTransfer?.inventories?.length > 0
          ? "partNumber"
          : "assetID",
      render: (data) => data?.partNumber || data?.assetID,
    },
    {
      title: "Location",
      dataIndex:
        details?.materialTransfer?.inventories?.length > 0
          ? "inventory"
          : "asset",
      key: "site",
      render: (data, record) => <span>{data?.site}</span>,
    },
    {
      title: "Description",
      dataIndex:
        details?.materialTransfer?.inventories?.length > 0
          ? "inventory"
          : "asset",
      key: "description",
      render: (data, record) => <span>{data?.description}</span>,
    },
    ...(details?.materialTransfer?.inventories?.length > 0
      ? [
          {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
          },
        ]
      : []),
  ];

  console.log("columsn", details?.materialTransfer?.inventories?.length);

  return details ? (
    <div className="pt-0 p-7 overflow-auto h-[calc(100dvh-130px)]">
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
      <p className="text-sm text-[#828282]">
        Material Transfer {" > "} {details?.materialTransfer?._id}
      </p>
      <div className="flex justify-between gap-3 my-5">
        <div>
          <Button
            text="Back to Material Transfer"
            onClick={() => router.push("/admin/material-transfer")}
            className="!bg-[#3F3F3F] !border-none"
            fullWidth={false}
            prefix={<LeftOutlined />}
          />
        </div>
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
          {details?.materialTransfer?.status !== "cancelled" &&
            details?.materialTransfer?.status !== "confirmed" && (
              <Button
                text="Cancel"
                fullWidth={false}
                className="ml-3"
                onClick={() => handleCancel()}
              />
            )}
          {details?.materialTransfer?.status !== "cancelled" &&
            details?.materialTransfer?.status !== "confirmed" && (
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
              <div>
                <span className="opacity-70 mr-3">Company</span>
                <span className="">
                  {details?.materialTransfer.companyName}
                </span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Person Transporting</span>
                <span className="">
                  {" "}
                  {superUsers.find(
                    (user) =>
                      user._id === details?.materialTransfer.personTransporting
                  )?.name || ""}
                </span>
              </div>
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
                      <span className="text-[#52c41a] capitalize">
                        {details?.materialTransfer.status}
                      </span>
                      {details?.materialTransfer.receivedBy ? "by " : ""}
                      {details?.materialTransfer?.receivedBy}
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
            {details?.materialTransfer?.assets?.length > 0
              ? console.log("assets", details?.materialTransfer?.assets)
              : console.log(
                  "inventories",
                  details?.materialTransfer?.inventories
                )}
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
  ) : (
    <Spin size="large" spinning={true} className="text-center w-full !mt-80" />
  );
};

export default MaterialTransferDetail;
