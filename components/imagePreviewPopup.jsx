import { Modal } from "antd";
import Button from "./common/Button";
import Image from "next/image";

const ImagePreview = ({ previewImage, setPreviewImage }) => {
  return (
    <Modal
      maskClosable={false}
      title="Preview"
      open={previewImage}
      footer={
        <Button
          text="Close"
          onClick={() => setPreviewImage(false)}
          fullWidth={false}
          outlined
        />
      }
      onCancel={() => setPreviewImage(false)}
    >
      <Image
        width={100}
        height={100}
        alt="Preview"
        style={{ width: "100%" }}
        src={previewImage}
      />
    </Modal>
  );
};

export default ImagePreview;
