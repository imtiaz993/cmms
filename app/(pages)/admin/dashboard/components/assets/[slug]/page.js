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

const AssetDetail = () => {
  return (
    <div className="overflow-auto h-[calc(100dvh-77px)]">
      <div className="mx-3 lg:mx-8 mt-3 flex justify-between gap-3 mb-5">
        <Button
          prefix={<ArrowLeftOutlined />}
          onClick={() =>
            router.push("/admin/dashboard?tab=assets&location=noram-drilling")
          }
          fullWidth={false}
          outlined
        />
        <div className="">
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
            className="ml-3"
            onClick={() => message.info("Create UWO  will be available soon.")}
            outlined
          />

          <Button
            text="Edit Asset"
            prefix={<EditOutlined />}
            fullWidth={false}
            className="ml-3"
          />
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default AssetDetail;
