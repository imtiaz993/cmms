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
import { getAssetDetails } from "app/services/assets";

const AssetDetail = () => {
  const [details, setDetails] = useState();
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

  return (
    <div className="overflow-auto h-[calc(100dvh-130px)]">
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
          onClick={() => message.info("Asset Delete will be available soon.")}
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
        />
      </div>
      {details && (
        <Tabs details={details} setDetails={setDetails} slug={slug} />
      )}
    </div>
  );
};

export default AssetDetail;
