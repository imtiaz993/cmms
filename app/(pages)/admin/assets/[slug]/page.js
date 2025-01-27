"use client";

import Button from "@/components/common/Button";
import Tabs from "./components/tabs";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
  WarningFilled,
  WarningOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteAsset, getAssetDetails } from "app/services/assets";
import CreateAssetPopup from "../components/createAssetPopup";
import ConfirmationPopup from "@/components/confirmationPopup";
import Link from "next/link";
import { rigs } from "@/constants/rigsAndSystems";

const AssetDetail = () => {
  const [details, setDetails] = useState();
  const [editAssetPopup, setEditAssetPopup] = useState(false);
  const [deleteAssetPopup, setDeleteAssetPopup] = useState(false);
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const getAsset = async () => {
      const { status, data } = await getAssetDetails(slug);
      if (status === 200) {
        console.log(data);
        setDetails(data?.data);
      } else {
        message.error(data?.message || "Failed to fetch data");
      }
    };
    getAsset();
  }, [slug]);

  const handleDelete = async () => {
    const { status, data } = await deleteAsset(slug);
    if (status === 200) {
      message.success(data?.message || "Asset deleted successfully");
      router.push("/admin/assets");
    } else {
      message.error(data?.message || "Failed to delete asset");
    }
  };

  return (
    <div className="overflow-auto h-[calc(100dvh-130px)]">
      {details && (
        <CreateAssetPopup
          visible={editAssetPopup}
          setVisible={setEditAssetPopup}
          assetId={slug}
          details={details}
          setDetails={setDetails}
        />
      )}
      <ConfirmationPopup
        visible={deleteAssetPopup}
        setVisible={setDeleteAssetPopup}
        message="Are you sure you want to delete this asset?"
        onConfirm={handleDelete}
        onCancel={() => message.info("Delete action cancelled")}
      />
      <div className="mx-5 lg:mx-10">
        <p className="text-sm text-[#828282]">
          Assets {" > " + details?.dashboard?.assetNumber}
        </p>
        <Button
          text="Back to Assets"
          onClick={() => router.push("/admin/assets")}
          className="mt-4 !bg-[#3F3F3F] !border-none"
          fullWidth={false}
          prefix={<LeftOutlined />}
        />
        <div className="bg-primary rounded-lg p-3 md:p-5 mt-5 shadow-custom">
          <div className="relative text-right grid md:block grid-cols-2 gap-3 md:gap-5 mb-5">
            <p className="static md:absolute text-left text-lg md:text-2xl font-semibold">
              {details?.dashboard?.assetNumber}{" "}
              <WarningOutlined className="!text-secondary" />{" "}
            </p>
            <Button
              text="Delete"
              prefix={<DeleteOutlined />}
              fullWidth={false}
              onClick={() => setDeleteAssetPopup(true)}
              outlined
            />
            <Button
              text="Create UWO"
              prefix={<PlusOutlined />}
              fullWidth={false}
              className="md:ml-3"
              onClick={() =>
                message.info("Create UWO  will be available soon.")
              }
              outlined
            />

            <Button
              text="Edit Asset"
              prefix={<EditOutlined />}
              fullWidth={false}
              className="md:ml-3"
              onClick={() => router.push(`/admin/assets/${slug}/edit`)}
            />
          </div>
          <div className="mt-5 flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="border w-full min-h-10 md:w-2/12"></div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Asset ID
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.dashboard?.assetNumber || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Purchase Date
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Cost
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Brand
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.dashboard.make || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Model
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {details?.dashboard.model || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border">
                Description
              </p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.dashboard.description || "-"}
              </p>
            </div>
            <div className="md:w-5/12 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Site
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {rigs?.find((rig) => rig.id === "1")?.name || "-"}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Location
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Caregory
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Sub-Category
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border border-b-0">
                Assigned to
              </p>

              <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
              <p className="p-2 md:px-3 md:py-2 bg-[#4C4C51] border">Status</p>
              <p className="p-2 md:px-3 md:py-2 border truncate">
                {details?.dashboard.maintStatus || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {details && (
        <Tabs details={details} setDetails={setDetails} slug={slug} />
      )}
    </div>
  );
};

export default AssetDetail;
