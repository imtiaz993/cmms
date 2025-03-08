import Button from "@/components/common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Link from "next/link";

const UnplannedPreviewPopup = ({ visible, setVisible, workOrder }) => {
  return (
    <div>
      <Modal
        maskClosable={false}
        width={600}
        title={
          <h1 className="text-lg md:text-2xl">
            {workOrder?.asset.assetID || "WO-123"}
          </h1>
        }
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <div>
            <Button
              className="mr-2"
              onClick={() => setVisible(false)}
              outlined
              text="Close"
              fullWidth={false}
            />

            <Link href={`/admin/work-orders/${workOrder?._id}`}>
              <Button className="" text="More Details" fullWidth={false} />
            </Link>
          </div>
        }
      >
        <div className="mt-5 grid grid-cols-2">
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Site
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder?.asset.site?.site || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            System
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder.asset.system?.system || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Category
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder?.asset.category?.category || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Sub-Category
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder?.asset.subCategory?.subCategory || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Date Created
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder?.date || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Time Created
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">
            {workOrder?.time || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Criticality
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0 truncate">
            {workOrder?.criticality || "-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Asset #
          </p>
          {
            <Link href={`/admin/assets/${workOrder?.asset?._id}`}>
              <p className="p-2 md:px-3 md:py-2 border border-b-0 text-inherit">
                {workOrder?.asset.assetID || "-"}
              </p>
            </Link>
          }
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0">
            Description of Issue
          </p>
          <p className="p-2 md:px-3 md:py-2 border">
            {workOrder?.description || "-"}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default UnplannedPreviewPopup;
