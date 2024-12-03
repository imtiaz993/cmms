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
  emailMaterialTransferDetails,
  getMaterialTransferDetails,
  printMaterialTransferDetails,
} from "app/services/materialTransfer";
import AddInventoryPopupMT from "@/components/addInventoryPopupInMT";
import dayjs from "dayjs";

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
  const router = useRouter();
  // Extract the slug from the URL
  const pathname = usePathname();
  const urlParts = pathname.split("/");
  const slug = urlParts[urlParts.length - 1];

  const { Step } = Steps;

  const tabs = [
    {
      label: "Assets",
      children: (
        <div>
          <ViewAssetsDetailsPopup
            visible={assetDetailsPopup}
            setVisible={setAssetDetailsPopup}
            columns={[
              {
                title: "Asset Number",
                dataIndex: "id",
                key: "id",
                render: (id) => assets.find((i) => i._id === id).assetNumber,
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
              },
              {
                title: "Condition",
                dataIndex: "condition",
                key: "condition",
              },
              {
                title: "Trans. Reason",
                dataIndex: "transferReason",
                key: "transferReason",
              },
            ]}
            data={data}
          />
          <AddAssetPopupMT
            visible={addAssetPopup}
            setVisible={setAddAssetPopup}
            materialTransferId={slug}
            setDetails={setDetails}
          />

          <div className="flex gap-3 justify-end mt-3 xl:mt-0">
            {/* <Button
              type="primary"
              className="!h-7 md:!h-9"
              onClick={() => setAssetDetailsPopup(true)}
              fullWidth={false}
              text="View Details"
            /> */}

            <Button
              type="primary"
              className="!h-7 md:!h-9"
              fullWidth={false}
              text="Add Assets"
              onClick={() => setAddAssetPopup(true)}
            />
            <Button
              type="primary"
              className="!h-7 md:!h-9"
              fullWidth={false}
              text="Export"
              onClick={() => message.info("Export will be available soon.")}
              prefix={<ExportOutlined />}
            />
          </div>
          <Table
            loading={false}
            size={"small"}
            columns={[
              {
                title: "Asset Number",
                dataIndex: "id",
                key: "id",
                render: (id) => assets.find((i) => i._id === id)?.assetNumber,
              },
              {
                title: "Condition",
                dataIndex: "condition",
                key: "condition",
              },
              {
                title: "Trans. Reason",
                dataIndex: "transferReason",
                key: "transferReason",
              },
            ]}
            dataSource={details?.materialTransfer.assets}
            pagination={{
              total: data.length,
              current: 1,
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              onChange: () => {},
            }}
            style={{
              overflow: "auto",
              marginTop: 16,
            }}
          />
        </div>
      ),
    },
    {
      label: "Inventory",
      children: (
        <>
          <div>
            {addInventoryPopup && (
              <AddInventoryPopupMT
                visible={addInventoryPopup}
                setVisible={setAddInventoryPopup}
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                materialTransferId={slug}
              />
            )}
            {console.log("selected: ", selectedRowKeys)}
            <div className="text-end mt-3 xl:mt-0">
              <Button
                type="primary"
                className="!h-7 md:!h-9"
                fullWidth={false}
                text="Add Inventory"
                onClick={() => setAddInventoryPopup(true)}
              />
            </div>
          </div>
          {details?.materialTransfer.inventory.length > 0 ? (
            <Table
              loading={false}
              size={"small"}
              columns={[
                {
                  title: "",
                  dataIndex: "",
                  key: "",
                  render: (text, record, index) => index + 1,
                },
                {
                  title: "Inventory Id",
                  dataIndex: "_id",
                  key: "_id",
                  render: (_id) =>
                    inventory.find((i) => i._id === _id).partName,
                },
              ]}
              dataSource={selectedRowKeys.map((id) => ({
                _id: id,
              }))}
              pagination={{
                total: details?.materialTransfer.inventory.length,
                current: 1,
                pageSize: 5,
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
                onChange: () => {},
              }}
              style={{
                overflow: "auto",
                marginTop: 16,
              }}
            />
          ) : (
            <div className="text-center my-7">
              <ExclamationCircleOutlined /> Data not available
            </div>
          )}
        </>
      ),
    },
    {
      label: "Misc",
      children: (
        <div className="text-ellipsisxt-center my-7">
          <TextArea
            value={details?.materialTransfer.misc}
            className={` !border-[#d9d9d9] dark:!border-[#424242] placeholder:!text-[#BFBFBF] dark:placeholder:!text-[#4F4F4F] resize-none`}
            style={{ width: "100%" }}
          />
        </div>
      ),
    },
  ];

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
    fetchData();
  }, []);

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
                TRF14687000001 <p className="text-xs font-normal">(Approved)</p>
              </div>
            }
          >
            <div className="grid md:grid-cols-2 mx-2 gap-3">
              <div>
                <span className="opacity-70 mr-3">Origin</span>
                <span className="">
                  {
                    rigs.find(
                      (i) => i.id === details?.materialTransfer.origination
                    )?.name
                  }
                </span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Transporter</span>
                <span className="">
                  {details?.materialTransfer.transporter}
                </span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Destination</span>
                <span className="">
                  {
                    rigs.find(
                      (i) => i.id === details?.materialTransfer.destination
                    )?.name
                  }
                </span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Attention To</span>
                <span className="">
                  {details?.materialTransfer.attentionTo}
                </span>
              </div>
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
              <div className="flex">
                <span className="opacity-70 mr-3 block">
                  Material Transfer Type
                </span>
                <span className="">
                  {details?.materialTransfer.materialTransferType}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="opacity-70 mr-3">Comments</span>
                <span className="">{details?.materialTransfer.comments}</span>
              </div>
            </div>
          </Card>
          <Card
            loading={false}
            className="!bg-primary"
            title={null}
            style={{ marginTop: "20px" }}
          >
            <div className="">
              <Tabs
                type="card"
                size={"small"}
                items={tabs.map((i, index) => ({ ...i, key: index }))}
                tabBarStyle={{ borderColor: "white" }}
                className="reports-tabs"
              />
            </div>
          </Card>
        </div>
        <div className="md:w-2/5">
          <Card
            loading={false}
            title={<p>Workflow Status</p>}
            extra={
              <Button
                outlined
                size="small"
                fullWidth={false}
                className="!text-xs !h-7 mr-3"
                text="Export"
                prefix={<ExportOutlined />}
                onClick={() => message.info("Export will be available soon.")}
              />
            }
          >
            <Steps
              direction="vertical"
              current={1} // Adjust this based on the progress
              progressDot
            >
              <Step
                title={
                  <p className="text-sm">
                    Ship ({" "}
                    {
                      rigs.find(
                        (i) => i.id === details?.materialTransfer.origination
                      )?.name
                    }{" "}
                    to{" "}
                    {
                      rigs.find(
                        (i) => i.id === details?.materialTransfer.destination
                      )?.name
                    }
                    )
                  </p>
                }
                description={
                  <div>
                    <p>
                      <span className="text-[#52c41a]">Approved</span> by Rig 23
                      Manager
                    </p>
                  </div>
                }
              />
              <Step
                title={
                  <p className="text-sm">
                    Receive ({" "}
                    {
                      rigs.find(
                        (i) => i.id === details?.materialTransfer.origination
                      )?.name
                    }{" "}
                    to{" "}
                    {
                      rigs.find(
                        (i) => i.id === details?.materialTransfer.destination
                      )?.name
                    }
                    ))
                  </p>
                }
                description={
                  <div>
                    <p>
                      <span className="text-[#52c41a]">Approved</span> by
                      Midland Yard
                    </p>
                  </div>
                }
              />
            </Steps>
          </Card>
          <Card
            loading={false}
            className="!bg-primary"
            title={
              <div className="flex items-center justify-between gap-3">
                <Badge count={0}>
                  <h1 className="text-base">Material Transfer Documents</h1>
                </Badge>
                <div>
                  <Button
                    outlined
                    size="small"
                    text="View Details"
                    fullWidth={false}
                    className="!text-xs !h-7 mr-3"
                    disabled
                  />
                  <Dropdown
                    dropdownRender={() => (
                      <Menu>
                        <Menu.ItemGroup title={null}>
                          <Menu.Item
                            key={0}
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => setUploadDocVisible(true)}
                          >
                            Upload Document
                          </Menu.Item>
                          <Menu.Item
                            key={1}
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => setUploadLinkDocVisible(true)}
                          >
                            Link Document
                          </Menu.Item>
                        </Menu.ItemGroup>
                      </Menu>
                    )}
                    trigger={["click"]}
                    arrow
                    // placement="bottomCenter"
                  >
                    <Button
                      outlined
                      size="small"
                      text="Upload"
                      fullWidth={false}
                      className="!text-xs !h-7"
                    />
                  </Dropdown>
                </div>
              </div>
            }
            style={{ marginTop: "20px" }}
          >
            {details?.documents?.length > 0 ? (
              <Table
                columns={[
                  {
                    title: "Document Name",
                    dataIndex: "title",
                    key: "title",
                  },
                  {
                    title: "Document Type",
                    dataIndex: "type",
                    key: "type",
                  },
                  {
                    title: "Description",
                    dataIndex: "description",
                    key: "description",
                  },
                  {
                    title: "",
                    dataIndex: "link",
                    key: "link",
                    render: (link) => (
                      <a href={link} target="_blank">
                        <DownloadOutlined
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </a>
                    ),
                  },
                ]}
                dataSource={details?.documents}
                pagination={false}
                size="small"
              />
            ) : (
              <div className="text-center my-7">
                <ExclamationCircleOutlined /> No data to display
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaterialTransferDetail;
