"use client";
import Button from "@/components/common/Button";
import {
  ArrowLeftOutlined,
  BackwardFilled,
  ExclamationCircleOutlined,
  ExportOutlined,
  FolderFilled,
  MailOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import {
  BackTop,
  Badge,
  Card,
  Dropdown,
  Menu,
  message,
  Steps,
  Table,
  Tabs,
  Typography,
} from "antd";
import ViewAssetsDetailsPopup from "./viewAssetsDetailsPopup";
import { useState } from "react";
import UploadLinkDocPopup from "./uploadLinkDocPopup";
import UploadDocPopup from "./uploadDocPopup";
import { useRouter } from "next/navigation";
import AddAssetPopupMT from "@/components/addAssetPopupInMT";

const columns = [
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
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
    title: "Serial Number",
    dataIndex: "serialNumber",
    key: "serialNumber",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
  },
  {
    title: "Trans. Reason",
    dataIndex: "transReason",
    key: "transReason",
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
  const [assetDetailsPopup, setAssetDetailsPopup] = useState(false);
  const [uploadLinkDocVisible, setUploadLinkDocVisible] = useState(false);
  const [uploadDocVisible, setUploadDocVisible] = useState(false);
  const [addAssetPopup, setAddAssetPopup] = useState(false);
  const router = useRouter();
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
          />
          <div className="flex gap-3 justify-end mt-3 xl:mt-0">
            <Button
              type="primary"
              className="!h-7 md:!h-9"
              onClick={() => setAssetDetailsPopup(true)}
              fullWidth={false}
              text="View Details"
            />

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
            dataSource={data}
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
            onClick={() => message.info("Email will be available soon.")}
          />

          <Button
            text="Print"
            prefix={<PrinterFilled />}
            fullWidth={false}
            className="ml-3"
            onClick={() => message.info("Print will be available soon.")}
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
                <span className=""> Rig 23 - Electrical Systems</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Transporter</span>
                <span className=""> Rig 23</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Destination</span>
                <span className=""> Rig 21 - Electrical Systems</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Attention To</span>
                <span className="">Aaron Cannon</span>
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
                <span className="">Manager, Rig 23</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Created On</span>
                <span className="">Feb 12, 2024</span>
              </div>
              <div className="flex">
                <span className="opacity-70 mr-3 block">
                  Material Transfer Type
                </span>
                <span className="">NORAM Yard to Rig</span>
              </div>
              <div>
                <span className="opacity-70 mr-3">Cautions</span>
                <span className="">Non-Hazardous</span>
              </div>
              <div className="md:col-span-2">
                <span className="opacity-70 mr-3">Comments</span>
                <span className="">
                  Ship 444t 125hp rig house motor to rig 21
                </span>
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
