"use client";
import Button from "@/components/common/Button";
import {
  ArrowLeftOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  FolderFilled,
  MailOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { Badge, Card, Dropdown, Menu, message, Steps, Table, Tabs } from "antd";
import ViewAssetsDetailsPopup from "./viewAssetsDetailsPopup";
import { useEffect, useState } from "react";
import UploadLinkDocPopup from "./uploadLinkDocPopup";
import UploadDocPopup from "./uploadDocPopup";
import { usePathname, useRouter } from "next/navigation";
import AddAssetPopupMT from "@/components/addAssetPopupInMT";
import {
  emailMaterialTransferDetails,
  getMaterialTransferDetails,
  printMaterialTransferDetails,
} from "app/services/materialTransfer";
import AddInventoryPopupMT from "@/components/addInventoryPopupInMT";
import dayjs from "dayjs";

const columns = [
  {
    title: "Asset Number",
    dataIndex: "id",
    key: "id",
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
  {
    title: "Make",
    dataIndex: "make",
    key: "make",
  },
  {
    title: "Model",
    dataIndex: "modal",
    key: "modal",
  },
  {
    title: "Sr#",
    dataIndex: "serialNumber",
    key: "serialNumber",
  },
];

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
            columns={columns}
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
            columns={columns}
            dataSource={[details?.assets]}
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
      children:
        details?.inventory.length > 0 ? (
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
                },
              ]}
              dataSource={selectedRowKeys.map((id) => ({
                _id: id,
              }))}
              pagination={{
                total: details?.inventory.length,
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
        ) : (
          <div className="text-center my-7">
            <ExclamationCircleOutlined /> Data not available
          </div>
        ),
    },
    {
      label: "Misc",
      children: (
        <div className="text-center my-7">
          <ExclamationCircleOutlined /> No misc data to display
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
        setSelectedRowKeys(data?.data?.inventory);
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
      />
      <UploadDocPopup
        visible={uploadDocVisible}
        setVisible={setUploadDocVisible}
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
                <span className="">{details?.origin}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Transporter</span>
                <span className="">{details?.transporter}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Destination</span>
                <span className="">{details?.destination}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Attention To</span>
                <span className="">{details?.attentionTo}</span>
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
                <span className="">{details?.createdBy}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Created On</span>
                <span className="">
                  {dayjs(details?.createdAt).format("MMM DD, YYYY")}
                </span>
              </div>
              <div className="flex">
                <span className="opacity-70 mr-3 block">
                  Material Transfer Type
                </span>
                <span className="">{details?.materialTransferType}</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Cautions</span>
                <span className="">--</span>
              </div>
              <div className="md:col-span-2">
                <span className="opacity-70 mr-3">Comments</span>
                <span className="">{details?.comments}</span>
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
                title={<p className="text-sm">Ship (NORAM Yard to Rig)</p>}
                description={
                  <div>
                    <p>
                      <span className="text-[#52c41a]">Approved</span> by Rig 23
                      Manager on 02/12/2024 19:58 (GMT+5)
                    </p>
                    <span className="opacity-50">Comment:</span>
                    <span className="font-italic">
                      {" "}
                      &quot;Ship to rig 21&quot;
                    </span>
                    <p>
                      <span className="opacity-50">Primary Approver:</span>{" "}
                      <strong>Zeba Avera</strong>
                    </p>
                  </div>
                }
              />
              <Step
                title={<p className="text-sm">Receive (NORAM Yard to Rig)</p>}
                description={
                  <div>
                    <p>
                      <span className="text-[#52c41a]">Approved</span> by
                      Midland Yard on 02/23/2024 18:42 (GMT+5)
                    </p>
                    <span className="opacity-50"> Comment:</span>{" "}
                    <span className="font-italic">&quot;AT RIG21&quot;</span>
                    <p>
                      <span className="opacity-50">Primary Approver:</span>{" "}
                      <strong>Zeba Avera</strong>
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
            <div className="text-center my-7">
              <ExclamationCircleOutlined /> No data to display
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MaterialTransferDetail;
