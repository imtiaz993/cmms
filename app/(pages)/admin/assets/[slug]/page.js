"use client";

import Button from "@/components/common/Button";
import Tabs from "./components/tabs";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteAsset, getAssetDetails } from "app/services/assets";
import CreateAssetPopup from "../components/createAssetPopup";
import ConfirmationPopup from "@/components/confirmationPopup";

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
      <div className="relative text-right mx-3 lg:mx-8 mt-3 grid md:block grid-cols-2 gap-3 mb-5">
        <div className="static md:absolute left-0">
          <Button
            prefix={<ArrowLeftOutlined />}
            onClick={() => router.back()}
            fullWidth={false}
            outlined
            className="w-full md:w-auto"
          />
        </div>
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
          onClick={() => message.info("Create UWO  will be available soon.")}
          outlined
        />

        <Button
          text="Edit Asset"
          prefix={<EditOutlined />}
          fullWidth={false}
          className="md:ml-3"
          onClick={() => setEditAssetPopup(true)}
        />
      </div>
      {details && (
        <Tabs details={details} setDetails={setDetails} slug={slug} />
      )}
    </div>
  );
};

export default AssetDetail;
