import Button from "@/components/common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const InventoryDetailsPopup = ({ visible, setVisible, part }) => {
  return (
    <div>
      <Modal
        maskClosable={false}
        title={<h1 className="text-lg md:text-2xl">{part}</h1>}
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

            <Button className="" text="More Details" fullWidth={false} />
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
            Date Received
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">-</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Part #
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-b-0">
            Tag ID
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Quantity
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Description
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0 truncate">
            {"-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Notes
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0">Image</p>
          <p className="p-2 md:px-3 md:py-2 border">
            <a className="underline"> View Image </a> <EyeOutlined />
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default InventoryDetailsPopup;
