"use client";
import Button from "@/components/common/Button";
import {
  ExclamationCircleOutlined,
  ExportOutlined,
  FolderFilled,
} from "@ant-design/icons";
import { Badge, Card, Dropdown, Menu, Table, Tabs } from "antd";
import ViewAssetsDetailsPopup from "./viewAssetsDetailsPopup";
import { useState } from "react";
import UploadLinkDocPopup from "./uploadLinkDocPopup";
import UploadDocPopup from "./uploadDocPopup";

const columns = [
  {
    title: "Asset",
    dataIndex: "asset",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Make",
    dataIndex: "make",
  },
  {
    title: "Model",
    dataIndex: "modal",
  },
  {
    title: "Serial Number",
    dataIndex: "serialNumber",
  },
  {
    title: "Condition",
    dataIndex: "condition",
  },
  {
    title: "Trans. Reason",
    dataIndex: "transReason",
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
          <div className="flex gap-3 justify-end">
            <Button
              type="primary"
              // style={{ height: "36px", fontWeight: "500", minWidth: "80px" }}
              onClick={() => setAssetDetailsPopup(true)}
              fullWidth={false}
              text="View Details"
            />

            <Button
              type="primary"
              // style={{ height: "36px", fontWeight: "500", minWidth: "80px" }}
              onClick={() => {}}
              fullWidth={false}
              text="Add Assets"
            />
            <Button
              type="primary"
              // style={{ height: "36px", fontWeight: "500", minWidth: "80px" }}
              onClick={() => {}}
              fullWidth={false}
              text="Export"
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
    <div className="p-7 overflow-auto h-[calc(100dvh-77px)]">
      <UploadLinkDocPopup
        visible={uploadLinkDocVisible}
        setVisible={setUploadLinkDocVisible}
      />
      <UploadDocPopup
        visible={uploadDocVisible}
        setVisible={setUploadDocVisible}
      />
      <Card
        loading={false}
        className="!bg-primary"
        title={
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-secondary rounded-full">
              <FolderFilled />
            </span>
            MT14687000001 <p className="text-xs font-normal">(Approved)</p>
          </div>
        }

        // extra={
        //   <Link
        //     href={`/admin/dashboard?tab=work-orders&location=${activeLocation}`}
        //     className="cursor-pointer text-secondary text-xs md:text-sm"
        //   >
        //     View All
        //   </Link>
        // }
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
          {/* <Table
            loading={false}
            size={"small"}
            columns={unplannedColumns}
            dataSource={unplannedData}
            pagination={false}
            style={{
              overflow: "auto",
            }}
          /> */}
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
            <span className="">Ship 444t 125hp rig house motor to rig 21</span>
          </div>

          {/* <Table
            loading={false}
            size={"small"}
            columns={unplannedColumns}
            dataSource={unplannedData}
            pagination={false}
            style={{
              overflow: "auto",
            }}
          /> */}
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
                  <Menu style={{ background: "#4C4C4C" }}>
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
  );
};

export default MaterialTransferDetail;
