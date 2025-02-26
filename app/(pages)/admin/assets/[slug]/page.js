"use client";

import Button from "@/components/common/Button";
import Tabs from "./components/tabs";
import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  LeftOutlined,
  PlusOutlined,
  PrinterOutlined,
  SwapOutlined,
  ToolOutlined,
  TruckOutlined,
  WarningFilled,
  WarningOutlined,
} from "@ant-design/icons";
import { message, Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  deleteAsset,
  getAssetDetails,
  updateStatus,
} from "app/services/assets";
import CreateAssetPopup from "../components/createAssetPopup";
import ConfirmationPopup from "@/components/confirmationPopup";
import { LinkBroken } from "@/icons/index";

const AssetDetail = () => {
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  const [editAssetPopup, setEditAssetPopup] = useState(false);
  const [deleteAssetPopup, setDeleteAssetPopup] = useState(false);
  const [actionPopup, setActionPopup] = useState(false);
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getAssetDetails(slug);
      if (status === 200) {
        console.log(data);
        setData(data?.data);
        setDetails(data?.data.dashboard);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };
    getAsset();
  }, [slug]);

  // const handleDelete = async () => {
  //   const { status, data } = await deleteAsset(slug);
  //   if (status === 200) {
  //     message.success(data?.message || "Asset deleted successfully");
  //     router.push("/admin/assets");
  //   } else {
  //     message.error(data?.message || "Failed to delete asset");
  //   }
  // };

  const options = [
    {
      label: (
        <p>
          <ToolOutlined /> New Work Order
        </p>
      ),
      value: "workorder",
    },
    {
      label: (
        <p>
          <ExclamationCircleFilled /> Damaged beyond repair
        </p>
      ),
      value: "damaged",
    },
    {
      label: (
        <p className="flex items-center gap-1">
          <LinkBroken /> Broken
        </p>
      ),
      value: "repair",
    },
    {
      label: (
        <p>
          <DeleteOutlined /> Dispose
        </p>
      ),
      value: "dispose",
    },
    {
      label: (
        <p>
          <TruckOutlined /> Out for Repair
        </p>
      ),
      value: "outForRepair",
    },
    {
      label: (
        <p>
          <DollarOutlined /> Sell
        </p>
      ),
      value: "sell",
    },
    {
      label: (
        <p>
          <CheckCircleOutlined /> Active
        </p>
      ),
      value: "active",
    },
    {
      label: (
        <p>
          <SwapOutlined /> Material Transfer
        </p>
      ),
      value: "materialTransfer",
    },
  ];

  const handleAction = (value) => {
    if (value !== "materialTransfer") setActionPopup(value);
  };

  const handleActionConfirm = async () => {
    const { status, data } = await updateStatus({
      assets: [slug],
      status: actionPopup,
    });
    if (status === 200) {
      message.success(data?.message || "Asset updated successfully");
      setData((prev) => ({
        ...prev,
        dashboard: { ...prev.dashboard, maintStatus: actionPopup },
      }));
    }
  };

  return (
    <div className="overflow-auto h-[calc(100dvh-130px)]">
      {data && (
        <CreateAssetPopup
          visible={editAssetPopup}
          setVisible={setEditAssetPopup}
          assetId={slug}
          details={data}
          setDetails={setData}
        />
      )}
      {/* <ConfirmationPopup
        visible={deleteAssetPopup}
        setVisible={setDeleteAssetPopup}
        message="Are you sure you want to delete this asset?"
        onConfirm={handleDelete}
        onCancel={() => message.info("Delete action cancelled")}
      /> */}
      <ConfirmationPopup
        visible={actionPopup}
        setVisible={setActionPopup}
        title={options.find((o) => o.value === actionPopup)?.label}
        message="Are you sure you want to perform this action?"
        onConfirm={handleActionConfirm}
        onCancel={() => message.info("Action cancelled")}
      />
      <div className="mx-5 lg:mx-10">
        <p className="text-sm text-[#828282]">
          Assets {" > " + details?.assetNumber}
        </p>
        <Button
          text="Back to Assets"
          onClick={() => router.push("/admin/assets")}
          className="mt-4 !bg-[#3F3F3F] !border-none"
          fullWidth={false}
          prefix={<LeftOutlined />}
        />
        <div className="bg-primary rounded-lg p-3 md:p-5 mt-5 shadow-custom">
          <div className="md:flex justify-between gap-5 mb-5">
            <p className="hidden md:block text-left text-lg md:text-2xl font-semibold">
              {details?.assetNumber}{" "}
              <WarningOutlined className="!text-secondary" />{" "}
            </p>
            <div className="grid md:flex grid-cols-2 gap-3 md:gap-5">
              <p className="md:hidden text-left text-lg md:text-2xl font-semibold">
                {details?.assetNumber}{" "}
                <WarningOutlined className="!text-secondary" />{" "}
              </p>
              {/* <Button
              text="Delete"
              prefix={<DeleteOutlined />}
              fullWidth={false}
              onClick={() => setDeleteAssetPopup(true)}
              outlined
            /> */}
              <Button
                text="Print"
                prefix={<PrinterOutlined />}
                fullWidth={false}
                className="!h-11"
                // onClick={}
                outlined
              />
              <Button
                text="Edit Asset"
                prefix={<EditOutlined />}
                fullWidth={false}
                className="!h-11"
                onClick={() => router.push(`/admin/assets/${slug}/edit`)}
                outlined
              />
              <Select
                value={null}
                name="actions"
                placeholder="More Actions"
                onChange={handleAction}
                className="!h-11 md:!min-w-52 secondary-select !text-white"
                suffixIcon={<DownOutlined style={{ color: "white" }} />}
                // onChange={handleActionsChange}
                options={options}
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="border w-full min-h-10 md:w-2/12"></div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Asset ID
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.assetID || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Purchase Date
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.purchaseDate || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Cost
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">---</p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Brand
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.brand || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Model
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.model || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border">
                Description
              </p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.description || "-"}
              </p>
            </div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Site
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.site.site || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                System
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.system.system || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Category
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.category.category || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Sub-Category
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.subCategory.subCategory || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border border-b-0">
                Assigned to
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">{"---"}</p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border-r-0 border">
                Status
              </p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.maintStatus || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {data && <Tabs data={data} setData={setData} slug={slug} />}
    </div>
  );
};

export default AssetDetail;
