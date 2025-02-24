import Button from "@/components/common/Button";
import { EyeOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import Link from "next/link";

const AssetDetailsPopup = ({ visible, setVisible, asset }) => {
  return (
    <div>
      <Modal
        maskClosable={false}
        title={<h1 className="text-lg md:text-2xl">{asset.assetNumber}</h1>}
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
            <Link href={"/admin/assets/" + asset._id}>
              <Button className="" text="More Details" fullWidth={false} />
            </Link>
          </div>
        }
      >
        <p className="font-semibold mt-3">NAME OF ASSET</p>
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
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-b-0">
            Purchase Date
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Brand
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>{" "}
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Model
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0 truncate">
            {"-"}
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0 border-b-0">
            Serial #
          </p>
          <p className="p-2 md:px-3 md:py-2 border border-b-0">{"-"}</p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border border-r-0">
            Status
          </p>
          <p className="p-2 md:px-3 md:py-2 bg-bg_secondary border">{"-"}</p>
        </div>
      </Modal>
    </div>
  );
};

export default AssetDetailsPopup;
