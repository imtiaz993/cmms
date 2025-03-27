import Button from "@/components/common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Link from "next/link";

const InventoryDetailsPopup = ({ visible, setVisible, inventory }) => {
  return (
    <div>
      {
        <Modal
          maskClosable={false}
          title={
            <h1 className="text-lg md:text-2xl">
              Part # {inventory && inventory?.partNumber}
            </h1>
          }
          open={visible}
          onCancel={() => setVisible(false)}
          footer={
            <div>
              <Button
                className="mr-5"
                onClick={() => setVisible(false)}
                outlined
                text="Close"
                fullWidth={false}
              />
              <Link href={"/admin/inventory/" + inventory?._id}>
                <Button className="" text="More Details" fullWidth={false} />
              </Link>
            </div>
          }
        >
          {inventory && (
            <div className="mt-5 grid grid-cols-2">
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Site
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.site?.site}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Vendor
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.vendor?.name}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Date Received
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.receivedDate}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Part #
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.partNumber}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-b-0">
                Tag ID
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.tagId}
              </p>{" "}
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Quantity
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0">
                {inventory?.quantity}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
                Description
              </p>
              <p className="p-2 md:px-3 md:py-2 border border-b-0 truncate">
                {inventory?.description}
              </p>
              <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0">
                Notes
              </p>
              <p className="p-2 md:px-3 md:py-2 border">{inventory?.notes}</p>
            </div>
          )}
        </Modal>
      }
    </div>
  );
};

export default InventoryDetailsPopup;
