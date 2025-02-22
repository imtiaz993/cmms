import Button from "@/components/common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Link from "next/link";

const PlannedPreviewPopup = ({ visible, setVisible, workOrder }) => {
  return (
    <div>
      <Modal
        maskClosable={false}
        width={600}
        title={
          <h1 className="text-lg md:text-2xl">
            {workOrder?.name || "WO-12344"}
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
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Location
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Category
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Sub-Category
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Start Date
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Schedule
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Criticality
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0 truncate">
            {"-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Asset #
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0">
            Category
          </p>
          <p className="p-2 md:px-3 md:py-2 border">{"-"}</p>
        </div>
      </Modal>
    </div>
  );
};

export default PlannedPreviewPopup;
